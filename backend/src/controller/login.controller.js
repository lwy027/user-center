const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../config/secretKey");

class loginController {
  sign(ctx, next) {
    //登录逻辑
    //1.用户等于使用jwt实现token,方便以后对用户进行token验证
    const { id, name } = ctx.user;

    //根据私钥进行token的颁发
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 60 * 24 * 30 * 10, //过期时间
      algorithm: "RS256",
    });

    //2.返回登录成功信息
    ctx.body = {
      code: 200,
      data: {
        id,
        name,
        token,
      },
    };
  }

  test(ctx, next) {
    const { id, name } = ctx.user;

    ctx.body = {
      data: {
        code: 200,
        id,
        name,
      },
    };
  }
}

module.exports = new loginController();
