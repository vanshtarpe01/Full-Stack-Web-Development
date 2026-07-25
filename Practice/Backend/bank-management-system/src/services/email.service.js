require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});


// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Vansh's Bank" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

async function sendRegisterationEmail(userEmail, name){
    const subject = "Welcome to TTO's Bank!";
    const text = `Hello ${name},\n\n Thank you for registering in TTO's Bank.
    We're exicted to haveyou on board\n\n Best Regards, \n The TTO Leader`;
    const html = `<p>Hello ${name}, </p><p>Thank you for registering at TTO's Bank. We are exicted to have on Board!</p><p>Best Regards, <br> The TTO Team</p>`

    await sendEmail(userEmail, subject, text, html);
}


module.exports = {
    sendRegisterationEmail
};
