var users = {};


module.exports.findState = function findState(userID) {
  return users[userID].state;
};

module.exports.changeState = function changeState(userID, newState) {
  console.log(newState);
  users[userID] = {state: newState};
};

module.exports.lookUpMessage = function lookUpMessage(state){
  var convo = []
  if (state === "#introduction"){
  } else if (state === "#start"){
    convo = ["Lets's get started creating your scrawl"]  
  } else if (state === "#title"){
    convo = ["First, what's the name of your new EPIC SPACE OPERA episode?"]
  }
  return convo
};

module.exports.saveData = function saveData(userID, state){

}

module.exports.findNextState = function findNextState(userID){
  if (users[userID] === undefined){
    return "#start"
  }else if(users[userID].state === "#start") {
    return "#title";
  } else if (users[userID].state === "title")  {
    return "#episode";
  } 
}

module.exports.text = function text(senderID){
  var state = findState(senderID)
  var message = lookUpMessageState(state); 
};
