const { Courses, Users, CoursePayments } = require("../models");
const errMsg = require("../utilities/errorMessages");
const random = require("../utilities/getRandomId");

module.exports = {
  async orderCourse(payload) {
    const payment_id = random.getRandomId(12);
    const payment_code = random.getRandomNumber(12);

    const payment = await CoursePayments.create({
      payment_id,
      payment_code,
      ...payload,
    });
    
    return payment;
  }
};
