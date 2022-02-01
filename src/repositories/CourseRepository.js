const { Courses, Users, CourseTopics, CoursePayments } = require("../models");
const errMsg = require("../utilities/errorMessages");
const { getRandomId } = require("../utilities/getRandomId");
const { Op } = require("sequelize");

module.exports = {
  async addNewCourse(payload) {
    const courseId = getRandomId(11);

    await Courses.create({ course_id: courseId, ...payload });

    return { courseId };
  },

  async getAllCourses() {
    return await Courses.findAll({
      include: [
        {
          model: CourseTopics,
          as: "courseTopics",
          attributes: ["name"],
        },
        {
          model: Users,
          as: "instructor",
          attributes: ["user_id", "username", "name"],
          //because it's inner join, we need to add this key below
          required: true,
        },
      ],
    });
  },

  //Check if user is an instructor
  async isUserAnInstructor(userId, courseId, roleId) {
    const check = await Courses.findOne({
      where: { course_id: courseId },
      include: {
        model: Users,
        as: "instructor",
        attributes: ["id"],
        where: { user_id: userId },
      },
      attributes: ["id"],
    });
    if (!check || roleId == 2) throw errMsg.unauthorized();
    return check;
  },

  async getIdByCourseId(courseId) {
    const course = await Courses.findOne({
      where: { course_id: courseId },
      attributes: ["id"],
    });

    if (!course) throw errMsg.notFound("Course");
    return course;
  },

  async deleteAllCourses() {
    await Courses.destroy({ where: {} });
  },

  async getCourseByCourseId(courseId) {
    const course = await Courses.findOne({
      where: { course_id: courseId },
      include: [
        {
          model: CourseTopics,
          as: "courseTopics",
          attributes: ["id", "name"],
        },
        {
          model: Users,
          as: "instructor",
          attributes: ["user_id", "username", "name"],
          //because it's inner join, we need to add this key below
          required: true,
        },
      ],
    });

    if (!course) throw errMsg.notFound("Course");
    return course;
  },

  async updateCourse(courseId, payload) {
    await Courses.update(payload, { where: { course_id: courseId } });
  },

  async deleteCourse(courseId) {
    await Courses.destroy({ where: { course_id: courseId } });
  },

  async getInstructorsCourses(instructorId) {
    return await Courses.findAll({
      include: [
        {
          model: CourseTopics,
          as: "courseTopics",
          attributes: ["name"],
        },
        {
          model: Users,
          as: "instructor",
          attributes: [],
          where: { user_id: instructorId },
        },
      ],
    });
  },

  async getUsersCourses(userId) {
    return await Courses.findAll({
      include: [
        {
          model: CourseTopics,
          as: "courseTopics",
          attributes: ["name"],
        },
        {
          model: CoursePayments,
          as: "coursePayments",
          required: true,
          attributes: ["payment_method", "payment_id", "purchase_date"],
          where: { purchase_date: { [Op.not]: null } },
          include: {
            model: Users,
            as: "users",
            where: { user_id: userId },
            attributes: [],
            required: true,
          },
        },
      ],
    });
  },
};
