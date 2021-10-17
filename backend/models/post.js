const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: String,
  body: String,
  creator: String,
  name: String,
  tags: [String],
  selectedFile: String,
  likes: { type: [String], default: [] },
  comments: { type: [String], default: [] },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  comments: {
    type: [String],
    default: [],
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
