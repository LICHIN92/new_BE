var express = require('express');
const { adminAuth } = require('../middleware/authorization');
var router = express.Router();
const multer=require('multer');
const {createnewcourt,createshedule} = require('../controllers/admincontroller');

const filestorage=multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,"public/assets")
  },
  filename:function(req,file,cb){
    cb(null,file.fieldname+'-'+Date.now()+file.originalname)
  }
})
const upload=multer({storage:filestorage})
router.post('/createnewcourt',adminAuth,upload.array('files'),createnewcourt)

router.post('/createshedule',adminAuth,createshedule)
module.exports = router;