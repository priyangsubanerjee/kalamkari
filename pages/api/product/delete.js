import connectDatabase from "@/db/connect";
import product from "@/db/product";

export default async function handler(req, res) {
  await connectDatabase();
  const { id } = JSON.parse(req.body);
  const delete_ = await product.findByIdAndDelete(id);
  if (delete_) {
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: delete_,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Product deletion failed",
    });
  }
}
