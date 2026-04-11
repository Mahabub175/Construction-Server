import express from "express";
import { uploadService } from "../upload/upload";
import { handymanControllers } from "./handyman.controller";

const router = express.Router();

router.post(
  "/handyman/",
  uploadService.single("attachment"),
  handymanControllers.createHandymanController,
);

router.get("/handyman/", handymanControllers.getAllHandymanController);

router.get(
  "/handyman/:handymanId/",
  handymanControllers.getSingleHandymanController,
);

router.patch(
  "/handyman/:handymanId/",
  uploadService.single("attachment"),
  handymanControllers.updateSingleHandymanController,
);

router.delete(
  "/handyman/:handymanId/",
  handymanControllers.deleteSingleHandymanController,
);

router.post(
  "/handyman/bulk-delete/",
  handymanControllers.deleteManyHandymansController,
);

export const handymanRoutes = router;
