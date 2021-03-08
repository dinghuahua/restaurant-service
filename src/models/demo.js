const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const uniqueValidator = require("mongoose-unique-validator");

/**
 * 数据模型
 */
const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "name 必填"],
    },
    value: {
      type: String,
      unique: true,
      required: [true, "value 必填"],
    },
    rank: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

schema.plugin(mongoosePaginate);
schema.plugin(uniqueValidator);

module.exports = mongoose.model("demo", schema);
