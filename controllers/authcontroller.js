const USERS=require('../models/userModel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const dosignup=(req,res)=>{
   console.log(req.body);
   console.log('dosignup');
   bcrypt.hash(req.body.password,parseInt(process.env.SALT_ROUNDS),function(err,hash){
      // console.log(hash);
      USERS({
         firstName:req.body.firstname,
         lastName:req.body.lastname,
         email:req.body.email,
         mobile:req.body.mobile,
         password:hash
      }).save()
      .then((response) => {
         res.status(200).json({message:'signup successfull'})
         console.log('its ok');
      }).catch((err) => {
         console.log(err);
         if(err.code===11000){
           res.status(500).json({message:`${req.body.email} is already existing`})
           console.log('email exist');

         }else{
         res.status(500).json({message:`something went wrong`})
         console.log('500');
         }
      });
   })

}

const dologin= async (req,res)=>{
   console.log(req.body);
   const {email,password}=req.body
   try {
      
      const userdata=await USERS.findOne({email:email})
      if (userdata) {
         console.log(userdata);
         const options={
            expiresIn:'2d',
            algorithm:'HS256'
            }
         bcrypt.compare(password,userdata.password,(err,result)=>{
            if(result){
               const token=jwt.sign({...userdata},process.env.JWT_PASSWORD,options)
               userdata.password=null
            //  console.log(token);
             res.status(200).json({userdata:userdata,token})
            }else{
             res.status(401).json({message:'wrong password'})

            }
         })
      } else {
         res.status(401).json({message:'invalid credentials'})
         console.log('error');
      }        
   } catch (error) {
      console.log(error);
      res.status(500).json({message:'internal server error'})
   }
}
 

module.exports={dosignup,dologin}