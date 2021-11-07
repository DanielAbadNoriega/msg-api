const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: "Name is required",
    },
    nutritionPerHundred: {
      type: "object",
    },
    image: {
      type: String,
    },
    tags: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

productSchema.virtual("rating", {
  ref: "Rating",
  localField: "_id",
  foreignField: "product",
  justOne: false,
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
