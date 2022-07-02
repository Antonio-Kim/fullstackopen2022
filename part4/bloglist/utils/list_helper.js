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
    return { "author": author, "blogs": max };
  };
  return authorWithMostBlogs(authorsWithBlogs);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlog,
};
