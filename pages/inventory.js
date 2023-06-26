/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import Navbar from "@/components/Navbar";
import GlobalStates from "@/context/GlobalStateContext";
import React, { useContext, useEffect } from "react";

function Dashboard() {
  const { user, setUser, handleLogin } = useContext(GlobalStates);
  useEffect(() => {
    if (localStorage.getItem("user")) {
      (async () => {
        const savedUser = JSON.parse(window.atob(localStorage.getItem("user")));
        const res = await handleLogin(savedUser.email, savedUser.password);
        if (res.success) {
          setUser(res.data);
        } else {
          localStorage.removeItem("user");
          window.location.href = "/login";
        }
      })();
    }
  }, []);
  return (
    <div>
      <Navbar />
      <div className="px-0 lg:px-24 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-5 lg:mt-10">
        <div className="border-b border-r lg:border">
          <div className="h-36 bg-yellow-100 relative overflow-hidden">
            <img
              src="https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/22536178/2023/3/28/060630ba-0cb0-46f5-ab19-59a0d7502af41679989291511KALINIMaroonBlueWovenDesignZariPureSilkKanjeevaramSaree1.jpg"
              alt=""
              className="absolute inset-0 w-full"
            />
          </div>
          <div className="p-3">
            <h1 className="text-base font-bold">₹9000</h1>
            <h2 className="text-sm mt-1">Sarees (साड़ी)</h2>
            <div className="mt-4 grid grid-cols-3 text-xs">
              <div className="flex items-center">
                <span className="text-blue-600 mt-1">
                  <iconify-icon icon="bi:box"></iconify-icon>
                </span>
                <span className="ml-2 text-sm">10</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-red-700">₹4000</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600">
                  <iconify-icon icon="bi:caret-up-fill"></iconify-icon>
                </span>
                <span className="ml-2 text-sm">33%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
