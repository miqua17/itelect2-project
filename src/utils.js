export function formatDate(date) {
    return `Due: ${date.toLocaleDateString()}`;
}

export function validateTask({ title, dueDate } = {}) {
    return Boolean(title && dueDate);
}

export function mergeTaskUpdate(original, ...updates) {
    return Object.assign({}, original, ...updates);
}