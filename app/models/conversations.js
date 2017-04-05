var conversations = {};
var scrawl = {}

const convo = {'introduction': ["Greetings, I'm Scrawl-3PO, assembled by Carbon Five.", "We're going to make an EPIC SPACE OPERA scrawl that you can share with friends."], 
             'start': ["Let's get started creating your scrawl."] , 
             'title': ["First, what's the name of your new EPIC SPACE OPERA episode?"],
             'episode':[""],
             'title-confirmation': ["Alright, your title is:", "Sounds epic, right?"]
}
const responseExpected = {'introduction': false, 'start': false, 'title': true, 'episode': false, 'title-confirmation': true}

function findNextState(state, response){
  if (response === "billy"){
    return "introduction"
  }
  switch(state) {
    case "introduction":
      return "start"
    case "start":
      return "title";
    case "title":
      return "episode";
    case "episode":
      return "title-confirmation";
    default:
      return "introduction";
  }
}

function Conversation() {
  this.state = "";
  this.scrawl_id = Object.keys(scrawl).length + 1;
  this.addMessage = function(message) {
    this.state = findNextState(this.state, message);
    var responsesForState = foo(this.state, this.scrawl_id, message);
    if(!responseExpected[this.state]) {
      responsesForState = responsesForState.concat(this.addMessage());
    }
    return responsesForState;
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

function foo(state, scrawl_id, message){
  if (state === 'episode'){
    scrawl[scrawl_id] = {title: message}
    return responsesForState = convo[state];
  }else if (state === 'title-confirmation'){
    return responsesForState = [convo[state][0]].concat(["Epic space opera - Episode "+ scrawl_id +" : "+ scrawl[scrawl_id].title]).concat([convo[state][1]]);
  }else{
    return responsesForState = convo[state];
  }
}

module.exports.get = get;
