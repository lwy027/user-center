const Koa = require("koa");
const app = new Koa();
const bodyparser = require("koa-bodyparser");

const register = require("../router/index");
app.use(bodyparser());
register(app);

module.exports = app;
