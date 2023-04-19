const { Schema, model, Types } = require('mongoose');

//defines a new schema
const ReactionSchema = new Schema({
    //defines the reaction body text
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    //defines who posted this reaction
    username: {
      type: String,
      required: true
    },
    //defines the time it was created at
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => {
        //based on the day formulates it to the project specifications
        let day = ``
        //gets the right suffix
        switch(timestamp.getDate()%10){
          case 1:
            day = `${timestamp.getDate()}st`;
            break;
          case 2:
            day = `${timestamp.getDate()}nd`;
            break;
          case 3:
            day = `${timestamp.getDate()}rd`;
            break;
          default:
            day = `${timestamp.getDate()}th`;
            break;
        }
        //converts military to standard ex: 13:25 becomes 1:25 PM
        let standardTime = timestamp.getHours() % 12 === 0 ? `12` : timestamp.getHours() % 12;
        let timeframe = timestamp.getHours() > 12 ? 'PM' : 'AM' ;
        //formatted string
        return `${timestamp.toString().substring(4,7)} ${day}, ${timestamp.getFullYear()} at ${standardTime}:${timestamp.getMinutes()} ${timeframe}`;
      }
    }
  },
  {
    toJSON: {
      getters: true
    },
    id: false
});

//creates the reaction and exports it to be used
const Reaction = model('Reaction', ReactionSchema);

module.exports = Reaction;  