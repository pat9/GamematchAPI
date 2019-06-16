const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const SendEmail = (destino, subject, templateName, data) => {
    let transporter = nodemailer.createTransport ({ 
        service: 'gmail', 
        auth: { 
                user: process.env.GAMEGMAIL, 
                pass: process.env.GAMEPASS 
            } 
    });

    const handlebarOptions = {
        viewEngine: {
          extName: '.handlebars',
          partialsDir: './emailSender/templates/',
          layoutsDir: './emailSender/templates/',
          defaultLayout: templateName
        },
        viewPath: './emailSender/templates/',
        extName: '.handlebars',
      };

    transporter.use('compile', hbs(handlebarOptions))

    const mailOptions = { 
        from: process.env.GAMEGMAIL, 
        to: destino, 
        subject: subject, 
        template: templateName,
        context: data
    };

    transporter.sendMail (mailOptions, function (err, info) { 
        if (err){
          console.log (err) 
        } 
        else {
          console.log ('El correo ha sido enviado'); 
        }
     });

}

module.exports = SendEmail;