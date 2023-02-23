import { Request, Response, Router } from 'express';
import LoggerInstance from '../../loaders/logger';
import { createStudent } from './controller';

const studentRouter = Router();

const handleAddStudent = async (req: Request, res: Response) => {
  try {
    const result = await createStudent(req.body);
    if (result.success) {
      res.status(201).json({ success: true, message: 'Student created successfully' });
    }
  } catch (error) {
    LoggerInstance.error(error);
    res.status(error.status || 500).json({ success: false, message: error.message || 'Something went wrong' });
  }
};

studentRouter.post('/add', handleAddStudent);

export default studentRouter;
