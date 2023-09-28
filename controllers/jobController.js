import Job from "../models/JobModel.js";
import { StatusCodes } from "http-status-codes";

export const getAllJobs = async (req, res) => {
  console.log(req.user);
  const jobs = await Job.find({});
  res.status(StatusCodes.OK).json({ jobs });
};

export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

export const GetSingleJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  res.status(StatusCodes.OK).json({ job });
};

export const UpdateJob = async (req, res) => {
  const { id } = req.params;
  const updateJob = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  return res.status(StatusCodes.OK).json({ msg: "Modified Job", updateJob });
};

export const DeleteJob = async (req, res) => {
  const { id } = req.params;
  const removedJob = await Job.findByIdAndDelete(id);
  return res.status(StatusCodes.OK).json({ msg: "Deleted Job" });
};
