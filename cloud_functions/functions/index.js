const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { userRoutes } = require("./src/users/user-routes");
const { questionRoutes } = require("./src/questions/question-routes");

const app = express();

app.use(bodyParser.json());
app.use(cors());
userRoutes(app);
questionRoutes(app);

exports.api = functions.https.onRequest(app);
