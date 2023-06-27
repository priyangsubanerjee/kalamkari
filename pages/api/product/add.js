import connectDatabase from "@/db/connect";
import product from "@/db/product";

export default async function handler(req, res) {
  await connectDatabase();
  const {
    images,
    name,
    purchasePrice,
    purchaseQuantity,
    purchasedFrom,
    sellingPrice,
    shelfLocation,
  } = JSON.parse(req.body);

  try {
    const product_ = new product({
      images,
      name,
      purchasePrice,
      purchaseQuantity,
      purchasedFrom,
      sellingPrice,
      shelfLocation,
    });
    const savedProduct = await product_.save();
    if (savedProduct) {
      res.status(200).json({
        success: true,
        message: "Product added successfully",
        data: product,
      });
    } else {
      res.status(200).json({
        success: false,
        message: "Product could not be added",
        data: null,
      });
    }
  } catch (error) {
    console.log(error);
  }
}
