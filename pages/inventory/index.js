/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import Navbar from "@/components/Navbar";
import GlobalStates from "@/context/GlobalStateContext";
import React, { useContext, useEffect, useRef, useState } from "react";

function Dashboard() {
  const { user, setUser, handleLogin } = useContext(GlobalStates);
  const [addmodal, setAddmodal] = useState(false);
  const inputImageRef = useRef(null);
  const [optProduct, setOptProduct] = useState({
    images: [],
  });
  useEffect(() => {
    if (localStorage.getItem("user")) {
      (async () => {
        const savedUser = JSON.parse(window.atob(localStorage.getItem("user")));
        const res = await handleLogin(savedUser.email, savedUser.password);
        if (res.success) {
          setUser(res.data);
        } else {
          localStorage.removeItem("user");
          window.location.href = "/login";
        }
      })();
    }
  }, []);
  return (
    <div>
      <Navbar />
      <>
        {user !== null && user !== false && (
          <>
            <div className="px-0 lg:px-24 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-5 lg:mt-10">
              <div className="border-b border-r lg:border">
                <div className="h-36 bg-yellow-100 relative overflow-hidden">
                  <img
                    src="https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/22536178/2023/3/28/060630ba-0cb0-46f5-ab19-59a0d7502af41679989291511KALINIMaroonBlueWovenDesignZariPureSilkKanjeevaramSaree1.jpg"
                    alt=""
                    className="absolute inset-0 w-full"
                  />
                </div>
                <div className="p-3">
                  <span className="text-xs text-neutral-500">KM0020</span>
                  <h1 className="text-base font-bold mt-2">₹9000</h1>
                  <h2 className="text-sm mt-1">Sarees (साड़ी)</h2>
                  <div className="mt-4 grid grid-cols-3 text-xs">
                    <div className="flex items-center">
                      <span className="text-blue-600 mt-1">
                        <iconify-icon icon="bi:box"></iconify-icon>
                      </span>
                      <span className="ml-2 text-sm">10</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-red-700">₹4000</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-600">
                        <iconify-icon icon="bi:caret-up-fill"></iconify-icon>
                      </span>
                      <span className="ml-2 text-sm">33%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-b border-r lg:border">
                <div className="h-36 bg-yellow-100 relative overflow-hidden">
                  <img
                    src="https://cdn.shopify.com/s/files/1/1979/4335/collections/img_2488-23_12_greensaree_main_1200x1200.jpg?v=1642423305"
                    alt=""
                    className="absolute inset-0 w-full"
                  />
                </div>
                <div className="p-3">
                  <span className="text-xs text-neutral-500">KM0023</span>
                  <h1 className="text-base font-bold mt-2">₹5000</h1>
                  <h2 className="text-sm mt-1">Sarees (साड़ी)</h2>
                  <div className="mt-4 grid grid-cols-3 text-xs">
                    <div className="flex items-center">
                      <span className="text-blue-600 mt-1">
                        <iconify-icon icon="bi:box"></iconify-icon>
                      </span>
                      <span className="ml-2 text-sm">5</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-red-700">₹2000</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-600">
                        <iconify-icon icon="bi:caret-up-fill"></iconify-icon>
                      </span>
                      <span className="ml-2 text-sm">33%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {addmodal == false && (
              <div>
                <div
                  onClick={() => setAddmodal(true)}
                  className="flex lg:hidden fixed items-center bottom-0 inset-x-0 p-4 pb-8 border-t bg-neutral-50 z-10"
                >
                  <div className="flex items-center space-x-1 text-neutral-700">
                    <iconify-icon
                      height="24"
                      width="24"
                      icon="system-uicons:box"
                    ></iconify-icon>
                    <span className="text-sm">16 products</span>
                  </div>
                  <button className="w-fit ml-auto px-6 h-12 flex items-center space-x-3 justify-center bg-black rounded-md text-white">
                    <iconify-icon
                      height="24"
                      width="24"
                      icon="system-uicons:box-add"
                    ></iconify-icon>
                    <span>Add product</span>
                  </button>
                </div>
                <div
                  onClick={() => setAddmodal(true)}
                  className="hidden lg:block fixed bottom-9 right-9 z-10"
                >
                  <button className="h-20 w-20 shadow-xl shadow-black/20 bg-black rounded-full text-white flex items-center justify-center">
                    <iconify-icon
                      height="30"
                      width="30"
                      icon="system-uicons:box-add"
                    ></iconify-icon>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </>
      {addmodal && (
        <div className="fixed inset-0 h-full w-full bg-black/50 flex justify-end">
          <div className="w-full lg:w-[500px] bg-white h-full overflow-auto pb-8">
            <div className="p-8">
              <div className="flex items-center justify-between">
                <h2 className="text-xl lg:text-2xl font-jost">
                  Add product to inventory
                </h2>
                <button onClick={() => setAddmodal(false)}>
                  <iconify-icon
                    height="20"
                    width="20"
                    icon="uiw:close"
                  ></iconify-icon>
                </button>
              </div>
              <div className="flex items-center mt-2 space-x-2">
                <iconify-icon icon="ep:right"></iconify-icon>
                <p className="text-xs text-neutral-500 w-fit">
                  Inventory is managed by distributed CDN
                </p>
              </div>

              <div className="mt-10 flex items-center space-x-3 overflow-auto">
                <div
                  onClick={() => {
                    inputImageRef.current && inputImageRef.current.click();
                  }}
                  className="shrink-0 h-32 w-32 flex items-center justify-center bg-neutral-50 hover:bg-neutral-100 cursor-pointer"
                >
                  <span className="text-neutral-600">
                    <iconify-icon
                      height="30"
                      width="30"
                      icon="material-symbols:add-photo-alternate-outline-rounded"
                    ></iconify-icon>
                    <input
                      ref={inputImageRef}
                      onChange={(e) => {
                        let images = [];
                        let files = e.target.files;
                        for (let i = 0; i < files.length; i++) {
                          images.push(URL.createObjectURL(files[i]));
                        }
                        setOptProduct({
                          ...optProduct,
                          images: [...optProduct.images, ...images],
                        });
                      }}
                      multiple
                      type="file"
                      name=""
                      hidden
                      id=""
                    />
                  </span>
                </div>
                {optProduct.images.map((image, index) => {
                  return (
                    <div
                      key={index}
                      className="shrink-0 rounded overflow-hidden h-32 w-32 flex items-center justify-center bg-neutral-50 hover:bg-neutral-100 cursor-pointer relative"
                    >
                      <img
                        className="w-full h-full object-cover"
                        src={image}
                        alt=""
                      />
                      <div className="absolute opacity-0 hover:opacity-100 inset-0 h-full w-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center">
                        <button
                          onClick={() => {
                            if (window.confirm("Delete this picture")) {
                              let images = optProduct.images;
                              images.splice(index, 1);
                              setOptProduct({
                                ...optProduct,
                                images: images,
                              });
                            }
                          }}
                        >
                          <iconify-icon
                            height="30"
                            width="30"
                            icon="uiw:close"
                          ></iconify-icon>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-10">
                <label htmlFor="" className="text-xs text-neutral-600 block">
                  Product name
                </label>
                <input
                  type="text"
                  placeholder="Saree"
                  className="h-14 bg-transparent border mt-2 w-full px-5 border-neutral-200 rounded-none focus:outline-none focus:border-neutral-500"
                  name=""
                  id=""
                />
              </div>

              <div className="mt-5">
                <label htmlFor="" className="text-xs text-neutral-600 block">
                  Purchase price (1 unit)
                </label>
                <input
                  type="tel"
                  placeholder="2000"
                  className="h-14 bg-transparent border mt-2 w-full px-5 border-neutral-200 rounded-none focus:outline-none focus:border-neutral-500"
                  name=""
                  id=""
                />
              </div>

              <div className="mt-5">
                <label htmlFor="" className="text-xs text-neutral-600 block">
                  Qty purchased
                </label>
                <input
                  type="tel"
                  placeholder="10"
                  className="h-14 bg-transparent border mt-2 w-full px-5 border-neutral-200 rounded-none focus:outline-none focus:border-neutral-500"
                  name=""
                  id=""
                />
              </div>

              <div className="mt-5">
                <label htmlFor="" className="text-xs text-neutral-600 block">
                  Purchased from
                </label>
                <input
                  type="text"
                  placeholder="ABC whole sale"
                  className="h-14 bg-transparent border mt-2 w-full px-5 border-neutral-200 rounded-none focus:outline-none focus:border-neutral-500"
                  name=""
                  id=""
                />
              </div>

              <div className="mt-5">
                <label htmlFor="" className="text-xs text-neutral-600 block">
                  Selling price
                </label>
                <input
                  type="tel"
                  placeholder="2500"
                  className="h-14 bg-transparent border mt-2 w-full px-5 border-neutral-200 rounded-none focus:outline-none focus:border-neutral-500"
                  name=""
                  id=""
                />
              </div>

              <div className="mt-5">
                <label htmlFor="" className="text-xs text-neutral-600 block">
                  Shelf location
                </label>
                <input
                  type="text"
                  placeholder="L-7"
                  className="h-14 bg-transparent border mt-2 w-full px-5 border-neutral-200 rounded-none focus:outline-none focus:border-neutral-500"
                  name=""
                  id=""
                />
              </div>

              <div className="mt-10 flex items-center">
                <button className="flex items-center space-x-2 text-neutral-700">
                  <iconify-icon
                    height="24"
                    width="24"
                    icon="solar:graph-up-linear"
                  ></iconify-icon>
                  <span className="text-sm">View metrics</span>
                </button>
                <button className="w-fit ml-auto px-6 h-12 flex items-center space-x-3 justify-center bg-black rounded-md text-white">
                  <span>Save product</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
