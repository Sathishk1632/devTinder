const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service:"gmail",
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'dotconnectapp@gmail.com', // your Gmail account
        pass: 'Mahiway@07' // your Gmail password or App Password
    }
});

let mailOptions = {
    from: '"Dot Connect Apps" <dotconnectapp@gmail.com>',
    to: 'sathishk1632@gmail.com',
    subject: 'Hello',
    text: 'Hello world?',
    html: '<b>Hello world?</b>'
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
});
