const express = require('express');
const router = express.Router();

// import controller 
const projectController = require('../controllers/projectController');
const taskController = require('../controllers/taskController');


// project routes
router.post('/', projectController.createProject);
router.get('/', projectController.getAllProjects);
router.get('/:projectId', projectController.getProjectById);
router.delete('/:projectId', projectController.deleteProject);

// task routes
router.post('/:projectId/tasks', taskController.createTask);
router.get('/:projectId/tasks', taskController.getProjectTasks);
router.put('/:projectId/tasks/:taskId', taskController.updateTask);
router.delete('/:projectId/tasks/:taskId', taskController.deleteTask);

module.exports = router;