module.exports = app => {
  const mongoose = app.mongoose
  const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' },
    createdAt: { type: Date, default: Date.now }
  })
  return mongoose.model('Category', CategorySchema)
}



