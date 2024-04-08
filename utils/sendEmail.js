const path = require("path");
var nodemailer = require("nodemailer");
var hbs = require("nodemailer-express-handlebars");

const sendEmail = async (subject, template, context, send_to, sent_from) => {
  //Create email Transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      ciphers: "SSLv3",
    },
  });

  /* handlebars options */
  const handlebarOptions = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve("./email_templates"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./email_templates"),
    extName: ".handlebars",
  };

  transporter.use("compile", hbs(handlebarOptions));

  // creating options
  const options = {
    from: sent_from,
    to: send_to,
    subject: subject,
    template: template,
    context: context,
  };

  // send email
  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
      return "Error in sending email";
    }
    console.log(info);
    return "Email sent successfully";
  });
};

module.exports = { sendEmail };
