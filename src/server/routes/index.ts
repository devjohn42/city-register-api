import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

const router = Router();

router.get('/', (_, res) => {
  console.log('server running GET');
  return res.send('server running GET');
});

router.post('/test', (req, res) => {
  console.log(req.body);
  console.log('server running POST');
  return res.status(StatusCodes.OK).json(req.body);
});

export { router };