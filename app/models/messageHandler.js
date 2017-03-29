const reply = require('./reply');

<<<<<<< Updated upstream
function receivedMessage(event, text){
  var senderID = event.sender.id;
=======
function receivedMessage(senderID, text){
>>>>>>> Stashed changes
  var time = 3000
  text.forEach(function(t){
    setTimeout(function(){ reply.sendTextMessage(senderID, t)}, time);
    time += 1000
  })      
}

module.exports.receivedMessage = receivedMessage;
