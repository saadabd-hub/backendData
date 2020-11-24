const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const mongooseConnect = require('./config/mongoUrl');
const route = require('./route/index');

const app = express();
const port = 3000;

mongooseConnect();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json);
app.use(cors())
app.use(route);

app.listen(port, ()=> {
    console.log(`App running on localhost:${port}`);
})