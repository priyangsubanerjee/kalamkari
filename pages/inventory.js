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
      <>
        {user !== null && user !== false && (
          <>
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
                  <span className="text-xs text-neutral-500">KM0020</span>
                  <h1 className="text-base font-bold mt-2">₹9000</h1>
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
              <div className="border-b border-r lg:border">
                <div className="h-36 bg-yellow-100 relative overflow-hidden">
                  <img
                    src="https://cdn.shopify.com/s/files/1/1979/4335/collections/img_2488-23_12_greensaree_main_1200x1200.jpg?v=1642423305"
                    alt=""
                    className="absolute inset-0 w-full"
                  />
                </div>
                <div className="p-3">
                  <span className="text-xs text-neutral-500">KM0023</span>
                  <h1 className="text-base font-bold mt-2">₹5000</h1>
                  <h2 className="text-sm mt-1">Sarees (साड़ी)</h2>
                  <div className="mt-4 grid grid-cols-3 text-xs">
                    <div className="flex items-center">
                      <span className="text-blue-600 mt-1">
                        <iconify-icon icon="bi:box"></iconify-icon>
                      </span>
                      <span className="ml-2 text-sm">5</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-red-700">₹2000</span>
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
            <div>
              <div className="block lg:hidden fixed bottom-0 inset-x-0 p-4 border-t bg-neutral-50">
                <button className="w-full h-12 flex items-center space-x-3 justify-center bg-black rounded-md text-white">
                  <iconify-icon
                    height="24"
                    width="24"
                    icon="system-uicons:box-add"
                  ></iconify-icon>
                  <span>Add product</span>
                </button>
              </div>
              <div className="hidden lg:block fixed bottom-9 right-9">
                <button className="h-20 w-20 shadow-xl shadow-black/20 bg-black rounded-full text-white flex items-center justify-center">
                  <iconify-icon
                    height="30"
                    width="30"
                    icon="system-uicons:box-add"
                  ></iconify-icon>
                </button>
              </div>
            </div>
          </>
        )}
      </>
    </div>
  );
}

export default Dashboard;
