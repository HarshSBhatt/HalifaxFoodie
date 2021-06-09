const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const authenticate = require("./utils/isAuthenticated");
const { db } = require("./utils/admin");
const { routesConfig } = require("./src/users/routes-config");

const app = express();

app.use(bodyParser.json());
app.use(cors());
routesConfig(app);

exports.api = functions.https.onRequest(app);
