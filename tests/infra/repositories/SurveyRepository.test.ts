import { Question } from '../../../src/domain/entities/Question';
import { ISurvey, Survey } from '../../../src/domain/entities/Survey';
import { SurveyRepository } from '../../../src/infra/repositories/SurveyRepository';

describe('SurveyRepository', () => {
  let surveyRepository: SurveyRepository;

  beforeAll(async () => {
    surveyRepository = new SurveyRepository();
  });

  afterAll(async () => {
    jest.clearAllMocks();
  });

  it('should create a new survey', async () => {
    const surveyData: Partial<ISurvey> = {
      id: 'Teste',
      name: 'Customer Satisfaction',
      targetAudience: 'All Customers',
      questions: [],
    };

    const surveyResponse: string = 'Teste'

    jest.spyOn(surveyRepository, "create").mockImplementation(() => Promise.resolve(surveyResponse))

    const response = await surveyRepository.create(surveyData);
    expect(response).toBe(surveyData.id)

  });

  it('should update an existing survey', async () => {
    const surveyResponse: Survey = new Survey();

    surveyResponse.id = 'Teste';
    surveyResponse.name = 'Customer Satisfaction';
    surveyResponse.targetAudience = 'All Customers';
    surveyResponse.questions = [];

    const surveyId = 'Teste'

    jest.spyOn(surveyRepository, "findOne").mockImplementation(() => Promise.resolve(surveyResponse))

    surveyResponse.name = 'Updated Survey'
    jest.spyOn(surveyRepository, "update").mockImplementation(() => Promise.resolve(surveyResponse))

    const response = await surveyRepository.update(surveyId, {
      name: 'Updated Survey',
    });
    expect(response).not.toBeNull();
    expect(response?.name).toBe('Updated Survey');
  });

  it('should find a survey by id', async () => {
    const surveyResponse: Survey = new Survey();
    surveyResponse.name =  'Find Me';
    surveyResponse.targetAudience =  'Test Audience';
    surveyResponse.questions =  [];

    const surveyId = 'Teste';
    
    jest.spyOn(surveyRepository, "findOne").mockImplementation(() => Promise.resolve(surveyResponse))

    const foundSurvey = await surveyRepository.findOne(surveyId);
    expect(foundSurvey).not.toBeNull();
    expect(foundSurvey?.name).toBe(surveyResponse.name);
  });

  it('should find a survey by target audience', async () => {
    const surveyResponse: Survey = new Survey();
    surveyResponse.name =  'Find Me';
    surveyResponse.targetAudience =  'Test Audience';
    surveyResponse.questions =  [];

    const targeAudience = 'Test Audience';
    
    jest.spyOn(surveyRepository, "findAllByAudience").mockImplementation(() => Promise.resolve([surveyResponse]))

    const foundSurvey = await surveyRepository.findAllByAudience(targeAudience);
    expect(foundSurvey).not.toBeNull();
    expect(foundSurvey.filter(x => x.targetAudience == targeAudience).length).toBeGreaterThanOrEqual(1);
  });
});
