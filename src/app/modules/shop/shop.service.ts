import mongoose from "mongoose";
import { paginateAndSort } from "../../utils/paginateAndSort";
import { formatResultImage } from "../../utils/formatResultImage";
import { shopModel } from "./shop.model";
import { IShop } from "./shop.interface";

//Create a Shop into database
const createShopService = async (shopData: IShop, filePath?: string) => {
  const dataToSave = { ...shopData, filePath };
  const result = await shopModel.create(dataToSave);
  return result;
};

// Get all Shops withal pagination
const getAllShopService = async (
  page?: number,
  limit?: number,
  searchText?: string,
  searchFields?: string[]
) => {
  let results;

  if (page && limit) {
    const query = shopModel.find();
    const result = await paginateAndSort(
      query,
      page,
      limit,
      searchText,
      searchFields
    );

    result.results = formatResultImage<IShop>(
      result.results,
      "attachment"
    ) as IShop[];

    return result;
  } else {
    results = await shopModel.find().sort({ createdAt: -1 }).exec();

    results = formatResultImage(results, "attachment");

    return {
      results,
    };
  }
};

// Get single Shop
const getSingleShopService = async (shopId: number | string) => {
  const queryId =
    typeof shopId === "string" ? new mongoose.Types.ObjectId(shopId) : shopId;

  const result = await shopModel.findById(queryId).exec();
  if (!result) {
    throw new Error("Shop not found");
  }

  if (typeof result.attachment === "string") {
    const formattedAttachment = formatResultImage<IShop>(result.attachment);
    if (typeof formattedAttachment === "string") {
      result.attachment = formattedAttachment;
    }
  }

  return result;
};

//Update single Shop
const updateSingleShopService = async (
  shopId: string | number,
  shopData: IShop
) => {
  const queryId =
    typeof shopId === "string" ? new mongoose.Types.ObjectId(shopId) : shopId;

  const result = await shopModel
    .findByIdAndUpdate(
      queryId,
      { $set: shopData },
      { new: true, runValidators: true }
    )
    .exec();

  if (!result) {
    throw new Error("Shop not found");
  }

  return result;
};

//Delete single Shop
const deleteSingleShopService = async (shopId: string | number) => {
  const queryId =
    typeof shopId === "string" ? new mongoose.Types.ObjectId(shopId) : shopId;

  const result = await shopModel.findByIdAndDelete(queryId).exec();

  if (!result) {
    throw new Error("Shop not found");
  }

  return result;
};

//Delete many Shop
const deleteManyShopsService = async (shopIds: (string | number)[]) => {
  const queryIds = shopIds.map((id) => {
    if (typeof id === "string" && mongoose.Types.ObjectId.isValid(id)) {
      return new mongoose.Types.ObjectId(id);
    } else if (typeof id === "number") {
      return id;
    } else {
      throw new Error(`Invalid ID format: ${id}`);
    }
  });

  const result = await shopModel.deleteMany({ _id: { $in: queryIds } }).exec();

  return result;
};

export const shopServices = {
  createShopService,
  getAllShopService,
  getSingleShopService,
  updateSingleShopService,
  deleteSingleShopService,
  deleteManyShopsService,
};
