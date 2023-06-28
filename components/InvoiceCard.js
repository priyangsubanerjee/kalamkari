import React, { useState } from "react";
import CartProduct from "./CartProduct";

function InvoiceCard({ invoice }) {
  const [productsOpen, setProductsOpen] = useState(false);
  return (
    <>
      <tr className="border-b">
        <td className="font-normal px-5 py-4 text-sm">{invoice.inv}</td>
        <td className="font-normal px-5 py-4 text-sm">{invoice.dateAdded}</td>
        <td className="font-normal px-5 py-4 text-sm">{invoice.name}</td>
        <td className="font-normal px-5 py-4 text-sm flex items-center">
          <button
            onClick={() => setProductsOpen(true)}
            className="bg-neutral-100 hover:bg-neutral-200 h-10 w-10 rounded transition-all"
          >
            <iconify-icon
              height="20"
              width="20"
              icon="system-uicons:box"
            ></iconify-icon>
          </button>
        </td>
        <td className="font-normal px-5 py-4 text-sm">₹{invoice.total}</td>
        <td className="font-normal px-5 py-4 text-sm flex items-center space-x-2">
          {invoice.status == "paid" ? (
            <span className="text-green-600">
              <iconify-icon icon="bi:check-circle-fill"></iconify-icon>
            </span>
          ) : (
            <span className="text-yellow-500">
              <iconify-icon
                height="20"
                width="20"
                icon="fluent:info-20-filled"
              ></iconify-icon>
            </span>
          )}
          <span className="inline-block -mt-1">
            {invoice.status == "paid" ? "Paid" : "Due"}
          </span>
        </td>
        <td className="font-normal px-5 py-4 text-sm">
          <button className="bg-sky-100 hover:bg-sky-200 h-10 w-10 rounded transition-all flex items-center justify-center">
            <iconify-icon height="16" width="16" icon="ep:right"></iconify-icon>
          </button>
        </td>
      </tr>
      {productsOpen && (
        <div className="fixed inset-0 h-full w-full flex lg:items-center items-end justify-center bg-black/50 z-30">
          <div className="bg-white w-full lg:w-[500px] h-fit lg:rounded-lg p-5 pb-20 lg:pb-6">
            <div className="flex items-center justify-between">
              <h2 className="font-jost text-xl">Products</h2>
              <button
                onClick={() => {
                  setProductsOpen(false);
                }}
              >
                <iconify-icon
                  height="20"
                  width="20"
                  icon="uiw:close"
                ></iconify-icon>
              </button>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-5">
              {invoice.products.map((product, index) => {
                return <CartProduct product={product} key={index} />;
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default InvoiceCard;
