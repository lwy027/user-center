const Router = require("@koa/router");
const { verityLogin, verifyAuth } = require("../middleware/login.middleware");
const { sign, getUserInfo } = require("../controller/login.controller");

const loginRouter = new Router({ prefix: "/user" });

loginRouter.post("/login", verityLogin, sign);
//对用户token进行验证
loginRouter.get("/currentUser", verifyAuth, getUserInfo);

module.exports = loginRouter;
