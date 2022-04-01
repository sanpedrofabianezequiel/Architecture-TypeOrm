import express from 'express';
import {getRepository} from 'typeorm';
import {Bill} from "../entities/Bill";

const router = express.Router();

router.get('/', async (req, res) => {
  const billRepository = getRepository(Bill);
  const bills = await billRepository.find();
  const response = { data: bills, metadata: {} };
  res.json(response);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const billRepository = getRepository(Bill);
  const bills = await billRepository.findByIds([id]);
  const response = { data: bills, metadata: {} };
  res.json(response);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const billRepository = getRepository(Bill);
  const [bill] = await billRepository.findByIds([id]);
  if (!bill) {
    return res.status(404).json({ error: 'Bill not found' });
  }
  bill.name = body.name;
  bill.value = body.value;
  await billRepository.save(bill);
  const response = { data: [bill], metadata: {} };
  res.json(response);
});

export {router as billRouter};
