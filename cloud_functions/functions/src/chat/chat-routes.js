const { isAuthenticated } = require("../../utils/isAuthenticated");
const {
  publishMessage,
  pushDelivery,
  pullDelivery,
  createSubscription,
} = require("./controller");

exports.chatRoutes = (app) => {
  app.get("/chat/pull", isAuthenticated, pullDelivery);
  app.post("/chat/push", isAuthenticated, pushDelivery);
  app.post("/chat", isAuthenticated, publishMessage);
  app.post("/chat/subscription", isAuthenticated, createSubscription);
};
