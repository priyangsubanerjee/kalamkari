import GlobalStates from "@/context/GlobalStateContext";
import "@/styles/globals.css";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(false);
  return (
    <GlobalStates.Provider value={{ user, setUser }}>
      <Component {...pageProps} />
    </GlobalStates.Provider>
  );
}
