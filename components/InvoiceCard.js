/* eslint-disable @next/next/no-img-element */
import React, { useContext, useState } from "react";
import CartProduct from "./CartProduct";
import Link from "next/link";
import GlobalStates from "@/context/GlobalStateContext";

function InvoiceCard({ invoice }) {
  const { setLoading, changeStatus, refreshInvoices, refreshProducts } =
    useContext(GlobalStates);
  const [invoiceOptions, setInvoiceOptions] = useState(invoice);
  const [productsOpen, setProductsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [updated, setUpadted] = useState(false);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      setLoading(true);
      changeStatus("Deleting invoice");
      let response = await fetch("/api/orders/delete", {
        method: "POST",
        body: JSON.stringify({
          id: invoice._id,
          products: invoice.products,
        }),
      });

      let invoice_ = await response.json();
      setLoading(false);
      if (invoice_.success) {
        await refreshInvoices();
        await refreshProducts();
        setUpadted(true);
      }
    }
  };

  const handleSaveInvoice = async () => {
    setLoading(true);
    changeStatus("Updating invoice");
    let response = await fetch("/api/orders/update", {
      method: "POST",
      body: JSON.stringify({
        inv: invoiceOptions.inv,
        name: invoiceOptions.name,
        phone: invoiceOptions.phone,
        status: invoiceOptions.status,
        amountPaid: invoiceOptions.amountPaid,
        paymentMethod: invoiceOptions.paymentMethod,
      }),
    });

    let invoice_ = await response.json();
    setLoading(false);
    if (invoice_.success) {
      setUpadted(true);
      refreshInvoices();
    }
  };

  return (
    <>
      <tr className="border-b">
        <td className="font-normal px-5 py-4 text-sm">{invoice.inv}</td>
        <td className="font-normal px-5 py-4 text-sm">
          {new Date(invoice.dateAdded).toLocaleString()}
        </td>
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
        <td className="font-normal px-5 py-4 text-sm">₹{invoice.amountPaid}</td>
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
          <Link href={"/orders/invoice/" + invoice.inv}>
            <button className="bg-sky-100 hover:bg-sky-200 h-10 w-10 rounded transition-all flex items-center justify-center">
              <iconify-icon
                height="16"
                width="16"
                icon="ep:right"
              ></iconify-icon>
            </button>
          </Link>
        </td>
        <td className="font-normal px-5 py-4 text-sm">
          <button
            onClick={() => setEditOpen(true)}
            className="bg-neutral-100 hover:bg-neutral-200 h-10 w-10 rounded transition-all flex items-center justify-center"
          >
            <iconify-icon
              height="16"
              width="16"
              icon="ant-design:edit-outlined"
            ></iconify-icon>
          </button>
        </td>
      </tr>

      {productsOpen && (
        <div className="fixed inset-0 h-full w-full flex lg:items-center items-end justify-center bg-black/50 z-30">
          <div className="bg-white w-full lg:w-[500px] h-fit lg:rounded-md p-5 pb-20 lg:pb-6">
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

      {editOpen && (
        <div className="fixed inset-0 h-full w-full bg-black/50 flex justify-end z-30">
          <div className="w-full lg:w-[500px] bg-white h-full overflow-auto pb-8">
            <div className="p-8">
              <div className="flex items-center justify-between">
                <h2 className="text-xl lg:text-2xl font-jost">
                  Update invoice
                </h2>
                <button
                  onClick={() => {
                    setEditOpen(false);
                    setUpadted(false);
                  }}
                >
                  <iconify-icon
                    height="20"
                    width="20"
                    icon="uiw:close"
                  ></iconify-icon>
                </button>
              </div>

              <div className="flex items-center mt-2 space-x-2">
                <iconify-icon icon="ep:right"></iconify-icon>
                <p className="text-xs text-neutral-500 w-fit">
                  Inventory is managed by distributed CDN
                </p>
              </div>

              <div className="mt-10">
                {updated ? (
                  <div className="flex flex-col items-center bg-neutral-50 p-8 mt-6 max-w-md">
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/010/160/867/non_2x/check-mark-icon-sign-design-free-png.png"
                      className="h-20"
                      alt=""
                    />
                    <h2 className="font-medium mt-6 text-neutral-800">
                      Success
                    </h2>
                    <p className="text-xs text-neutral-600 mt-2">
                      Invoice has been updated successfully.
                    </p>
                    <div className="mt-10 grid grid-cols-2 w-full gap-2">
                      <button
                        onClick={() => {
                          setEditOpen(false);
                          setUpadted(false);
                        }}
                        className="border hover:bg-neutral-200 h-12 text-sm"
                      >
                        Close
                      </button>
                      <button
                        onClick={() => {}}
                        className="border bg-neutral-800 text-white hover:bg-neutral-900 h-12 text-sm"
                      >
                        Share
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-10 max-w-md">
                    <div className="mt-5">
                      <label
                        htmlFor=""
                        className="text-xs text-neutral-600 block"
                      >
                        Customer name
                      </label>
                      <input
                        type="text"
                        value={invoiceOptions.name}
                        onChange={(e) =>
                          setInvoiceOptions({
                            ...invoiceOptions,
                            name: e.target.value,
                          })
                        }
                        placeholder="John doe"
                        className="h-14 bg-transparent border mt-2 w-full px-5 border-neutral-200 rounded focus:outline-none focus:border-neutral-500"
                        name=""
                        id=""
                      />
                    </div>
                    <div className="mt-5">
                      <label
                        htmlFor=""
                        className="text-xs text-neutral-600 block"
                      >
                        Customer phone
                      </label>
                      <input
                        type="tel"
                        placeholder="965xxxxxxx"
                        value={invoiceOptions.phone}
                        onChange={(e) =>
                          setInvoiceOptions({
                            ...invoiceOptions,
                            phone: e.target.value,
                          })
                        }
                        className="h-14 bg-transparent border mt-2 w-full px-5 border-neutral-200 rounded focus:outline-none focus:border-neutral-500"
                        name=""
                        id=""
                      />
                    </div>
                    <div className="mt-5">
                      <label
                        htmlFor=""
                        className="text-xs text-neutral-600 block"
                      >
                        Payment status
                      </label>
                      <select
                        className="relative appearance-none h-14 bg-transparent border mt-2 w-full px-5 border-neutral-200 rounded focus:outline-none focus:border-neutral-500 "
                        value={invoiceOptions.status}
                        onChange={(e) =>
                          setInvoiceOptions({
                            ...invoiceOptions,
                            status: e.target.value,
                          })
                        }
                        name=""
                        id=""
                      >
                        <option value="paid">Paid</option>
                        <option value="due">Due</option>
                      </select>
                    </div>
                    <div className="mt-5">
                      <label
                        htmlFor=""
                        className="text-xs text-neutral-600 block"
                      >
                        Total payable amount
                      </label>
                      <input
                        type="tel"
                        placeholder="1000"
                        readOnly
                        value={invoiceOptions.total}
                        className="h-14 bg-transparent border mt-2 w-full px-5 border-neutral-200 rounded focus:outline-none focus:border-neutral-500"
                        name=""
                        id=""
                      />
                    </div>
                    <div className="mt-5">
                      <label
                        htmlFor=""
                        className="text-xs text-neutral-600 block"
                      >
                        Amount paid
                      </label>
                      <input
                        type="tel"
                        placeholder="1000"
                        value={invoiceOptions.amountPaid}
                        onChange={(e) =>
                          setInvoiceOptions({
                            ...invoiceOptions,
                            amountPaid: e.target.value,
                          })
                        }
                        className="h-14 bg-transparent border mt-2 w-full px-5 border-neutral-200 rounded focus:outline-none focus:border-neutral-500"
                        name=""
                        id=""
                      />
                    </div>
                    <div className="mt-5">
                      <label
                        htmlFor=""
                        className="text-xs text-neutral-600 block"
                      >
                        Payment method
                      </label>
                      <select
                        className="relative appearance-none h-14 bg-transparent border mt-2 w-full px-5 border-neutral-200 rounded focus:outline-none focus:border-neutral-500 "
                        value={invoiceOptions.paymentMethod}
                        onChange={(e) =>
                          setInvoiceOptions({
                            ...invoiceOptions,
                            paymentMethod: e.target.value,
                          })
                        }
                        name=""
                        id=""
                      >
                        <option value="upi">Upi</option>
                        <option value="cash">Cash</option>
                        <option value="c/d cards">Credit / Debit cards</option>
                      </select>
                    </div>
                    <div className="mt-10 flex items-center">
                      <button
                        onClick={() => handleDelete()}
                        className="flex items-center space-x-2 px-6 h-12 bg-red-50 hover:bg-red-100 text-red-500 text-sm rounded-md transition-all"
                      >
                        <iconify-icon
                          height="16"
                          width="16"
                          icon="uiw:delete"
                        ></iconify-icon>
                        <span className="text-sm">Delete</span>
                      </button>
                      <button
                        onClick={() => handleSaveInvoice()}
                        className="text-sm w-fit ml-auto px-6 h-12 flex items-center space-x-3 justify-center bg-black rounded-md text-white"
                      >
                        <span>Save invoice</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default InvoiceCard;
