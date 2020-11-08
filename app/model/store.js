module.exports = app => {
  const mongoose = app.mongoose
  
  const StoreSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    address: { type: String, required: true },
    phone:{ type: String, required: true },
    open:{ type: Boolean, required: true, default: false },
    createdAt: { type: Date, default: Date.now }
  })

  return mongoose.model('Store', StoreSchema)
}