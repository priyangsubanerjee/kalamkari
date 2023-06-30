import connectDatabase from "@/db/connect";
import product from "@/db/product";
import sale from "@/db/sale";

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
      stockQuantity: purchaseQuantity,
      purchasedFrom,
      sellingPrice,
      shelfLocation,
    });
    const savedProduct = await product_.save();
    if (savedProduct) {
      if (purchasePrice > 0 && purchaseQuantity > 0) {
        const sales_ = new sale({
          type: "purchase",
          amount: purchasePrice * purchaseQuantity,
        });
        const savedSale = await sales_.save();
        if (savedSale) {
          res.status(200).json({
            success: true,
            message: "Product added successfully",
            data: savedProduct,
          });
        } else {
          res.status(200).json({
            success: false,
            message: "Product could not be added",
            data: null,
          });
        }
      } else {
        res.status(200).json({
          success: true,
          message: "Product added successfully",
          data: savedProduct,
        });
      }
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
