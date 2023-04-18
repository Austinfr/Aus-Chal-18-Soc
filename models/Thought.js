const { Schema, model } = require('mongoose');

const ThoughtSchema = new Schema({
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => {
        let day = ``
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

        let standardTime = timestamp.getHours() % 12 === 0 ? `12` : timestamp.getHours() % 12;
        let timeframe = timestamp.getHours() > 12 ? 'PM' : 'AM' ;

        return `${timestamp.toString().substring(4,7)} ${day}, ${timestamp.getFullYear()} at ${standardTime}:${timestamp.getMinutes()} ${timeframe}`;
      }
    },
    username: {
      type: String,
      required: true
    },
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
  
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});


const Thought = model('thought', ThoughtSchema);

module.exports = Thought;