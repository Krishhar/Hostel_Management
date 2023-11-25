const mongoose = require('mongoose');

const deputyWardenSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true},
  role:{type:String,required: true},
  hostel: { type: String, required: true },
});

const DeputyWarden = mongoose.model('DeputyWarden', deputyWardenSchema);

// Create an index for the email field
DeputyWarden.collection.createIndex({ email: 1 }, { unique: true });

module.exports = DeputyWarden;
 