const { Schema, model, models } = require("mongoose");

export const ReviewSchema = new Schema({
  asin: { type: String },
  reviews: { type: String },
});

let Review = (models && models.Review) || model("Review", ReviewSchema);

export interface ReviewInt {
  asin: string;
  reviews: string;
}

export default Review;
