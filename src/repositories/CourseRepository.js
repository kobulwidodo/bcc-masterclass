const { Courses } = require("../models");
const errMsg = require("../utilities/errorMessages");
const { getRandomId } = require("../utilities/getRandomId");

module.exports = {
  async addNewCourse(payload) {
    const courseId = getRandomId(11);

    await Courses.create({ course_id: courseId, ...payload });

    return { courseId };
  },
};
