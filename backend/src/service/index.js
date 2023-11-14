const mysql = require("mysql2");

//1.创建连接池
const connectionPool = mysql.createPool({
  host: "localhost",
  port: 3306,
  database: "user-center",
  user: "root",
  password: "Liweiye123456",
  connectionLimit: 5,
});

//2.判断连接是否成功
connectionPool.getConnection((err, connention) => {
  if (err) {
    console.log("数据库连接失败", err);
    return;
  }
  //与连接池进行连接处理
  connention.connect((err) => {
    if (err) {
      console.log("和数据库连接失败", err);
    } else {
      console.log("和数据库连接成功");
    }
  });
});

const connection = connectionPool.promise();

module.exports = connection;
