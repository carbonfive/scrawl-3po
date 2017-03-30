const reply = require('./reply');

function receivedMessage(senderID, text){
  var time = 0
  text.forEach(function(t){
    setTimeout(function(){ reply.sendTextMessage(senderID, t)}, time);
    time += 2000
  })      
}

module.exports.receivedMessage = receivedMessage;
