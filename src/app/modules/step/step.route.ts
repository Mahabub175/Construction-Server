import express from "express";
import { uploadService } from "../upload/upload";
import { stepControllers } from "./step.controller";

const router = express.Router();

router.post(
  "/step/",
  uploadService.single("attachment"),
  stepControllers.createStepController,
);

router.get("/step/", stepControllers.getAllStepController);

router.get("/step/:stepId/", stepControllers.getSingleStepController);

router.patch(
  "/step/:stepId/",
  uploadService.single("attachment"),
  stepControllers.updateSingleStepController,
);

router.delete("/step/:stepId/", stepControllers.deleteSingleStepController);

router.post("/step/bulk-delete/", stepControllers.deleteManyStepsController);

export const stepRoutes = router;
