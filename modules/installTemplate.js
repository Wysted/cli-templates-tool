import inquirer from "inquirer";
import runCommand from "./command.js";

const gitCheckoutCommand = {
    1: {
        1: "git clone --depth 1 https://github.com/Wysted/Template-Tauri-SQLite-Prisma-Vue-TS ",
        2: "git clone -b no-example --depth 1 https://github.com/Wysted/Template-Tauri-SQLite-Prisma-Vue-TS ",
    },
};

class InstallTemplate {
    constructor() {
        this.selection = {
            template: "",
            name: "",
            state: "",
        };
        this.questions = [
            {
                type: "list",
                name: "template",
                message: "Selecciona la plantilla que quieres instalar:",
                choices: ["1.-Tauri-SQlite-TS-Vue3-Prisma"],
            },
            {
                type: "list",
                name: "state",
                message: "Instalar:",
                choices: ["1.- con ejemplo", "2.- sin ejemplo"],
            },
            {
                type: "input",
                name: "name",
                message: "Nombre del proyecto:",
                default: "tauri-app",
            },
        ];
    }

    async promptQuestions() {
        await inquirer.prompt(this.questions).then((answers) => {
            this.selection.template = answers.template.split(".")[0];
            this.selection.name = answers.name;
            this.selection.state = answers.state.split(".")[0];
        });
        await this.installSelection(this.selection);
    }
    async installSelection(selection) {
        try {
            console.log("Clonando plantilla");
            const checkedOut = await runCommand(
                gitCheckoutCommand[selection.template][selection.state] +
                    selection.name
            );
            if (!checkedOut) process.exit(-1);
            const checkedCd = await runCommand(
                `cd ${selection.name} && rm -rf .git`
            );
            if (!checkedCd) process.exit(-1);

            console.log(
                `\n\nPlantilla lista para usar: cd ${selection.name} && npm install\nnpm run tauri dev`
            );
        } catch (e) {
            console.error(e);
        }
    }
}

export default InstallTemplate;
