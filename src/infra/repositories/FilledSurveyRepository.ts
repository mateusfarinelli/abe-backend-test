import { AppDataSource } from '../../data/configs/AppDataSource';
import { FilledSurvey, IFilledSurvey } from '../../domain/entities/FilledSurvey';

export class FilledSurveyRepository {
  private repository = AppDataSource.getRepository(FilledSurvey);

  async create(filledSurveyData: Partial<IFilledSurvey>): Promise<FilledSurvey> {
    const filledSurvey = this.repository.create(filledSurveyData);
    return await this.repository.save(filledSurvey);
  }
}