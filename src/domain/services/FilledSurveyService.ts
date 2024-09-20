import { FilledSurveyRepository } from '../../infra/repositories/FilledSurveyRepository';
import { FilledSurvey, IFilledSurvey } from '../entities/FilledSurvey';

export class FilledSurveyService {
  private filledSurveyRepository: FilledSurveyRepository;

  constructor() {
    this.filledSurveyRepository = new FilledSurveyRepository();
  }

  async fillSurvey(filledSurveyData: Partial<IFilledSurvey>): Promise<FilledSurvey> {
    return await this.filledSurveyRepository.create(filledSurveyData);
  }
}