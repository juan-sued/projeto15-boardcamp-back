import express from 'express';
import cors from 'cors';
import chalk from 'chalk';

import categoriesRoutes from './routes/categoriesRoutes.js';
import gamesRoutes from './routes/gamesRoutes.js';
import customersRoutes from './routes/customersRoutes.js';
import rentalsRoutes from './routes/rentalsRoutes.js';

const server = express();

server.use(cors());
server.use(express.json());

server.use(categoriesRoutes, gamesRoutes, customersRoutes, rentalsRoutes);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(chalk.cyan('Servidor rodando na porta ' + PORT));
});
