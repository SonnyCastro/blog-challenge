const router = require("express").Router();

// Get current author
router.get("/api/author/me", async (req, res) => res.json(req.user));

// Update current author
router.patch("/api/author/me", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "username",
    "email",
    "password",
    "blogTitle",
    "blogDescription",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation)
    return res.status(400).send({ error: "invalid updates!" });
  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.json(req.user);
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
});

// Delete current author
router.delete("/api/author/me", async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.remove();
    res.clearCookie("jwt");
    res.json({ message: "Account deleted." });
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// Logout current author
router.post("/api/author/logout", async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.clearCookie("jwt");
    res.json({ message: "logged out!" });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

// Logout current user on all devices (clear all tokens)
router.post("/api/author/logoutAll", async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.clearCookie("jwt");
    res.json({ message: "all devices logged out" });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

module.exports = router;
