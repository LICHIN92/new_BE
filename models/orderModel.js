const mongoose=require('mongoose')
const orderSchema=mongoose.Schema({
    courtId:{
        type:mongoose.Types.ObjectId,
        requird:true,
        ref:"court"
    },
    slotIds:{
        type:Array,
        required:true
    },
    totalCost:{
       type:Number,
       require:true
    },
    status:{
        type:Number,
        default:1
        //1 started
        //2 successfull
        //3 failed
        //4 refund
    },
    createdOn:{
        type:Date,
        default:new Date(),
    },
    bookedBy:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'users'
    },
    slotDate:{
        type:Date
    }
})
const orders=mongoose.model('ordrs',orderSchema)
module.exports=orders