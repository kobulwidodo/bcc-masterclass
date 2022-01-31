const CourseMaterialRepository = require("../repositories/CourseMaterialRepository");
const CourseTopicRepository = require("../repositories/CourseTopicRepository");
const CourseRepository = require("../repositories/CourseRepository");
const PaymentRepository = require("../repositories/PaymentRepository");
const successMsg = require("../utilities/successMessages");
const errMsg = require("../utilities/errorMessages");

const { ValidationError } = require("sequelize");

module.exports = {
  async addNewMaterial(req, res, next) {
    const { courseId, topicId } = req.params;
    const { userId, roleId } = req;

    try {
      const { id: topicSecretId } = await CourseTopicRepository.getCourseTopic(
        topicId
      );

      await CourseRepository.isUserAnInstructor(userId, courseId, roleId);

      const material = await CourseMaterialRepository.addNewMaterial({
        ...req.body,
        topic_id: topicSecretId,
      });

      return res
        .status(201)
        .send({ ...successMsg.create("course's topic"), courseId, material });
    } catch (error) {
      if (error instanceof ValidationError)
        return next(errMsg.validationError(error));
      return next(error);
    }
  },

  async getTopicMaterials(req, res, next) {
    const { courseId, topicId } = req.params;
    const { userId, roleId } = req;

    try {
      const { id: courseSecretId } = await CourseRepository.getCourseByCourseId(
        courseId
      );

      const isPurchased = await PaymentRepository.getPurchasedOrder(
        courseSecretId,
        userId
      );

      const { id: topicSecretId } = await CourseTopicRepository.getCourseTopic(
        topicId
      );

      const topics = await CourseMaterialRepository.getTopicMaterials(
        topicSecretId,
        isPurchased || roleId == 3
      );

      return res.status(200).send(topics);
    } catch (error) {
      return next(error);
    }
  },

  async deleteAllTopicMaterials(req, res, next) {
    const { courseId, topicId } = req.params;
    const { userId, roleId } = req;

    try {
      await CourseRepository.isUserAnInstructor(userId, courseId, roleId);

      const { id: topicSecretId } = await CourseTopicRepository.getCourseTopic(
        topicId
      );

      await CourseMaterialRepository.deleteAllTopicMaterials(topicSecretId);

      return res.status(200).send(successMsg.delete("all topic's material"));
    } catch (error) {
      return next(error);
    }
  },

  async getMaterialById(req, res, next) {
    const { courseId, materialId } = req.params;
    const { userId, roleId } = req;

    try {
      const { id: courseSecretId } = await CourseRepository.getCourseByCourseId(
        courseId
      );

      const isPurchased = await PaymentRepository.getPurchasedOrder(
        courseSecretId,
        userId
      );
      const topic = await CourseMaterialRepository.getTopicMaterial(
        materialId,
        isPurchased || roleId == 3
      );

      return res.status(200).send(topic);
    } catch (error) {
      return next(error);
    }
  },

  async updateTopicMaterial(req, res, next) {
    const { courseId, materialId } = req.params;
    const { userId, roleId } = req;

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

      return res.status(200).send(successMsg.delete("course's topic"));
    } catch (error) {
      return next(error);
    }
  },
};
