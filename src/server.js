import express from 'express';
import mailingRouter from './routes/mailing.js';

const server = express();
const PORT = process.env.PORT || 3001;

server.use(express.json());
server.use('/api/mailing', mailingRouter);

server.listen(PORT, () => console.log(`Server ejecuting on port: ${PORT}`));
