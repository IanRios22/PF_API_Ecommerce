import { Schema, model } from "mongoose";

export const productsCollection = "products";

export const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  owner: { type: String, default: "admin" }
});

export const ProductModel = model(productsCollection, productSchema);