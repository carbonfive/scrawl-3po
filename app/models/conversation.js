var users = {};
var convo = {'introduction': ["Greetings, I'm Scrawl-3PO, assembled by Carbon Five.", "We're going to make an EPIC SPACE OPERA scrawl that you can share with friends."], 
             'start': ["Let's get started creating your scrawl.", "https://scrawl3po.herokuapp.com/"] , 
             'title': ["First, what's the name of your new EPIC SPACE OPERA episode?"],
             'episode':[]}

function changeState(userID, newState) {
  users[userID] = {state: newState};
};

function findNextState(userID){
  var state = findState(userID);
  switch(state) {
    case undefined:
      return "start"
    case "start":
      return "title";
    case "title":
      return "episode";
  }
}

function findState(userID) {
  if (users[userID] === undefined){
    return undefined;
  }else {
    return users[userID].state;
  }
};

module.exports.convo = convo;
module.exports.changeState = changeState;
module.exports.findNextState = findNextState;
