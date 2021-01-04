require('dotenv').config();

const {client, getAllLinks, createLink, createInitialLink} = require('./data_layer');

const express = require("express");
const path = require("path")
const bodyParser = require('body-parser');


const { sync } = require("./data_layer/index");
const { nextTick } = require('process');
const { Server } = require('http');

const PORT = process.env.PORT || 3001;
const FORCE = process.env.FORCE || false;

const app = express();
const volleyball = require("volleyball");
app.use(volleyball);
app.use(express.static(path.join(__dirname, "build")));
app.use(bodyParser.json());

// make a route for each front end page
// each time you add a front end route using react router, it needs to be added to this array
["createLink", "searchBar", "/"].forEach((route) => {  app.get(`/${route}`, (req, res) => { res.sendFile(path.join(__dirname, "build", "index.html"));  });});

const apiRouter = require('./api');
app.use('/api', apiRouter);

const startServer = new Promise((resolve) => {
  app.listen(PORT, () => {
    console.log("The server is listening on port", PORT)
    resolve();
  });
});

sync(FORCE)
  .then(startServer)
  // .then(createInitialLink())
  .catch((error) => {
    console.error(`YIKES: ${error.toString()}`);
  });
