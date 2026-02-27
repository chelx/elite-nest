#!/usr/bin/env node
import { Command } from 'commander';
import { makeModuleCommand } from './commands/make-module.command.js';
import { makeCrudCommand } from './commands/make-crud.command.js';

const program = new Command();

program
    .name('elitenest')
    .description('EliteNest Framework CLI tool for rapid development')
    .version('0.1.0');

program.addCommand(makeModuleCommand);
program.addCommand(makeCrudCommand);

program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}
