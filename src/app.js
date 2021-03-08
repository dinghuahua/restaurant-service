const Koa = require("koa");
const path = require("path");
const onerror = require("koa-onerror");
const koaBody = require("koa-body");
const json = require("koa-json");
const logger = require("koa-logger");

const responseFormatter = require("./middleware/response_formatter");
const { apiPrefix } = require("./config/index");
const routers = require("./routers/index");

const app = new Koa();
// koa的错误处理程序hack
onerror(app);

// middlewares
app.use(
  koaBody({
    // 支持文件上传
    multipart: true,
    formidable: {
      formidable: {
        // 设置文件上传目录
        uploadDir: path.join(__dirname, "public/upload/"),
        keepExtensions: true, // 保持文件的后缀
        maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
        onFileBegin: (name, file) => {
          // 文件上传前的设置
          console.log(`name: ${name}`);
          console.log(file);
        },
      },
    },
  })
);
app.use(json());
app.use(logger());

// response formatter
app.use(responseFormatter(apiPrefix));

// routers
app.use(routers.routes()).use(routers.allowedMethods());

// 监听error
app.on("error", (err, ctx) => {
  // 在这里可以对错误信息进行一些处理，生成日志等。
  console.error("server error", err, ctx);
});

module.exports = app;
