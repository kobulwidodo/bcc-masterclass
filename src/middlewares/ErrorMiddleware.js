module.exports = {
  notFound(_, res) {
    res.status(404).send({ error: "Not Found :(" });
  },
  errorHandler(err, req, res, next) {
    console.error(err);
    res
      .status(err.statusCode || 500)
      .json({ error: err.message || "Internal Server Error" });
  },
};
