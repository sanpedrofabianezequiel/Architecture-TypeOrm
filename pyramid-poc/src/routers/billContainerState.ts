import express from 'express';
import {getRepository} from 'typeorm';
import moment from "moment";
import {BillContainerState} from "../entities/BillContainerState";
import {Bill} from "../entities/Bill";
import {BillContainer} from "../entities/BillContainer";

const router = express.Router();

router.post('/transfer', async (req, res) => {
  const {from, to} = req.body;
  const billContainerStateRepository = getRepository(BillContainerState);
  if (!from || !to) {
    return res.status(400).json({ error: '"from" and "to" required' });
  }

  const fromStates = await billContainerStateRepository.find({
    where: { billContainer: from },
    order: {bill: 'ASC'},
    relations: ['bill', 'billContainer'],
  });
  const toStates = await billContainerStateRepository.find({
    where: { billContainer: to },
    order: {bill: 'ASC'},
    relations: ['bill', 'billContainer'],
  });

  for (const fromState of fromStates) {
    if (+fromState.quantity > 0) {
      let toState = toStates.find(state => state.bill.billId === fromState.bill.billId);
      if (!toState) {
        toState = new BillContainerState();
        toState.bill = new Bill();
        toState.bill.billId = fromState.bill.billId.toString();
        toState.billContainer = new BillContainer();
        toState.billContainer.billContainerId = to;
        toState.quantity = 0;
      }
      toState.quantity += fromState.quantity;
      toState.lastUpdate = moment().toDate();

      await billContainerStateRepository.save(toState);

      fromState.quantity = 0;
      fromState.lastUpdate = moment().toDate();[]
      await billContainerStateRepository.save(fromState);
    }
  }

  res.json({data: {result: 'Operation complete'}, metadata: {}});
});

router.get('/:containerId', async (req, res) => {
  const { containerId } = req.params;
  const billContainerStateRepository = getRepository(BillContainerState);
  const data = await billContainerStateRepository.find({
    where: { billContainer: containerId },
    order: {bill: 'ASC'},
    relations: ['bill', 'billContainer'],
  });
  const response = { data, metadata: {} };
  res.json(response);
});

export {router as billContainerStateRouter};
