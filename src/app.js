import { formatDate, validateTask, mergeTaskUpdate } from './utils.js';
import { fetchSampleUsers } from './api.js';
import { createTask } from './utils.js';

console.log('Server starting...');

console.log(formatDate(new Date("2026-07-22")));

console.log(validateTask({ title: 'Title', dueDate: new Date("2026-07-22") }));

console.log(mergeTaskUpdate({ title: 'Title' }, { title: 'New Title' }));

try {
    fetchSampleUsers()
        .then(users => {
            console.log("Users:", users);

            const task = createTask({
                title: "Complete JavaScript Activity",
                dueDate: new Date("2026-07-22")
            });

            console.log("Created Task:", task);
        })
        .catch(error => {
            console.error("Error:", error);
        });

} catch (error) {
    console.error("Error:", error);
}
