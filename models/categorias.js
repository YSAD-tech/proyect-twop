import mongoose from "mongoose";
const categoriasSchema = new mongoose.Schema({
  description: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
});
export default categoriasSchema

