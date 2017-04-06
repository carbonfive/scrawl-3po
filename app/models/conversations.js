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
    saveDate(this.state, this.scrawl_id, message)
    var responsesForState = findResponse(this.state, this.scrawl_id);
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

function saveDate(state, scrawl_id, message){
  switch(state) { 
    case  'episode':
      scrawl[scrawl_id] = {title: message}
    default:
      return 
  }
}


function findResponse(state, scrawl_id){
  switch(state) { 
    case 'title-confirmation':
      return responsesForState = [convo[state][0]].concat(["Epic space opera - Episode "+ scrawl_id +" : "+ scrawl[scrawl_id].title]).concat([convo[state][1]]);
    default:
      return responsesForState = convo[state];
  }
}

module.exports.get = get;
