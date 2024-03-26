var express = require('express');
const { userAuth } = require('../middleware/authorization');
const { getallcourtdata, getsinglecourtdata } = require('../controllers/usercontroller');
var router = express.Router();

/* GET users listing. */
router.get('/getallcourtdata',userAuth,getallcourtdata) ;
router.get('/getsinglecourtdata',userAuth,getsinglecourtdata) ;


module.exports = router;
