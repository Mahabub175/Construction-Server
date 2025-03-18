import { Router } from "express";

import { uploadRoutes } from "../modules/upload/upload.route";
import { userRoutes } from "../modules/user/user.route";
import { globalSettingRoutes } from "../modules/globalSetting/globalSetting.route";
import { sliderRoutes } from "../modules/slider/slider.route";
import { newsletterRoutes } from "../modules/newsletter/newsletter.route";

const router = Router();

const routes = [
  uploadRoutes,
  userRoutes,
  globalSettingRoutes,
  sliderRoutes,
  newsletterRoutes,
];

routes.forEach((route) => {
  router.use(route);
});

export default router;
