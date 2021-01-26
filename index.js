require("dotenv").config();
let express = require('express');
let app = express();
const sequelize = require("./db");

let log = require('./controllers/logcontroller');
let username = require('./controllers/usernamecontroller');

sequelize.sync();

// app.use(require('/middleware/headers'));

app.use(express.json());

app.use('/username', username);
app.use('/log', log);

app.listen(3000, function(){
    console.log('App is listening on port 3000');
});