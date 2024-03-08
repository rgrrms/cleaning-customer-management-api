import express from 'express';
import pkg from 'body-parser';
import routes from './routes/routes.js';
import cors from 'cors';
const { json } = pkg;

const app = express();
const PORT = 3001;

app.use(cors());
app.use(json());

app.use('/v1', routes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
