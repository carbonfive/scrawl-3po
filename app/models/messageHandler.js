const reply = require('./reply');

messageQueue = {};

function receivedMessage(senderID, texts){
  messageQueue[senderID] = (messageQueue[senderID] || []);
  if (messageQueue[senderID].length === 0){
    setTimeout(function() {
      processMessage(senderID)
    }, 0);
  }
  messageQueue[senderID] = messageQueue[senderID].concat(texts);
}

function processMessage(senderID) {
  var text = messageQueue[senderID].shift();
  reply.sendTextMessage(senderID, text);
  if (messageQueue[senderID].length > 0) {
    setTimeout(function() {
      processMessage(senderID)
    }, 2000)
  }
}

module.exports.receivedMessage = receivedMessage;
