const CourseRepository = require("../repositories/CourseRepository");
const CourseTopicRepository = require("../repositories/CourseTopicRepository");
const successMsg = require("../utilities/successMessages");
const errMsg = require("../utilities/errorMessages");

const { ValidationError } = require("sequelize");

module.exports = {
  async addNewTopic(req, res, next) {
    const { courseId } = req.params;
    const { userId, roleId } = req;
    const { name } = req.body;

    try {
      const { id: courseSecretId } = await CourseRepository.isUserAnInstructor(
        userId,
        courseId,
        roleId
      );

      const topic = await CourseTopicRepository.addNewTopic({
        name,
        course_id: courseSecretId,
      });

      return res
        .status(201)
        .send({ ...successMsg.create("course's topic"), topic });
    } catch (error) {
      if (error instanceof ValidationError)
        return next(errMsg.validationError(error));
      return next(error);
    }
  },

  async getCourseTopics(req, res, next) {
    const { courseId } = req.params;
    const { userId, roleId } = req;

    try {
      const { id: courseSecretId } = await CourseRepository.isUserAnInstructor(
        userId,
        courseId,
        roleId
      );

      const topic = await CourseTopicRepository.getCourseTopics(courseSecretId);

      return res.status(201).send(topic);
    } catch (error) {
      if (error instanceof ValidationError)
        return next(errMsg.validationError(error));
      return next(error);
    }
  },

  async deleteAllCourseTopics(req, res, next) {
    const { courseId } = req.params;
    const { userId, roleId } = req;

    try {
      const { id: courseSecretId } = await CourseRepository.isUserAnInstructor(
        userId,
        courseId,
        roleId
      );

      await CourseTopicRepository.deleteAllCourseTopics(courseSecretId);

      return res.status(200).send(successMsg.delete("course's topics"));
    } catch (error) {
      if (error instanceof ValidationError)
        return next(errMsg.validationError(error));
      return next(error);
    }
  },

  async updateCourseTopic(req, res, next) {
    const { courseId } = req.params;
    const { userId, roleId } = req;

    try {
      const { id: courseSecretId } = await CourseRepository.isUserAnInstructor(
        userId,
        courseId,
        roleId
      );

      await CourseTopicRepository.updateCourseTopic({
        title,
        course_id: courseSecretId,
      });

      return res.status(201).send(topic);
    } catch (error) {
      if (error instanceof ValidationError)
        return next(errMsg.validationError(error));
      return next(error);
    }
  },
};
