const CourseRepository = require("../repositories/CourseRepository");
const UserRepository = require("../repositories/UserRepository");
const successMsg = require("../utilities/successMessages");
const errMsg = require("../utilities/errorMessages");

const { ValidationError } = require("sequelize");

module.exports = {
  async addNewCourse(req, res, next) {
    try {
      const { id: instructor_id } = await UserRepository.getIdByUserId(
        req.userId
      );

      const { courseId } = await CourseRepository.addNewCourse({
        ...req.body,
        instructor_id,
      });

      return res.status(201).send({
        ...successMsg.create("course"),
        courseId,
      });
    } catch (error) {
      if (error instanceof ValidationError)
        return next(errMsg.validationError(error));
      return next(error);
    }
  },

  async getAllCourses(req, res, next) {
    try {
      return res.send(await CourseRepository.getAllCourses());
    } catch (error) {
      return next(error);
    }
  },
};
