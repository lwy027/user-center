const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXITS,
} = require("../config/error");
const { findUserByName } = require("../service/userService");
const md5password = require("../utils/md5_password");

//判断用户逻辑
const verityUser = async (ctx, next) => {
  const { name, password } = ctx.request.body;
  //1.判断用户名密码是否为空
  if (!name || !password) {
    return ctx.app.emit("error", NAME_OR_PASSWORD_IS_REQUIRED, ctx);
  }

  //2.判断用户是否存在,数据库查询
  const result = await findUserByName(name);
  if (result.length) {
    return ctx.app.emit("error", NAME_IS_ALREADY_EXITS, ctx);
  }

  await next();
};
//对密码进行加密

const hanlePassword = async (ctx, next) => {
  const { password } = ctx.request.body;

  ctx.request.body.password = md5password(password);

  await next();
};

module.exports = {
  verityUser,
  hanlePassword,
};
