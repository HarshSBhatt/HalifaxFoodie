const pool = require("../../config/database");
const { handleError } = require("../../utils/handleError");

exports.getAllQuestions = async (req, res) => {
  try {
    pool.query(`select * from questions`, [], (err, results, fields) => {
      if (err) {
        return handleError(res, err);
      }
      return res.status(201).json(results);
    });
  } catch (err) {
    return handleError(res, err);
  }
};
