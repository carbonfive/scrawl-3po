const reply = require('./reply')

function receivedPostback(event) {
  var senderID = event.sender.id;

  setTimeout(function (){reply.sendTextMessage(senderID, "Greetings, I'm Scrawl-3PO, assembled by Carbon Five.")}, 1000);
  setTimeout(function (){reply.sendTextMessage(senderID, "We're going to make an EPIC SPACE OPERA scrawl that you can share with friends.")}, 2000);
}

module.exports.receivedPostback = receivedPostback;
