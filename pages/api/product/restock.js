import connectDatabase from "@/db/connect";
import product from "@/db/product";
import sale from "@/db/sale";

export default async function handler(req, res) {
  await connectDatabase();

  const { pid, quantity, price } = JSON.parse(req.body);

  const product_ = await product.findOneAndUpdate(
    { pid: pid },
    {
      stockQuantity: quantity,
      purchaseQuantity: quantity,
      purchasePrice: price,
    }
  );

  const sales = new sale({
    type: "purchase",
    amount: price * quantity,
  });

  const savedSale = await sales.save();

  if (savedSale) {
    res.status(200).json({
      success: true,
      message: "Product restocked successfully",
      data: product_,
    });
  } else {
    res.status(200).json({
      success: false,
      message: "Product could not be restocked",
      data: null,
    });
  }
}
