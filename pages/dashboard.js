import Navbar from "@/components/Navbar";
import GlobalStates from "@/context/GlobalStateContext";
import React, { useContext, useEffect } from "react";

function Dashboard() {
  const { user, setUser, handleLogin } = useContext(GlobalStates);
  useEffect(() => {
    (async () => {
      const savedUser = JSON.parse(window.atob(localStorage.getItem("user")));
      const res = await handleLogin(savedUser.email, savedUser.password);
      console.log(res);
      if (res.success) {
        setUser(res.data);
      }
    })();
  }, []);
  return (
    <div>
      <Navbar />
    </div>
  );
}

export default Dashboard;
