var express = require('express');
var router = express.Router();
const {orders,verify}=require('../controllers/paymentControllers');
const { userAuth } = require('../middleware/authorization');
/* GET home page. */
router.post('/orders',userAuth,orders);
router.post('/verify',userAuth,verify);


module.exports = router;
