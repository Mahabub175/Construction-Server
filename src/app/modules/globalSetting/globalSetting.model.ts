import { model, Schema } from "mongoose";
import { IGlobalSetting } from "./globalSetting.interface";

const categorySchema = new Schema({
  categories: [{ type: Schema.Types.ObjectId, ref: "category" }],
  multiple: { type: Boolean, default: false },
});

const globalSettingSchema = new Schema<IGlobalSetting>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      default: "Viscart",
    },
    description: {
      type: String,
      trim: true,
      default: "Viscart Description",
    },
    businessNumber: {
      type: String,
      trim: true,
      default: "Viscart Number",
    },
    businessAddress: {
      type: String,
      trim: true,
      default: "Viscart Address",
    },
    businessLocation: {
      type: String,
      trim: true,
      default: "Viscart Location",
    },
    businessSlogan: {
      type: String,
      trim: true,
      default: "Viscart Slogan",
    },
    businessEmail: {
      type: String,
      trim: true,
      default: "Viscart Email",
    },
    businessFacebook: {
      type: String,
      trim: true,
      default: "Viscart Facebook",
    },
    businessInstagram: {
      type: String,
      trim: true,
      default: "Viscart Instagram",
    },
    businessTwitter: {
      type: String,
      trim: true,
      default: "Viscart Twitter",
    },
    businessLinkedin: {
      type: String,
      trim: true,
      default: "Viscart Linkedin",
    },
    businessYoutube: {
      type: String,
      trim: true,
      default: "Viscart Linkedin",
    },
    businessWhatsapp: {
      type: String,
      trim: true,
      default: "Viscart Whatsapp",
    },
    businessWorkHours: {
      type: String,
      trim: true,
      default: "Viscart Work Hours",
    },
    primaryColor: { type: String, default: "" },
    secondaryColor: { type: String, default: "" },
    logo: { type: String, default: "" },
    favicon: { type: String, default: "" },
    currency: { type: String, default: "BDT" },
    ssl: { type: Boolean, default: false },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const globalSettingModel = model<IGlobalSetting>(
  "globalSetting",
  globalSettingSchema
);
