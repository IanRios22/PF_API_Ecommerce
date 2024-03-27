import { Schema, model } from "mongoose";

export const cartSchema = new Schema({
  owner: {type: String},
  products: [
    {
      _id: false,
      quantity: {
        type: Number,
        default: 1
      },
      product: {
        type: Schema.Types.ObjectId,
        ref: "products" // Referencia al modelo de productos
      }
    }
  ]
});

export const CartModel = model("carts", cartSchema);