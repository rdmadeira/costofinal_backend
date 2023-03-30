#!/usr/bin/env node
/* eslint-disable no-unsafe-optional-chaining */
import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import figlet from 'figlet';

import { productTypePrompt } from './prompts.js';
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
  .description(chalk.bgGreen('Agregue nuevo grupo de productos o un producto'))
  .action(() => {
    prompt(productTypePrompt)
      .then((answers) => {
        const answersProduct = {
          codigo: answers.codigo,
          medida: answers.medida,
          precio: answers.precio,
        };
        const productType = answers.productType;
        const products = getProducts() || {};
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
