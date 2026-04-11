import { Schema, model } from "mongoose";
import { IHandyman } from "./handyman.interface";

const handymanSchema = new Schema<IHandyman>(
  {
    name: { type: String, required: true },
    description: { type: String },
    attachment: { type: String, required: true },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const handymanModel = model<IHandyman>("handyman", handymanSchema);
