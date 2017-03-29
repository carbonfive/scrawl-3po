const reply = require('./reply');

function receivedMessage(senderID, text){
  var time = 3000
  text.forEach(function(t){
    setTimeout(function(){ reply.sendTextMessage(senderID, t)}, time);
    time += 1000
  })      
}

module.exports.receivedMessage = receivedMessage;
