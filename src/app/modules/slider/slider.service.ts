import mongoose from "mongoose";
import { paginateAndSort } from "../../utils/paginateAndSort";
import { formatResultImage } from "../../utils/formatResultImage";
import { sliderModel } from "./slider.model";
import { ISlider } from "./slider.interface";

//Create a Slider into database
const createSliderService = async (sliderData: ISlider, filePath?: string) => {
  const dataToSave = { ...sliderData, filePath };
  const result = await sliderModel.create(dataToSave);
  return result;
};

// Get all Sliders withal pagination
const getAllSliderService = async (
  page?: number,
  limit?: number,
  searchText?: string,
  searchFields?: string[]
) => {
  let results;

  if (page && limit) {
    const query = sliderModel.find();
    const result = await paginateAndSort(
      query,
      page,
      limit,
      searchText,
      searchFields
    );

    result.results = formatResultImage<ISlider>(
      result.results,
      "attachment"
    ) as ISlider[];

    return result;
  } else {
    results = await sliderModel.find().sort({ createdAt: -1 }).exec();

    results = formatResultImage(results, "attachment");

    return {
      results,
    };
  }
};

// Get single Slider
const getSingleSliderService = async (sliderId: number | string) => {
  const queryId =
    typeof sliderId === "string"
      ? new mongoose.Types.ObjectId(sliderId)
      : sliderId;

  const result = await sliderModel.findById(queryId).exec();
  if (!result) {
    throw new Error("Slider not found");
  }

  if (typeof result.attachment === "string") {
    const formattedAttachment = formatResultImage<ISlider>(result.attachment);
    if (typeof formattedAttachment === "string") {
      result.attachment = formattedAttachment;
    }
  }

  return result;
};

//Update single Slider
const updateSingleSliderService = async (
  sliderId: string | number,
  sliderData: ISlider
) => {
  const queryId =
    typeof sliderId === "string"
      ? new mongoose.Types.ObjectId(sliderId)
      : sliderId;

  const result = await sliderModel
    .findByIdAndUpdate(
      queryId,
      { $set: sliderData },
      { new: true, runValidators: true }
    )
    .exec();

  if (!result) {
    throw new Error("Slider not found");
  }

  return result;
};

//Delete single Slider
const deleteSingleSliderService = async (sliderId: string | number) => {
  const queryId =
    typeof sliderId === "string"
      ? new mongoose.Types.ObjectId(sliderId)
      : sliderId;

  const result = await sliderModel.findByIdAndDelete(queryId).exec();

  if (!result) {
    throw new Error("Slider not found");
  }

  return result;
};

//Delete many Slider
const deleteManySlidersService = async (sliderIds: (string | number)[]) => {
  const queryIds = sliderIds.map((id) => {
    if (typeof id === "string" && mongoose.Types.ObjectId.isValid(id)) {
      return new mongoose.Types.ObjectId(id);
    } else if (typeof id === "number") {
      return id;
    } else {
      throw new Error(`Invalid ID format: ${id}`);
    }
  });

  const result = await sliderModel
    .deleteMany({ _id: { $in: queryIds } })
    .exec();

  return result;
};

export const sliderServices = {
  createSliderService,
  getAllSliderService,
  getSingleSliderService,
  updateSingleSliderService,
  deleteSingleSliderService,
  deleteManySlidersService,
};
