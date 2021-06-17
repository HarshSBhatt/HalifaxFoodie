const pool = require("../../config/database");

const mapQuestionToUser = (userQuestionData, callBack) => {
  pool.query(
    `insert into user_questions(user_id, question_id, answer) values(?,?,?)`,
    userQuestionData,
    (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    }
  );
};

const getSecurityQuestions = (callBack) => {
  pool.query(`select * from questions`, [], (error, results, fields) => {
    if (error) {
      callBack(error);
    }
    return callBack(null, results);
  });
};

module.exports = {
  mapQuestionToUser,
  getSecurityQuestions,
};
