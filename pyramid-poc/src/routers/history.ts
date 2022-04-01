import express from 'express';
import {getRepository} from 'typeorm';
import {StateHistory} from "../entities/StateHistory";
import {EventHistory} from "../entities/EventHistory";
import {BillHistory} from "../entities/BillHistory";

const router = express.Router();

router.get('/state', async (req, res) => {
  const {limit = 10, offset = 0} = req.query;
  const repository = getRepository(StateHistory);
  const data = await repository.find({relations: ['state'], order: {createdAt: 'DESC'}, take: +limit, skip: +offset });
  const response = {data, metadata: { limit: +limit, offset: +offset, nextOffset: +offset + +limit}};
  res.json(response);
});

router.get('/event', async (req, res) => {
  const {limit = 10, offset = 0} = req.query;
  const repository = getRepository(EventHistory);
  const data = await repository.find({relations: ['event'], order: {createdAt: 'DESC'}, take: +limit, skip: +offset });
  const response = {data, metadata: { limit: +limit, offset: +offset, nextOffset: +offset + +limit}};
  res.json(response);
});

router.get('/bill', async (req, res) => {
  const {limit = 10, offset = 0} = req.query;
  const repository = getRepository(BillHistory);
  const data = await repository.find({relations: ['bill', 'billContainer'], order: {createdAt: 'DESC'}, take: +limit, skip: +offset });
  const response = {data, metadata: { limit: +limit, offset: +offset, nextOffset: +offset + +limit}};
  res.json(response);
});

export {router as historyRouter};
