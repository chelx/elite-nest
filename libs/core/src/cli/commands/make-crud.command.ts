import { Command } from 'commander';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import handlebars from 'handlebars';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const makeCrudCommand = new Command('make:crud')
    .description('Create a full CRUD module including repository and DTOs')
    .argument('<name>', 'Name of the entity')
    .action(async (name: string) => {
        const kebabName = name.toLowerCase().replace(/\s+/g, '-');
        const pascalName = name.charAt(0).toUpperCase() + name.slice(1);
        const camelName = name.charAt(0).toLowerCase() + name.slice(1);

        const targetDir = path.join(process.cwd(), 'apps/api/src/app/modules', kebabName);
        const templateDir = path.join(__dirname, '../templates');

        if (fs.existsSync(targetDir)) {
            console.error(chalk.red(`Error: Module ${kebabName} already exists!`));
            return;
        }

        await fs.ensureDir(targetDir);
        await fs.ensureDir(path.join(targetDir, 'dto'));

        const files = [
            { template: 'module.hbs', target: `${kebabName}.module.ts` },
            { template: 'controller.hbs', target: `${kebabName}.controller.ts` },
            { template: 'service.hbs', target: `${kebabName}.service.ts` },
            { template: 'repository.hbs', target: `${kebabName}.repository.ts` },
            { template: 'dto.hbs', target: `dto/create-${kebabName}.dto.ts` },
        ];

        for (const file of files) {
            const templateContent = await fs.readFile(path.join(templateDir, file.template), 'utf-8');
            const compile = handlebars.compile(templateContent);
            const content = compile({
                kebabName,
                pascalName,
                camelName,
                repository: true,
                crud: true
            });

            await fs.writeFile(path.join(targetDir, file.target), content);
            console.log(chalk.green(`Created: ${file.target}`));
        }

        // Special logic for Update DTO if needed separately, but here it's in the same file
        console.log(chalk.blue(`\nFull CRUD for ${pascalName} generated successfully! 🔥`));
    });
