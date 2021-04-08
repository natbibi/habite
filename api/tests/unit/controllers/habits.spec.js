const habitsController = require('../../../controllers/habits')
const {Habit}  = require('../../../models/Habit');
jest.mock('../../../controllers')
jest.mock('../../../models/Habit')

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson }))
const mockRes = { status: mockStatus }


describe('habits controller', ()=>{
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe('showAllHabits', () => {
    test('it returns authors with a 200 status code', async () =>{
      jest.spyOn(Habit,'get','all')
        .mockResolvedValue(['Habit1','Habit2']);
      await habitsController.showAllHabits(null, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(200);  
      expect(mockJson).toHaveBeenCalledWith(['Habit1','Habit2']);
    })

  });

})
/*
describe('[nameOfControllerFunctionBeingTested]', () => {
  test('[describe test]', async () =>{
    jest.spyOn([nameOfModellFile],'[nameOfMethod]')
      mockResolvedValue.(['listOfExpectedValues']);
    await ['variableReferencingControllerinThisFile']
      .['nameOfControllerFunctionBeingTested(null,mockRes)'];
    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith(['listOfExpectedValues']);
  })
});
*/
