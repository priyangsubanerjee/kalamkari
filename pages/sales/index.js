/* eslint-disable react-hooks/exhaustive-deps */
import Navbar from "@/components/Navbar";
import SalesCard from "@/components/SalesCard";
import GlobalStates from "@/context/GlobalStateContext";
import React, { useContext, useEffect, useState } from "react";

function Sales() {
  const { user, setUser, refreshSales, sales } = useContext(GlobalStates);

  const [overView, setOverView] = useState({
    totalSales: 0,
    totalPurchase: 0,
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

  return (
    <div>
      <Navbar />
      {user != null && user != false && (
        <div>
          <div className="lg:px-28 px-0 mt-6 lg:mt-10 whitespace-nowrap overflow-auto shrink-0">
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
        </div>
      )}
    </div>
  );
}

export default Sales;
