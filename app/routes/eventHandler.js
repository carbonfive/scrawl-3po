const messageHandler = require('../models/messageHandler'),
      getStarted = require('../models/getStarted'),
      conversations = require('../models/conversations'),
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
        handleInput(messagingEvent)
      });
    });

    // Assume all went well.
    //
    // You must send back a 200, within 20 seconds, to let us know you've 
    // successfully received the callback. Otherwise, the request will time out.
    res.sendStatus(200);
  }
}

//function handleMessagingEvent (messagingEvent){
//  if (messagingEvent.optin) {
//    receivedAuthentication(messagingEvent);
//  } else if (messagingEvent.message) {
//  } else if (messagingEvent.delivery) {
//    receivedDeliveryConfirmation(messagingEvent);
//  } else if (messagingEvent.postback) {
//    getStarted.receivedPostback(messagingEvent);
//  } else if (messagingEvent.read) {
//    receivedMessageRead(messagingEvent);
//  } else if (messagingEvent.account_linking) {
//    receivedAccountLink(messagingEvent);
//  } else {
//    console.log("Webhook received unknown messagingEvent: ", messagingEvent);
//  }
//}

function handleInput(messagingEvent){
  var message = messagingEvent.message

  if (message){
    userResponse(messagingEvent)
  }else {
    handleState(messagingEvent)
  }
}

function handleState(messagingEvent){
  var senderID = messagingEvent.sender.id
  var conversation = conversations.get(senderID)
  var responseExpected = conversation.isResponseExpected();
  var replyText = conversation.addMessage();

  messageHandler.receivedMessage(senderID, replyText);

  if (!responseExpected){
    conversation.applyNextState()
    handleState(messagingEvent)
  }
};

function userResponse(messagingEvent){
  var senderID = messagingEvent.sender.id
  var conversation = conversations.get(senderID)
  var response = messagingEvent.message.text

  conversation.applyNextState(response)
  handleState(messagingEvent)
}

module.exports.requestBody = requestBody;
