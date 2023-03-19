const nodemailer = require('nodemailer');

function sendRegistrationEmail(email, token) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    security:'STARTTLS',
    auth: {
        user: 'brendan.glover@ethereal.email',
        pass: '5XGCn2YaQ7u746qb14'
    }
  });
  const mailOptions = {
    from: 'iribatech@gmail.com',
    to: email,
    subject: 'Welcome to My App!',
    text: `Hi ${email}, thanks for registering with My App! Your JWT token is ${token}.`
  };
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.error(error);
      if (error.code === 'EAUTH') {
        console.error('Failed to authenticate with Gmail:', error.response);
      }
    } else {
      console.log('Email sent:', info.response);
    }
  });
}
module.exports = sendRegistrationEmail;
