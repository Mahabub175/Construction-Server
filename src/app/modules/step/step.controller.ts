import { NextFunction, Request, Response } from "express";
import { stepServices } from "./step.service";

const createStepController = async (
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

    const result = await stepServices.createStepService(formData);

    res.status(200).json({
      success: true,
      message: "Step Created Successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

const getAllStepController = async (
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

    const result = await stepServices.getAllStepService(
      pageNumber,
      pageSize,
      searchText,
      searchFields,
    );

    res.status(200).json({
      success: true,
      message: "Steps Fetched Successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

//Get single step data
const getSingleStepController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { stepId } = req.params;
    const result = await stepServices.getSingleStepService(stepId);
    res.status(200).json({
      success: true,
      message: "Step Fetched Successfully!",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

//Update single step controller
const updateSingleStepController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { stepId } = req.params;
    const data = req.body;
    const filePath = req.file ? req.file.path : undefined;

    const stepData = {
      ...data,
      attachment: filePath,
    };

    const result = await stepServices.updateSingleStepService(stepId, stepData);

    res.status(200).json({
      success: true,
      message: "Step Updated Successfully!",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

//Delete single step controller
const deleteSingleStepController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { stepId } = req.params;
    await stepServices.deleteSingleStepService(stepId);
    res.status(200).json({
      success: true,
      message: "Step Deleted Successfully!",
      data: null,
    });
  } catch (error: any) {
    next(error);
  }
};

//Delete many step controller
const deleteManyStepsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const stepIds = req.body;

    if (!Array.isArray(stepIds) || stepIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid or empty step IDs array provided",
        data: null,
      });
    }

    const result = await stepServices.deleteManyStepsService(stepIds);

    res.status(200).json({
      success: true,
      message: `Bulk step Delete Successful! Deleted ${result.deletedCount} steps.`,
      data: null,
    });
  } catch (error: any) {
    next(error);
  }
};

export const stepControllers = {
  createStepController,
  getAllStepController,
  getSingleStepController,
  updateSingleStepController,
  deleteSingleStepController,
  deleteManyStepsController,
};
