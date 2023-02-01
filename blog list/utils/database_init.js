const Blog = require("../models/Blog");
const User = require("../models/User");
const logger = require("./logger");

const initialUsers = [
  {
    username: "root",
    password: "$2a$10$7yp3GSbrgdYN7lMUBpb6o.REZEUYo3eaXUeX7HVOa0X5ibT22y4r.",
    name: "root",
  },
  {
    username: "username",
    password: "$2a$10$7yp3GSbrgdYN7lMUBpb6o.REZEUYo3eaXUeX7HVOa0X5ibT22y4r.",
    name: "user",
  },
];

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

const initialHandler = async () => {
  logger.info("database init start");

  await User.deleteMany({});
  await Blog.deleteMany({});

  const userDocs = initialUsers.map((user) => new User(user));
  const blogDocs = initialBlogs.map((blog, index) => {
    if (index > 2) {
      const blogDoc = new Blog({ ...blog, user: userDocs[0]._id });
      userDocs[0].blogs = userDocs[0].blogs.concat(blogDoc._id);
      return blogDoc;
    }
    const blogDoc = new Blog({ ...blog, user: userDocs[1]._id });
    userDocs[1].blogs = userDocs[1].blogs.concat(blogDoc._id);
    return blogDoc;
  });
  const savedUsers = userDocs.map((user) => user.save());
  const savedBlogs = blogDocs.map((blog) => blog.save());
  await Promise.all(savedUsers);
  await Promise.all(savedBlogs);

  logger.info("database init complete");
};

module.exports = initialHandler;
