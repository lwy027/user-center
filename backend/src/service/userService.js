const connection = require(".");

class userService {
  async create(user) {
    const { name, password } = user;

    const statement = "INSERT INTO `user` (`name`, `password`) VALUES (?,?);";

    const [result] = await connection.execute(statement, [name, password]);
    return result;
  }

  async findUserByName(name) {
    const statement = "SELECT * FROM `user` WHERE `name` = ?;";
    const result = await connection.execute(statement, [name]);
    return result[0];
  }

  async getAllUser() {
    const statement = "SELECT * FROM `user`;";
    const result = await connection.execute(statement);
    return result[0];
  }
  async updataAvatorById(avatorUrl, id) {
    const statement = "UPDATE  `user` SET avatorUrl= ? WHERE id = ?;";

    const [result] = await connection.execute(statement, [avatorUrl, id]);
    console.log(result);
    return result;
  }
}

module.exports = new userService();
