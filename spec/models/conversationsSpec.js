const rewire = require('rewire') 
      conversations = rewire('../../app/models/conversations');
      findNextState = conversations.__get__('findNextState');

describe("conversations", function() {
  describe("findNextState", function() {
    it("returns start state given introduction state and empty response", function(){
      //given
      var state = 'introduction'
      var response = ''
      //when 
      var result = findNextState(state, response)
      //then
      expect(result).toBe('start');
    });
    
    it("returns introduction state given response of 'billy'", function(){
      //given
      var state = 'title'
      var response = 'billy'
      //when
      var result = findNextState(state, response);
      //then
      expect(result).toBe("introduction")
    });
  });

  describe("get", function() {
    it("returns title state given user with start state", function(){
      //given
      var userStates = {'1234': {state: 'start'}};
      var userID = '1234'
      conversations.__set__('conversations', userStates);
      //when
      var result = conversations.get(userID);
      //then
      expect(result.state).toBe('start')
    });
  });
});
