import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  domain: {
    type: String,
    required: true,
  },
  subdomain: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price:{
    type: String,
    required: true,
  },
  description:{
    type: String,
    required: true,
  }
});

// ✅ Hot-reload safe:
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;