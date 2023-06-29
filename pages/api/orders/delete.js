import connectDatabase from "@/db/connect";
import invoice from "@/db/invoice";

export default async function handler(req, res) {
  await connectDatabase();
  const { id } = JSON.parse(req.body);
  console.log(id);
  const delete_ = await invoice.findByIdAndDelete(id);
  if (delete_) {
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
