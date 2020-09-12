require("./db/config");
const express = require("express"),
  path = require("path"),
  passport = require("./middleware"),
  cookieParser = require("cookie-parser"),
  openRoutes = require("./routes/open"),
  authorRoutes = require("./routes/secure/authors"),
  postRoutes = require("./routes/secure/posts"),
  app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Unauthenticated routes
app.use(openRoutes);

// Serve static files
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

// Authentication Middleware
app.use(
  passport.authenticate("jwt", {
    session: false,
  })
);

// Secure Route
app.use(authorRoutes);
app.use(postRoutes);

// Handle React routing, return all requests to React app
if (process.env.NODE_ENV === "production") {
  app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

module.exports = app;
