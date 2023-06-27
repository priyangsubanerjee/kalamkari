import Loading from "@/components/Loading";
import GlobalStates from "@/context/GlobalStateContext";
import "@/styles/globals.css";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Loading");
  const [products, setProducts] = useState([]);

  const changeStatus = (status) => {
    setStatus(status);
  };

  const handleLogin = async (email, password) => {
    if (email == "" || password == "")
      return alert("Please fill all the fields");

    setLoading(true);
    changeStatus("Authenticating");
    const res = await fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    setLoading(false);
    changeStatus("...");
    return data;
  };

  const refreshProducts = async () => {
    let res = await fetch("/api/product/inventory", {
      method: "GET",
    });
    let data = await res.json();
    setProducts(data);
  };

  const updateInventory = async () => {
    let res = await fetch("/api/product/inventory", {
      method: "GET",
    });
    let data = await res.json();
    setProducts(data);
    return true;
  };

  useEffect(() => {
    (async () => {
      await refreshProducts();
    })();
  }, []);

  return (
    <GlobalStates.Provider
      value={{
        user,
        setUser,
        handleLogin,
        setLoading,
        changeStatus,
        products: products.data,
        refreshProducts,
      }}
    >
      <Component {...pageProps} />
      <Loading loading={loading} status={status} />
    </GlobalStates.Provider>
  );
}
