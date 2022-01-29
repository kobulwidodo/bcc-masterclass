const courseRouter = require("express").Router();
const CourseController = require("../controllers/CourseController");
const authMid = require("../middlewares/AuthMiddleware");

module.exports = courseRouter
  .post(
    "/",
    authMid.authorizeUser,
    authMid.authorizeRole([3]),
    CourseController.addNewCourse
  )
  .get(
    "/",
    authMid.authorizeUser,
    authMid.authorizeRole([3]),
    CourseController.getAllCourses
  );
