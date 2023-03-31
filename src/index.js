#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import figlet from 'figlet';
import { v4 as uuidv4 } from 'uuid';

import { productPrompt, productTypePrompt } from './prompts.js';
import { getProducts, saveProducts } from './utils.js';

const program = new Command();
const { prompt } = inquirer;

program
  .name('costofinal')
  .version('1.0.0')
  .description(chalk.bgGreen(figlet.textSync('COSTO FINAL')));

program
  .command('newgroup')
  .alias('ng')
  .description(chalk.green('Agregue nuevo grupo de productos'))
  .action(() => {
    console.log(`
    Por favor insira el nombre del nuevo 
    subgrupo de productos:

    `);
    prompt(productTypePrompt).then(({ productType }) => {
      const products = getProducts() || {};
      products[productType] = {};
      saveProducts(products);
    });
  });

program
  .command('newproduct')
  .alias('np')
  .description(
    chalk.green('Cria un nuevo producto, adentro del subgrupo pasado')
  )
  .arguments('<producttype>')
  .action(() => {
    console.log(`
      Por favor insira en los campos, los parametros pedidos:
       - Nombre Producto -> insira el nombre del producto
       - Codigo del Producto -> insira el codigo del producto
       - Medida de Producto -> insira si es el caso
       - Precio -> insira un numero de precio de producto, sin simbolos
    `);
    const productType = process.argv[3];

    prompt(productPrompt)
      .then((answers) => {
        const products = getProducts() || {};
        const answersProduct = {
          codigo: answers.codigo,
          medida: answers.medida,
          precio: answers.precio,
          descripcion: answers.productDescrip,
          id: uuidv4(),
        };

        const productsSizeArray =
          products[productType]?.items[answers.productName] || [];

        if (productsSizeArray.find((prod) => prod.codigo === answers.codigo)) {
          productsSizeArray.forEach((prod, index, array) => {
            if (prod.codigo === answers.codigo) array[index] = answersProduct;
            return prod;
          });
        } else {
          productsSizeArray.push(answersProduct);
        }

        products[productType] = {
          items: {
            ...products[productType]?.items,
            [answers.productName]: productsSizeArray,
          },
        };
        saveProducts(products);
        console.log(chalk.green('Producto Agregado con exito!!'));
      })
      .catch((error) => console.log(error));
  });

program.parse(process.argv); // necesita este parse para correr el programa.
