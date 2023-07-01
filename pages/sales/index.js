/* eslint-disable react-hooks/exhaustive-deps */
import Navbar from "@/components/Navbar";
import SalesCard from "@/components/SalesCard";
import GlobalStates from "@/context/GlobalStateContext";
import React, { useContext, useEffect, useState } from "react";

function Sales() {
  const { user, setUser, refreshSales, sales, setLoading, changeStatus } =
    useContext(GlobalStates);

  const [addSalesOpen, setAddSalesOpen] = useState(false);
  const [overView, setOverView] = useState({
    totalSales: 0,
    totalPurchase: 0,
  });
  const [recordOptions, setRecordOptions] = useState({
    type: "purchase",
    amount: "",
  });

  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      setUser(JSON.parse(sessionStorage.getItem("user")));
    } else {
      window.location.href = "/";
    }
  }, []);

  useEffect(() => {
    if (sales) {
      if (sales.length > 0) {
        let totalSales = 0;
        let totalPurchase = 0;
        sales.map((sale) => {
          console.log(sale);
          if (sale.type == "purchase") {
            totalPurchase += parseInt(sale.amount);
            console.log(totalPurchase);
          } else {
            totalSales += parseInt(sale.amount);
          }
        });
        setOverView({
          totalSales,
          totalPurchase,
        });
      }
    }
  }, [sales]);

  const handleSaveRecord = async () => {
    if (recordOptions.amount == "") {
      alert("Please enter amount");
      return;
    }
    setLoading(true);
    changeStatus("Saving record");
    const res = await fetch("/api/sales/record", {
      method: "POST",
      body: JSON.stringify(recordOptions),
    });

    const record = await res.json();
    setLoading(false);

    if (record.success) {
      refreshSales();
      setAddSalesOpen(false);
      setRecordOptions({
        type: "purchase",
        amount: "",
      });
    }
  };

  return (
    <div>
      <Navbar />
      {user != null && user != false && (
        <div>
          <div className="lg:px-28 px-0 mt-6 lg:mt-10 whitespace-nowrap overflow-auto shrink-0 pb-24">
            <div className="flex items-center space-x-3 lg:px-0 px-6">
              <div className="px-6 py-2 space-y-2 bg-red-50">
                <h2 className="text-xs">Total purchase</h2>
                <p className="font-medium font-jost">
                  ₹{overView.totalPurchase}
                </p>
              </div>
              <div className="px-6 py-2 space-y-2 bg-green-50">
                <h2 className="text-xs">Total sales</h2>
                <p className="font-medium font-jost">₹{overView.totalSales}</p>
              </div>
            </div>
            <table className="w-fit lg:w-full text-left mt-7">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="font-normal px-5 py-4 text-sm">Sales id</th>
                  <th className="font-normal px-5 py-4 text-sm">Date</th>
                  <th className="font-normal px-5 py-4 text-sm">Type</th>
                  <th className="font-normal px-5 py-4 text-sm">Amount</th>
                  <th className="font-normal px-5 py-4 text-sm"></th>
                </tr>
              </thead>
              <tbody>
                {sales &&
                  sales.map((sale, index) => {
                    return <SalesCard sale={sale} key={index} />;
                  })}
              </tbody>
            </table>
          </div>
          <div>
            <div className="flex lg:hidden fixed items-center bottom-0 inset-x-0 p-4 border-t bg-neutral-50 z-10">
              <button
                onClick={() => setAddSalesOpen(true)}
                className="w-fit text-sm ml-auto px-6 h-12 flex items-center space-x-3 justify-center bg-black rounded-md text-white"
              >
                <iconify-icon
                  height="24"
                  width="24"
                  icon="solar:wallet-outline"
                ></iconify-icon>
                <span>Add product</span>
              </button>
            </div>
            <div className="hidden lg:block fixed bottom-9 right-9 z-10">
              <button
                onClick={() => setAddSalesOpen(true)}
                className="h-20 w-20 shadow-xl shadow-black/20 bg-black rounded-full text-white flex items-center justify-center"
              >
                <iconify-icon
                  height="30"
                  width="30"
                  icon="solar:wallet-outline"
                ></iconify-icon>
              </button>
            </div>
          </div>
          {addSalesOpen && (
            <div className="fixed inset-0 h-full w-full bg-black/50 flex justify-end">
              <div className="w-full lg:w-[500px] bg-white h-full overflow-auto pb-8">
                <div className="p-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl lg:text-2xl font-jost">
                      Add sales record
                    </h2>
                    <button
                      onClick={() => {
                        setAddSalesOpen(false);
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
                    <div>
                      <label
                        htmlFor=""
                        className="text-xs text-neutral-600 block"
                      >
                        Record type
                      </label>
                      <select
                        className="relative appearance-none h-14 bg-transparent border mt-2 w-full px-5 border-neutral-200 rounded focus:outline-none focus:border-neutral-500 "
                        value={recordOptions.type}
                        onChange={(e) =>
                          setRecordOptions({
                            ...recordOptions,
                            type: e.target.value,
                          })
                        }
                        name=""
                        id=""
                      >
                        <option value="purchase">Purchase</option>
                        <option value="sales">Sales</option>
                      </select>
                    </div>
                    <div className="mt-5">
                      <label
                        htmlFor=""
                        className="text-xs text-neutral-600 block"
                      >
                        Amount
                      </label>
                      <input
                        type="tel"
                        placeholder="0"
                        value={recordOptions.amount}
                        onChange={(e) =>
                          setRecordOptions({
                            ...recordOptions,
                            amount: e.target.value,
                          })
                        }
                        className="h-14 bg-transparent border mt-2 w-full px-5 border-neutral-200 rounded focus:outline-none focus:border-neutral-500"
                        name=""
                        id=""
                      />
                    </div>
                    <div className="mt-10 flex items-center">
                      <button
                        onClick={() => handleSaveRecord()}
                        className="w-fit text-sm ml-auto px-6 h-12 flex items-center space-x-3 justify-center bg-black rounded-md text-white"
                      >
                        <span>Save record</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Sales;
