const { store } = require('../models/store');

const taskController = {
    async createTask(req, res) {
        try {
            const { projectId } = req.params;
            const { title, description, priority, dueDate } = req.body;
            
            const projects = await store.getProjects();
            const tasks = await store.getTasks();
            if (!projectId){
                return res.status(404).json({ error: "projectId is missing" })
            }
            
            const project = projects.find(p => p.id === projectId);
            if (!project) {
                return res.status(404).json({ error: "project is missing: " + projectId.toString() });
            }
            
            const newTask = {
                pjId: parseInt(projectId),
                id: (tasks.length + 1).toString(),
                title,
                description,
                priority,
                dueDate,
                status: "not-started"
            };
            
            tasks.push(newTask);
            await store.saveTasks(tasks);
            
            res.status(201).json(newTask);
        }
        catch (error) {
        res.status(500).json({ error: "failed to create task" });
        }
    },

    async getProjectTasks(req, res) {
        try {
            const { projectId } = req.params;
            const projects = await store.getProjects();
            const tasks = await store.getTasks();

            if (!projectId){
                return res.status(404).json({ error: "projectId is missing" })
            }
            console.log(projects);
            const project = projects.find(p => p.id === projectId);
            if (!project) {
                return res.status(404).json({ error: "project is missing: " + projectId.toString() })
            }
            
            const projectTasks = tasks.filter(t => t.pjId.toString() === projectId);
            res.json(projectTasks);
        }
        catch (error) {
        res.status(500).json({ error: "failed to get tasks" });
        }
    },
    
    async updateTask(req, res) {
        try {
            const { projectId, taskId } = req.params;
            const updateData = req.body;

            const projects = await store.getProjects();
            const tasks = await store.getTasks();

            if (!projectId){
                return res.status(404).json({ error: "projectId is missing" })
            }
            if (!taskId){
                return res.status(404).json({ error: "taskId is missing" })
            }

            const project = projects.find(p => p.id === projectId);
            if (!project) {
                return res.status(404).json({ error: "project is missing: " + projectId.toString() })
            }

            const taskIndex = tasks.findIndex(t => t.id === taskId && t.pjId.toString() === projectId);
            
            if (taskIndex === -1) {
                return res.status(404).json({ error: "task is missing" });
            }
            
            tasks[taskIndex] = { ...tasks[taskIndex], ...updateData };
            await store.saveTasks(tasks);
                
            res.json(tasks[taskIndex]);
        }
        catch (error) {
            res.status(500).json({ error: "failed to update task" });
        }
    },
    
    async deleteTask(req, res) {
        try {
            const { projectId, taskId } = req.params;
            const tasks = await store.getTasks();
            
            if (!projectId){
                return res.status(404).json({ error: "projectId is missing" })
            }
            if (!taskId){
                return res.status(404).json({ error: "taskId is missing" })
            }

            const updatedTasks = tasks.filter(
            t => !(t.id === taskId && t.pjId.toString() === projectId)
            );
            
            await store.saveTasks(updatedTasks);
            res.json({ message: "task deletion success" });
        }
        catch (error) {
            res.status(500).json({ error: "falied to delete task" });
        }
    }
    };

module.exports = taskController;