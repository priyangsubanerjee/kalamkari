import connectDatabase from "@/db/connect";
import sale from "@/db/sale";

export default async function handler(req, res) {
  const { sid } = JSON.parse(req.body);
  await connectDatabase();
  const record_ = await sale.findOneAndDelete({ sid });
  if (record_) {
    res.status(200).json({
      success: true,
      message: "Sales deleted successfully",
      data: record_,
    });
  } else {
    res.status(200).json({
      success: false,
      message: "Sales delete failed",
    });
  }
}
