import connectDatabase from "@/db/connect";
import invoice from "@/db/invoice";

export default async function handler(req, res) {
  await connectDatabase();
  const invoices = await invoice.find({});
  if (invoices) {
    res.status(200).json({
      success: true,
      message: "Invoices fetched successfully",
      data: invoices,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Invoices fetch failed",
    });
  }
}
