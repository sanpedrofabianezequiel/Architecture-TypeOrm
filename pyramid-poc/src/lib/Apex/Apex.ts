import moment from "moment";
import {EventEmitter} from "./EventEmitter";
import SerialPort from "serialport";
import ByteLength from "@serialport/parser-byte-length";
import {APEX_EVENT, APEX_EVENT_STR, APEX_STATE, APEX_STATE_STR} from "./const";
import {checksum} from "./utils";

const INITIAL_MESSAGE = [
  0x02,                          // start
  0x08,                          // len
  0x10,                          // ack
  0x7F,                          // bills
  0x00,                          // escrow
  0x00,                          // resv'd
  0x03,                          // end
  0x00,                          // checksum
];

export class Apex {
  private _ack = 0x10;
  private _port: SerialPort;

  private _state: APEX_STATE = 0;
  private _event?: APEX_EVENT;
  private _lastEvent: APEX_EVENT = 0;

  private stateHistory: Map<string, APEX_STATE> = new Map();
  private eventHistory: Map<string, APEX_EVENT> = new Map();

  private statesSubscriptions = new EventEmitter();
  private eventsSubscriptions = new EventEmitter();
  private errorsSubscriptions = new EventEmitter();
  private openSubscriptions = new EventEmitter();
  private billsSubscriptions = new EventEmitter();
  private interval?: NodeJS.Timer;
  private parser: any;

  constructor(private path: string) {
    this._port = new SerialPort(path, {
      autoOpen: false,
      baudRate: 9600,
      parity: 'even',
      dataBits: 7,
      stopBits: 1,
    });
  }

  on(event: 'bill' | 'event' | 'state' | 'error' | 'open', fn: (...params: any[]) => any) {
    switch (event) {
      case 'bill':
        return this.billsSubscriptions.subscribe(fn);
      case 'event':
        return this.eventsSubscriptions.subscribe(fn);
      case 'state':
        return this.statesSubscriptions.subscribe(fn);
      case 'error':
        return this.errorsSubscriptions.subscribe(fn);
      case 'open':
        return this.openSubscriptions.subscribe(fn);
    }
    return () => {};
  }

  set state(state: APEX_STATE) {
    if (this._state !== state) {
      this._state = state;
      this.stateHistory.set(moment().toISOString(), state);
      this.statesSubscriptions.emit(this.getState(), state);
    }
  }

  set event(event: APEX_EVENT) {
    if (this._event !== event) {
      this._event = event;
      if (event !== APEX_EVENT.NOTHING) {
        this._lastEvent = event;
        this.eventHistory.set(moment().toISOString(), event);
        this.eventsSubscriptions.emit(this.getLastEvent(), event);
      }
    }
  }

  getState(): string {
    return APEX_STATE_STR[this._state] !== undefined ? APEX_STATE_STR[this._state] : APEX_STATE_STR.fallback;
  }

  getLastEvent(): string {
    return APEX_EVENT_STR[this._lastEvent] !== undefined ? APEX_EVENT_STR[this._lastEvent] : APEX_EVENT_STR.fallback;
  }

  processNewBill(data: Buffer) {
    const credit = (data[5] & 0x38) >> 3;
    if (credit != 0) {
      if (data[3] & 0x10) {
        this.billsSubscriptions.emit(credit); // Credit is the id of the bill
      }
    }
  }

  processData(data: Buffer) {
    if (data) {
      this.state = data[3];
      this.event = data[4];
      this.processNewBill(data);
    }
  }

  getMasterMessage() {
    const msg = [...INITIAL_MESSAGE];
    msg[2] = this._ack;
    this._ack ^= 1;
    if (this._state === APEX_STATE.ESCROWED) {
      msg[4] |= 0x20;
    }
    msg[7] = checksum(msg);
    return msg;
  }

  start() {
    this._port.open((err) => {
      if (err) {
        this.errorsSubscriptions.emit(err);
      } else {
        this.openSubscriptions.emit();
      }
    });

    this.parser = this._port.pipe(new ByteLength({length: 11}))

    this.parser.on('data', (data: any) => {
      this.processData(data);
    });

    this.interval = setInterval(() => { this._port.write(this.getMasterMessage()); }, 100);
  }

  stop() {
    this._port.unpipe(this.parser); // TODO: remove data listener

    this._port.close((err) => {
      if (err) {
        this.errorsSubscriptions.emit(err);
      }
    });

    if (this.interval)
      clearInterval(this.interval);

    this.state = APEX_STATE.OFF;
  }
}
