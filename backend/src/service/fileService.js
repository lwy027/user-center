const connection = require(".");

class FileService {
  async createAvator(filename, mimetype, destination, size, id) {
    const statement =
      "INSERT INTO  `avatar` (filename, mimetype,size,user_id, destination) VALUES (?,?,?,?,?);";

    const [res] = await connection.execute(statement, [
      filename,
      mimetype,
      size,
      id,
      destination,
    ]);
    return res;
  }

  async getAvatorInfo(id) {
    const statement = "SELECT * FROM avatar WHERE `user_id` = ?;";

    const [res] = await connection.execute(statement, [id]);
    return res.pop();
  }
}

module.exports = new FileService();
