import fs from 'fs';
import path from 'path'; // El path es el modulo de Nodejs se encarga de devolver el path correcto del sistema operativo que estás utilizando. Por eso hay que siempre usar el path para obtener el path correcto del sistema. Unix (Mac y Linux) funciona distinto de Windows.
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url)); // Para ES6 modules, la variable del global __dirname no existe, por eso hay que usar la función. Simula el valor de __dirname que existe en commonJS.
/* console.log(__dirname);
console.log(path); */
const contactsLocation = path.join(__dirname, 'contacts.json');

const saveContacts = (contacts) => {
  fs.writeFileSync(contactsLocation, JSON.stringify(contacts));
};

const getContacts = () => {
  try {
    console.log('object');
    return JSON.parse(fs.readFileSync(contactsLocation));
  } catch (error) {
    if (error.code === 'ENOENT') {
      return {};
    } else {
      console.log('Ocurrió un error inesperado!');
    }
  }
};

export { saveContacts, getContacts };
