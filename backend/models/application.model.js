import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: string,
      enum: ["pending", "accepted", "rejected"],
      default: pending,
    },
  },
  { timeseries: true }
);
export const Application = mongoose.model("Application", applicationSchema);