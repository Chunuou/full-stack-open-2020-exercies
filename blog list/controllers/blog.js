const blogRouter = require("express").Router();
const Blog = require("../models/Blog");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

blogRouter.get("/", async (request, response) => {
  const reslut = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.send(reslut);
});

blogRouter.post("/", async (request, response) => {
  const token = request.token;
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  if (!token && !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const user = await User.findById(decodedToken.id);

  const blogDoc = new Blog({ ...request.body, user: user._id });
  const savedBlog = await blogDoc.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.json(savedBlog);
});

blogRouter.delete("/:id", async (request, response) => {
  const token = request.token;
  const blogId = request.params.id;
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  if (!token && !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  
  const user = await User.findById(decodedToken.id);
  const blog = await Blog.findById(blogId);

  if (blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  user.blog = user.blogs.filter(
    (blog) => blog.toString() !== blogId
  );
  await user.save();
  await Blog.findByIdAndDelete(blogId);

  response.status(204).end();
});

blogRouter.put("/:id", async (request, response) => {
  const reslut = await Blog.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
  });
  response.json(reslut);
});

module.exports = blogRouter;
