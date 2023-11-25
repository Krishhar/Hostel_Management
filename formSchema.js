const mongoose = require('mongoose')

const formSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    outpassFor: { type: String },
    sDate: { type: String },
    eDate: { type: String },
    Department: { type: String },
    rollNo: { type: String, required: true },
    Year: { type: String },
    Hostel: { type: String },
    Room: { type: String },
    deputyWardenApproval: { type: Boolean, default: false },
    classAdvisorApproval: { type: Boolean, default: false },
    status: { type: String, default: 'pending' },
})

const Requ = mongoose.model('Requ', formSchema)

module.exports = Requ