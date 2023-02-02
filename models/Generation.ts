const { Schema, model, models } = require("mongoose");

export const GenerationSchema = new Schema({
  asin: { type: String },
  product: { type: String },
  generationID: { type: String },
  generationType: { type: String },
  prompt: { type: String },
  requires: { type: Array },
});

let Generation =
  (models && models.Generation) || model("Generation", GenerationSchema);

export interface GenerationInt {
  generationID: string;
  generationType: string;
  prompt: string;
  requires: string[];
}

export default Generation;
