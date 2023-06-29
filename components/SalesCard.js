import Link from "next/link";
import React from "react";

function SalesCard({ sale }) {
  return (
    <>
      <tr className="border-b">
        <td className="font-normal px-5 py-5 text-sm">{sale.sid}</td>
        <td className="font-normal px-5 py-5 text-sm">{sale.dateAdded}</td>
        {sale.type == "purchase" ? (
          <td className="font-normal px-5 py-5 text-sm text-red-600">
            {sale.type}
          </td>
        ) : (
          <td className="font-normal px-5 py-5 text-sm text-green-600">
            {sale.type}
          </td>
        )}
        <td className="font-normal px-5 py-5 text-sm">₹{sale.amount}</td>
      </tr>
    </>
  );
}

export default SalesCard;
