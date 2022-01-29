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
    };
  },

  nullValueError(field) {
    return {
      statusCode: 400,
      message: `${field} must be filled`,
    };
  },

  userNotFoundError() {
    return {
      statusCode: 403,
      message: "User not found, please register first",
    };
  },

  invalidPassword() {
    return {
      statusCode: 403,
      message: "Wrong password",
    };
  },

  notLoggedIn() {
    return {
      statusCode: 403,
      message: "You must be logged in to perform this action",
    };
  },

  wrongAccessToken() {
    return {
      statusCode: 403,
      message: "Wrong access token",
    };
  },

  unauthorized() {
    return {
      statusCode: 401,
      message: "You are not authorized to perform this action",
    };
  },

  purchasingFreeCourse() {
    return {
      statusCode: 403,
      message: "You cannot purchase a free course",
    };
  },
};
