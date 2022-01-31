const CourseRepository = require("../repositories/CourseRepository");
const UserRepository = require("../repositories/UserRepository");
const PaymentRepository = require("../repositories/PaymentRepository");
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
      return res.status(200).send(await CourseRepository.getAllCourses());
    } catch (error) {
      return next(error);
    }
  },

  async deleteAllCourses(req, res, next) {
    try {
      await CourseRepository.deleteAllCourses();
      return res.status(200).send(successMsg.delete("all courses"));
    } catch (error) {
      return next(error);
    }
  },

  async getCourseByCourseId(req, res, next) {
    const { courseId } = req.params;
    try {
      return res
        .status(200)
        .send(await CourseRepository.getCourseByCourseId(courseId));
    } catch (error) {
      return next(error);
    }
  },

  async updateCourse(req, res, next) {
    const { courseId } = req.params;
    try {
      //Cnly instructor of this course and admin can update the course
      const { userId, roleId } = req;
      await CourseRepository.isUserAnInstructor(userId, courseId, roleId);

      await CourseRepository.updateCourse(courseId, req.body);

      return res.status(200).send(successMsg.update("course"));
    } catch (error) {
      if (error instanceof ValidationError)
        return next(errMsg.validationError(error));
      return next(error);
    }
  },

  async deleteCourse(req, res, next) {
    const { courseId } = req.params;
    const { userId, roleId } = req;
    try {
     await CourseRepository.isUserAnInstructor(
        userId,
        courseId,
        roleId
      );

      await CourseRepository.deleteCourse(courseId);

      return res.status(200).send(successMsg.delete("course"));
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
        .status(200)
        .send(await CourseRepository.getInstructorsCourses(instructor_id));
    } catch (error) {
      return next(error);
    }
  },
};
