const COURT=require('../models/courtmodel')

const createnewcourt=(req,res)=>{
    console.log(req.body);
   console.log('createnewcourt');
   const { name,
   location,
   type,
   addressline1,
   addressline2,
   addressline3,
   landmark,
   pin,
   contactNumber,
   description
    }=req.body;
    const pic=req.files.map((file)=>{ return {name:file.filename,type:file.mimetype} })
console.log(req.files);
console.log(req.body.description);
console.log(pic);
COURT({name,
    location,
    type,  
    addressline1,
    addressline2,
    addressline3,
    landmark,
    pin,
    contactNumber,
    description,
    courtPics:pic
}).save()
.then(resp=>{
    res.status(200).json({message:'court added successfully'})
}).catch(err=>{
    console.log('err');
    console.log(err);
    res.status(500)
})
}
module.exports=createnewcourt