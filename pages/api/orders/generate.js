import connectDatabase from "@/db/connect";
import invoice from "@/db/invoice";
import product from "@/db/product";
import sale from "@/db/sale";

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
    products.forEach(async (element) => {
      const product_ = await product.findOne({ pid: element.pid });
      product_.stockQuantity = product_.stockQuantity - element.quantity;
      await product_.save();
    });
    const sales_ = new sale({
      type: "sales",
      amount: amountPaid,
    });
    const savedSale = await sales_.save();
    if (savedSale) {
      res.status(200).json({
        success: true,
        message: "Invoice created successfully",
        data: invoice_,
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: "Invoice creation failed",
    });
  }
}
