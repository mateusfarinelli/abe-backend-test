import { Router } from 'express';
import { SurveyController } from '../../controllers/SurveyController';

const SurveyRoutes = Router();

SurveyRoutes.post('/', SurveyController.createSurvey);
SurveyRoutes.put('/:id', SurveyController.updateSurvey);
SurveyRoutes.post('/filled-surveys', SurveyController.fillSurvey);
SurveyRoutes.get('/', SurveyController.listSurveys);

export default SurveyRoutes;
