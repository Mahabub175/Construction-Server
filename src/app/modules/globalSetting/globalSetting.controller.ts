import { NextFunction, Request, Response } from "express";
import { globalSettingServices } from "./globalSetting.service";
import { imageFields } from "./globalSetting.interface";

const extractFilePaths = (files: any) => {
  const fileData: Record<string, string | undefined> = {};

  if (!files) return fileData;

  imageFields.forEach((field) => {
    fileData[field] = files?.[field]?.[0]?.path;
  });

  return fileData;
};

// CREATE
const createGlobalSettingController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;
    const files = req.files as Record<string, Express.Multer.File[]>;

    const filePaths = extractFilePaths(files);

    const formData = {
      ...data,
      ...filePaths,
    };

    const result =
      await globalSettingServices.createGlobalSettingService(formData);

    res.status(200).json({
      success: true,
      message: "Global Setting Created Successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// GET ALL
const getAllGlobalSettingController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await globalSettingServices.getAllGlobalSettingService();

    res.status(200).json({
      success: true,
      message: "Global Settings Fetched Successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE
const updateSingleGlobalSettingController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { globalSettingId } = req.params;
    const data = req.body;

    const files = req.files as Record<string, Express.Multer.File[]>;

    const filePaths = extractFilePaths(files);

    const cleanedFilePaths = Object.fromEntries(
      Object.entries(filePaths).filter(([_, v]) => v !== undefined),
    );

    const globalSettingData = {
      ...data,
      ...cleanedFilePaths,
    };

    const result = await globalSettingServices.updateSingleGlobalSettingService(
      globalSettingId,
      globalSettingData,
    );

    res.status(200).json({
      success: true,
      message: "Global Setting Data Updated Successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const globalSettingControllers = {
  createGlobalSettingController,
  getAllGlobalSettingController,
  updateSingleGlobalSettingController,
};
