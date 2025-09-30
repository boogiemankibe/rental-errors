import mongoose from "mongoose";

const landlordSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true }, // Will be hashed on the server
    paymentDetails: {
      mpesaPaybill: { type: String },
      bankAccount: { type: String },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Landlord", landlordSchema);
