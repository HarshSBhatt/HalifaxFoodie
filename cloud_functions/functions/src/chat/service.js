const publishMessage = async (pubSubClient, topicName, payload) => {
  try {
    const dataBuffer = Buffer.from(JSON.stringify(payload));
    const messageId = await pubSubClient.topic(topicName).publish(dataBuffer);
    console.log(`Message ${messageId} published.`);
    return messageId;
  } catch (error) {
    console.error(`Received error while publishing: ${error.message}`);
    process.exitCode = 1;
  }
};

const listenForPushMessages = (payload) => {
  console.log("Payload: ", payload);
  const message = Buffer.from(payload, "base64").toString("utf-8");
  console.log("B Parse: ", message);
  return message;
};

const listenForPullMessages = (pubSubClient, subscriptionName, timeout) => {
  const subscription = pubSubClient.subscription(subscriptionName);
  let messageCount = 0;
  const messageHandler = (message) => {
    console.log(`Received message ${message.id}:`);
    console.log(`\tData: ${message.data}`);
    console.log(`\tAttributes: ${message.attributes}`);
    messageCount += 1;
    message.ack();
  };
  subscription.on("message", messageHandler);
  setTimeout(() => {
    subscription.removeListener("message", messageHandler);
    console.log(`${messageCount} message(s) received.`);
  }, timeout * 1000);
};

const createSubscription = async (
  pubSubClient,
  topicName,
  subscriptionName
) => {
  await pubSubClient.topic(topicName).createSubscription(subscriptionName);
};

module.exports = {
  publishMessage,
  listenForPullMessages,
  listenForPushMessages,
  createSubscription,
};
