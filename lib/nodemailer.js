import nodemailer from "nodemailer";

const user = process.env.OCI_MAIL_USER;
const pass = process.env.OCI_MAIL_PASSWORD;

export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: process.env.EMAIL_SERVER_PORT,
  secure: false,
  auth: {
    user,
    pass,
  },
});

export const mailOptions = {
  from: process.env.EMAIL_FROM,
  to: "contact@incolive.com",
};