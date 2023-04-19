//define variables to be used
const express = require('express');
require('dotenv').config();
const routes = require('./routes');
const db = require('./config/connection');

//creates the app
const app = express();
const PORT = process.env.PORT || 3001;

//sets up the middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//sets up the routes
app.use(routes);

//runs the application after the database is setup
db.once('open', () => {
    app.listen(PORT, () => console.log(`App listening on port: ${PORT}`));
});