const mongoose = require('mongoose');

const classAdvisorSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  role: { type: String, required: true }
});

const ClassAdvisor = mongoose.model('ClassAdvisor', classAdvisorSchema);

// Create an index for the email field


module.exports = ClassAdvisor;
