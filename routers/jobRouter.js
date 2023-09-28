import { Router } from "express";
import {
  validateJobInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";
const router = Router();

import {
  getAllJobs,
  GetSingleJob,
  createJob,
  DeleteJob,
  UpdateJob,
} from "../controllers/jobController.js";
// import { get } from "mongoose";

router.route("/").get(getAllJobs).post(validateJobInput, createJob);
router
  .route("/:id")
  .get(validateIdParam, GetSingleJob)
  .patch(validateJobInput, validateIdParam, UpdateJob)
  .delete(validateIdParam, DeleteJob);

export default router;
