const nodemailer = require('nodemailer');
const path = require('path');
const dotenv = require('dotenv');

const dotenvPath = path.join(process.cwd(), '.env');
dotenv.config({ path: dotenvPath });

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

module.exports = { transporter };
