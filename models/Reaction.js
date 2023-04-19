const { Schema, model, Types } = require('mongoose');

const ReactionSchema = new Schema({
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
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
    }
  },
  {
    toJSON: {
      getters: true
    },
    id: false
});

const Reaction = model('Reaction', ReactionSchema);

module.exports = Reaction;  