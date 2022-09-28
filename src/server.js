import express from 'express';
import cors from 'cors';
import chalk from 'chalk';

import categoriesRoutes from './routes/categoriesRoutes.js';

const server = express();

server.use(cors());
server.use(express.json());

server.use(categoriesRoutes);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(chalk.cyan('Servidor rodando na porta ' + PORT));
});
