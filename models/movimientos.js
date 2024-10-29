import mongoose from "mongoose";
const movimientoSchema = new mongoose.Schema({
  type: { type: String, enum: ['entry', 'exit', 'return'], required: true },
  invoiceNumber: { type: String, required: true },
  date: { type: Date, default: Date.now },
  articles: [
    {
      articleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  value: { type: Number, required: true },
  tax: { type: Number, default: 0 },
  total: { type: Number, required: true },
  status: { type: String, enum: ['approved', 'canceled'], default: 'approved' }
});

export default movimientoSchema