export function formatDate(date) {
    return `Due: ${date.toLocaleDateString()}`;
}

export function validateTask({ title, dueDate } = {}) {
    return Boolean(title && dueDate);
}

export function mergeTaskUpdate(original, ...updates) {
    return Object.assign({}, original, ...updates);
}       

export class TaskValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "TaskValidationError";
    }
}


export function createTask(taskData) {

    if (!validateTask(taskData)) {
        throw new TaskValidationError("Invalid task data");
    }

    return {
        id: Date.now(),
        completed: false,
        ...taskData
    };
}


export const tasks = [
    {
        id: 1,
        title: "Complete JavaScript Activity",
        completed: false
    },
    {
        id: 2,
        title: "Study Express",
        completed: true
    }
];


export const mockTasks = [
    { id: 1, title: "Complete JavaScript Activity", dueDate: "2026-07-22", completed: false },
    { id: 2, title: "Review Express routing", dueDate: "2026-07-25", completed: false },
    { id: 3, title: "Prepare project README", dueDate: "2026-07-28", completed: true },
    { id: 4, title: "Set up environment variables", dueDate: "2026-07-20", completed: true },
    { id: 5, title: "Test API endpoints in Postman", dueDate: "2026-07-30", completed: false }
];