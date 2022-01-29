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
      return res.status(201).send(await CourseRepository.getAllCourses());
    } catch (error) {
      return next(error);
    }
  },

  async deleteAllCourses(req, res, next) {
    try {
      await CourseRepository.deleteAllCourses();
      return res.status(201).send(successMsg.delete("all courses"));
    } catch (error) {
      return next(error);
    }
  },

  async getInstructorsCourses(req, res, next) {
    const { instructorId } = req.params;
    try {
      const { id: instructor_id } = await UserRepository.getIdByUserId(
        instructorId
      );
      return res
        .status(201)
        .send(await CourseRepository.getInstructorsCourses(instructor_id));
    } catch (error) {
      return next(error);
    }
  },
};
