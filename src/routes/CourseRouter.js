const courseRouter = require("express").Router();
const CourseController = require("../controllers/CourseController");
const CourseTopicController = require("../controllers/CourseTopicController");
const CourseMaterialController = require("../controllers/CourseMaterialController");
const authMid = require("../middlewares/AuthMiddleware");

module.exports = courseRouter
  .post(
    "/",
    authMid.authorizeLogin,
    authMid.authorizeRole([3]),
    CourseController.addNewCourse
  )
  .get("/", authMid.authorizeLogin, CourseController.getAllCourses)
  .delete(
    "/",
    authMid.authorizeLogin,
    authMid.authorizeRole([1]),
    CourseController.deleteAllCourses
  )
  .get(
    "/:courseId",
    authMid.authorizeLogin,
    CourseController.getCourseByCourseId
  )
  .put("/:courseId", authMid.authorizeLogin, CourseController.updateCourse)
  .delete("/:courseId", authMid.authorizeLogin, CourseController.deleteCourse)
  .get(
    "/instructor/:instructorId",
    authMid.authorizeLogin,
    CourseController.getInstructorsCourses
  )
  .get(
    "/users/:userId",
    authMid.authorizeLogin,
    CourseController.getUserCourses
  )
  .post(
    "/:courseId/topics",
    authMid.authorizeLogin,
    authMid.authorizeRole([3]),
    CourseTopicController.addNewTopic
  )
  .get(
    "/:courseId/topics",
    authMid.authorizeLogin,
    CourseTopicController.getCourseTopics
  )
  .delete(
    "/:courseId/topics",
    authMid.authorizeLogin,
    authMid.authorizeRole([3]),
    CourseTopicController.deleteAllCourseTopics
  )
  .get(
    "/:courseId/topics/:topicId",
    authMid.authorizeLogin,
    CourseTopicController.getTopicById
  )
  .put(
    "/:courseId/topics/:topicId",
    authMid.authorizeLogin,
    CourseTopicController.updateCourseTopic
  )
  .delete(
    "/:courseId/topics/:topicId",
    authMid.authorizeLogin,
    CourseTopicController.deleteTopicById
  )
  .post(
    "/:courseId/topics/:topicId/materials",
    authMid.authorizeLogin,
    CourseMaterialController.addNewMaterial
  )
  .get(
    "/:courseId/topics/:topicId/materials",
    authMid.authorizeLogin,
    CourseMaterialController.getTopicMaterials
  )
  .delete(
    "/:courseId/topics/:topicId/materials",
    authMid.authorizeLogin,
    CourseMaterialController.deleteAllTopicMaterials
  )
  .get(
    "/:courseId/topics/:topicId/materials/:materialId",
    authMid.authorizeLogin,
    CourseMaterialController.getMaterialById
  )
  .put(
    "/:courseId/topics/:topicId/materials/:materialId",
    authMid.authorizeLogin,
    CourseMaterialController.updateTopicMaterial
  )
  .delete(
    "/:courseId/topics/:topicId/materials/:materialId",
    authMid.authorizeLogin,
    CourseMaterialController.deleteMaterialById
  );
