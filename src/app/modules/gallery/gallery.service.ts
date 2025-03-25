import mongoose from "mongoose";
import { paginateAndSort } from "../../utils/paginateAndSort";
import { formatResultImage } from "../../utils/formatResultImage";
import { galleryModel } from "./gallery.model";
import { IGallery } from "./gallery.interface";

//Create a Gallery into database
const createGalleryService = async (
  galleryData: IGallery,
  filePath?: string
) => {
  const dataToSave = { ...galleryData, filePath };
  const result = await galleryModel.create(dataToSave);
  return result;
};

// Get all Gallerys withal pagination
const getAllGalleryService = async (
  page?: number,
  limit?: number,
  searchText?: string,
  searchFields?: string[]
) => {
  let results;

  if (page && limit) {
    const query = galleryModel.find();
    const result = await paginateAndSort(
      query,
      page,
      limit,
      searchText,
      searchFields
    );

    result.results = formatResultImage<IGallery>(
      result.results,
      "attachment"
    ) as IGallery[];

    return result;
  } else {
    results = await galleryModel.find().sort({ createdAt: -1 }).exec();

    results = formatResultImage(results, "attachment");

    return {
      results,
    };
  }
};

// Get single Gallery
const getSingleGalleryService = async (galleryId: number | string) => {
  const queryId =
    typeof galleryId === "string"
      ? new mongoose.Types.ObjectId(galleryId)
      : galleryId;

  const result = await galleryModel.findById(queryId).exec();
  if (!result) {
    throw new Error("Gallery not found");
  }

  if (typeof result.attachment === "string") {
    const formattedAttachment = formatResultImage<IGallery>(result.attachment);
    if (typeof formattedAttachment === "string") {
      result.attachment = formattedAttachment;
    }
  }

  return result;
};

//Update single Gallery
const updateSingleGalleryService = async (
  galleryId: string | number,
  galleryData: IGallery
) => {
  const queryId =
    typeof galleryId === "string"
      ? new mongoose.Types.ObjectId(galleryId)
      : galleryId;

  const result = await galleryModel
    .findByIdAndUpdate(
      queryId,
      { $set: galleryData },
      { new: true, runValidators: true }
    )
    .exec();

  if (!result) {
    throw new Error("Gallery not found");
  }

  return result;
};

//Delete single Gallery
const deleteSingleGalleryService = async (galleryId: string | number) => {
  const queryId =
    typeof galleryId === "string"
      ? new mongoose.Types.ObjectId(galleryId)
      : galleryId;

  const result = await galleryModel.findByIdAndDelete(queryId).exec();

  if (!result) {
    throw new Error("Gallery not found");
  }

  return result;
};

//Delete many Gallery
const deleteManyGalleryService = async (galleryIds: (string | number)[]) => {
  const queryIds = galleryIds.map((id) => {
    if (typeof id === "string" && mongoose.Types.ObjectId.isValid(id)) {
      return new mongoose.Types.ObjectId(id);
    } else if (typeof id === "number") {
      return id;
    } else {
      throw new Error(`Invalid ID format: ${id}`);
    }
  });

  const result = await galleryModel
    .deleteMany({ _id: { $in: queryIds } })
    .exec();

  return result;
};

export const galleryServices = {
  createGalleryService,
  getAllGalleryService,
  getSingleGalleryService,
  updateSingleGalleryService,
  deleteSingleGalleryService,
  deleteManyGalleryService,
};
