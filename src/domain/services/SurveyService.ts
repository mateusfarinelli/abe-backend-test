import { SurveyRepository } from '../../infra/repositories/SurveyRepository';
import { ISurvey, Survey } from '../entities/Survey';

export class SurveyService {
  private surveyRepository: SurveyRepository;

  constructor() {
    this.surveyRepository = new SurveyRepository();
  }

  async createSurvey(surveyData: Partial<ISurvey>): Promise<string> {
    return await this.surveyRepository.create(surveyData);
  }

  async updateSurvey(id: string, surveyData: Partial<ISurvey>): Promise<Survey | null> {
    return await this.surveyRepository.update(id, surveyData);
  }

  async findSurvey(id: string): Promise<Survey | null> {
    return await this.surveyRepository.findOne(id);
  }

  async listSurveysByAudience(targetAudience: string): Promise<Survey[]> {
    return await this.surveyRepository.findAllByAudience(targetAudience);
  }
}