const { admin } = require("../../utils/admin");
const { handleError } = require("../../utils/handleError");
const {
  getAllRestaurants,
  getRestaurantById,
  deleteRestaurant,
} = require("./service");

exports.all = async (req, res) => {
  console.log("Here");
  try {
    getAllRestaurants((err, results) => {
      if (err) {
        return handleError(res, err);
      }
      console.log(results);
      return res.status(201).json(results);
    });
  } catch (err) {
    return handleError(res, err);
  }
};

exports.get = async (req, res) => {
  try {
    const { id } = req.params;
    const data = [id];
    getRestaurantById(data, (err, results) => {
      if (err) {
        return handleError(res, err);
      }
      return res.status(201).json(results);
    });
  } catch (err) {
    return handleError(res, err);
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const data = [id];
    deleteRestaurant(data, async (err, results) => {
      if (err) {
        return handleError(res, err);
      }
      if (results.affectedRows > 0) {
        await admin.auth().deleteUser(id);
        return res.status(201).json({
          success: true,
          message: "Deleted successfully",
        });
      }
      return res.status(401).json({
        success: true,
        message: "Please check the restaurant id",
      });
    });
  } catch (err) {
    console.log(err);
    return handleError(res, err);
  }
};