const fs = require('fs').promises;
const path = require('path');

const PROJECT_FILE = path.join(__dirname, '../data/projects.json');
const TASK_FILE = path.join(__dirname, '../data/tasks.json');

const initializeStore = async() => {
    try {
        await fs.access(PROJECT_FILE);
    }
    catch {
        await fs.writeFile(PROJECT_FILE, JSON.stringify([]));
    }

    try {
        await fs.access(TASK_FILE);
    }
    catch {
        await fs.writeFile(TASK_FILE, JSON.stringify([]));
    }
};

const store = {
    async getProjects() {
        const data = await fs.readFile(PROJECT_FILE, 'utf8');
        return JSON.parse(data);
    }, 
    
    async getTasks() {
        const data = await fs.readFile(TASK_FILE, 'utf8');
        return JSON.parse(data);
    }, 

    async saveProjects(project) {
        await fs.writeFile(PROJECT_FILE, JSON.stringify(project, null, 2));
    }, 

    async saveTasks(tasks) {
        await fs.writeFile(TASK_FILE, JSON.stringify(tasks, null, 2));
    }
};

module.exports = { store, initializeStore };