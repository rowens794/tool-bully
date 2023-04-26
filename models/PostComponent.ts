const { Schema, model, models } = require("mongoose");

export const PostComponentSchema = new Schema({
  title: { type: String },
  shortDesc: { type: String },
  componentID: { type: String },
  componentType: { type: String },
  Prompt: { type: String },
});

let PostComponent =
  (models && models.PostComponent) ||
  model("PostComponent", PostComponentSchema);

export interface PostComponentInt {
  title: { type: String };
  shortDesc: { type: String };
  componentID: { type: String };
  componentType: "Core" | "Custom";
  Prompt: { type: String };
}

export default PostComponent;
