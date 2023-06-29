import GlobalStates from "@/context/GlobalStateContext";
import navmenu from "@/static/navmenu";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";

function Navbar() {
  const { user, authState } = useContext(GlobalStates);
  const router = useRouter();
  useEffect(() => {
    console.log(user, authState);
  }, [user, authState]);
  return (
    <nav>
      <div className="border-b flex items-center px-6 lg:px-24 h-16 lg:h-20">
        <Link href={"/inventory"}>
          <div>
            <h1 className="text-xl lg:text-2xl font-jost">Kalamkari</h1>
            <p className="text-xs lg:text-sm mt-1 text-neutral-500 lg:block">
              Inventory management system
            </p>
          </div>
        </Link>
        {authState == "authenticated" && (
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
      </div>
      {authState == "authenticated" && (
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
