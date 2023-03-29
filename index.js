#!/usr/bin/env node
import { Command } from 'commander';
/* import inquirer from 'inquirer';
 */ import chalk from 'chalk';
import figlet from 'figlet';

/* import { productTypePrompts } from './prompts.js';
 */
const program = new Command();
/* const { prompt } = inquirer;
 */
program
  .name('costofinal')
  .version('1.0.0')
  .description(chalk.bgGreen(figlet.textSync('COSTO FINAL')));

program.parse(process.argv); // necesita este parse para correr el programa.
