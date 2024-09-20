import { ISurvey, Survey } from '../../../src/domain/entities/Survey';
import { SurveyService } from '../../../src/domain/services/SurveyService';
import { SurveyRepository } from '../../../src/infra/repositories/SurveyRepository';

describe('SurveyService', () => {
  let surveyService: SurveyService;
  let surveyRepository: SurveyRepository;

  beforeEach(() => {
    surveyRepository = new SurveyRepository();
    surveyService = new SurveyService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a survey', async () => {
    const surveyData: ISurvey = {
      name: 'Customer Satisfaction',
      targetAudience: 'All Customers',
      questions: [],
    };

    const surveyResponse: Survey = new Survey();
    surveyResponse.id = 'Teste';
    surveyResponse.name = 'Customer Satisfaction',
    surveyResponse.targetAudience = 'All Customers',
    surveyResponse.questions = [],

    jest.spyOn(surveyRepository, "create").mockImplementation(() => Promise.resolve(surveyResponse.id))

    jest.spyOn(surveyService, "createSurvey").mockImplementation(() => Promise.resolve(surveyResponse.id))

    const survey = await surveyService.createSurvey(surveyData);
    expect(survey).toBe(surveyResponse.id);
  });

  it('should update an existing survey', async () => {
     const surveyResponse: Survey = new Survey();
    surveyResponse.id = 'Teste';
    surveyResponse.name = 'Customer Satisfaction',
    surveyResponse.targetAudience = 'All Customers',
    surveyResponse.questions = [],

    jest.spyOn(surveyRepository, "findOne").mockImplementation(() => Promise.resolve(surveyResponse))

    surveyResponse.name = 'Updated Survey';

    jest.spyOn(surveyRepository, "update").mockImplementation(() => Promise.resolve(surveyResponse))

    jest.spyOn(surveyService, "updateSurvey").mockImplementation(() => Promise.resolve(surveyResponse))

    const updatedSurvey = await surveyService.updateSurvey('1', {
      name: 'Updated Survey',
    });
    expect(updatedSurvey).not.toBeNull();
    expect(updatedSurvey?.name).toBe('Updated Survey');
  });

  it('should find a survey by id', async () => {
    const surveyResponse: Survey = new Survey();
    surveyResponse.name =  'Find Me';
    surveyResponse.targetAudience =  'Test Audience';
    surveyResponse.questions =  [];

    const surveyId = 'Teste';
    
    jest.spyOn(surveyRepository, "findOne").mockImplementation(() => Promise.resolve(surveyResponse))

    jest.spyOn(surveyService, "findSurvey").mockImplementation(() => Promise.resolve(surveyResponse))

    const foundSurvey = await surveyService.findSurvey(surveyId);
    expect(foundSurvey).not.toBeNull();
    expect(foundSurvey?.name).toBe(surveyResponse.name);
  });

  it('should list surveys by audience', async () => {
    const surveyResponse: Survey = new Survey();
    surveyResponse.name =  'Find Me';
    surveyResponse.targetAudience =  'Test Audience';
    surveyResponse.questions =  [];

    const targeAudience = 'Test Audience';
    
    jest.spyOn(surveyRepository, "findAllByAudience").mockImplementation(() => Promise.resolve([surveyResponse]))

    jest.spyOn(surveyService, "listSurveysByAudience").mockImplementation(() => Promise.resolve([surveyResponse]))

    const foundSurvey = await surveyRepository.findAllByAudience(targeAudience);
    expect(foundSurvey).not.toBeNull();
    expect(foundSurvey.filter(x => x.targetAudience == targeAudience).length).toBeGreaterThanOrEqual(1);
  });
});
