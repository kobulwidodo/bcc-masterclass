const { Courses, Users, CourseTopics } = require("../models");
const errMsg = require("../utilities/errorMessages");
const { getRandomId } = require("../utilities/getRandomId");

module.exports = {
  async addNewTopic(payload) {
    const topicId = getRandomId(12);

    const topic = await CourseTopics.create({ topic_id: topicId, ...payload });

    return topic;
  },

  async getCourseTopics(courseSecretId) {
    return await CourseTopics.findAll({
      where: { course_id: courseSecretId },
      attributes: ["topic_id", "name"],
    });
  },

  async updateCourseTopic(topicId, name) {
    await CourseTopics.update({ name }, { where: { topic_id: topicId } });
  },

  async deleteAllCourseTopics(courseSecretId) {
    await CourseTopics.destroy({ where: { course_id: courseSecretId } });
  },

  async deleteCourseTopic(topicId) {
    await CourseTopics.destroy({ where: { topic_id: topicId } });
  },

  async getCourseTopic(topicId) {
    const topic = await CourseTopics.findOne({ where: { topic_id: topicId } });

    if (!topic) throw errMsg.notFound("Topic");
    return topic;
  },
};
