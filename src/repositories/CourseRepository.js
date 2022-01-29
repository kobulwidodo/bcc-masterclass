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
      },
    });
  },

  async deleteAllCourses() {
    await Courses.destroy({ where: {} });
  },

  async getInstructorsCourses(instructorId) {
    return await Courses.findAll({ where: { instructor_id: instructorId } });
  },
};
