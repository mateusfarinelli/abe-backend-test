import { AppDataSource } from '../../data/configs/AppDataSource';
import { ISurvey, Survey } from '../../domain/entities/Survey';

export class SurveyRepository {
  private repository = AppDataSource.getRepository(Survey);

  async create(surveyData: Partial<ISurvey>): Promise<string> {
    const survey = this.repository.create(surveyData);
    return (await this.repository.save(survey)).id;
  }

  async update(id: string, surveyData: Partial<ISurvey>): Promise<Survey | null> {
    await this.repository.update(id, surveyData);
    return await this.repository.findOneBy({id});
  }

  async findOne(id: string): Promise<Survey | null> {
    return await this.repository.findOneBy({id});
  }

  async findAllByAudience(targetAudience: string): Promise<Survey[]> {
    return await this.repository.find({ where: { targetAudience } });
  }
}