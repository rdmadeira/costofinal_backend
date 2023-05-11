import fs from 'fs';
import path from 'path';
import transporter from './config.js';

const attachmPath = path.join(
  process.cwd(),
  'functions/src/nodemailer/attachments'
);

export const sendEmailOrder = (email, order) => {
  const sendMailOptions = {
    from: 'compras.costofinal@gmail.com',
    to: email,
    cc: 'compras.costofinal@gmail.com',
    subject: `${order.name} Gracias por su pedido!!`,
    html: `<h2>Pedido n° ${order.id} registrado con suceso</h2><p>Entraremos en contato en la brevedad para seguir los próximos pasos</p>`,
    text: 'Pedido enviado con suceso. Entraremos en contato en la brevedad para seguir los próximos pasos',
    attachments: [
      {
        filename: order.id.concat('.txt'),
        path: path.join(attachmPath, order.id + '.txt'),
      },
    ],
  };
  transporter.sendMail(sendMailOptions, (err, info) => {
    if (err) {
      console.log(err.message);
    } else {
      fs.unlink(path.join(attachmPath, order.id + '.txt'), (unlinkError) => {
        if (unlinkError) {
          console.log('No se pudo borrar el archivo - error al borrar');
        } else {
          console.log(info.response);
        }
      });
    }
  });
};

export const createFileandSend = (body) => {
  console.log(body);
  const filePath = path.join(attachmPath, body.id + '.txt');
  const data = `
  Tarea programada: ${body.id};\n
  Descripción: ${body.description};\n
  Creado el: ${body.createdAt}`;
  fs.writeFile(filePath, data, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Archivo creado con sucesso!!');
      sendEmailOrder(body.email, body);
      return;
    }
  });
};
