import mongoose, { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    ram: {
      type: Number,
      dafault: 0,
    },
    price: {
      type: Number,
      required: true,
      dafault: 0,
    },
    category: {
      categoryId: {
        type: String,
        ref: "Category",
      },
      categoryName: {
        type: String,
      },
    },
    subcategory: {
      subcategoryId: {
        type: String,
        ref: "Subcategory",
      },
      subcategoryName: {
        type: String,
      },
    },
    productImages: [
      {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    ],
      totalPrice: {
        type: Number,
        dafault: 0,
      },
      totalProductCount: {
        type: Number,
        dafault: 0,
      },
      rating: {
        type: Number,
        dafault: 0,
      },
  },
  { timestamps: true }
);

const Product = model("Product", productSchema);

export default Product;
