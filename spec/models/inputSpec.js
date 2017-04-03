const rewire = require('rewire'),   
      input = rewire('../../app/models/input');

describe("input", function() {
  var conversationMock = {
    addMessage: jasmine.createSpy('addMessage').and.returnValue(["I'm a bot"])
  }
  var conversationsMock = {get: jasmine.createSpy('get').and.returnValue(conversationMock) };
  var messageHandlerMock = { receivedMessage: jasmine.createSpy('receivedMessage') };
  var messagingEvent = {message: {text:""}, sender: {id:"1"}}

  beforeEach(function(){
    input.__set__('conversations', conversationsMock);
    input.__set__('messageHandler', messageHandlerMock);
  });
  
  describe('handleInput', function(){
    it("calls messageHandler with appropriate arguments", function(){
      input.handleInput(messagingEvent)
      expect(messageHandlerMock.receivedMessage).toHaveBeenCalledWith("1",["I'm a bot"])
    });
  });

});
