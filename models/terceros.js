import mongoose from "mongoose";
const tercerosSchema = new mongoose.Schema({
  name: { type: String, required: true },
  identification: { type: String, required: true, unique: true },
  address: { type: String },
  phone: { type: String },
  email: { type: String },
  type: { type: Number, enum: [1, 2], required: true }, // 1: Cliente, 2: Proveedor
});

export default tercerosSchema