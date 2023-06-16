import express from 'express';
import adminController from '../../../adapters/controllers/adminController';
import { adminRepoMongoDb } from '../../../frameworks/database/mongodb/repositories/adminRepoMongoDb';
import { adminDbRepository } from '../../../app/repositories/adminDbRepository';
import { sendEmailServiceInterface } from '../../../app/services/sendEmailServiceInterface';
import { sendEmailService } from '../../../frameworks/services/sendEmailService';

const adminRouter = () => {
  const router = express.Router();
  const controller = adminController(
    adminDbRepository,
    adminRepoMongoDb,
    sendEmailServiceInterface,
    sendEmailService
  );
  //* Instructor management
  router.get(
    '/instructors/view-instructor-requests',
    controller.getInstructorRequests
  );
  router.patch(
    '/instructors/accept-instructor-request/:instructorId',
    controller.verifyInstructor
  );
  router.put(
    '/instructors/reject-instructor-request',
    controller.rejectRequest
  );
  return router;
};

export default adminRouter;
