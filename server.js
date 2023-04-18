const express = require('express');
require('dotenv').config();
const routes = require('./controllers');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => console.log(`App listening on port: ${PORT}`));
});