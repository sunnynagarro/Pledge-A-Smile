const sendError = (code, error, req, res) => {
  res.status(code);
  throw new Error(error);
};

module.exports = sendError;
