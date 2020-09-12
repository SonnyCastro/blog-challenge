const router = require("express").Router(),
  Post = require("../../db/models/post"),
  Author = require("../../db/models/author");

// Create New Post For Current Author
router.post("/api/posts", async (req, res) => {
  const { title, content } = req.body;
  try {
    const newPost = new Post({ title, content, author: req.user._id });
    await newPost.save();
    const author = await Author.findById(newPost.author);
    author.posts.push(newPost._id);
    await author.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// Update Post by ID
router.patch("/api/posts/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["title", "content"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// Delete Post by ID
router.delete("/api/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    await Author.findByIdAndUpdate(req.user._id, {
      $pull: { posts: { $in: [req.params.id] } },
    });
    post.remove();
    res.json(post);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
