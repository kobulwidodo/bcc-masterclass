const { Courses, Users } = require("../models");
const errMsg = require("../utilities/errorMessages");
const { getRandomId } = require("../utilities/getRandomId");

module.exports = {
  async addNewCourse(payload) {
    const courseId = getRandomId(11);

    await Courses.create({ course_id: courseId, ...payload });

    return { courseId };
  },

  async getAllCourses() {
    return await Courses.findAll({
      include: {
        model: Users,
        as: "instructor",
        attributes: ["user_id", "username", "name"],
        //because it's inner join, we need to add this key below
        required: true,
      },
    });
  },

  //Check if user is an instructor
  async isUserAnInstructor(userId, courseId) {
    const check = await Courses.findOne({
      where: { course_id: courseId },
      include: {
        model: Users,
        as: "instructor",
        attributes: ["id"],
        where: { user_id: userId },
      },
      attributes: [],
    });
    if (!check) throw errMsg.unauthorized();
  },

  async deleteAllCourses() {
    await Courses.destroy({ where: {} });
  },

  async getCourseByCourseId(courseId) {
    return await Courses.findOne({ where: { course_id: courseId } });
  },

  async updateCourse(courseId, payload) {
    await Courses.update(payload, { where: { course_id: courseId } });
  },

  async getInstructorsCourses(instructorId) {
    return await Courses.findAll({ where: { instructor_id: instructorId } });
  },
};
