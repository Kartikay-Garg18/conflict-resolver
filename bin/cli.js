#!/usr/bin/env node
import { program } from 'commander';
import chalk from 'chalk';
import { resolveConflicts } from '../src/index.js';

program
.name('resolver')
.description('A CLI tool to resolve merge conflicts in Git repositories')
.version('0.1.0')

program
.command('resolve')
.description('Resolve merge conflicts in the specified repository')
.option('-s, --strategy <strategy>', 'Conflict resolution strategy (ours, theirs, merge, manual)', 'ours')
.option('-a, --auto', 'Automatically resolve conflicts without user input')
.option('-p, --path <path>', 'Path to the Git repository', process.cwd())
.action(async (options) => {
    try {
        console.log(chalk.blue('Resolving merge conflicts...'));
        const result = await resolveConflicts(options);

        if (!result) {
            console.log(chalk.yellow('No conflicts found'));
            return;
        }

        console.log(chalk.green(`Resolved ${result.resolvedCount} conflicts in the following files:`));
        result.resolvedFiles.forEach(file => {
            console.log(chalk.yellow(file));
        });
    } catch (error) {
        console.error(chalk.red('Error resolving conflicts:'), error.message);
        process.exit(1);
    }
})

program.parse(process.argv);