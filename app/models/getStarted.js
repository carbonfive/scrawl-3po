/*
 * Postback Event
 *
 * This event is called when a postback is tapped on a Structured Message. 
 * https://developers.facebook.com/docs/messenger-platform/webhook-reference/postback-received
 * 
 */
var reply = require('./reply')

function receivedPostback(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfPostback = event.timestamp;

  // The 'payload' param is a developer-defined field which is set in a postback 
  // button for Structured Messages. 
  var payload = event.postback.payload;

  console.log("Received postback for user %d and page %d with payload '%s' " + 
    "at %d", senderID, recipientID, payload, timeOfPostback);

  // When a postback is called, we'll send a message back to the sender to 
  // let them know it was successful
  setTimeout(function (){reply.sendTextMessage(senderID, "Greetings, I'm Scrawl-3PO, assembled by Carbon Five.")}, 1000);
  setTimeout(function (){reply.sendTextMessage(senderID, "We're going to make an EPIC SPACE OPERA scrawl that you can share with friends.")}, 2000);
}


module.exports.receivedPostback = receivedPostback;
