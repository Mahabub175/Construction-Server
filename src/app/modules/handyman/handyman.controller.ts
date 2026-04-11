import { NextFunction, Request, Response } from "express";
import { handymanServices } from "./handyman.service";

const createHandymanController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;

    const filePath = req.file ? req.file.path : undefined;

    const formData = {
      ...data,
      attachment: filePath,
    };

    const result = await handymanServices.createHandymanService(formData);

    res.status(200).json({
      success: true,
      message: "Handyman Created Successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

const getAllHandymanController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { page, limit } = req.query;

    const pageNumber = page ? parseInt(page as string, 10) : undefined;
    const pageSize = limit ? parseInt(limit as string, 10) : undefined;

    const searchText = req.query.searchText as string | undefined;

    const searchFields = ["name", "description"];

    const result = await handymanServices.getAllHandymanService(
      pageNumber,
      pageSize,
      searchText,
      searchFields,
    );

    res.status(200).json({
      success: true,
      message: "Handymans Fetched Successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

//Get single handyman data
const getSingleHandymanController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { handymanId } = req.params;
    const result = await handymanServices.getSingleHandymanService(handymanId);
    res.status(200).json({
      success: true,
      message: "Handyman Fetched Successfully!",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

//Update single handyman controller
const updateSingleHandymanController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { handymanId } = req.params;
    const data = req.body;
    const filePath = req.file ? req.file.path : undefined;

    const handymanData = {
      ...data,
      attachment: filePath,
    };

    const result = await handymanServices.updateSingleHandymanService(
      handymanId,
      handymanData,
    );

    res.status(200).json({
      success: true,
      message: "Handyman Updated Successfully!",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

//Delete single handyman controller
const deleteSingleHandymanController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { handymanId } = req.params;
    await handymanServices.deleteSingleHandymanService(handymanId);
    res.status(200).json({
      success: true,
      message: "Handyman Deleted Successfully!",
      data: null,
    });
  } catch (error: any) {
    next(error);
  }
};

//Delete many handyman controller
const deleteManyHandymansController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const handymanIds = req.body;

    if (!Array.isArray(handymanIds) || handymanIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid or empty handyman IDs array provided",
        data: null,
      });
    }

    const result =
      await handymanServices.deleteManyHandymansService(handymanIds);

    res.status(200).json({
      success: true,
      message: `Bulk handyman Delete Successful! Deleted ${result.deletedCount} handymans.`,
      data: null,
    });
  } catch (error: any) {
    next(error);
  }
};

export const handymanControllers = {
  createHandymanController,
  getAllHandymanController,
  getSingleHandymanController,
  updateSingleHandymanController,
  deleteSingleHandymanController,
  deleteManyHandymansController,
};
