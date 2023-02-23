import { Router } from 'express';
import studentRouter from './Student/router';

export default (): Router => {
  const app = Router();

  //TODO: add routes here...
  app.use('/student', studentRouter);
  return app;
};
