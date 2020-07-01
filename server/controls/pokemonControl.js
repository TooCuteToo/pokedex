const sendView = (res, file) => {
  const value = {
    style: `/style/${file}.css`,
    script: `/script/${file}.js`,
  };
  res.render(file, value);
};

module.exports = {
  sendView,
};
