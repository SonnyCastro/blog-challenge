const router = require("express").Router(),
  jwt = require("jsonwebtoken"),
  Author = require("../../db/models/author"),
  Post = require("../../db/models/post"),
  Comment = require("../../db/models/comment");

// GET AUTHORS
router.get("/api/authors", async (req, res) => {
  try {
    const authors = await Author.find();
    if (!authors) {
      res.sendStatus(404);
    } else {
      res.status(200).json(authors);
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

//GET AUTHOR BY ID
router.get("/api/authors/:id", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      res.sendStatus(404);
    } else {
      res.status(200).json(author);
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

// CREATE NEW AUTHOR
router.post("/api/authors/", async (req, res) => {
  const { username, email, password } = req.body;
  let author = await Author.findOne({ email });
  if (author) res.status(409).send("that email has already been used");
  try {
    author = new Author({
      username,
      email,
      password,
    });
    const token = await author.generateAuthToken();
    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "Strict",
      secure: process.env.NODE_ENV !== "production" ? false : true,
    });
    res.status(201).json(author);
  } catch (error) {
    res.status(401).json({ error: error.toString() });
  }
});

// AUTHOR LOGIN
router.post("/api/author/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const author = await Author.findByCredentials(email, password);
    const token = await author.generateAuthToken();
    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "Strict",
      secure: process.env.NODE_ENV !== "production" ? false : true,
    });
    res.json(author);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

// GET POSTS
router.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    if (!posts) {
      res.sendStatus(404);
    } else {
      res.status(200).json(posts);
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

// GET POST BY ID
router.get("/api/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.sendStatus(404);
    } else {
      res.status(200).json(post);
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

// GET POSTS BY AUTHOR ID
router.get("/api/authors/:id/posts", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      res.sendStatus(404);
    } else {
      const posts = await Post.find({ "_id": { $in: author.posts } });
      res.status(200).json(posts);
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

// GET COMMENTS BY POST ID
router.get("/api/posts/:id/comments", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.sendStatus(404);
    } else {
      const comments = await Comment.find({ "_id": { $in: post.comments } });
      res.status(200).json(comments);
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

// ADD COMMENT TO POST
router.post("/api/posts/:id/comments", async (req, res) => {
  const { text } = req.body;
  const name = req.body.name || "anonymous";
  try {
    const newComment = new Comment({ name, text, post: req.params.id });
    await newComment.save();
    const post = await Post.findById(newComment.post);
    post.comments.push(newComment._id);
    await post.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
