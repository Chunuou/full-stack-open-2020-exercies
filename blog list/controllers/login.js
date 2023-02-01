const jst = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const loginRouter = require("express").Router();
const User = require("../models/User");

loginRouter.post("/", async (request, response) => {
  const body = request.body;

  const user = await User.findOne({ username: body.username });
  const passwordCorrect =
    user === null
      ? false
      : await bcryptjs.compare(body.password, user.password);
  if (!user === passwordCorrect) {
    return response.status(400).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jst.sign(userForToken, process.env.TOKEN_SECRET);

  response
    .status(200)
    .json({ token, username: user.username, name: user.name, id: user.id });
});

module.exports = loginRouter;
