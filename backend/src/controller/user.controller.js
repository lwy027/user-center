const { create, getAllUser } = require("../service/userService");

class userController {
  async create(ctx, next) {
    const user = ctx.request.body;
    //3.连接数据库，进行信息保存
    const result = await create(user);

    //4.返回成功信息
    ctx.body = {
      status: "ok",
      message: "创建用户成功",
      data: result,
    };
  }
  async getAlluser(ctx, next) {
    const userData = await getAllUser();

    ctx.body = {
      status: "ok",
      data: {
        code: 200,
        userData,
      },
    };
  }
}

module.exports = new userController();
