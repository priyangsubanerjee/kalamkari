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
      <div className="px-0 lg:px-24 grid grid-cols-2 lg:grid-cols-4 divide-x">
        <div className="border-b">
          <div className="h-44 bg-yellow-100"></div>
          <div className="p-3">
            <h1 className="text-base font-bold">₹9000</h1>
            <h2 className="text-sm mt-1">Sarees (साड़ी)</h2>
          </div>
          <div className="mt-2 grid grid-cols-2">
            <div className="flex items-center justify-center">
              <button className="px-5 py-1 rounded-full bg-neutral-100 w-fit">
                <iconify-icon
                  height="20"
                  width="20"
                  icon="fluent:edit-20-regular"
                ></iconify-icon>
              </button>
            </div>
            <button className="px-5 py-3 bg-red-100 w-full">
              <iconify-icon
                height="20"
                width="20"
                icon="mdi-light:delete"
              ></iconify-icon>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
