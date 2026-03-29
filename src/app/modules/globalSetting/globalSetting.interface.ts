export interface IGlobalSetting {
  name: string;
  description: string;
  businessNumber: string;
  businessAddress: string;
  businessLocation: string;
  businessSlogan: string;
  businessEmail: string;
  businessFacebook: string;
  businessInstagram: string;
  businessTwitter: string;
  businessLinkedin: string;
  businessYoutube: string;
  businessWhatsapp: string;
  businessWorkHours: string;
  primaryColor: string;
  secondaryColor: string;
  logo: string;
  favicon: string;
  aboutBanner: string;
  aboutImage1: string;
  aboutImage2: string;
  serviceBanner: string;
  workBanner: string;
  processBanner: string;
  delivery: string;
  pickupPoint: string;
  paymentTerms: string;
  privacyPolicy: string;
  refundAndReturns: string;
  termsAndConditions: string;
  galleryBanner: string;
  shopBanner: string;
  contactBanner: string;
  blogBanner: string;
  currency: string;
  ssl: boolean;
  status: boolean;
  whyUsImage1: string;
  whyUsImage2: string;
  homeShopImage: string;
  aboutUsDetails1: string[];
  aboutUsDetails2: string[];
  homePageBanner1: string;
  homePageBanner2: string;
  homePageBanner3: string;
  homePageBanner4: string;
}

export const imageFields: (keyof IGlobalSetting)[] = [
  "logo",
  "favicon",
  "aboutBanner",
  "aboutImage1",
  "aboutImage2",
  "serviceBanner",
  "workBanner",
  "galleryBanner",
  "shopBanner",
  "contactBanner",
  "blogBanner",
  "processBanner",
  "whyUsImage1",
  "whyUsImage2",
  "homeShopImage",
  "homePageBanner1",
  "homePageBanner2",
  "homePageBanner3",
  "homePageBanner4",
];
