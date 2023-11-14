const app = require("../app/app");
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXITS,
  NAME_IS_NOT_EXITS,
  PASSWORD_IS_NOT_INCORRECT,
  USER_IS_NOT_ANTHORIZATION,
} = require("../config/error");

app.on("error", (err, ctx) => {
  let code = 0;
  let message = "";

  switch (err) {
    case NAME_OR_PASSWORD_IS_REQUIRED:
      code = -1001;
      message = "账号或密码为空~";
      break;
    case NAME_IS_ALREADY_EXITS:
      code = -1002;
      message = "账号已经存在，请重新输入";
      break;
    case NAME_IS_NOT_EXITS:
      code = -1003;
      message = "用户不存在，请重新登录";
      break;
    case PASSWORD_IS_NOT_INCORRECT:
      code = -1004;
      message = "密码不正确，请重新检查";
      break;
    case USER_IS_NOT_ANTHORIZATION:
      code = -1005;
      message = "无效的token,或已经过期";
      break;
  }

  ctx.body = {
    code,
    message,
  };
});
