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

      const isPurchased = await PaymentRepository.getPurchasedOrder(
        courseSecretId,
        userId
      );
      if (isPurchased) throw errMsg.alreadyPurchased();

      if (price == 0.0 && payment_method !== "FREE")
        throw errMsg.purchasingFreeCourse();
      else if (price > 0.0 && payment_method === "FREE")
        throw errMsg.paymentRequired();

      let total_price = price + 2500.0;
      let message = successMsg.order();

      if (payment_method === "FREE") {
        total_price = 0.0;
        message = successMsg.payment();
      }

      const payload = {
        user_id: userSecretId,
        course_id: courseSecretId,
        payment_method,
        total_price,
      };

      if (payment_method === "FREE") payload.purchase_date = new Date();

      const invoice = await PaymentRepository.orderCourse(payload);

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

  async purchaseCourse(req, res, next) {
    const { userId } = req;
    const { paymentId } = req.params;

    console.log("tes");

    try {
      const order = await PaymentRepository.getPaymentById(paymentId);

      const { course_id: courseId, users, courses } = order;

      if (users.user_id != userId) throw errMsg.unauthorized();

      const isPurchased = await PaymentRepository.getPurchasedOrder(
        courseId,
        userId
      );
      if (isPurchased) throw errMsg.alreadyPurchased();

      const purchaseDate = await PaymentRepository.purchaseOrder(paymentId);

      res.status(200).send({
        ...successMsg.payment(),
        course_name: courses.course_name,
        course_id: courseId,
        user_id: userId,
        invoice: {
          ...order.dataValues,
          purchase_date: purchaseDate,
          id: undefined,
          user_id: undefined,
          course_id: undefined,
          users: undefined,
          courses: undefined,
          createdAt: undefined,
          updatedAt: undefined,
          orderedAt: order.dataValues.createdAt,
        },
      });
    } catch (error) {
      return next(error);
    }
  },
};
