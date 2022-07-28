const fs = require('fs');
const inquirer = require('inquirer');
import Manager from "./lib/manager";
import Engineer from "./lib/engineer";
import Intern from "./lib/intern";

try {
    const roster = {
        manager: null,
        engineers: [],
        interns: [],
    };

    roster.manager = await managerInput();

    let menuSelect;
    do {
        menuSelect = await inquirer.prompt([
            {
                type: "list",
                name: "Menu",
                message: "Please select one of the following.",
                choices: ["Enter an Engineer", "Enter an Intern", "Generate Profile"],
            },
        ]);

        switch (menuSelect["Menu"]) {
            case "Enter an Engineer":
                {
                    roster.engineers = [...roster.engineers, await engineerInput()];
                }
                break;
            case "Enter an Intern":
                {
                    roster.interns = [...roster.interns, await internInput()];
                }
                break;
            case "Generate Profile":
                fs.writeFileSync(
                    "dist/roster.html",
                    ``
                );
                break;
        }
    } while (menuSelect["Menu"] != "Generate Profile");
} catch (error) {
    if (error.isError) {
        console.log("could not be rendered!")
    } else {
        console.log("Something went wrong!")
    }
}

async function managerInput() {
    return new Manager(
        await inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "What is the team manager's name?",
            },
            {
                type: "input",
                name: "id",
                message: " What is the team manager's ID?",
            },
            {
                type: "input",
                name: "email",
                message: " What is the team manager's email?",
            },
            {
                name: "input",
                name: "number",
                message: "What is the team manager's number?",
            },
        ])
    );
}

async function engineerInput () {
    return new Engineer(
        await inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "What is the team engineer's name?",
            },
            {
                type: "input",
                name: "id",
                message: "What is the team engineer's ID?",
            },
            {
                type: "input",
                name: "email",
                message: "What is the team engineer's email?",
            },
            {
                name: "input",
                name: "github",
                message: "What is the team engineer's GitHub username?",
            },
        ])
    );
}

async function internInput() {
    return new Intern(
        await inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "What is the team intern's name?",
            },
            {
                type: "input",
                name: "id",
                message: "What is the team intern's ID?",
            },
            {
                type: "input",
                name: "email",
                message: "What is the team intern's email?",
            },
            {
                type: "input",
                name: "school",
                message: "Which school does the intern go to?"
            },
        ])
    );
}