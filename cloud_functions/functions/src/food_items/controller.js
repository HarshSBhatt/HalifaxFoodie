const moment = require("moment");
const { handleError } = require("../../utils/handleError");
const {
  createFoodItem,
  getAllFoodItems,
  getFoodItemById,
  getFoodItemsByRestaurantId,
  deleteFoodItem,
  updateFoodItemById,
  getFeaturedFoodItemsByRestaurantId,
} = require("./service");

exports.create = async (req, res) => {
  try {
    const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
    const restaurantId = req.user.uid;
    const { itemName, price, recipe, featured, ingredients, preparationTime } =
      req.body;
    const foodItemData = [
      itemName,
      price,
      recipe,
      featured,
      ingredients,
      preparationTime,
      currentTime,
      currentTime,
      restaurantId,
    ];
    createFoodItem(foodItemData, async (err, results) => {
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
        message: "Food Item created",
        item: req.body,
      });
    });
  } catch (err) {
    return handleError(res, err);
  }
};

exports.allFoodItems = async (req, res) => {
  try {
    getAllFoodItems((err, results) => {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(results);
    });
  } catch (err) {
    return handleError(res, err);
  }
};

exports.getFoodItemById = async (req, res) => {
  try {
    const { item_id } = req.params;
    const data = [item_id];
    getFoodItemById(data, (err, results) => {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(results);
    });
  } catch (err) {
    return handleError(res, err);
  }
};

exports.getFoodItemsByRestaurant = async (req, res) => {
  try {
    const { restaurant_id } = req.params;
    const data = [restaurant_id];
    getFoodItemsByRestaurantId(data, (err, results) => {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(results);
    });
  } catch (err) {
    return handleError(res, err);
  }
};

exports.getFeaturedFoodItemsByRestaurant = async (req, res) => {
  try {
    const { restaurant_id } = req.params;
    const data = [restaurant_id];
    getFeaturedFoodItemsByRestaurantId(data, (err, results) => {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(results);
    });
  } catch (err) {
    return handleError(res, err);
  }
};

exports.updateFoodItem = async (req, res) => {
  try {
    const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
    const { item_id } = req.params;
    const { itemName, price, recipe, featured, ingredients, preparationTime } =
      req.body;
    const updatedFoodItemData = [
      itemName,
      price,
      recipe,
      featured,
      ingredients,
      preparationTime,
      currentTime,
      item_id,
    ];
    updateFoodItemById(updatedFoodItemData, (err, results) => {
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
        message: "Please check the food item id",
      });
    });
  } catch (err) {
    return handleError(res, err);
  }
};

exports.removeFoodItem = async (req, res) => {
  try {
    const { item_id } = req.params;
    const data = [item_id];
    deleteFoodItem(data, (err, results) => {
      if (err) {
        return handleError(res, err);
      }
      if (results.affectedRows > 0) {
        return res.status(200).json({
          success: true,
          message: "Deleted successfully",
        });
      }
      return res.status(401).json({
        success: true,
        message: "Please check the food item id",
      });
    });
  } catch (err) {
    return handleError(res, err);
  }
};
