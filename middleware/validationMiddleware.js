import { body, param, validationResult } from "express-validator";
import { BadRequestError, UnauthorizedError } from "../errors/customErrors.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import mongoose from "mongoose";
import Job from "../models/JobModel.js";
import User from "../models/UserModels.js";

import { NotFoundError } from "../errors/customErrors.js";
const withValidateErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessage = errors.array().map((error) => error.msg);
        if (errorMessage[0].startsWith("no job")) {
          throw new NotFoundError(errorMessage);
        }
        if (errorMessage[0].startsWith("not authorized")) {
          throw new UnauthorizedError("not authorized to acess this route");
        }
        // throw new BadRequestError(errorMessage);
      }
      next();
    },
  ];
};

export const validateJobInput = withValidateErrors([
  body("company").notEmpty().withMessage("company is required"),
  body("position").notEmpty().withMessage("position is required"),
  body("jobLocation").notEmpty().withMessage("Job location is required"),
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("invalid status value"),
  body("jobType")
    .isIn(Object.values(JOB_TYPE))
    .withMessage("invalid type value"),
]);

export const validateIdParam = withValidateErrors([
  param("id").custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError("inavlid MongoDB id");
    const job = await Job.findById(value);
    if (!job) throw new NotFoundError(`no job with id ${value}`);
    const isAdmin = req.user.role === "admin";
    const isOwner = req.user.userId === job.createdBy.toString();
    if (!isAdmin && !isOwner)
      throw new UnauthorizedError("Not authorized to acess this route");
  }),
]);

export const validateRegisterInput = withValidateErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) throw new BadRequestError("email already exist");
    }),

  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must atleast 8 characters long"),

  body("location").notEmpty().withMessage("location is required"),
  body("lastName").notEmpty().withMessage("location is required"),
]);

export const validateLoginInput = withValidateErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  body("password").notEmpty().withMessage("password is required"),
]);

export const validateUpdateUserInput = withValidateErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId)
        throw new BadRequestError("email already exist");
    }),
  body("location").notEmpty().withMessage("location is required"),
  body("lastName").notEmpty().withMessage("lastName is required"),
]);
