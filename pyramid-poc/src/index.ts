import "reflect-metadata";
import express from 'express';
import bodyParser from 'body-parser';
import {createConnection, getRepository} from "typeorm";
import moment from "moment";
import cors from 'cors';
import {ApexManager} from './services';
import {billContainerStateRouter, billRouter, deviceRouter, historyRouter} from "./routers";
import {BillContainerState} from "./entities/BillContainerState";
import {BILL_CONTAINER} from "./const";
import {Bill} from "./entities/Bill";
import {BillContainer} from "./entities/BillContainer";
import {getStateIdFromValue} from "./const/State";
import {StateHistory} from "./entities/StateHistory";
import {State} from "./entities/State";
import {Event} from "./entities/Event";
import {getEventIdFromValue} from "./const/Event";
import {EventHistory} from "./entities/EventHistory";

(async () => {
  try {
    await createConnection();
  } catch (e) {
    console.log('Error connecting DB', e);
  }
})();

ApexManager.on('open', () => console.log('OPEN'));
ApexManager.on('state', async (state, stateValue) => {
  console.log('State', state);
  const stateId = getStateIdFromValue(stateValue);
  const history = new StateHistory();
  history.state = new State();
  history.state.stateId = stateId.toString();

  const repository = getRepository(StateHistory);
  await repository.save(history);
});

ApexManager.on('event', async (event, eventValue) => {
  console.log('Event', event);
  const eventId = getEventIdFromValue(eventValue);
  const history = new EventHistory();
  history.event = new Event();
  history.event.eventId = eventId.toString();

  const repository = getRepository(EventHistory);
  await repository.save(history);
});

ApexManager.on('bill', async(billId: number) => {
  const repository = getRepository(BillContainerState);
  let [state] = await repository.find({ where: { billContainer: BILL_CONTAINER.APEX_CONTAINER, bill: billId } });
  if (!state) {
    state = new BillContainerState();
    state.bill = new Bill();
    state.bill.billId = billId.toString();
    state.billContainer = new BillContainer();
    state.billContainer.billContainerId = BILL_CONTAINER.APEX_CONTAINER.toString();
    state.quantity = 0;
  }
  state.quantity += 1;
  state.lastUpdate = moment().toDate();
  await repository.save(state);
});

const app = express();
const port = 9099;

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/bill', billRouter);
app.use('/bill_container_state', billContainerStateRouter);
app.use('/device', deviceRouter);
app.use('/history', historyRouter);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
