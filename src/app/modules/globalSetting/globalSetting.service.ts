import mongoose from "mongoose";
import path from "path";
import fs from "fs";
import { formatResultImagesForGlobal } from "../../utils/formatResultImage";
import { IGlobalSetting, imageFields } from "./globalSetting.interface";
import { globalSettingModel } from "./globalSetting.model";

const createGlobalSettingService = async (
  globalSettingData: IGlobalSetting,
  filePath?: string,
) => {
  return await globalSettingModel.create({
    ...globalSettingData,
    filePath,
  });
};

const getAllGlobalSettingService = async () => {
  let results = await globalSettingModel.find().lean().exec();

  for (const field of imageFields) {
    results = formatResultImagesForGlobal(results, field);
  }

  return {
    result: results?.[0] ?? null,
  };
};

const deleteFileIfExists = (fileUrl: string, field: string) => {
  try {
    const fileName = path.basename(fileUrl);
    const filePath = path.join(process.cwd(), "uploads", fileName);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (err) {
    console.warn(`Failed to delete previous image for ${field}`);
  }
};

// 🔹 Update
const updateSingleGlobalSettingService = async (
  globalSettingId: string | mongoose.Types.ObjectId,
  globalSettingData: Partial<IGlobalSetting>,
) => {
  const queryId =
    typeof globalSettingId === "string"
      ? new mongoose.Types.ObjectId(globalSettingId)
      : globalSettingId;

  const current = await globalSettingModel.findById(queryId).lean().exec();

  if (!current) {
    throw new Error("Global Setting not found");
  }

  for (const field of imageFields) {
    const prevImage = current[field];
    const newImage = globalSettingData[field];

    if (
      typeof prevImage === "string" &&
      typeof newImage === "string" &&
      prevImage !== newImage
    ) {
      deleteFileIfExists(prevImage, field);
    }
  }

  const updated = await globalSettingModel
    .findByIdAndUpdate(
      queryId,
      { $set: globalSettingData },
      { new: true, runValidators: true },
    )
    .lean()
    .exec();

  if (!updated) {
    throw new Error("Failed to update global setting");
  }

  return updated;
};

export const globalSettingServices = {
  createGlobalSettingService,
  getAllGlobalSettingService,
  updateSingleGlobalSettingService,
};
