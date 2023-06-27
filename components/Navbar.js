import GlobalStates from "@/context/GlobalStateContext";
import navmenu from "@/static/navmenu";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";

function Navbar() {
  const { user } = useContext(GlobalStates);
  const router = useRouter();
  return (
    <nav>
      <div className="border-b flex items-center px-6 lg:px-24 h-16 lg:h-20">
        <div onClick={() => location.reload()}>
          <h1 className="text-xl lg:text-2xl font-jost">Kalamkari</h1>
          <p className="text-xs lg:text-sm mt-1 text-neutral-500 lg:block">
            Inventory management system
          </p>
        </div>
        {user != null && user != false && (
          <ul className="hidden text-sm lg:flex items-center space-x-4 ml-20">
            {navmenu.map((item, i) => {
              return (
                <Link key={i} href={item.path}>
                  <li
                    key={i}
                    className={`cursor-pointer px-4 py-1 rounded-full flex items-center space-x-2 ${
                      router.pathname == item.path
                        ? "bg-sky-100"
                        : "bg-sky-100/0 hover:bg-sky-100/50"
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </li>
                </Link>
              );
            })}
          </ul>
        )}
        <button className="ml-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1"
            stroke="currentColor"
            class="w-8 h-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      </div>
      {user != null && user != false && (
        <ul className="lg:hidden text-sm flex items-center space-x-2 px-6 py-4 border-b overflow-auto shrink-0">
          {navmenu.map((item, i) => {
            return (
              <Link key={i} href={item.path}>
                <li
                  key={i}
                  className={`cursor-pointer px-4 py-1 rounded-full flex items-center space-x-2 ${
                    router.pathname == item.path
                      ? "bg-sky-100"
                      : "bg-sky-100/0 hover:bg-sky-100/50"
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </li>
              </Link>
            );
          })}
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
