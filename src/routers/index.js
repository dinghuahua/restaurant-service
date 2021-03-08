/**
 * 路由 模块
 */
const router = require("koa-router")();
const { apiPrefix } = require("../config/index");

const demo = require("./demo");

// 路由前缀
router.prefix(apiPrefix);

router.use("/demo", demo.routes(), demo.allowedMethods());

module.exports = router;
