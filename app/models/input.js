var messageHandler = require('../models/messageHandler');
var conversations = require('../models/conversations');

function handleInput(messagingEvent){
  var message = messagingEvent.message
  if (message === undefined) {
    var message = {text: ""}
  }
  var senderID = messagingEvent.sender.id
  var conversation = conversations.get(senderID)
  var replyText = conversation.addMessage(message.text);

  messageHandler.receivedMessage(senderID, replyText);
};

module.exports.handleInput = handleInput;
