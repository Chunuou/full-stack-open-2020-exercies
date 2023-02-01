const userRouter = require("express").Router();
const User = require("../models/User");
const bcryptjs = require("bcryptjs");

userRouter.get("/", async (request, response) => {
  const result = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
    id: 1,
  });
  response.json(result);
});

userRouter.post("/", async (request, response) => {
  if (request.body.password.length < 3) {
    return response.status(400).json({ error: "passworn is too short" });
  }

  const password = await bcryptjs.hash(request.body.password, 10);

  const userDoc = new User({
    username: request.body.username,
    password: password,
    name: request.body.name,
  });

  console.log('>>>>', userDoc.toJSON());

  const savedUser = await userDoc.save();

  response.json(savedUser);
});

module.exports = userRouter;
