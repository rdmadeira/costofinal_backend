import fs from 'fs';
import path from 'path'; // El path es el modulo de Nodejs se encarga de devolver el path correcto del sistema operativo que estás utilizando. Por eso hay que siempre usar el path para obtener el path correcto del sistema. Unix (Mac y Linux) funciona distinto de Windows.
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url)); // Para ES6 modules, la variable del global __dirname no existe, por eso hay que usar la función. Simula el valor de __dirname que existe en commonJS.
/* console.log(__dirname);
console.log(path); */
const productsLocation = path.join(__dirname, 'productos.json');

const saveProducts = (contacts) => {
  fs.writeFileSync(productsLocation, JSON.stringify(contacts));
};

const getProducts = () => {
  try {
    return JSON.parse(fs.readFileSync(productsLocation));
  } catch (error) {
    if (error.code === 'ENOENT') {
      return {};
    } else {
      console.log('Ocurrió un error inesperado!');
    }
  }
};

export { saveProducts, getProducts };
