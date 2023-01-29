const { Schema, model, models } = require("mongoose");

export const ProductSchema = new Schema({
  asin: { type: String },
  product: { type: String },
});

let Product = (models && models.Product) || model("Product", ProductSchema);

export interface ProductInt {
  asin: string;
  product: string;
}

export default Product;
