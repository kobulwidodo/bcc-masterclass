const PaymentRepository = require("../repositories/PaymentRepository");
const CourseRepository = require("../repositories/CourseRepository");
const UserRepository = require("../repositories/UserRepository");
const successMsg = require("../utilities/successMessages");
const errMsg = require("../utilities/errorMessages");

const { ValidationError } = require("sequelize");

module.exports = {
  async createOrder(req, res, next) {
    const { courseId } = req.params;
    const { payment_method } = req.body;
    const { userId } = req;

    try {
      const { id: userSecretId } = await UserRepository.getIdByUserId(userId);
      const {
        id: courseSecretId,
        name: courseName,
        price,
      } = await CourseRepository.getCourseByCourseId(courseId);

      if (price == 0.00 && payment_method !== "FREE") 
        throw errMsg.purchasingFreeCourse();

      const total_price = payment_method === "FREE" ? 0.0 : price + 2500.0;

      const payload = {
        user_id: userSecretId,
        course_id: courseSecretId,
        payment_method,
        total_price,
      };

      if (payment_method === "FREE") payload.purchase_date = new Date();

      const invoice = await PaymentRepository.orderCourse(payload);

      const message =
        payment_method === "FREE" ? successMsg.payment() : successMsg.order();

      res.status(201).send({
        ...message,
        course_name: courseName,
        course_id: courseId,
        user_id: userId,
        invoice,
      });
    } catch (error) {
      if (error instanceof ValidationError)
        return next(errMsg.validationError(error));
      return next(error);
    }
  },
};
