const {
  create,
  getAllUser,
  updataAvatorById,
} = require("../service/userService");
const { createAvator, getAvatorInfo } = require("../service/fileService");
const fs = require("fs");
const { SERVER_HOST } = require("../config/server");

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

  //上传头像
  async updataAvator(ctx, next) {
    //查询数据库
    // const { filename, mimetype, destination, size } = ctx.req.file;
    const { id } = ctx.user;
    console.log(ctx.req.file);
    //保存头像信息
    // await createAvator(filename, mimetype, destination, size, id);
    const path = `${SERVER_HOST}/user/getAvator/${id}`;
    //1.根据用户id更改url
    const res = await updataAvatorById(path, id);
    ctx.body = {
      data: {
        message: "头像更改成功",
        res,
      },
    };
  }
  async getAvator(ctx, next) {
    const { id } = ctx.user;

    //根据id查询数据库拿到文件得到信息;
    const res = await getAvatorInfo(id);
    const { destination, filename, mimetype } = res;
    //2.根据id返回图片信息地址
    const image = fs.createReadStream(`./${destination}/${filename}`);
    ctx.type = mimetype;
    ctx.body = image;
  }
}

module.exports = new userController();
