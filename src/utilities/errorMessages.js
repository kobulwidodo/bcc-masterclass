module.exports = {
  validationError(err) {
    return {
      statusCode: 400,
      message: err.errors.map((e) =>
        e.validatorKey != "not_unique"
          ? e.message
          : `${e.path} is already exists`
      ),
    };
  },

  confirmPasswordError() {
    return {
      statusCode: 403,
      message: "Password and Confirm Password must be the same",
    }
  }
};
