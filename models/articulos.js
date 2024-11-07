import mongoose from "mongoose";
const ArticulosSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  image: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
},{
  timestamps:true
});
const articulosSchema = mongoose.model('Articulos', ArticulosSchema);
export default articulosSchema