import connectDatabase from "@/db/connect";
import invoice from "@/db/invoice";

export default async function handler(req, res) {
  await connectDatabase();
  const { products, name, phone, total, status, amountPaid, paymentMethod } =
    JSON.parse(req.body);

  const invoice_ = await invoice.create({
    products,
    name,
    phone,
    total,
    status,
    amountPaid,
    paymentMethod,
  });

  if (invoice_) {
    res.status(200).json({
      success: true,
      message: "Invoice created successfully",
      data: invoice_,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Invoice creation failed",
    });
  }
}
