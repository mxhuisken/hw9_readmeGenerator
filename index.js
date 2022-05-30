// TODO: Include packages needed for this application

const fs = require('fs');
const inquirer = require('inquirer');

// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project?',
    },
    {
        type: 'input',
        name: 'description',
        message: 'Description of your project:',
    },
    {
        type: 'input',
        name: 'preview',
        message: 'Add a preview of your proctject:',
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Installation instructions:',
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Who/what is your project useful for?',
    },
    {
        type: 'list',
        name: 'licenses',
        message: 'What type of liscense was used:',
        choices: ['MIT','GPLv3','GPL', 'Unlicense'],
    },
    {
        type: 'input',
        name: 'contribution',
        message: 'Provide guidelines for contribution:',
    },
    {
        type: 'input',
        name: 'test',
        message: 'How can your project be tested?',
    },
    {
        type: 'input',
        name: 'githubUserName',
        message: 'Enter your Github username:',
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter your email address:',
    },
];

//Create function to create README.md & add content to page

const createReadme = (data) => {
    var licenses = '';
    switch (data.licenses[0]){
        case 'MIT':
            licenses = '[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)';
            break;
        case 'GPLv3':
            licenses = '[![GPLv3 license](https://img.shields.io/badge/License-GPLv3-blue.svg)](http://perso.crans.org/besson/LICENSE.html)';
            break;
        case 'GPL':
            licenses = '[![GPL license](https://img.shields.io/badge/License-GPL-blue.svg)](http://perso.crans.org/besson/LICENSE.html)';
            break;
        case 'Unlicense':
            licenses = '[![Unlicense](https://img.shields.io/badge/License-Unlicense-blue.svg)](https://unlicense.org/)';
            break;
        }
    fs.writeFileSync('./READMEexample.md', `
    
# ${data.title}

  ${licenses}

## Table of Contents  📚
- [Description](#description)
- [Project Preview](#Project-Preview)
- [Installation](#installation)
- [Usage](#usage)
- [Contributions](#contribution)
- [Test Instructions](#test-instructions)
- [Contact](#Contacts)

## Description  📋

${data.description}

## Project Preview 📸

![Visual](${data.preview})

## Installation  📀

${data.installation}

## Usage  🖥

${data.usage}

## Contribution 📥

${data.contribution}

## Test Instructions 📍

${data.test}

## Contacts 📞

Any questions? Please reach out to me! Contact info listed below:

- Github: https://github.com/${data.githubUserName} 
- Email: ${data.email}

`);
};

//Calling Inquirer

inquirer.prompt(questions).then((data) => {
	createReadme(data);
	const filename = `${data.title.toLowerCase().split(' ').join('')}.json`;

	fs.writeFileSync(filename, JSON.stringify(data, null, '\t'), (err) =>
		err ? console.log(err) : console.log('Success!')
	);
});