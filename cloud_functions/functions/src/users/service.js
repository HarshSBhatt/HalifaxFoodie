const pool = require("../../config/database");

const createUser = (userData, callBack) => {
  pool.query(
    `insert into users(uid, email, display_name, phone_number, photo_url, provider_id, created_at) values(?,?,?,?,?,?,?)`,
    userData,
    (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    }
  );
};

module.exports = {
  createUser,
};
