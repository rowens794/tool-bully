const { Schema, model, models } = require("mongoose");

export const GenerationSchema = new Schema({
  asin: { type: String },
  product: { type: String },
  generationID: { type: String },
  generationType: { type: String },
  generationInput: { type: String },
  generationOutput: { type: String },
  requires: { type: Array },
});

let Generation =
  (models && models.Generation) || model("Generation", GenerationSchema);

export interface GenerationInt {
  asin: string;
  product: string;
  generationID: string;
  generationType: string;
  generationInput: string;
  generationOutput: string;
  requires: string[];
}

export default Generation;
