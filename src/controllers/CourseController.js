const CourseRepository = require("../repositories/CourseRepository");
const UserRepository = require("../repositories/UserRepository");
const successMsg = require("../utilities/successMessages");
const errMsg = require("../utilities/errorMessages");

const { ValidationError } = require("sequelize");

module.exports = {
  async addNewCourse(req, res, next) {
    try {
      const {id: instructor_id} = await UserRepository.getIdByUserId(req.userId);
      // console.log(instructor_id);
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
};
