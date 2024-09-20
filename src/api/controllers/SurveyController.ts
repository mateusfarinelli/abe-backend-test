import { Request, Response } from 'express';
import { SurveyService } from '../../domain/services/SurveyService';
import { FilledSurveyService } from '../../domain/services/FilledSurveyService';

const surveyService = new SurveyService();
const filledSurveyService = new FilledSurveyService();

export class SurveyController {
  static async createSurvey(req: Request, res: Response) {
    try {
      const survey = await surveyService.createSurvey(req.body);
      return res.status(201).json(survey);
    } catch (error: any) {
      return res.status(400).json({ message: error?.message });
    }
  }

  static async updateSurvey(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const updatedSurvey = await surveyService.updateSurvey(id, req.body);
      if (!updatedSurvey) {
        return res.status(404).json({ message: 'Survey not found' });
      }
      return res.status(200).json(updatedSurvey);
    } catch (error: any) {
      return res.status(400).json({ message: error?.message });
    }
  }

  static async fillSurvey(req: Request, res: Response) {
    try {
      const filledSurvey = await filledSurveyService.fillSurvey(req.body);
      return res.status(201).json(filledSurvey);
    } catch (error: any) {
      return res.status(400).json({ message: error?.message });
    }
  }

  static async listSurveys(req: Request, res: Response) {
    const { targetAudience } = req.query;
    try {
      const surveys = await surveyService.listSurveysByAudience(targetAudience as string);
      return res.status(200).json(surveys);
    } catch (error: any) {
      return res.status(400).json({ message: error?.message });
    }
  }
}
