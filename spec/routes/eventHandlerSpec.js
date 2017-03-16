var eventHandler = require('../../app/routes/eventHandler')
var handleMessagingEvent = eventHandler.handleMessagingEvent;
var getStarted = require('../../app/models/getStarted')

describe("eventHandler", function() {
  beforeEach(function() {
    spyOn(getStarted, 'receivedPostback');        
  });

  it("tracks that receivedPostback was called", function() {
    var messagingEvent = {postback:{}}
    handleMessagingEvent(messagingEvent);
    expect(getStarted.receivedPostback).toHaveBeenCalled();
  });
  
  it("tracks that receivedPostback was not called", function() {
    var messagingEvent = {}
    handleMessagingEvent(messagingEvent);
    expect(getStarted.receivedPostback).not.toHaveBeenCalled();
  });

});
