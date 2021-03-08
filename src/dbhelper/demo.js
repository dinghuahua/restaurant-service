/**
 *  操作数据库API return Promise
 */ 
const Model = require("../models/demo");

/**
 * 查找全部
 */
exports.findAll = () => Model.find().sort({ rank: 1 }).exec()

/**
 * 查找多个筛选
 */
exports.findSome = (data) => {
  const { page = 1, limit = 10, sort = 'rank' } = data
  const query = {}
  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    sort,
  }
  const result = Model.paginate(query, options)

  return result
}

/**
 * 查询单个详情
 */
exports.findById = (id) => Model.findById(id).exec()

/**
 * 新增
 */
exports.add = (data) => Model.create(data)

/**
 * 更新
 */
exports.update = (data) => {
  const { id, ...restData } = data
  return Model.findOneAndUpdate(
    { _id: id },
    {
      ...restData,
    },
    {
      // 返回修改后的数据
      new: true,
    }
  ).exec();
}

/**
 * 删除
 */
exports.delete = (id) => Model.findByIdAndDelete(id).exec()
