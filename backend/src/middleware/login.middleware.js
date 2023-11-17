const jwt = require("jsonwebtoken");
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_NOT_EXITS,
  PASSWORD_IS_NOT_INCORRECT,
  USER_IS_NOT_ANTHORIZATION,
} = require("../config/error");
const { findUserByName } = require("../service/userService");
const md5password = require("../utils/md5_password");
const { PUBLIC_KEY } = require("../config/secretKey");

const verityLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body;
  console.log(name, password);
  //1.判断用户名密码是否为空
  if (!name || !password) {
    return ctx.app.emit("error", NAME_OR_PASSWORD_IS_REQUIRED, ctx);
  }
  //2.判断用户是否存在,数据库查询
  const result = await findUserByName(name);
  const user = result[0];
  if (!user) {
    return ctx.app.emit("error", NAME_IS_NOT_EXITS, ctx);
  }
  //3. 判断密码是否正确
  if (user.password !== md5password(password)) {
    return ctx.app.emit("error", PASSWORD_IS_NOT_INCORRECT, ctx);
  }
  //用户登录之后，存储用户信息，方便之后用户进行操作，进行权限判断
  ctx.user = user;
  await next();
};

//对用户状态进行验证，在用户登录成功，进行其他操作时，都对用户的token根据公钥进行验证
const verifyAuth = async (ctx, next) => {
  const authorization = ctx.headers.authorization;

  if (!authorization) {
    return ctx.app.emit("error", USER_IS_NOT_ANTHORIZATION, ctx);
  }
  const token = authorization.replace("Bearer ", "");

  try {
    const res = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    ctx.user = res;
    await next();
  } catch (error) {
    console.log(error);
    ctx.app.emit("error", USER_IS_NOT_ANTHORIZATION, ctx);
  }
};

module.exports = { verityLogin, verifyAuth };
