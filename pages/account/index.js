/* eslint-disable react-hooks/exhaustive-deps */
import Navbar from "@/components/Navbar";
import GlobalStates from "@/context/GlobalStateContext";
import React, { useContext, useEffect } from "react";

function Account() {
  const { user, setUser } = useContext(GlobalStates);

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
        <div className="lg:px-28 px-6 mt-6 lg:mt-10 whitespace-nowrap overflow-auto shrink-0">
          <div>{user.email}</div>
          <button
            onClick={() => {
              localStorage.removeItem("user");
              sessionStorage.removeItem("user");
              window.location.href = "/";
            }}
            className="px-6 h-10 rounded mt-7 bg-red-500 hover:bg-red-600 text-white space-x-3 text-sm flex items-center transition-all"
          >
            <iconify-icon
              height="18"
              width="18"
              icon="mdi:logout"
            ></iconify-icon>
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default Account;
