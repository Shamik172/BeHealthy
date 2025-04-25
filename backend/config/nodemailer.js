const nodemailer =  require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth :{
        user: 'yogahealix@gmail.com',
        pass: "ozbi mpah wesj hjpd",
    }

})

module.exports= transporter; 