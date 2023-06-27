import Loading from "@/components/Loading";
import GlobalStates from "@/context/GlobalStateContext";
import "@/styles/globals.css";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Loading");

  const changeStatus = (status) => {
    setStatus(status);
  };

  const handleLogin = async (email, password) => {
    if (email == "" || password == "")
      return alert("Please fill all the fields");
    const res = await fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    return data;
  };
  return (
    <GlobalStates.Provider
      value={{ user, setUser, handleLogin, setLoading, changeStatus }}
    >
      <Component {...pageProps} />
      <Loading loading={loading} status={status} />
    </GlobalStates.Provider>
  );
}
