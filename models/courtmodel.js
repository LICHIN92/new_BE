const mongoose = require('mongoose')
const courtSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        requires: true
    },
    type: {
        type: String,
        required: true
    },
    addressline1: {
        type: String,
        required: true
    },
    addressline2: {
        type: String,
        required: true
    },
    addressline3: {
        type: String,
        required: true
    },
    landmark: {
        type: String,
        required: true
    },
    pin: {
        type: Number,
        required: true
    },
    contactNumber: {
        type: Number,
        required: true
    },
    courtPics: {
        type: Array
    },
    description:{
       type:String
    },
    timeStamp: {
        type: Date,
        default: new Date()
    }
})
const court = mongoose.model("court", courtSchema)
module.exports = court;