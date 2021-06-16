const { config } = require("./config");
const { createPool } = require("mysql");

const connectionDetails = {
  host: config.MYSQL_HOST,
  port: config.MYSQL_PORT,
  user: config.MYSQL_USERNAME,
  password: config.MYSQL_PASSWORD,
  database: config.MYSQL_DATABASE,
};

const pool = createPool(connectionDetails);

exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  pool.getConnection((err, connection) => {
    if (err) {
      callback(err);
    }
    connection.query(
      `select uq.question_id, q.question from user_questions uq inner join questions q on uq.question_id=q.question_id where uq.user_id = ?`,
      [event.uid],
      (err, results, fields) => {
        connection.release();
        if (err) {
          callback(err);
        }
        callback(null, results[0]);
        process.exit();
      }
    );
  });
};
