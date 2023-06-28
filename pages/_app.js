/* eslint-disable react-hooks/exhaustive-deps */
import Loading from "@/components/Loading";
import GlobalStates from "@/context/GlobalStateContext";
import "@/styles/globals.css";
import { set } from "mongoose";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [authState, setAuthState] = useState("authenticating"); // unauthenticated, authenticating, authenticated
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

  useEffect(() => {
    revaliateUser();
  }, []);

  const revaliateUser = async () => {
    if (!sessionStorage.getItem("user")) {
      if (localStorage.getItem("user")) {
        (async () => {
          const savedUser = JSON.parse(
            window.atob(localStorage.getItem("user"))
          );
          const res = await handleLogin(savedUser.email, savedUser.password);
          if (res.success) {
            setAuthState("authenticated");
            setUser(res.data);
            setLoading(false);
            changeStatus("...");
            sessionStorage.setItem(
              "user",
              JSON.stringify({
                email: savedUser.email,
                password: savedUser.password,
                state: "authenticated",
              })
            );
            return true;
          } else {
            setAuthState("unauthenticated");
            sessionStorage.removeItem("user");
            localStorage.removeItem("user");
            window.location.href = "/";
            setLoading(false);
            changeStatus("...");
            return false;
          }
        })();
      } else {
        setLoading(false);
        setAuthState("unauthenticated");
        return false;
      }
    } else {
      setUser(JSON.parse(sessionStorage.getItem("user")));
      setAuthState("authenticated");
      setLoading(false);
      changeStatus("...");
      return true;
    }
  };

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
        revaliateUser,
        authState,
      }}
    >
      <Component {...pageProps} />
      <Loading loading={loading} status={status} />
    </GlobalStates.Provider>
  );
}
