import Navbar from "@/components/Navbar";
import GlobalStates from "@/context/GlobalStateContext";
import React, { useContext, useEffect } from "react";

function Orders() {
  const { handleLogin, user, setUser } = useContext(GlobalStates);

  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      setUser(JSON.parse(sessionStorage.getItem("user")));
    } else {
      window.location.href = "/";
    }
  }, []);

  return (
    <div>
      <Navbar />
      {user != null && user != false && (
        <div>
          <div className="lg:px-28 px-0 lg:mt-10 whitespace-nowrap overflow-auto shrink-0">
            <table className="w-fit lg:w-full text-left">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="font-normal px-5 py-4 text-sm">Order id</th>
                  <th className="font-normal px-5 py-4 text-sm">Date</th>
                  <th className="font-normal px-5 py-4 text-sm">Name</th>
                  <th className="font-normal px-5 py-4 text-sm">Products</th>
                  <th className="font-normal px-5 py-4 text-sm">Amount</th>
                  <th className="font-normal px-5 py-4 text-sm">
                    Payment status
                  </th>
                  <th className="font-normal px-5 py-4 text-sm"></th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="font-normal px-5 py-4 text-sm">IN0027</td>
                  <td className="font-normal px-5 py-4 text-sm">29 June</td>
                  <td className="font-normal px-5 py-4 text-sm">
                    Priyangsu Banerjee
                  </td>
                  <td className="font-normal px-5 py-4 text-sm flex items-center">
                    <button className="bg-neutral-100 hover:bg-neutral-200 h-10 w-10 rounded transition-all">
                      <iconify-icon
                        height="20"
                        width="20"
                        icon="system-uicons:box"
                      ></iconify-icon>
                    </button>
                  </td>
                  <td className="font-normal px-5 py-4 text-sm">₹4000</td>
                  <td className="font-normal px-5 py-4 text-sm flex items-center space-x-2">
                    <span className="text-green-600">
                      <iconify-icon icon="bi:check-circle-fill"></iconify-icon>
                    </span>
                    <span>Paid</span>
                  </td>
                  <td className="font-normal px-5 py-4 text-sm">
                    <button className="bg-sky-100 hover:bg-sky-200 h-10 w-10 rounded transition-all flex items-center justify-center">
                      <iconify-icon
                        height="16"
                        width="16"
                        icon="ep:right"
                      ></iconify-icon>
                    </button>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="font-normal px-5 py-4 text-sm">IN0027</td>
                  <td className="font-normal px-5 py-4 text-sm">29 June</td>
                  <td className="font-normal px-5 py-4 text-sm">
                    Priyangsu Banerjee
                  </td>
                  <td className="font-normal px-5 py-4 text-sm flex items-center">
                    <button className="bg-neutral-100 hover:bg-neutral-200 h-10 w-10 rounded transition-all">
                      <iconify-icon
                        height="20"
                        width="20"
                        icon="system-uicons:box"
                      ></iconify-icon>
                    </button>
                  </td>
                  <td className="font-normal px-5 py-4 text-sm">₹4000</td>
                  <td className="font-normal px-5 py-4 text-sm flex items-center space-x-2">
                    <span className="text-green-600">
                      <iconify-icon icon="bi:check-circle-fill"></iconify-icon>
                    </span>
                    <span>Paid</span>
                  </td>
                  <td className="font-normal px-5 py-4 text-sm">
                    <button className="bg-sky-100 hover:bg-sky-200 h-10 w-10 rounded transition-all flex items-center justify-center">
                      <iconify-icon
                        height="16"
                        width="16"
                        icon="ep:right"
                      ></iconify-icon>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
