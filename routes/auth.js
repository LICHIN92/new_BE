var express = require('express');
const { dosignup, dologin } = require('../controllers/authcontroller');
var router = express.Router();

/* GET home page. */
router.post ('/dosignup',dosignup);
router.post('/dologin',dologin)

module.exports = router;