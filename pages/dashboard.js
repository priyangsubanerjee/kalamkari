import GlobalStates from "@/context/GlobalStateContext";
import React, { useContext } from "react";

function Dashboard() {
  const { user, setUser } = useContext(GlobalStates);
  return (
    <div>
      <div className="flex items-center h-20 bg-neutral-50 px-6">
        <div className="flex items-center">
          <button className="h-12 w-12 flex items-center justify-center bg-neutral-200">
            <iconify-icon
              height="20"
              width="20"
              icon="lucide:menu"
            ></iconify-icon>
          </button>
          <h1>Dashboard</h1>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
