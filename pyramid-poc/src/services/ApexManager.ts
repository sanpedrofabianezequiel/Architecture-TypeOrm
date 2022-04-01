import {Apex} from "../lib";

class ApexManager {
  apex: Apex;

  constructor() {
    this.apex = new Apex('/dev/ttyUSB0');
  }

  on(event: 'bill' | 'event' | 'state' | 'error' | 'open', fn: (...params: any[]) => any) {
    return this.apex.on(event, fn);
  }

  start() {
    this.apex.start();
  }

  stop() {
    this.apex.stop();
  }

  getState() {
    return this.apex.getState();
  }

  getLastEvent() {
    return this.apex.getLastEvent();
  }
}

const instance = new ApexManager();
export {instance as ApexManager};
