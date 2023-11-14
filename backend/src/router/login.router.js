const Router = require("@koa/router");
const { verityLogin, verifyAuth } = require("../middleware/login.middleware");
const { sign, test } = require("../controller/login.controller");

const loginRouter = new Router({ prefix: "/login" });

loginRouter.post("/", verityLogin, sign);
//对用户token进行验证
loginRouter.get("/test", verifyAuth, test);

module.exports = loginRouter;
