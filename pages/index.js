/* eslint-disable @next/next/no-img-element */
import Navbar from "@/components/Navbar";
import GlobalStates from "@/context/GlobalStateContext";
import React, { useContext, useEffect, useState } from "react";

function Login() {
  const { handleLogin, user, setUser } = useContext(GlobalStates);
  const [options, setOptions] = useState({
    email: "",
    password: "",
  });

  // check if already logged in

  useEffect(() => {
    (async () => {
      const savedUser = JSON.parse(window.atob(localStorage.getItem("user")));
      const res = await handleLogin(savedUser.email, savedUser.password);
      console.log(res);
      if (res.success) {
        window.location.href = "/dashboard";
      }
    })();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex items-center space-x-3 px-5 mt-7 lg:px-24 lg:mt-10 text-sm text-neutral-500">
        <span>Authentication</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-3 h-3"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
        <span className="text-black">Login</span>
      </div>
      <div className="px-5 mt-7 lg:px-24 lg:mt-10">
        <div className="bg-neutral-50 mx-auto max-w-[600px] px-6 lg:px-8 py-9">
          <div className="flex flex-col items-center justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3441/3441688.png"
              alt=""
              className="h-16 lg:h-20 opacity-70"
            />
            <h1 className="text-xl lg:text-2xl font-bold mt-5 text-neutral-700">
              Admin Console
            </h1>
            <p className="mt-2 text-neutral-500 text-sm">
              Use authorized credentials only.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const res = handleLogin(options.email, options.password);
                if (res.success) {
                  localStorage.setItem(
                    "user",
                    window.btoa(JSON.stringify(res.user))
                  );
                  window.location.href = "/dashboard";
                }
              }}
              className="block w-full mt-8"
            >
              <div>
                <label htmlFor="" className="text-sm text-neutral-500">
                  Email
                </label>
                <input
                  type="text"
                  value={options.email}
                  onChange={(e) =>
                    setOptions({ ...options, email: e.target.value })
                  }
                  className="block bg-white border w-full mt-2 px-6 py-4 rounded-md text-sm text-neutral-700"
                  placeholder="abc@example.com"
                  name=""
                  id=""
                />
              </div>
              <div className="mt-4">
                <label htmlFor="" className="text-sm text-neutral-500">
                  Password
                </label>
                <input
                  value={options.password}
                  onChange={(e) =>
                    setOptions({ ...options, password: e.target.value })
                  }
                  type="password"
                  className="block bg-white border w-full mt-2 px-6 py-4 rounded-md text-sm text-neutral-700 tracking-wider"
                  placeholder="••••••"
                  name=""
                  id=""
                />
              </div>
              <div className="mt-8 flex justify-between space-x-5">
                <button
                  type="button"
                  className="text-sm py-3 text-neutral-700 rounded-md"
                >
                  Need help?
                </button>
                <button
                  type="submit"
                  className="px-5 text-sm py-3 bg-blue-500 hover:bg-blue-600 text-white rounded"
                >
                  Proceed to login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
