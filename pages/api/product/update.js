import connectDatabase from "@/db/connect";
import product from "@/db/product";

export default async function handler(req, res) {
  await connectDatabase();
  const {
    pid,
    images,
    name,
    purchasePrice,
    purchaseQuantity,
    stockQuantity,
    purchasedFrom,
    sellingPrice,
    shelfLocation,
    purchaseDate,
  } = JSON.parse(req.body);

  const product_ = await product.findOneAndUpdate(
    { pid: pid },
    {
      images,
      name,
      purchasePrice,
      purchaseQuantity,
      purchaseQuantity,
      stockQuantity,
      purchasedFrom,
      sellingPrice,
      purchaseDate,
      shelfLocation,
    }
  );

  if (product_) {
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product_,
    });
  } else {
    res.status(200).json({
      success: false,
      message: "Product could not be updated",
      data: null,
    });
  }
}
