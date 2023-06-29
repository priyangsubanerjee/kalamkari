import connectDatabase from "@/db/connect";
import invoice from "@/db/invoice";
import product from "@/db/product";

export default async function handler(req, res) {
  await connectDatabase();
  const { id, products } = JSON.parse(req.body);
  const delete_ = await invoice.findByIdAndDelete(id);
  if (delete_) {
    products.forEach(async (element) => {
      const product_ = await product.findOne({ pid: element.pid });
      product_.stockQuantity = product_.stockQuantity + element.quantity;
      await product_.save();
    });
    res.status(200).json({
      success: true,
      message: "Invoice deleted successfully",
      data: delete_,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Invoice deletion failed",
    });
  }
}
