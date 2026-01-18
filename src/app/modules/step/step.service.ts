import mongoose from "mongoose";
import { paginateAndSort } from "../../utils/paginateAndSort";
import { formatResultImage } from "../../utils/formatResultImage";
import { stepModel } from "./step.model";
import { IStep } from "./step.interface";
import path from "path";
import fs from "fs";

//Create a Step into database
const createStepService = async (stepData: IStep, filePath?: string) => {
  const dataToSave = { ...stepData, filePath };
  const result = await stepModel.create(dataToSave);
  return result;
};

// Get all Steps withal pagination
const getAllStepService = async (
  page?: number,
  limit?: number,
  searchText?: string,
  searchFields?: string[],
) => {
  let results;

  if (page && limit) {
    const query = stepModel.find();
    const result = await paginateAndSort(
      query,
      page,
      limit,
      searchText,
      searchFields,
    );

    result.results = formatResultImage<IStep>(
      result.results,
      "attachment",
    ) as IStep[];

    return result;
  } else {
    results = await stepModel.find().sort({ createdAt: -1 }).exec();

    results = formatResultImage(results, "attachment");

    return {
      results,
    };
  }
};

// Get single Step
const getSingleStepService = async (stepId: number | string) => {
  const queryId =
    typeof stepId === "string" ? new mongoose.Types.ObjectId(stepId) : stepId;

  const result = await stepModel.findById(queryId).exec();
  if (!result) {
    throw new Error("Step not found");
  }

  if (typeof result.attachment === "string") {
    const formattedAttachment = formatResultImage<IStep>(result.attachment);
    if (typeof formattedAttachment === "string") {
      result.attachment = formattedAttachment;
    }
  }

  return result;
};

//Update single Step
const updateSingleStepService = async (
  stepId: string | number,
  stepData: IStep,
) => {
  const queryId =
    typeof stepId === "string" ? new mongoose.Types.ObjectId(stepId) : stepId;

  const step = await stepModel.findById(queryId).exec();

  if (!step) {
    throw new Error("Step not found");
  }

  if (stepData.attachment && step.attachment !== stepData.attachment) {
    const prevFileName = path.basename(step.attachment as string);
    const prevFilePath = path.join(process.cwd(), "uploads", prevFileName);

    if (fs.existsSync(prevFilePath)) {
      try {
        fs.unlinkSync(prevFilePath);
      } catch (err) {
        console.warn(
          `Failed to delete previous attachment for step ${step._id}`,
        );
      }
    } else {
      console.warn(`Previous attachment not found for step ${step._id}`);
    }
  }

  const result = await stepModel
    .findByIdAndUpdate(
      queryId,
      { $set: stepData },
      { new: true, runValidators: true },
    )
    .exec();

  if (!result) {
    throw new Error("Step update failed");
  }

  return result;
};

//Delete single Step
const deleteSingleStepService = async (stepId: string | number) => {
  const queryId =
    typeof stepId === "string" ? new mongoose.Types.ObjectId(stepId) : stepId;

  const step = await stepModel.findById(queryId).exec();

  if (!step) {
    throw new Error("Step not found");
  }

  if (step.attachment) {
    const fileName = path.basename(step.attachment);
    const attachmentPath = path.join(process.cwd(), "uploads", fileName);

    if (fs.existsSync(attachmentPath)) {
      try {
        fs.unlinkSync(attachmentPath);
      } catch (err) {
        throw new Error("Failed to delete attachment file");
      }
    } else {
      throw new Error("Attachment file not found on server");
    }
  }

  const result = await stepModel.findByIdAndDelete(queryId).exec();

  if (!result) {
    throw new Error("Step delete failed");
  }

  return result;
};

//Delete many Step
const deleteManyStepsService = async (stepIds: (string | number)[]) => {
  const queryIds = stepIds.map((id) => {
    if (typeof id === "string" && mongoose.Types.ObjectId.isValid(id)) {
      return new mongoose.Types.ObjectId(id);
    } else if (typeof id === "number") {
      return id;
    } else {
      throw new Error(`Invalid ID format: ${id}`);
    }
  });

  const steps = await stepModel.find({ _id: { $in: queryIds } });

  for (const step of steps) {
    if (step.attachment) {
      const fileName = path.basename(step.attachment);
      const filePath = path.join(process.cwd(), "uploads", fileName);

      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (err) {
          console.warn(`Failed to delete attachment for step ${step._id}`);
        }
      } else {
        console.warn(`Attachment not found for step ${step._id}`);
      }
    }
  }

  const result = await stepModel.deleteMany({ _id: { $in: queryIds } }).exec();

  return result;
};

export const stepServices = {
  createStepService,
  getAllStepService,
  getSingleStepService,
  updateSingleStepService,
  deleteSingleStepService,
  deleteManyStepsService,
};
