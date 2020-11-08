module.exports = app => {
  const mongoose = app.mongoose
  
  const GgSchema = new mongoose.Schema({
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  })

  return mongoose.model('Gg', GgSchema)
}