import connectDatabase from "@/db/connect";
import sale from "@/db/sale";

export default async function handler(req, res) {
  await connectDatabase();
  const sales = await sale.find({});
  if (sales) {
    res.status(200).json({
      success: true,
      message: "Sales fetched successfully",
      data: sales,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Sales fetch failed",
    });
  }
}
