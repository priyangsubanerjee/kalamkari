import connectDatabase from "@/db/connect";
import product from "@/db/product";

export default async function handler(req, res) {
  await connectDatabase();
  const products = await product.find({});
  if (products) {
    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } else {
    res.status(200).json({
      success: false,
      message: "Products could not be fetched",
      data: null,
    });
  }
}
