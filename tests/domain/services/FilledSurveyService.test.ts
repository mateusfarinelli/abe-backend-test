import { FilledSurvey, IFilledSurvey } from '../../../src/domain/entities/FilledSurvey';
import { Question } from '../../../src/domain/entities/Question';
import { FilledSurveyService } from '../../../src/domain/services/FilledSurveyService';
import { FilledSurveyRepository } from '../../../src/infra/repositories/FilledSurveyRepository';

describe('FilledSurveyService', () => {
  let filledSurveyService: FilledSurveyService;
  let filledSurveyRepository: FilledSurveyRepository;

  beforeEach(() => {
    filledSurveyRepository = new FilledSurveyRepository();
    filledSurveyService = new FilledSurveyService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fill a survey', async () => {
    const filledSurveyData: Partial<IFilledSurvey> = {
      question: {id: '1', },
      answer: 'Teste'
    };

    const filledSurveyResponse: FilledSurvey = new FilledSurvey();

    filledSurveyResponse.id = 'Teste';
    filledSurveyResponse.question = new Question();
    filledSurveyResponse.answer = 'Teste'
    

    jest.spyOn(filledSurveyService, "fillSurvey").mockImplementation(() => Promise.resolve(filledSurveyResponse))

    const filledSurvey = await filledSurveyService.fillSurvey(filledSurveyData);
    expect(filledSurvey).toHaveProperty('id');
    expect(filledSurvey.answer).toEqual(filledSurveyData.answer);
  });
});
