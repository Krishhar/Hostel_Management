const mongoose = require('mongoose')

const userSchema =new mongoose.Schema({
    username:{type:String, required:true},
    email: {type:String, required:true,unique:true},
    password: {type:String, required:true},
    phone:{type:String, required:true,unique:true},
    advisor:{type:String, required:true},
    department:{type:String, required:true},
    Year:{type:String, required:true},
    hostel:{type:String, required:true},
    role: { type: String, required: true }
})

const User = mongoose.model('User',userSchema)

// Create an index for the email field
User.collection.createIndex({ email: 1 }, { unique: true });
  
module.exports = User 