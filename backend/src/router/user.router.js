const Router = require("@koa/router");
const userController = require("../controller/user.controller");
const { hanlePassword, verityUser } = require("../middleware/user.middleware");
const { verifyAuth } = require("../middleware/login.middleware");
const multer = require("koa-multer");

const upload = multer({
  dest: "./uploads",
});

const userRouter = new Router({ prefix: "/user" });

userRouter.post("/register", verityUser, hanlePassword, userController.create);
userRouter.get("/getAllUser", userController.getAlluser);
userRouter.post(
  "/avator",
  verifyAuth,
  upload.single("avator"),
  userController.updataAvator
);
userRouter.get("/getAvator/:userId", verifyAuth, userController.getAvator);

module.exports = userRouter;
