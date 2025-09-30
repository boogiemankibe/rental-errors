import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    address: { type: String, required: true },
    rentAmount: { type: Number, required: true, min: 1 },
    landlord: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Landlord",
      required: true,
    },
    tenants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tenant" }],
  },
  { timestamps: true }
);

export default mongoose.model("Property", propertySchema);
