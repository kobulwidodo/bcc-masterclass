const { customAlphabet } = require("nanoid");

module.exports = {
  getRandomId(length) {
    return customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", length)();
  },

  getRandomNumber(length) {
    return customAlphabet("0123456789", length)();
  },
};
