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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
