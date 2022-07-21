const projects = [
    {
        name: 'edupage-api',
        description: 'A python library for accessing your Edupage account',
        link: 'https://github.com/ivanhrabcak/edupage-api'
    },
    {
        name: 'sudoku-solver-rs',
        description: 'A simple terminal-based remake of the sudoku game written in rust',
        link: 'https://github.com/ivanhrabcak/sudoku-solver-rs'
    },
    {
        name: 'minesweeper-rust',
        description: 'A terminal-based remake of minesweeper written in rust',
        link: 'https://github.com/ivanhrabcak/minesweeper-rust'
    },
    {
        name: 'advent-of-code-2021',
        description: 'The first 5 days of AoC 2021 in Haskell',
        link: 'https://github.com/ivanhrabcak/advent-of-code-2021',
    },
    {
        name: 'Ultrasound',
        description: 'An open-source project (iOS jailbreak tweak) I\'ve contrubted to.',
        link: 'https://github.com/aydenp/Ultrasound'
    },
    {
        name: 'cooper-rf-display-backend',
        description: 'A python rest api that collects data from cooper-rf weather stations',
        link: 'https://github.com/ivanhrabcak/cooper-rf-display-backend'
    }
]

const cardsDiv = document.getElementById('cards-list');
for (let project of projects) {
    const cardElement = document.createElement('card');

    const titleElement = document.createElement('div');
    titleElement.className = 'project-title';

    const descriptionElement = document.createElement('div');
    descriptionElement.className = 'description';

    const linkElement = document.createElement('a')
    linkElement.className = 'link';

    titleElement.textContent = project.name;
    descriptionElement.textContent = project.description;
    
    linkElement.href = project.link;
    linkElement.textContent = "Find it on Github";

    cardElement.onclick = () => {
        window.open(project.link);
    }

    cardElement.appendChild(titleElement);
    cardElement.appendChild(descriptionElement);
    cardElement.appendChild(linkElement);

    cardsDiv.appendChild(cardElement);
}

const birthDate = new Date(2005, 3, 24);
const ageDate = new Date(new Date() - birthDate);
const age = Math.abs(ageDate.getUTCFullYear() - 1970);

const ageDiv = document.getElementById('age');
ageDiv.textContent = age;