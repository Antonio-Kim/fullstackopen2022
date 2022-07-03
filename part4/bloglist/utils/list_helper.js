const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((a, b) => {
    return a + b.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  const result = blogs.reduce((a, b) => (a.likes > b.likes ? a : b), {});
  delete result._id;
  delete result.__v;
  delete result.url;
  return result;
};

const mostBlog = (blogs) => {
  const authorsWithBlogs = blogs
    .reduce((author, blogs) => {
      author.push(blogs.author);
      return author;
    }, [])
    .reduce((numberOfBlogs, author) => {
      numberOfBlogs[author]
        ? ++numberOfBlogs[author]
        : (numberOfBlogs[author] = 1);
      return numberOfBlogs;
    }, []);
  const authorWithMostBlogs = (blogs) => {
    let max = 0;
    let author = "";
    for (let authors in blogs) {
      if (blogs[authors] > max) {
        max = blogs[authors];
        author = authors;
      }
    }
    return { author: author, blogs: max };
  };
  return authorWithMostBlogs(authorsWithBlogs);
};

const mostLikes = (blogs) => {
  const authorsWithLikes = blogs
    .map((blog) => ({
      author: blog.author,
      likes: blog.likes,
    }))
    .reduce((a, lines) => {
      a[lines.author] = a[lines.author] || 0;
      a[lines.author] += lines.likes;
      return a;
    }, {});
  const authorWithMostLikes = (blogs) => {
    let likes = 0;
    let author = "";
    for (let authors in blogs) {
      if (blogs[authors] > likes) {
        likes = blogs[authors];
        author = authors;
      }
    }
    return { author: author, likes: likes };
  };
  return authorWithMostLikes(authorsWithLikes);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlog,
  mostLikes,
};
