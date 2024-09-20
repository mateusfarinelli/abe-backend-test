import { FilledSurvey, IFilledSurvey } from '../../../src/domain/entities/FilledSurvey';
import { Question } from '../../../src/domain/entities/Question';
import { EAnswerType } from '../../../src/domain/enums/EAnswerType';
import { FilledSurveyRepository } from '../../../src/infra/repositories/FilledSurveyRepository';

describe('FilledSurveyRepository', () => {
  let filledSurveyRepository: FilledSurveyRepository;

  beforeAll(async () => {
    filledSurveyRepository = new FilledSurveyRepository();
  });

  afterAll(async () => {
    jest.clearAllMocks();
  });

  it('should create a new filled survey', async () => {
    const filledSurveyData: Partial<IFilledSurvey> = {
      question: {id: '1'},
      answer: 5
    };

    const filledSurveyResponse: FilledSurvey = new FilledSurvey();

    filledSurveyResponse.id = 'teste';
    filledSurveyResponse.question = new Question();
    filledSurveyResponse.question.id = '1',
    filledSurveyResponse.answer = 5

    jest.spyOn(filledSurveyRepository, "create").mockImplementation(() => Promise.resolve(filledSurveyResponse))

    const filledSurvey = await filledSurveyRepository.create(filledSurveyData);
    expect(filledSurvey).toHaveProperty('id');
    expect(filledSurvey.answer).toEqual(filledSurveyData.answer);
  });
});
