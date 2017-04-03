var input = require('../models/input');

function requestBody (req, res) {
  var data = req.body;

  // Make sure this is a page subscription
  if (data.object == 'page') {
    // Iterate over each entry
    // There may be multiple if batched
    data.entry.forEach(function(pageEntry) {
      pageEntry.messaging.forEach(function(messagingEvent) {
        input.handleInput(messagingEvent)
      });
    });

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

module.exports.requestBody = requestBody;
