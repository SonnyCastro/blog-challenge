if (process.env.NODE_ENV !== "production") require("dotenv").config();

require("../config/");

const { user } = require("firebase-functions/lib/providers/auth");
const Author = require("../models/author"),
  Post = require("../models/post"),
  Comment = require("../models/comment"),
  faker = require("faker"),
  mongoose = require("mongoose");

const dbReset = async () => {
  const collections = Object.keys(mongoose.connection.collections);
  console.log(collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany();
  }

  await Author.countDocuments({}, function (err, count) {
    console.log("Number of authors:", count);
  });
  await Post.countDocuments({}, function (err, count) {
    console.log("Number of posts:", count);
  });
  await Comment.countDocuments({}, function (err, count) {
    console.log("Number of comments:", count);
  });

  const authorArray = [];
  const postArray = [];

  for (let i = 0; i < 10; i++) {
    const author = new Author({
      username: faker.internet.userName(),
      email: faker.internet.exampleEmail(),
      password: faker.internet.password(),
      blogTitle: faker.commerce.productName(),
      blogDescription: `A blog about how to ${faker.company.bs()}. ${faker.lorem.paragraph()}`,
    });
    await author.generateAuthToken();
    authorArray.push(author._id);
    await author.save();
  }

  const paragraphs = () => {
    let content = "";
    for (let i = 0; i < 6; i++) {
      content += `\n\n${faker.lorem.paragraph()}`;
    }
    return content;
  };

  for (let i = 0; i < 40; i++) {
    const post = new Post({
      title: faker.commerce.product(),
      content: `${faker.commerce.productDescription()}${paragraphs()}`,
      author: authorArray[Math.floor(Math.random() * authorArray.length)],
    });
    postArray.push(post._id);
    await post.save();
    const parentAuthor = await Author.findById(post.author);
    parentAuthor.posts.push(post);
    await parentAuthor.save();
  }

  for (let i = 0; i < 200; i++) {
    const toggleAnon = () => {
      const anon = Boolean(Math.round(Math.random()));
      return anon ? "anonymous" : faker.internet.userName();
    };
    const comment = new Comment({
      name: toggleAnon(),
      text: faker.lorem.paragraph(),
      post: postArray[Math.floor(Math.random() * postArray.length)],
    });
    await comment.save();
    const parentPost = await Post.findById(comment.post);
    parentPost.comments.push(comment);
    await parentPost.save();
  }

  await Author.countDocuments({}, function (err, count) {
    console.log("Number of authors:", count);
  });
  await Post.countDocuments({}, function (err, count) {
    console.log("Number of posts:", count);
  });
  await Comment.countDocuments({}, function (err, count) {
    console.log("Number of comments:", count);
  });
};

dbReset();
