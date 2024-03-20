var express = require('express');
const { userAuth } = require('../middleware/authorization');
const { getallcourtdata } = require('../controllers/usercontroller');
var router = express.Router();

/* GET users listing. */
router.get('/getallcourtdata',userAuth,getallcourtdata) 

module.exports = router;
