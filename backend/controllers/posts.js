const mongoose = require("mongoose");
const Post = require("../models/post");

const getAll = async (req, res) => {
  try {
    const posts = await Post.find().sort({ _id: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  try {
    const title = new RegExp(searchQuery, "i");
    const posts = await Post.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });
    console.log(searchQuery, tags);
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createOne = async (req, res) => {
  const postdata = req.body;
  const post = new Post({
    ...postdata,
    creator: res.locals.user._id,
    createdAt: new Date().toISOString(),
  });
  try {
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const updateOne = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = { creator, title, body, tags, selectedFile, _id: id };

  await Post.findByIdAndUpdate(id, updatedPost, { new: true });
  res.json(updatedPost);
};

const commentOne = async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);
  post.comments.push(Object.keys(req.body)[0]);

  const updatedPost = await Post.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.json(updatedPost);
};

const likeOne = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const post = await Post.findById(id);
  const index = post.likes.findIndex(id => id === res.locals.user._id);
  if (index === -1) {
    post.likes.push(res.locals.user._id);
  } else {
    post.likes = post.likes.filter(id => id !== res.locals.user._id);
  }
  const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
  console.log(res.locals.user);
  res.json(updatedPost);
};

const deleteOne = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await Post.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
};

module.exports = {
  getAll,
  getOne,
  getBySearch,
  createOne,
  updateOne,
  likeOne,
  commentOne,
  deleteOne,
};
