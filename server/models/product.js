import mongoose from "mongoose";

const Schema = mongoose.Schema

const productSchema = new Schema({
    product: String,
    category: String,
    type: String,
    price: Number,
    description: String,
    image: String
}, {collection: "products"}, {versionKey: false})

export default mongoose.model('Product', productSchema)