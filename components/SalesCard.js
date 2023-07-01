import GlobalStates from "@/context/GlobalStateContext";
import Link from "next/link";
import React, { useContext } from "react";

function SalesCard({ sale }) {
  const { refreshSales, setLoading, changeStatus } = useContext(GlobalStates);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this record?")) {
      return;
    }
    setLoading(true);
    changeStatus("Deleting record");
    const res = await fetch("/api/sales/delete", {
      method: "POST",
      body: JSON.stringify({ sid: sale.sid }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.success) {
      await refreshSales();
    } else {
      alert(data.message);
    }
  };
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
        <td className="font-normal px-5 py-4 text-sm flex items-center">
          <button
            onClick={() => handleDelete()}
            className="bg-red-100 hover:bg-red-200 h-10 w-10 rounded transition-all"
          >
            <iconify-icon
              height="14"
              width="14"
              icon="uiw:delete"
            ></iconify-icon>
          </button>
        </td>
      </tr>
    </>
  );
}

export default SalesCard;
