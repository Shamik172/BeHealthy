const express = require('express');
const router = express.Router(); 

const { contactUs} =require('../Controllers/ContactUsController.js') ;
const {contactUsValidation} =require('../Middlewares/ContactUs.js');


router.post('/',contactUsValidation,contactUs ); 


module.exports = router;
