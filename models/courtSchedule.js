const mongoose = require("mongoose");

const schema=mongoose.Schema({
    date:{
        type:Date,
        required:true
    },
    slot:{
        type:Object,
        required:true
    },
    cost:{
        type:Number,
        required:true
    },
    bookedby:{
        type:mongoose.Types.ObjectId,
        ref:'users'
    },
    cancellation:{
        type:Array
    },
    courtId:{
        type:mongoose.Types.ObjectId,
        required:true
    }
})

const courtSchedules=mongoose.model('courtschedule',schema)
schema.index({date:1,'slot.id':1,courtId:1},{unique:true})
module.exports=courtSchedules