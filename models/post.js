import { Schema, model } from "mongoose";
const Post = model(
  "Post",
  new Schema({
    title: {
      type: Schema.Types.String,
      required: [true, "Post must have title"],
    },
    body: {
      type: Schema.Types.String,
      required: [true, "Post must have body"],
    },
  })
);
export default Post;
