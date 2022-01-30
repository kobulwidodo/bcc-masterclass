const { Courses, Users, CoursePayments } = require("../models");
const errMsg = require("../utilities/errorMessages");
const random = require("../utilities/getRandomId");
const { Op } = require("sequelize");
const res = require("express/lib/response");

module.exports = {
  async orderCourse(payload) {
    const payment_id = random.getRandomId(12);
    const payment_code = random.getRandomNumber(12);

    const payment = await CoursePayments.create({
      payment_id,
      payment_code,
      ...payload,
    });

    return {
      ...payment.dataValues,
      id: undefined,
      user_id: undefined,
      course_id: undefined,
    };
  },

  async purchaseOrder(paymentId) {
    const purchaseDate = new Date();
    await CoursePayments.update(
      { purchase_date: purchaseDate },
      { where: { payment_id: paymentId } }
    );

    return purchaseDate;
  },

  async getPaymentById(paymentId) {
    const payment = await CoursePayments.findOne({
      where: { payment_id: paymentId },
      include: [
        { model: Users, as: "users", attributes: ["user_id"] },
        { model: Courses, as: "courses", attributes: ["name"] },
      ],
    });

    if (!payment) throw errMsg.notFound("Order");
    return payment;
  },

  async getPurchasedOrder(courseSecretId, userId) {
    return await CoursePayments.findOne({
      where: {
        course_id: courseSecretId,
        purchase_date: { [Op.not]: null },
      },
      include: {
        model: Users,
        as: "users",
        where: { user_id: userId },
        attributes: ["id"],
      },
      attributes: ["id", "purchase_date"],
    });
  },
};
