import 'reflect-metadata'; 
import cors from 'cors';
import bodyParser from 'body-parser';
import { AppDataSource } from './data/configs/AppDataSource';
import SurveyRoutes from './api/configs/routes/SurveyRoutes';
import express from 'express';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conexão com o banco de dados
AppDataSource.initialize()
  .then(() => {
    console.log('Connected to the database.');

    app.use('/survey', SurveyRoutes);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });