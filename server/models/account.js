import mongoose from "mongoose";

const Schema = mongoose.Schema

const accountSchema = new Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    phoneNumber: String,
    orders: [Object]
}, {collection: "accounts"}, {versionKey: false})

export default mongoose.model('Account', accountSchema)