const app = require("./src/app/app");
const { SERVER_PORT } = require("./src/config/server");
require("./src/utils/error_handle");
app.listen(SERVER_PORT, () => {
  console.log("user-center项目8000端口开启成功");
});
