const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/Blog");

const api = supertest(app);

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

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogs = initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogs.map((blog) => blog.save());
  Promise.all(promiseArray);
});

test("blog list length", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(initialBlogs.length);
  // console.log(typeof response.body);
  // const array = response.body;
  // expect(array).toHaveLength(initialBlogs.length);
});

test("blog has property id", async () => {
  const response = await api.get("/api/blogs");
  response.body.forEach((element) => {
    expect(element.id).toBeDefined();
  });
});

test("does blog post success", async () => {
  const blog = {
    title: "blog title",
    author: "blog author",
    url: "blog url",
    likes: 0,
  };
  await api.post("/api/blogs").send(blog);

  const response = await api.get("/api/blogs");
  expect(response.body.length).toBe(initialBlogs.length + 1);
});

test("blogs like is 0", async () => {
  const blog = {
    title: "blog title",
    author: "blog author",
    url: "blog url",
  };

  const response = await api.post("/api/blogs").send(blog);

  expect(response.body.likes).toBe(0);
});

test("blogs title and url are required", async () => {
  const blog = {
    author: "blog author",
  };

  await api.post("/api/blogs").send(blog).expect(400);
});

test("delete blog", async () => {
  await api.delete(`/api/blogs/${initialBlogs[0]._id}`).expect(204);
  expect((await Blog.find({})).length).toBe(initialBlogs.length - 1);
});

test("update blog", async () => {
  const newBlog = {
    id: "5a422a851b54a676234d17f7",
    title: "new title",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  };
  await api.put(`/api/blogs/${initialBlogs[0]._id}`).send(newBlog);
  expect((await Blog.findById(initialBlogs[0]._id)).toJSON()).toEqual(newBlog)
});

afterAll(() => {
  mongoose.connection.close();
});
