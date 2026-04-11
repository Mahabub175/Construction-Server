import mongoose from "mongoose";
import { paginateAndSort } from "../../utils/paginateAndSort";
import { formatResultImage } from "../../utils/formatResultImage";
import { handymanModel } from "./handyman.model";
import { IHandyman } from "./handyman.interface";
import path from "path";
import fs from "fs";

//Create a Handyman into database
const createHandymanService = async (
  handymanData: IHandyman,
  filePath?: string,
) => {
  const dataToSave = { ...handymanData, filePath };
  const result = await handymanModel.create(dataToSave);
  return result;
};

// Get all Handymans withal pagination
const getAllHandymanService = async (
  page?: number,
  limit?: number,
  searchText?: string,
  searchFields?: string[],
) => {
  let results;

  if (page && limit) {
    const query = handymanModel.find();
    const result = await paginateAndSort(
      query,
      page,
      limit,
      searchText,
      searchFields,
    );

    result.results = formatResultImage<IHandyman>(
      result.results,
      "attachment",
    ) as IHandyman[];

    return result;
  } else {
    results = await handymanModel.find().sort({ createdAt: -1 }).exec();

    results = formatResultImage(results, "attachment");

    return {
      results,
    };
  }
};

// Get single Handyman
const getSingleHandymanService = async (handymanId: number | string) => {
  const queryId =
    typeof handymanId === "string"
      ? new mongoose.Types.ObjectId(handymanId)
      : handymanId;

  const result = await handymanModel.findById(queryId).exec();
  if (!result) {
    throw new Error("Handyman not found");
  }

  if (typeof result.attachment === "string") {
    const formattedAttachment = formatResultImage<IHandyman>(result.attachment);
    if (typeof formattedAttachment === "string") {
      result.attachment = formattedAttachment;
    }
  }

  return result;
};

//Update single Handyman
const updateSingleHandymanService = async (
  handymanId: string | number,
  handymanData: IHandyman,
) => {
  const queryId =
    typeof handymanId === "string"
      ? new mongoose.Types.ObjectId(handymanId)
      : handymanId;

  const handyman = await handymanModel.findById(queryId).exec();

  if (!handyman) {
    throw new Error("Handyman not found");
  }

  if (
    handymanData.attachment &&
    handyman.attachment !== handymanData.attachment
  ) {
    const prevFileName = path.basename(handyman.attachment);
    const prevFilePath = path.join(process.cwd(), "uploads", prevFileName);

    if (fs.existsSync(prevFilePath)) {
      try {
        fs.unlinkSync(prevFilePath);
      } catch (err) {
        console.warn(
          `Failed to delete previous attachment for handyman ${handyman._id}`,
        );
      }
    } else {
      console.warn(
        `Previous attachment not found for handyman ${handyman._id}`,
      );
    }
  }

  const result = await handymanModel
    .findByIdAndUpdate(
      queryId,
      { $set: handymanData },
      { new: true, runValidators: true },
    )
    .exec();

  if (!result) {
    throw new Error("Handyman update failed");
  }

  return result;
};

//Delete single Handyman
const deleteSingleHandymanService = async (handymanId: string | number) => {
  const queryId =
    typeof handymanId === "string"
      ? new mongoose.Types.ObjectId(handymanId)
      : handymanId;

  const handyman = await handymanModel.findById(queryId).exec();

  if (!handyman) {
    throw new Error("Handyman not found");
  }

  if (handyman.attachment) {
    const fileName = path.basename(handyman.attachment);
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

  const result = await handymanModel.findByIdAndDelete(queryId).exec();

  if (!result) {
    throw new Error("Handyman delete failed");
  }

  return result;
};

//Delete many Handyman
const deleteManyHandymansService = async (handymanIds: (string | number)[]) => {
  const queryIds = handymanIds.map((id) => {
    if (typeof id === "string" && mongoose.Types.ObjectId.isValid(id)) {
      return new mongoose.Types.ObjectId(id);
    } else if (typeof id === "number") {
      return id;
    } else {
      throw new Error(`Invalid ID format: ${id}`);
    }
  });

  const handymans = await handymanModel.find({ _id: { $in: queryIds } });

  for (const handyman of handymans) {
    if (handyman.attachment) {
      const fileName = path.basename(handyman.attachment);
      const filePath = path.join(process.cwd(), "uploads", fileName);

      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (err) {
          console.warn(
            `Failed to delete attachment for handyman ${handyman._id}`,
          );
        }
      } else {
        console.warn(`Attachment not found for handyman ${handyman._id}`);
      }
    }
  }

  const result = await handymanModel
    .deleteMany({ _id: { $in: queryIds } })
    .exec();

  return result;
};

export const handymanServices = {
  createHandymanService,
  getAllHandymanService,
  getSingleHandymanService,
  updateSingleHandymanService,
  deleteSingleHandymanService,
  deleteManyHandymansService,
};
