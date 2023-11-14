const Router = require("@koa/router");
const userController = require("../controller/user.controller");
const { hanlePassword, verityUser } = require("../middleware/user.middleware");

const userRouter = new Router({ prefix: "/user" });

userRouter.post("/", verityUser, hanlePassword, userController.create);

module.exports = userRouter;
