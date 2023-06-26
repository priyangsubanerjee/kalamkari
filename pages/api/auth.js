// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import admin from "@/db/admin";
import connectDatabase from "@/db/connect";

export default async function handler(req, res) {
  const { email, password } = JSON.parse(req.body);
  if (email != "" && password != "") {
    await connectDatabase();
    const account = await admin.findOne({ email, password });
    if (account) {
      res.status(200).json({
        success: true,
        message: "Login successful",
        data: account,
      });
    } else {
      res.status(200).json({
        success: false,
        message: "Invalid credentials",
        data: null,
      });
    }
  } else {
    res.status(200).json({
      success: false,
      message: "Invalid credentials",
      data: null,
    });
  }
}
