const rewire = require('rewire')   
      eventHandler = rewire('../../app/routes/eventHandler'),
      getStarted = require('../../app/models/getStarted'),
      handleMessagingEvent = eventHandler.__get__('handleMessagingEvent');

describe("eventHandler", function() {
  beforeEach(function() {
    spyOn(getStarted, 'receivedPostback');        
  });

  describe("handleMessagingEvent", function() {
    it("tracks that receivedPostback was called", function() {
      //given
      var messagingEvent = {postback:{}}
      //when
      handleMessagingEvent(messagingEvent);
      //then
      expect(getStarted.receivedPostback).toHaveBeenCalled();
    });

    it("tracks that receivedPostback was not called", function() {
      //given
      var messagingEvent = {}
      //when
      handleMessagingEvent(messagingEvent);
      //then
      expect(getStarted.receivedPostback).not.toHaveBeenCalled();
    });
  });
});
