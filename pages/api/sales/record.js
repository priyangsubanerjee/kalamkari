import connectDatabase from "@/db/connect";
import sale from "@/db/sale";

export default async function handler(req, res) {
  const { type, amount } = JSON.parse(req.body);
  await connectDatabase();
  const record_ = new sale({
    type,
    amount,
  });
  const record = await record_.save();
  if (record) {
    res.status(200).json({
      success: true,
      message: "Sales recorded successfully",
      data: record,
    });
  } else {
    res.status(200).json({
      success: false,
      message: "Sales record failed",
    });
  }
}
