const { Schema, model } = require('mongoose');
//creates a schema for thoughts
const ThoughtSchema = new Schema({
    //defines the thought text
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    //defines when it was created
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => {
        //formats the date to the project specifications
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
        //converts military to standard time ex 15:15 becomes 3:15 PM
        let standardTime = timestamp.getHours() % 12 === 0 ? `12` : timestamp.getHours() % 12;
        let timeframe = timestamp.getHours() > 12 ? 'PM' : 'AM' ;
        //returns the formatted string
        return `${timestamp.toString().substring(4,7)} ${day}, ${timestamp.getFullYear()} at ${standardTime}:${timestamp.getMinutes()} ${timeframe}`;
      }
    },
    //defines the username
    username: {
      type: String,
      required: true
    },
    //defines the reactions to hold an array storing reactions
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Reaction'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
});

//creates a virtual storing how many reactions a thought has
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

//creates and exports the model to be used
const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;