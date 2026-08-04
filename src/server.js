import 'dotenv/config';
import express from 'express';
import router, { setCachedUsers } from './routes/index.js';
import { fetchSampleUsers } from './api.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api', router);

fetchSampleUsers()
    .then(users => {
        setCachedUsers(users);
        console.log(`Cached ${users.length} users at startup`);
    })
    .catch(error => {
        console.error('Failed to cache users at startup:', error);
    })
    .finally(() => {
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    });