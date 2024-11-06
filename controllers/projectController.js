const { store } = require('../models/store');

const projecetController = {
    async createProject(req, res){
        try {
            const { title, description } = req.body;
            const projects = await store.getProjects();

            const newProject = {
                id: (projects.length + 1).toString(), 
                title, 
                description, 
                tasks: []
            };
            projects.push(newProject);
            await store.saveProjects(projects);
            res.status(201).json(newProject);
        }
        catch (err) {
            res.status(500).json({ error: "failed to create project" })
        }
    }, 
    
    async getAllProjects(req, res){
        try {
            const projects = await store.getProjects();
            res.json(projects);
        }
        catch (err) {
            res.status(500).json({ error: "failed to list all projects" })
        }
    }, 

    async getProjectById(req, res){
        try {
            const { projectId } = req.params;
            const projects = await store.getProjects();
            const tasks = await store.getTasks();

            if (!projectId){
                return res.status(404).json({ error: "projectId is missing" })
            }

            const project = projects.find(p => p.id === projectId);
            if (!project) {
                return res.status(404).json({ error: "project is missing: " + projectId.toString() })
            }

            const projectTasks = tasks.filter(t => t.pjId.toString() === projectId);
            res.json({ ...project, tasks: projectTasks });
        }
        catch (err) {
            res.status(500).json({ error: "failed to fetch project" })
        }
    }, 


    async deleteProject(req, res) {
        try {
            const { projectId } = req.params;
            const projects = await store.getProjects();
            const tasks = await store.getTasks();
            
            if (!projectId){
                return res.status(404).json({ error: "projectId is missing" })
            }

            const project = projects.find(p => p.id === projectId);
            if (!project) {
                return res.status(404).json({error: "project is missing: " + projectId.toString()})
            }
            
            const projectTasks = tasks.filter(t => t.pjId.toString() === projectId);
            if (projectTasks.length > 0) {
                return res.status(400).json({ 
                error: "can't delete project with any tasks" 
                });
            }
            
            const updatedProjects = projects.filter(p => p.id !== projectId);
            await store.saveProjects(updatedProjects);
            
            res.json({ message: "project deletion success" });
        }
        catch (error) {
            res.status(500).json({ error: "failed to delete project" });
        }
    }, 
}

module.exports = projecetController;