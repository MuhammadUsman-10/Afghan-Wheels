
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "harphostel@gmail.com",
    pass: "enwt vprr trkh thed",
  },
});

const EmailService = async (recipient, subject, message,name = "Zoom Invitation Link") => {

//   console.log(user);
  if (recipient !== null) {
    try {
      const msg = {
        from: "harphostel@gmail.com",
        to: `${recipient}`,
        subject: `${subject}`,
        text: `${message}`,
      };
      transporter
        .sendMail(msg)
        .then(() => {
          return { message: "Send successfully" };
        })
        .catch((error) => {
          console.log(error);
          return{ message: "mail failed" };
        });
    } catch (error) {
        return { message: error.stack };
    //   res.status(404).json({ message: error });
    }
  } else {
    return { message: "You are not Registered" };
  }
};

module.exports = EmailService;

