const Joi=require('joi');

const contactUsValidation = (req , res , next) =>{
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        msg: Joi.string().min(4).required()
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    next();

}

module.exports ={
    contactUsValidation 
};