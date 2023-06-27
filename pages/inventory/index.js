/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import Navbar from "@/components/Navbar";
import GlobalStates from "@/context/GlobalStateContext";
import connectDatabase from "@/db/connect";
import product from "@/db/product";
import { uploadFileArray } from "@/helper/asset";
import Head from "next/head";
import React, { useContext, useEffect, useRef, useState } from "react";

function Dashboard() {
  const {
    user,
    setUser,
    handleLogin,
    setLoading,
    changeStatus,
    products = [],
  } = useContext(GlobalStates);
  const [addmodal, setAddmodal] = useState(false);
  const [productAdded, setProductAdded] = useState(true);
  const inputImageRef = useRef(null);
  const [optProduct, setOptProduct] = useState({
    images: [],
    name: "",
    purchasePrice: "",
    purchaseQuantity: "",
    purchasedFrom: "",
    sellingPrice: "",
    shelfLocation: "",
  });
  useEffect(() => {
    if (localStorage.getItem("user")) {
      (async () => {
        if (user == false || user == null) {
          setLoading(true);
          changeStatus("Authenticating");
        }
        const savedUser = JSON.parse(window.atob(localStorage.getItem("user")));
        const res = await handleLogin(savedUser.email, savedUser.password);
        if (res.success) {
          setUser(res.data);
          setLoading(false);
          changeStatus("...");
        } else {
          localStorage.removeItem("user");
          window.location.href = "/login";
          setLoading(false);
          changeStatus("...");
        }
      })();
    }
  }, []);

  const handleSaveProduct = async () => {
    if (optProduct.images.length == 0)
      return alert("Please add atleast one image");

    setLoading(true);
    const links = await uploadFileArray(optProduct.images, changeStatus);
    changeStatus("Saving product data");
    const response = await fetch("/api/product/add", {
      method: "POST",
      body: JSON.stringify({
        images: links,
        name: optProduct.name,
        purchasePrice: optProduct.purchasePrice,
        purchaseQuantity: optProduct.purchaseQuantity,
        purchasedFrom: optProduct.purchasedFrom,
        sellingPrice: optProduct.sellingPrice,
        shelfLocation: optProduct.shelfLocation,
      }),
    });

    const data = await response.json();
    setLoading(false);
    if (data.success) {
      setProductAdded(true);
    }
  };

  console.log(products);
  return (
    <div>
      <Head>
        <title>Kalamkari - Inventory management system</title>
      </Head>
      <Navbar />
      <>
        {user !== null && user !== false && (
          <>
            <div className="px-0 lg:px-24 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-5 lg:mt-10">
              {products.length > 0 &&
                products.map((product, i) => {
                  return (
                    <div key={i} className="border-b border-r lg:border">
                      <div className="h-36 bg-yellow-100 relative overflow-hidden">
                        <img
                          src={product.images[0]}
                          alt=""
                          className="absolute inset-0 w-full"
                        />
                      </div>
                      <div className="p-3">
                        <span className="text-xs text-neutral-500">
                          {product.pid}
                        </span>
                        <h1 className="text-base font-bold mt-2">
                          ₹ {product.sellingPrice || 0}
                        </h1>
                        <h2 className="text-sm mt-1">
                          {product.name || "No name provided"}
                        </h2>
                        <div className="mt-4 grid grid-cols-3 text-xs">
                          <div className="flex items-center">
                            <span className="text-blue-600 mt-1">
                              <iconify-icon icon="bi:box"></iconify-icon>
                            </span>
                            <span className="ml-2 text-sm">
                              {product.stockQuantity || 0}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-sm text-red-700">
                              ₹{product.purchasePrice || 0}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-green-600">
                              <iconify-icon icon="bi:caret-up-fill"></iconify-icon>
                            </span>
                            <span className="ml-2 text-sm">
                              {
                                // calculate profit percentage

                                Math.round(
                                  ((product.sellingPrice -
                                    product.purchasePrice) /
                                    product.purchasePrice) *
                                    100
                                ) + "%"
                              }
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
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

              {productAdded == true ? (
                <div className="flex flex-col items-center bg-neutral-50 p-8 mt-16">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/010/160/867/non_2x/check-mark-icon-sign-design-free-png.png"
                    className="h-20"
                    alt=""
                  />
                  <h2 className="font-medium mt-6 text-neutral-800">Success</h2>
                  <p className="text-xs text-neutral-600 mt-2">
                    Product has been added successfully.
                  </p>
                  <div className="mt-10 grid grid-cols-2 w-full gap-2">
                    <button
                      onClick={() => {
                        setAddmodal(false);
                        setProductAdded(false);
                        setOptProduct({
                          images: [],
                          name: "",
                          purchasePrice: "",
                          purchaseQuantity: "",
                          purchasedFrom: "",
                          sellingPrice: "",
                          shelfLocation: "",
                        });
                      }}
                      className="border hover:bg-neutral-200 h-12 text-sm"
                    >
                      Close panel
                    </button>
                    <button
                      onClick={() => {
                        setProductAdded(false);
                        setOptProduct({
                          images: [],
                          name: "",
                          purchasePrice: "",
                          purchaseQuantity: "",
                          purchasedFrom: "",
                          sellingPrice: "",
                          shelfLocation: "",
                        });
                      }}
                      className="border bg-neutral-800 text-white hover:bg-neutral-900 h-12 text-sm"
                    >
                      Add another
                    </button>
                  </div>
                </div>
              ) : (
                <div>
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
                            setOptProduct({
                              ...optProduct,
                              images: [...optProduct.images, ...files],
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
                            src={URL.createObjectURL(image)}
                            alt=""
                          />
                          <div className="absolute bottom-0 inset-x-0 h-10 w-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center">
                            <button
                              className="w-full h-full flex items-center justify-center"
                              onClick={() => {
                                if (window.confirm("Remove this picture?")) {
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
                                height="20"
                                width="20"
                                icon="carbon:delete"
                              ></iconify-icon>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-10">
                    <label
                      htmlFor=""
                      className="text-xs text-neutral-600 block"
                    >
                      Product name
                    </label>
                    <input
                      type="text"
                      value={optProduct.name}
                      onChange={(e) => {
                        setOptProduct({
                          ...optProduct,
                          name: e.target.value,
                        });
                      }}
                      placeholder="Saree"
                      className="h-14 bg-transparent border mt-2 w-full px-5 border-neutral-200 rounded focus:outline-none focus:border-neutral-500"
                      name=""
                      id=""
                    />
                  </div>
                  <div className="mt-5">
                    <label
                      htmlFor=""
                      className="text-xs text-neutral-600 block"
                    >
                      Purchase price (1 unit)
                    </label>
                    <input
                      type="tel"
                      placeholder="2000"
                      value={optProduct.purchasePrice}
                      onChange={(e) => {
                        setOptProduct({
                          ...optProduct,
                          purchasePrice: e.target.value,
                        });
                      }}
                      className="h-14 bg-transparent border mt-2 w-full px-5 border-neutral-200 rounded focus:outline-none focus:border-neutral-500"
                      name=""
                      id=""
                    />
                  </div>
                  <div className="mt-5">
                    <label
                      htmlFor=""
                      className="text-xs text-neutral-600 block"
                    >
                      Qty purchased
                    </label>
                    <input
                      type="tel"
                      value={optProduct.purchaseQuantity}
                      onChange={(e) => {
                        setOptProduct({
                          ...optProduct,
                          purchaseQuantity: e.target.value,
                        });
                      }}
                      placeholder="10"
                      className="h-14 bg-transparent border mt-2 w-full px-5 border-neutral-200 rounded focus:outline-none focus:border-neutral-500"
                      name=""
                      id=""
                    />
                  </div>
                  <div className="mt-5">
                    <label
                      htmlFor=""
                      className="text-xs text-neutral-600 block"
                    >
                      Purchased from
                    </label>
                    <input
                      type="text"
                      value={optProduct.purchasedFrom}
                      onChange={(e) => {
                        setOptProduct({
                          ...optProduct,
                          purchasedFrom: e.target.value,
                        });
                      }}
                      placeholder="ABC whole sale"
                      className="h-14 bg-transparent border mt-2 w-full px-5 border-neutral-200 rounded focus:outline-none focus:border-neutral-500"
                      name=""
                      id=""
                    />
                  </div>
                  <div className="mt-5">
                    <label
                      htmlFor=""
                      className="text-xs text-neutral-600 block"
                    >
                      Selling price
                    </label>
                    <input
                      type="tel"
                      placeholder="2500"
                      value={optProduct.sellingPrice}
                      onChange={(e) =>
                        setOptProduct({
                          ...optProduct,
                          sellingPrice: e.target.value,
                        })
                      }
                      className="h-14 bg-transparent border mt-2 w-full px-5 border-neutral-200 rounded focus:outline-none focus:border-neutral-500"
                      name=""
                      id=""
                    />
                  </div>
                  <div className="mt-5">
                    <label
                      htmlFor=""
                      className="text-xs text-neutral-600 block"
                    >
                      Shelf location
                    </label>
                    <input
                      type="text"
                      placeholder="L-7"
                      value={optProduct.shelfLocation}
                      onChange={(e) =>
                        setOptProduct({
                          ...optProduct,
                          shelfLocation: e.target.value,
                        })
                      }
                      className="h-14 bg-transparent border mt-2 w-full px-5 border-neutral-200 rounded focus:outline-none focus:border-neutral-500"
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
                    <button
                      onClick={() => handleSaveProduct()}
                      className="w-fit ml-auto px-6 h-12 flex items-center space-x-3 justify-center bg-black rounded-md text-white"
                    >
                      <span>Save product</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
