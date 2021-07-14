const pool = require("../../config/database");

const createFoodItem = (foodItemData, callBack) => {
  const query = `insert into food_items(item_name, price, recipe, featured, ingredients, preparation_time, restaurant_id) values(?,?,?,?,?,?,?)`;
  pool.query(query, foodItemData, (error, results, fields) => {
    if (error) {
      callBack(error);
    }
    return callBack(null, results);
  });
};

const getAllFoodItems = (callBack) => {
  pool.query(`select * from food_items`, [], (error, results, fields) => {
    if (error) {
      callBack(error);
    }
    return callBack(null, results);
  });
};

const getFoodItemById = (data, callBack) => {
  pool.query(
    `select * from food_items fi inner join restaurants r on fi.restaurant_id = r.restaurant_id where fi.item_id = ?`,
    data,
    (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    }
  );
};

const getFoodItemsByRestaurantId = (data, callBack) => {
  pool.query(
    `select * from food_items fi inner join restaurants r on fi.restaurant_id = r.restaurant_id where fi.restaurant_id = ?`,
    data,
    (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    }
  );
};

const getFeaturedFoodItemsByRestaurantId = (data, callBack) => {
  pool.query(
    `select * from food_items fi inner join restaurants r on fi.restaurant_id = r.restaurant_id where fi.restaurant_id = ? and fi.featured = true limit 5`,
    data,
    (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    }
  );
};

const updateFoodItemById = (data, callBack) => {
  pool.query(
    `update food_items set item_name = ?, price = ?, recipe = ?, featured = ?, ingredients = ?, preparation_time = ? where item_id = ?`,
    data,
    (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    }
  );
};

const deleteFoodItem = (data, callBack) => {
  pool.query(
    `delete from food_items where item_id = ?`,
    data,
    (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    }
  );
};

module.exports = {
  createFoodItem,
  getAllFoodItems,
  getFoodItemById,
  getFoodItemsByRestaurantId,
  getFeaturedFoodItemsByRestaurantId,
  updateFoodItemById,
  deleteFoodItem,
};
