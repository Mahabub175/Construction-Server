import { Schema, model } from "mongoose";

const stepSchema = new Schema(
  {
    order: { type: Number, unique: true },
    heading: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    list: [{ type: String, required: true, trim: true }],
    attachment: { type: String },
    status: { type: Boolean, default: true },
  },
  { timestamps: true },
);

stepSchema.pre("save", async function (next) {
  if (this.order != null) return next();

  const lastStep = await stepModel
    .findOne({})
    .sort({ order: -1 })
    .select("order")
    .lean();

  this.order = lastStep ? (lastStep.order as number) + 1 : 1;
  next();
});

export const stepModel = model("step", stepSchema);
