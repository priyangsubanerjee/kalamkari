/* eslint-disable @next/next/no-img-element */
import Navbar from "@/components/Navbar";
import React from "react";

function Login() {
  return (
    <div>
      <Navbar />
      <div className="p-3 lg:p-20 font-jost">
        <form
          action=""
          className="bg-neutral-50 w-full lg:max-w-[550px] mx-auto p-5 lg:p-10"
        >
          <p className="text-sm text-neutral-700">Authentication required</p>
          <h2 className="text-2xl font-semibold mt-3">Admin dashboard</h2>

          <div className="block w-full mt-8">
            <label htmlFor="" className="block text-neutral-500">
              Email
            </label>
            <input
              type="text"
              className="bg-white border h-14 w-full rounded mt-2"
              name=""
              id=""
            />
          </div>
          <div className="block w-full mt-5">
            <label htmlFor="" className="block text-neutral-500">
              Password
            </label>
            <input
              type="text"
              className="bg-white border h-14 w-full rounded mt-2"
              name=""
              id=""
            />
          </div>

          <div className="flex items-center mt-6 space-x-3">
            <input type="checkbox" name="" id="" />
            <label htmlFor="">Remember me</label>
          </div>

          <div className="mt-7">
            <button className="bg-neutral-800 w-full text-white px-5 h-14 rounded">
              <span>Login</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
