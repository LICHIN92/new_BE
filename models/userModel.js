const mongoose=require('mongoose')
const userSchema=mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    createdOn:{
        type:Date,
        default:new Date()
    },
    role:{
        type:Number,
        default:3
    },
    active:{
        type:Boolean,
        default:true
    }
})

// role:
// 1=super superadmin 
// 2=admin 
// 3=userss

const users=mongoose.model('user',userSchema)
module.exports=users