const Router = require("@koa/router");
const userController = require("../controller/user.controller");
const { hanlePassword, verityUser } = require("../middleware/user.middleware");
const { verifyAuth } = require("../middleware/login.middleware");

const userRouter = new Router({ prefix: "/user" });

userRouter.post("/register", verityUser, hanlePassword, userController.create);
userRouter.get("/getAllUser", userController.getAlluser);

module.exports = userRouter;
