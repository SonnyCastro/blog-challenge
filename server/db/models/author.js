const mongoose = require("mongoose"),
  jwt = require("jsonwebtoken"),
  bcrypt = require("bcryptjs"),
  Post = require("./post");

const authorSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    blogTitle: {
      type: String,
      trim: true,
    },
    blogDescription: {
      type: String,
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// hide password & tokens for security
authorSchema.methods.toJSON = function () {
  const author = this;
  const authorObject = author.toObject();
  delete authorObject.password;
  delete authorObject.tokens;
  return authorObject;
};

// generate jwt token
authorSchema.methods.generateAuthToken = async function () {
  const author = this;
  const token = jwt.sign(
    { _id: author._id.toString(), name: author.name },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
  author.tokens = author.tokens.concat({ token });
  await author.save();
  return token;
};

// find author by email and password
authorSchema.statics.findByCredentials = async (email, password) => {
  const author = await Author.findOne({ email });
  if (!author) throw new Error("account doesn't exist");
  const isMatch = await bcrypt.compare(password, author.password);
  if (!isMatch) throw new Error("invalid credentials");
  return author;
};

// hash passwords
authorSchema.pre("save", async function (next) {
  const author = this;
  if (author.isModified("password")) {
    author.password = await bcrypt.hash(author.password, 8);
  }
  next();
});

const Author = mongoose.model("Author", authorSchema);
module.exports = Author;
