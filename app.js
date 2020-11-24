const express = require('express');
const mongooseConnect = require('./config/mongoUrl');
const route = require('./route/index');

const app = express();
const port = 3000;

mongooseConnect();

app.use(express.urlencoded({extended: true}));
app.use(express.json);
app.use(route);

app.listen(port, ()=> {
    console.log(`App running on localhost:${port}`);
})