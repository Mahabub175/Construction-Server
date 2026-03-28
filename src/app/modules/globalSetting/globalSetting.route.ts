import express from "express";
import { uploadService } from "../upload/upload";
import { globalSettingControllers } from "./globalSetting.controller";
import { imageFields } from "./globalSetting.interface";

const router = express.Router();

const uploadFields = imageFields.map((field) => ({
  name: field as string,
  maxCount: 1,
}));

router.post(
  "/global-setting/",
  uploadService.fields(uploadFields),
  globalSettingControllers.createGlobalSettingController,
);

router.get(
  "/global-setting/",
  globalSettingControllers.getAllGlobalSettingController,
);

router.patch(
  "/global-setting/:globalSettingId/",
  uploadService.fields(uploadFields),
  globalSettingControllers.updateSingleGlobalSettingController,
);

export const globalSettingRoutes = router;
