import { sendEmail } from '../nodemailer/utils';
import { sendEmailOrder, createFileandSend } from '../nodemailer/utils';

export const mailingGetHandler = (req, res) => {
  const order = req.body;
  console.log(order);
  createFileandSend(order);
};
