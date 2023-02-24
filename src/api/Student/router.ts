import { Request, Response, Router } from 'express';
import LoggerInstance from '../../loaders/logger';
import { createStudent, deleteStudent, getStudent } from './controller';
import generateNumID from '../../shared/helper/nanoidHandler';

const studentRouter = Router();

const handleAddStudent = async (req: Request, res: Response) => {
  try {
    const data = { student_id: await generateNumID(), ...req.body };
    const result = await createStudent(data);
    if (result.success) {
      res.status(201).json({ success: true, message: 'Student created successfully' });
    }
  } catch (error) {
    LoggerInstance.error(error);
    res.status(error.status || 500).json({ success: false, message: error.message || 'Something went wrong' });
  }
};

const handleGetStudent = async (req: Request, res: Response) => {
  try {
    const result = await getStudent(parseInt(req.params.id));
    if (result.success) {
      res.status(201).json({ success: true, data: result.data, message: 'Student fetched successfully' });
    }
  } catch (error) {
    LoggerInstance.error(error);
    res.status(error.status || 500).json({ success: false, message: error.message || 'Something went wrong' });
  }
};

const handleDeleteStudent = async (req: Request, res: Response) => {
  try {
    const result = await deleteStudent(parseInt(req.params.id));
    if (result.success) {
      res.status(201).json({ success: true, message: 'Student deleted successfully' });
    }
  } catch (error) {
    LoggerInstance.error(error);
    res.status(error.status || 500).json({ success: false, message: error.message || 'Something went wrong' });
  }
};

studentRouter.post('/add', handleAddStudent);
studentRouter.get('/:id', handleGetStudent);

export default studentRouter;
