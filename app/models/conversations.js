var users = {};
var conversations = {};

const convo = {'introduction': ["Greetings, I'm Scrawl-3PO, assembled by Carbon Five.", "We're going to make an EPIC SPACE OPERA scrawl that you can share with friends."], 
             'start': ["Let's get started creating your scrawl.", "https://scrawl3po.herokuapp.com/"] , 
             'title': ["First, what's the name of your new EPIC SPACE OPERA episode?"],
             'episode':[]}

function findNextState(state){
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
    this.state = findNextState(this.state);
    return convo[this.state];
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
