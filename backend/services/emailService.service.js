
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "afghanwheels889@gmail.com",
    pass: "gwyw zrhz bnpz gsph",
  },
});

const EmailService = async (recipient, subject, verificationLink,name = "Zoom Invitation Link") => {

//   console.log(user);
  if (recipient!== null) {
    try {
      const fullMessage = `Dear User,\n\nPlease click on the link below to verify your email:\n\n${verificationLink}\n\nThank you!`;
      
      const msg = {
        from: "afghanwheels889@gmail.com",
        to: `${recipient}`,
        subject: `${subject}`,
        text: `${fullMessage}`,
      };
      await transporter.sendMail(msg);
      return { message: "Send successfully" };
    } catch (error) {
      console.log("Error sending email:", error);
      return { message: "mail failed" };
    }
  } else {
    return { message: "You are not Registered" };
  }
};


const EmailSubscribe = async (recipient, subject, name = "Zoom Invitation Link") => {
  //   console.log(user);
  if (recipient) {
    try {
      const fullMessage = `Dear User,\nWelcome to Afghan Wheels.\nThanks for subscribing to our Newsletter!\n\nThanks & Regards,\nAfghan Wheels`;
      const msg = {
        from: "afghanwheels889@gmail.com",
        to: `${recipient}`,
        subject: `${subject}`,
        text: `${fullMessage}`,
      };
      await transporter.sendMail(msg);
      return { message: "Send successfully" };
    } catch (error) {
      console.log("Email sending failed:", error);
      return { message: "Error Subscribing" };
    }
  } else {
    return { message: "Error Subscribing" };
  }
};


module.exports = {EmailService, EmailSubscribe};