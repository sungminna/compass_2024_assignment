const commonValidation = (title, description, priority, dueDate, status) => {
    var errors = [];

    const validPriorities = ['high', 'medium', 'low'];
    if(priority && !validPriorities.includes(priority)){
        errors.push("proirity must be 'high', 'medium', 'low'");
    }

    if(dueDate) {
        const dueDateObj = new Date(dueDate);
        if(isNaN(dueDateObj.getTime())){
            errors.push('dueDate must be valid format (YYYY-MM-DD)');
        }
    }

    const validStatuses = ['not-started', 'in-progress', 'done', 'completed'];
    if (status && !validStatuses.includes(status)){
        errors.push("status must be 'not-started', 'in-progress', 'done'. 'completed'");
    }

    return errors;
}

const validatePostTask = (req, res, next) => {
    const { title, description, priority, dueDate, status } = req.body;
    var errors = [];

    errors = commonValidation(title, description, priority, dueDate, status);

    if(!title?.trim()){
        errors.push("title is necessary");
    }

    if(!description?.trim()){
        errors.push("description is necessary");
    }

    if (errors.length > 0){
        return res.status(400).json({ errors });
    }
    
    next();
};

const validatePutTask = (req, res, next) => {
    const { title, description, priority, dueDate, status } = req.body;
    var errors = [];

    errors = commonValidation(title, description, priority, dueDate, status);

    if (errors.length > 0){
        return res.status(400).json({ errors });
    }
    
    next();
}

module.exports = { validatePostTask, validatePutTask };