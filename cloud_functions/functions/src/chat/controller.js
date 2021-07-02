const { handleError } = require("../../utils/handleError");
const {
  listenForPushMessages,
  listenForPullMessages,
  publishMessage,
  createSubscription,
} = require("./service");

const { PubSub } = require("@google-cloud/pubsub");
const pubSubClient = new PubSub({ projectId: process.env.PROJECT_ID });
const topicName = "OnlineSupport";
const subscriptionName = "ChatForOnlineSupport";
const timeout = 60;

exports.publishMessage = async (req, res) => {
  try {
    let message = req.body;
    let messageId = await publishMessage(pubSubClient, topicName, message);
    return res.status(200).json({
      success: true,
      message: `Message ${messageId} published :)`,
    });
  } catch (err) {
    return handleError(res, err);
  }
};

exports.pullDelivery = (req, res) => {
  try {
    listenForPullMessages(pubSubClient, subscriptionName, timeout);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Couldn't receive orders object :(",
      data: error,
    });
  }
};

exports.pushDelivery = async (req, res) => {
  try {
    let messageResponse = await listenForPushMessages(req.body.message.data);
    console.log("Message: ", messageResponse);
    return res.status(200).json({
      success: true,
      message: "Message received successfully :)",
      data: messageResponse,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      success: false,
      message: "Couldn't receive orders object :(",
      data: error,
    });
  }
};

exports.createSubscription = async (req, res) => {
  if (
    req.body &&
    req.body.restaurantId &&
    req.body.restaurantName &&
    req.body.uid
  ) {
    console.log("req.body.restaurantId", req.body.restaurantId);
    console.log("req.body.restaurantName", req.body.restaurantName);
    console.log("req.body.uid", req.body.uid);

    try {
      const subscriptionName =
        req.body.restaurantName.charAt(0) +
        req.body.restaurantId +
        "-" +
        req.body.uid;

      await createSubscription(pubSubClient, topicName, subscriptionName);
      return res.status(200).json({
        success: true,
        message: `Subscription ${subscriptionName} created.`,
      });
    } catch (e) {
      console.log({ e });
      return res.status(400).send("Something went wrong");
    }
  } else {
    return res.status(400).send("Missing fields");
  }
};
