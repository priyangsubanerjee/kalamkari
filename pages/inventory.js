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
          <div className="h-44 bg-yellow-100 relative overflow-hidden">
            <img
              src="https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/22536178/2023/3/28/060630ba-0cb0-46f5-ab19-59a0d7502af41679989291511KALINIMaroonBlueWovenDesignZariPureSilkKanjeevaramSaree1.jpg"
              alt=""
              className="absolute inset-0 w-full"
            />
          </div>
          <div className="p-3">
            <h1 className="text-base font-bold">₹9000</h1>
            <h2 className="text-sm mt-1">Sarees (साड़ी)</h2>
          </div>
          <div className="py-2 mb-1">
            <div className="flex items-center justify-center">
              <button className="px-5 pt-1 rounded-full bg-neutral-100 w-[90%]">
                <iconify-icon
                  height="20"
                  width="20"
                  icon="fluent:edit-20-regular"
                ></iconify-icon>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
