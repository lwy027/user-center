const app = require("./app/app");
const { SERVER_PORT } = require("./config/server");
require("./utils/error_handle");
app.listen(SERVER_PORT, () => {
  console.log("user-center项目9000端口开启成功");
});
