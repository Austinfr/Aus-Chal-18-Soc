const { Schema, model } = require('mongoose');
//defines the userschema
const UserSchema = new Schema({
    //defines the username
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    //defines the email and matchess with regex
    email: {
      type: String,
      required: true,
      unique: true,
      //matches very generically
      match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },
    //defines the thoughts array to hold associated thoughts
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    //defines the friends array to hold associated friends
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true
    },
    id: false
});
//defines the friendcount virtual to hold the length of the friends array
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

//defines and exports the model to be used
const User = model('User', UserSchema);

module.exports = User;