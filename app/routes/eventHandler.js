const messageHandler = require('../models/messageHandler'),
      getStarted = require('../models/getStarted'),
      conversation = require('../models/conversation'),
      receivedMessage = messageHandler.receivedMessage;

function requestBody (req, res) {
  var data = req.body;

  // Make sure this is a page subscription
  if (data.object == 'page') {
    // Iterate over each entry
    // There may be multiple if batched
    data.entry.forEach(function(pageEntry) {
      var pageID = pageEntry.id;
      var timeOfEvent = pageEntry.time;

      // Iterate over each messaging event
      pageEntry.messaging.forEach(function(messagingEvent) {
        handleMessagingEvent(messagingEvent)
        handleState(messagingEvent)
      });
    });

    // Assume all went well.
    //
    // You must send back a 200, within 20 seconds, to let us know you've 
    // successfully received the callback. Otherwise, the request will time out.
    res.sendStatus(200);
  }
}

function handleMessagingEvent (messagingEvent){
  if (messagingEvent.optin) {
    receivedAuthentication(messagingEvent);
  } else if (messagingEvent.message) {
  } else if (messagingEvent.delivery) {
    receivedDeliveryConfirmation(messagingEvent);
  } else if (messagingEvent.postback) {
    getStarted.receivedPostback(messagingEvent);
  } else if (messagingEvent.read) {
    receivedMessageRead(messagingEvent);
  } else if (messagingEvent.account_linking) {
    receivedAccountLink(messagingEvent);
  } else {
    console.log("Webhook received unknown messagingEvent: ", messagingEvent);
  }
}

function handleState(messagingEvent){
  var senderID = messagingEvent.sender.id
  var nextState = conversation.findNextState(senderID)
  conversation.changeState(senderID, nextState);
  messageHandler.receivedMessage(messagingEvent, conversation.convo[nextState]);
};

module.exports.requestBody = requestBody;
