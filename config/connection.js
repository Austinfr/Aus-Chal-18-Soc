const mongoose = require('mongoose');
//sets up the connection to the database
mongoose.connect('mongodb://127.0.0.1:27017/socialnetDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;