const { PubSub } = require("@google-cloud/pubsub");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("../cors");

const chatRouter = express.Router();

chatRouter.use(bodyParser.json());

const pubSubClient = new PubSub();
const topicName = "test-chat";
const subscriptionName = "test-sub";
const data = JSON.stringify({ foo: "bar" });

const publishMessage = async () => {
  const dataBuffer = Buffer.from(data);
  try {
    // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
    const messageId = await pubSubClient.topic(topicName).publish(dataBuffer);
    console.log(`Message ${messageId} published.`);
  } catch (error) {
    console.error(`Received error while publishing: ${error.message}`);
    process.exitCode = 1;
  }
};

const listenForMessages = async () => {
  const subscription = pubSubClient.subscription(subscriptionName);

  // Create an event handler to handle messages
  let messageCount = 0;
  const messageHandler = (message) => {
    console.log(`Received message ${message.id}:`);
    console.log(`\tData: ${message.data}`);
    console.log(`\tAttributes: ${message.attributes}`);
    messageCount += 1;

    // "Ack" (acknowledge receipt of) the message
    message.ack();
  };
  // Listen for new messages until timeout is hit
  subscription.on("message", messageHandler);

  setTimeout(() => {
    subscription.removeListener("message", messageHandler);
    console.log(`${messageCount} message(s) received.`);
  }, 1000);
};

chatRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, (req, res, next) => {
    publishMessage();
  })
  .get(cors.cors, (req, res, next) => {
    listenForMessages();
  });

module.exports = chatRouter;
