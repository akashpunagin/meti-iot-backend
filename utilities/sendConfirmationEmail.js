const nodemailer = require("nodemailer");
require("dotenv").config();

const isProd = process.env.IS_PROD_MODE;

const isProdMode = () => {
  if (isProd === "false") {
    return false;
  } else if (isProd === "true") {
    return true;
  }
  return false;
};

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.NODEMAILDER_EMAIL,
    pass: process.env.NODEMAILDER_PASSWORD,
  },
});

sendConfirmationEmail = async (name, email, jwtToken) => {
  const link = `${
    isProdMode() ? process.env.BASE_URL : "http://localhost:8080"
  }/auth/verify-email?jwtToken=${jwtToken}`;

  try {
    const temp = await transport.sendMail({
      from: process.env.NODEMAILDER_EMAIL,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
            <h2>Hello ${name}</h2>
            <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
            <a href=${link}> Click here</a>
            </div>`,
    });
    return true;
  } catch (error) {
    console.error("ERROR while sending confirmation email", error);
    return false;
  }
};

module.exports = sendConfirmationEmail;
