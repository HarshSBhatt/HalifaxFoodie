const pool = require("../../config/database");

const createUser = (userData, u_role, callBack) => {
  const query =
    u_role === "admin"
      ? `insert into restaurants(restaurant_id, restaurant_name, email, phone_number, u_role, created_at) values(?,?,?,?,?,?)`
      : `insert into users(uid, email, display_name, phone_number, photo_url, provider_id, u_role, created_at) values(?,?,?,?,?,?,?,?)`;
  pool.query(query, userData, (error, results, fields) => {
    if (error) {
      callBack(error);
    }
    return callBack(null, results);
  });
};

module.exports = {
  createUser,
};
