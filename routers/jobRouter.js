import { Router } from "express";
import {
  validateJobInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";

import { checkForTestUser } from "../middleware/authMiddleware.js";
const router = Router();

import {
  getAllJobs,
  GetSingleJob,
  createJob,
  DeleteJob,
  UpdateJob,
  showStats,
} from "../controllers/jobController.js";
// import { get } from "mongoose";

router
  .route("/")
  .get(getAllJobs)
  .post(checkForTestUser, validateJobInput, createJob);

router.route("/stats").get(showStats);
router
  .route("/:id")
  .get(validateIdParam, GetSingleJob)
  .patch(checkForTestUser, validateJobInput, validateIdParam, UpdateJob)
  .delete(checkForTestUser, validateIdParam, DeleteJob);

export default router;
