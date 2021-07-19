const moment = require("moment");
const sumBy = require("lodash/sumBy");

const { handleError } = require("../../utils/handleError");
const {
  createOrder,
  createOrderItems,
  getOrderByOrderId,
  getOrdersByRestaurantId,
  getOrdersByUserId,
  updateOrder,
  deleteOrder,
} = require("./service");

exports.createOrder = async (req, res) => {
  try {
    const orderStatus = "IN_PROGRESS";
    const orderItemData = [];
    const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");

    const userId = req.user.uid;
    const { orderAmount, restaurantId, orderItems } = req.body;

    if (orderItems && orderItems.length > 0) {
      const orderData = [
        orderAmount,
        orderStatus,
        currentTime,
        currentTime,
        userId,
        restaurantId,
      ];

      createOrder(orderData, async (err, results) => {
        if (err) {
          return handleError(res, err);
        }
        if (!results) {
          const error = {
            code: "Issue to fetch result",
            message: "Something went wrong",
          };
          return handleError(res, error);
        }
        const lastInsertedId = results.insertId;

        orderItems.forEach((orderItem) =>
          orderItemData.push([
            orderItem.quantity,
            orderItem.price,
            orderItem.totalPrice,
            orderItem.itemId,
            lastInsertedId,
          ])
        );
        createOrderItems(orderItemData, async (err, results) => {
          if (err) {
            return handleError(res, err);
          }
          if (!results) {
            const error = {
              code: "Issue to fetch result",
              message: "Something went wrong",
            };
            return handleError(res, error);
          }
          return res.status(201).json({
            success: true,
            message: "Order placed successfully",
            item: req.body,
          });
        });
      });
    } else {
      return res.status(401).json({
        success: true,
        message: "Please check the order details",
      });
    }
  } catch (err) {
    return handleError(res, err);
  }
};

exports.getOrderByOrderId = async (req, res) => {
  try {
    const { order_id } = req.params;
    const data = [order_id];
    getOrderByOrderId(data, (err, results) => {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(results);
    });
  } catch (err) {
    return handleError(res, err);
  }
};

exports.getOrdersByRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const data = [id];
    getOrdersByRestaurantId(data, (err, results) => {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(results);
    });
  } catch (err) {
    return handleError(res, err);
  }
};

exports.getOrdersByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = [id];
    getOrdersByUserId(data, (err, results) => {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(results);
    });
  } catch (err) {
    return handleError(res, err);
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
    const { order_id } = req.params;
    const { orderStatus } = req.body;
    const updatedFoodItemData = [orderStatus, currentTime, order_id];
    updateOrder(updatedFoodItemData, (err, results) => {
      if (err) {
        return handleError(res, err);
      }
      if (results.affectedRows > 0) {
        return res.status(200).json({
          success: true,
          message: "Updated successfully",
        });
      }
      return res.status(401).json({
        success: true,
        message: "Please check the order id",
      });
    });
  } catch (err) {
    return handleError(res, err);
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { order_id } = req.params;
    const data = [order_id];
    deleteOrder(data, (err, results) => {
      if (err) {
        return handleError(res, err);
      }
      if (results.affectedRows > 0) {
        return res.status(200).json({
          success: true,
          message: "Order deleted successfully",
        });
      }
      return res.status(401).json({
        success: true,
        message: "Please check the order id",
      });
    });
  } catch (err) {
    return handleError(res, err);
  }
};
