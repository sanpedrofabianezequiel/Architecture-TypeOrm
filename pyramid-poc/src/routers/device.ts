import express from 'express';
import {ApexManager} from "../services";

const router = express.Router();

const availableActions = ['start', 'stop'];

router.post('/action', async (req, res) => {
  const { body } = req;
  if (!body.action || !availableActions.includes(body.action)) {
    return res.status(400).json({ error: `"action" property must be one of: ${availableActions.join('|')}` });
  }
  const response: { data: any, metadata: any } = { data: {}, metadata: {}};
  switch (body.action) {
    case 'start':
      ApexManager.start();
      response.data.result = 'Device started';
      break;
    case 'stop':
      ApexManager.stop();
      response.data.result = 'Device stopped';
      break;
  }
  res.json(response);
});

router.get('/state', (req, res) => {
  const state = ApexManager.getState();
  const lastEvent = ApexManager.getLastEvent();
  const response = { data: { state, lastEvent }, metadata: {} };
  res.json(response);
});

export {router as deviceRouter};
