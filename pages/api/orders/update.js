import connectDatabase from "@/db/connect";
import invoice from "@/db/invoice";

export default async function handler(req, res) {
  await connectDatabase();
  const { inv, name, phone, status, amountPaid, paymentMethod } = JSON.parse(
    req.body
  );

  console.log(status);

  const invoice_ = await invoice.findOneAndUpdate(
    {
      inv: inv,
    },
    {
      name,
      phone,
      status,
      amountPaid,
      paymentMethod,
    }
  );

  if (invoice_) {
    res.status(200).json({
      success: true,
      message: "Invoice updated successfully",
      data: invoice_,
    });
  } else {
    res.status(200).json({
      success: false,
      message: "Invoice could not be updated",
      data: null,
    });
  }
}
