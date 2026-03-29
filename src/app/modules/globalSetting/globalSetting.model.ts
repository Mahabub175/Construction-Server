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
      default: "Business Name",
    },
    description: {
      type: String,
      trim: true,
      default: "Business Name Description",
    },
    businessNumber: {
      type: String,
      trim: true,
      default: "Business Name Number",
    },
    businessAddress: {
      type: String,
      trim: true,
      default: "Business Name Address",
    },
    businessLocation: {
      type: String,
      trim: true,
      default: "Business Name Location",
    },
    businessSlogan: {
      type: String,
      trim: true,
      default: "Business Name Slogan",
    },
    businessEmail: {
      type: String,
      trim: true,
      default: "Business Name Email",
    },
    businessFacebook: {
      type: String,
      trim: true,
      default: "Business Name Facebook",
    },
    businessInstagram: {
      type: String,
      trim: true,
      default: "Business Name Instagram",
    },
    businessTwitter: {
      type: String,
      trim: true,
      default: "Business Name Twitter",
    },
    businessLinkedin: {
      type: String,
      trim: true,
      default: "Business Name Linkedin",
    },
    businessYoutube: {
      type: String,
      trim: true,
      default: "Business Name Linkedin",
    },
    businessWhatsapp: {
      type: String,
      trim: true,
      default: "Business Name Whatsapp",
    },
    businessWorkHours: {
      type: String,
      trim: true,
      default: "Business Name Work Hours",
    },
    primaryColor: { type: String, default: "" },
    secondaryColor: { type: String, default: "" },
    logo: { type: String, default: null, trim: true },
    favicon: { type: String, default: null, trim: true },
    aboutBanner: { type: String, default: null, trim: true },
    aboutImage1: { type: String, default: null, trim: true },
    aboutImage2: { type: String, default: null, trim: true },
    serviceBanner: { type: String, default: null, trim: true },
    workBanner: { type: String, default: null, trim: true },
    processBanner: { type: String, default: null, trim: true },
    galleryBanner: { type: String, default: null, trim: true },
    shopBanner: { type: String, default: null, trim: true },
    contactBanner: { type: String, default: null, trim: true },
    blogBanner: { type: String, default: null, trim: true },
    currency: { type: String, default: "৳" },
    delivery: { type: String, default: "" },
    paymentTerms: { type: String, default: "" },
    pickupPoint: { type: String, default: "" },
    privacyPolicy: { type: String, default: "" },
    refundAndReturns: { type: String, default: "" },
    termsAndConditions: { type: String, default: "" },
    ssl: { type: Boolean, default: false },
    status: {
      type: Boolean,
      default: true,
    },
    whyUsImage1: { type: String, default: null, trim: true },
    whyUsImage2: { type: String, default: null, trim: true },
    homeShopImage: { type: String, default: null, trim: true },
    aboutUsDetails1: [{ type: String, trim: true }],
    aboutUsDetails2: [{ type: String, trim: true }],
    homePageBanner1: { type: String, default: null, trim: true },
    homePageBanner2: { type: String, default: null, trim: true },
    homePageBanner3: { type: String, default: null, trim: true },
    homePageBanner4: { type: String, default: null, trim: true },
  },
  { timestamps: true },
);

export const globalSettingModel = model<IGlobalSetting>(
  "globalSetting",
  globalSettingSchema,
);
