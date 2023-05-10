import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER,
    pass: process.env.P,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export default transporter;
