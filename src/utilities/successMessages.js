module.exports = {
  register(actor) {
    return { message: `${actor} registered successfully` };
  },
  login(actor) {
    return { message: `${actor} logged in successfully` };
  },
  payment() {
    return { message: `successfully purchased the course` };
  },
  create(table) {
    return { message: `successfully created ${table}` };
  },
  update(table) {
    return { message: `successfully edited ${table}` };
  },
  delete(table) {
    return { message: `successfully deleted ${table}` };
  },
};
