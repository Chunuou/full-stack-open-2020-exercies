const dumy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  let fBlog = blogs[0];

  blogs.forEach((blog) => {
    if (blog.likes > fBlog.likes) {
      fBlog = blog;
    }
  });

  delete fBlog.__v;
  delete fBlog._id;
  delete fBlog.url;

  return fBlog;
};

const mostBlog = (blogs) => {
  const blogMap = new Map();

  blogs.forEach((blog) => {
    if (!blogMap.has(blog.author)) {
      blogMap.set(blog.author, 1);
    } else {
      let blogs = blogMap.get(blog.author);
      blogMap.set(blog.author, (blogs += 1));
    }
  });

  const mostBlog = {
    author: "",
    blogs: 0,
  };

  blogMap.forEach((value, key) => {
    if (value > mostBlog.blogs) {
      mostBlog.author = key;
      mostBlog.blogs = value;
    }
  });

  return mostBlog;
};

const mostLikes = (blogs) => {
  const blogMap = new Map();

  blogs.forEach((blog) => {
    if (!blogMap.has(blog.author)) {
      blogMap.set(blog.author, blog.likes);
    } else {
      let likes = blogMap.get(blog.author) + blog.likes;
      blogMap.set(blog.author, likes);
    }
  });

  const mostLikes = {
    author: "",
    likes: 0,
  };

  blogMap.forEach((value, key) => {
    if (value > mostLikes.likes) {
      mostLikes.author = key;
      mostLikes.likes = value;
    }
  });

  return mostLikes;
};

module.exports = { dumy, totalLikes, favoriteBlog, mostBlog, mostLikes };
