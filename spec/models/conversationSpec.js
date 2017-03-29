const rewire = require('rewire') 
      conversation = rewire('../../app/models/conversation');

describe("conversation", function() {
  describe("findNextState", function() {
    it("returns start state given new user", function(){
      //given
      var userID = '1234'
      //when 
      var result = conversation.findNextState(userID)
      //then
      expect(result).toBe('start');
    });
    
    it("returns title state given user with start state", function(){
      //given
      var userStates = {'1234': {state: 'start'}};
      var userID = '1234'
      conversation.__set__('users', userStates);
      //when
      var result = conversation.findNextState(userID);
      //then
      expect(result).toBe("title")
    });
  });
});
