const dbHelper = require("../dbhelper/demo");
const tool = require("../../utils/tool");

const ApiError = require("../error/api_error");
const ApiErrorNames = require("../error/api_error_name");


/**
 * 查询
 */
exports.find = async (ctx) => {
  ctx.body = "hello world";
};

/**
 * 查询
 */
// exports.find = async (ctx) => {
//   let result;
//   const reqQuery = ctx.query;

//   if (reqQuery && !tool.isEmptyObject(reqQuery)) {
//     if (reqQuery.id) {
//       result = dbHelper.findById(reqQuery.id);
//     } else {
//       result = dbHelper.findSome(reqQuery);
//     }
//   } else {
//     result = dbHelper.findAll();
//   }

//   await result
//     .then((res) => {
//       if (res) {
//         ctx.body = res;
//       } else {
//         throw new ApiError(ApiErrorNames.UNEXIST_ID);
//       }
//     })
//     .catch((err) => {
//       throw new ApiError(err.name, err.message);
//     });
// };

/**
 * 查 动态路由 id
 */
exports.detail = async (ctx) => {
  const { id } = ctx.params;
  if (!tool.validatorsFun.numberAndCharacter(id)) {
    throw new ApiError(ApiErrorNames.LEGAL_ID);
  }
  await dbHelper
    .findById(id)
    .then((res) => {
      if (res) {
        ctx.body = res;
      } else {
        throw new ApiError(ApiErrorNames.UNEXIST_ID);
      }
    })
    .catch((err) => {
      throw new ApiError(err.name, err.message);
    });
};

/**
 * 添加
 */
exports.add = async (ctx) => {
  const dataObj = ctx.request.body;

  await dbHelper
    .add(dataObj)
    .then((res) => {
      ctx.body = res;
    })
    .catch((err) => {
      throw new ApiError(err.name, err.message);
    });
};

/**
 * 更新
 */
exports.update = async (ctx) => {
  const ctxParams = ctx.params;
  // 合并参数 以及 发送过来的参数
  const dataObj = { ...ctxParams, ...ctx.request.body };

  await dbHelper
    .update(dataObj)
    .then((res) => {
      if (res) {
        ctx.body = res;
      } else {
        throw new ApiError(ApiErrorNames.UNEXIST_ID);
      }
    })
    .catch((err) => {
      throw new ApiError(err.name, err.message);
    });
};

/**
 * 删除
 */
exports.delete = async (ctx) => {
  const ctxParams = ctx.params;
  // 合并参数
  const dataObj = { ...ctxParams, ...ctx.request.body };
  if (!tool.validatorsFun.numberAndCharacter(dataObj.id)) {
    throw new ApiError(ApiErrorNames.LEGAL_ID);
  }

  await dbHelper
    .delete(dataObj.id)
    .then((res) => {
      if (res) {
        ctx.body = res;
      } else {
        throw new ApiError(ApiErrorNames.UNEXIST_ID);
      }
    })
    .catch((err) => {
      throw new ApiError(err.name, err.message);
    });
};
