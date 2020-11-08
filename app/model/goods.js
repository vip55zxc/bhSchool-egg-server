module.exports = app => {
  const mongoose = app.mongoose
  
  const GoodsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: String, required: true, default: 0.00 },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    createdAt: { type: Date, default: Date.now }
  })

  return mongoose.model('Goods', GoodsSchema)
}