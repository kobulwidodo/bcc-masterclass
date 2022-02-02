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

    try {
      const { id: courseSecretId } = await CourseRepository.getIdByCourseId(
        courseId
      );
      const topics = await CourseTopicRepository.getCourseTopics(
        courseSecretId
      );

      return res.status(200).send(topics);
    } catch (error) {
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
      return next(error);
    }
  },

  async getTopicById(req, res, next) {
    const { topicId } = req.params;

    try {
      const topic = await CourseTopicRepository.getCourseTopic(topicId);
      return res.status(200).send(topic);
    } catch (error) {
      return next(error);
    }
  },

  async updateCourseTopic(req, res, next) {
    const { courseId, topicId } = req.params;
    const { userId, roleId } = req;
    const { name } = req.body;

    try {
      await CourseRepository.isUserAnInstructor(userId, courseId, roleId);

      await CourseTopicRepository.updateCourseTopic(topicId, name);

      return res.status(200).send(successMsg.update("course's topic"));
    } catch (error) {
      if (error instanceof ValidationError)
        return next(errMsg.validationError(error));
      return next(error);
    }
  },

  async deleteTopicById(req, res, next) {
    const { courseId, topicId } = req.params;
    const { userId, roleId } = req;

    try {
      await CourseRepository.isUserAnInstructor(userId, courseId, roleId);

      await CourseTopicRepository.deleteCourseTopic(topicId);

      return res.status(200).send(successMsg.delete("all course's topic"));
    } catch (error) {
      return next(error);
    }
  }
};
