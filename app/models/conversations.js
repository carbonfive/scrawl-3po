var users = {};
var conversations = {};

const convo = {'introduction': ["Greetings, I'm Scrawl-3PO, assembled by Carbon Five.", "We're going to make an EPIC SPACE OPERA scrawl that you can share with friends."], 
             'start': ["Let's get started creating your scrawl.", "https://scrawl3po.herokuapp.com/"] , 
             'title': ["First, what's the name of your new EPIC SPACE OPERA episode?"],
             'episode':[]}
const resBool = {'introduction': false, 'start': false, 'title': true, 'episode': false}

function findNextState(state, response){
  if (response == "billy"){
    return "introduction"
  }
  switch(state) {
    case "introduction":
      return "start"
    case "start":
      return "title";
    case "title":
      return "episode";
  }
}

function Conversation() {
  this.state = "introduction";
  this.addMessage = function() {
    return convo[this.state];
  }
  this.applyNextState = function(response="") {
    this.state = findNextState(this.state, response);
  }
  this.applyResBool = function(){
    return resBool[this.state]
  }
}

function get(userId){
  let conversation = conversations[userId];

  if (conversation === undefined){
    conversation = new Conversation();
    conversations[userId] = conversation;
  }

  return conversation;
}

module.exports.get = get;
