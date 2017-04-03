const rewire = require('rewire'),   
      eventHandler = rewire('../../app/routes/eventHandler');

describe("eventHandler", function() {
  var request = {
    body: {
      object: 'page',
      entry: [
        { messaging: [1, 2, 3] },
        { messaging: [4, 5, 6] },
      ]
    }
  }
  var response = { sendStatus: jasmine.createSpy('sendStatus') };
  var inputMock ={ handleInput: jasmine.createSpy('handleInput')};

  beforeEach(function(){
    eventHandler.__set__('input', inputMock);
  });

  describe("requestBody", function(){
    it('always responds with success', function() {
      eventHandler.requestBody(request, response);
      expect(response.sendStatus).toHaveBeenCalledWith(200);
    });

    it('sends all messaging events to handleInput', function() {
      eventHandler.requestBody(request, response);
      expect(inputMock.handleInput).toHaveBeenCalledWith(1);
    })
  });
});
