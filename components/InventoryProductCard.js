/* eslint-disable @next/next/no-img-element */
import GlobalStates from "@/context/GlobalStateContext";
import { uploadFileArray } from "@/helper/asset";
import { set } from "mongoose";
import React, { useContext, useEffect, useRef, useState } from "react";

function InventoryProductCard({ product }) {
  const { setLoading, changeStatus, refreshProducts } =
    useContext(GlobalStates);
  const [editOpen, setEditOpen] = useState(false);
  const [productCopy, setProductCopy] = useState(product);
  const [additionalPhotos, setAdditionalPhotos] = useState([]);
  const inputImageRef = useRef(null);
  const nameRef = useRef(null);
  const [readOnly, setReadOnly] = useState(true);
  const [updated, setUpdated] = useState(false);
  const [reStockOpen, setReStockOpen] = useState(false);
  const [resStockOptions, setResStockOptions] = useState({
    pid: product.pid,
    quantity: "",
    price: "",
  });

  const handleRestock = async () => {
    if (resStockOptions.quantity == "" || resStockOptions.price == "") {
      alert("Please enter valid quantity and price");
      return;
    }
    setLoading(true);
    changeStatus("Restocking product");
    const res = await fetch("/api/product/restock", {
      method: "POST",
      body: JSON.stringify({
        pid: resStockOptions.pid,
        quantity: resStockOptions.quantity,
        price: resStockOptions.price,
      }),
    });
    const data = await res.json();
    if (data.success) {
      setLoading(false);
      setReStockOpen(false);
      setReadOnly(true);
      refreshProducts();
      setProductCopy({
        ...productCopy,
        stockQuantity: parseInt(resStockOptions.quantity),
        purchaseQuantity: parseInt(resStockOptions.quantity),
        purchasePrice: resStockOptions.price,
      });
    }
  };

  const handleSave = async () => {
    let images = [...productCopy.images];
    setLoading(true);
    if (additionalPhotos.length > 0) {
      const links = await uploadFileArray(additionalPhotos, changeStatus);
      images = [...images, ...links];
    }
    changeStatus("Updating product");
    const res = await fetch("/api/product/update", {
      method: "POST",
      body: JSON.stringify({
        pid: productCopy.pid,
        images,
        name: productCopy.name,
        purchasePrice: productCopy.purchasePrice,
        purchaseQuantity: productCopy.purchaseQuantity,
        stockQuantity: productCopy.stockQuantity,
        purchasedFrom: productCopy.purchasedFrom,
        sellingPrice: productCopy.sellingPrice,
        shelfLocation: productCopy.shelfLocation,
      }),
    });
    const data = await res.json();
    if (data.success) {
      setUpdated(true);
      setLoading(false);
      refreshProducts();
      setReadOnly(true);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setLoading(true);
      changeStatus("Deleting product");
      const res = await fetch("/api/product/delete", {
        method: "POST",
        body: JSON.stringify({
          id: productCopy._id,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setLoading(false);
        refreshProducts();
        setReadOnly(true);
      }
    }
  };

  useEffect(() => {
    if (readOnly == false) {
      nameRef.current && nameRef.current.focus();
    }
  }, [readOnly]);

  return (
    <>
      <div
        onClick={() => setEditOpen(true)}
        className="border-b border-r lg:border"
      >
        <div className="h-36 bg-neutral-100 relative overflow-hidden">
          <img
            src={product.images[0]}
            alt=""
            className="absolute inset-0 w-full"
          />
        </div>
        <div className="p-3">
          <span className="text-xs text-neutral-500">{product.pid}</span>
          <h1 className="text-base font-bold mt-2">
            ₹ {product.sellingPrice || 0}
          </h1>
          <h2 className="text-sm mt-1">{product.name || "No name provided"}</h2>
          <div className="mt-4 grid grid-cols-3 text-xs">
            <div className="flex items-center">
              <span className="text-blue-600 mt-1">
                <iconify-icon icon="bi:box"></iconify-icon>
              </span>
              <span className="ml-2 text-sm">{product.stockQuantity || 0}</span>
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
                    ((product.sellingPrice - product.purchasePrice) /
                      product.purchasePrice) *
                      100
                  ) + "%"
                }
              </span>
            </div>
          </div>
        </div>
      </div>

      {editOpen && (
        <div className="fixed inset-0 h-full w-full bg-black/50 flex justify-end z-20">
          <div className="w-full lg:w-[500px] bg-white h-full overflow-auto pb-8">
            <div className="p-8">
              <div className="flex items-center justify-between">
                <h2 className="text-xl lg:text-2xl font-jost">
                  Update product
                </h2>
                <button
                  onClick={() => {
                    setEditOpen(false);
                    setUpdated(false);
                    setReadOnly(true);
                  }}
                >
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

              {updated ? (
                <div className="flex flex-col items-center bg-neutral-50 p-8 mt-7">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/010/160/867/non_2x/check-mark-icon-sign-design-free-png.png"
                    className="h-20"
                    alt=""
                  />
                  <h2 className="font-medium mt-6 text-neutral-800">Success</h2>
                  <p className="text-xs text-neutral-600 mt-2">
                    Product updated successfully
                  </p>
                  <div className="mt-10 grid grid-cols-2 w-full gap-2">
                    <button
                      onClick={() => {
                        setEditOpen(false);
                        setUpdated(false);
                        setReadOnly(true);
                      }}
                      className="border hover:bg-neutral-200 h-12 text-sm"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => {
                        setReadOnly(true);
                        setUpdated(false);
                      }}
                      className="border bg-neutral-800 text-white hover:bg-neutral-900 h-12 text-sm"
                    >
                      Preview
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-5 lg:mt-10 ">
                  <div className="flex items-center space-x-3 overflow-auto">
                    {readOnly == false && (
                      <div
                        onClick={() => {
                          inputImageRef.current &&
                            inputImageRef.current.click();
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
                              let files = e.target.files;
                              setAdditionalPhotos([
                                ...additionalPhotos,
                                ...files,
                              ]);
                            }}
                            multiple
                            type="file"
                            name=""
                            hidden
                            id=""
                          />
                        </span>
                      </div>
                    )}
                    {productCopy.images &&
                      productCopy.images.map((image, index) => {
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
                            {readOnly == false && (
                              <div className="absolute bottom-0 inset-x-0 h-10 w-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center">
                                <button
                                  className="w-full h-full flex items-center justify-center"
                                  onClick={() => {
                                    if (
                                      window.confirm("Remove this picture?")
                                    ) {
                                      let images = productCopy.images;
                                      images.splice(index, 1);
                                      setProductCopy({
                                        ...productCopy,
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
                            )}
                          </div>
                        );
                      })}
                    {additionalPhotos &&
                      additionalPhotos.map((image, index) => {
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

                            {readOnly == false && (
                              <div className="absolute bottom-0 inset-x-0 h-10 w-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center">
                                <button
                                  className="w-full h-full flex items-center justify-center"
                                  onClick={() => {
                                    if (
                                      window.confirm("Remove this picture?")
                                    ) {
                                      let images = [...additionalPhotos];
                                      images.splice(index, 1);
                                      setAdditionalPhotos(images);
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
                            )}
                          </div>
                        );
                      })}
                  </div>
                  <div>
                    <div className="mt-10">
                      <label
                        htmlFor=""
                        className="text-xs text-neutral-600 block"
                      >
                        Product name
                      </label>
                      <input
                        type="text"
                        ref={nameRef}
                        readOnly={readOnly}
                        value={productCopy.name}
                        onChange={(e) => {
                          setProductCopy({
                            ...productCopy,
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
                        readOnly={true}
                        placeholder="2000"
                        value={productCopy.purchasePrice}
                        onChange={(e) => {
                          setProductCopy({
                            ...productCopy,
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
                        value={productCopy.purchaseQuantity}
                        readOnly={true}
                        onChange={(e) => {
                          setProductCopy({
                            ...productCopy,
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
                        Qty in stock
                      </label>
                      <input
                        type="tel"
                        value={productCopy.stockQuantity}
                        readOnly={true}
                        onChange={(e) => {
                          setProductCopy({
                            ...productCopy,
                            stockQuantity: e.target.value,
                          });
                        }}
                        placeholder="10"
                        className="h-14 bg-transparent border mt-2 w-full px-5 border-neutral-200 rounded focus:outline-none focus:border-neutral-500"
                        name=""
                        id=""
                      />
                    </div>

                    {readOnly == false && product.stockQuantity == 0 && (
                      <div className="mt-5 flex items-center justify-end">
                        <button
                          onClick={() => setReStockOpen(true)}
                          className="h-12 space-x-2 bg-blue-500 border mt-2 w-fit px-5 border-blue-600 rounded flex items-center text-sm text-white"
                        >
                          <iconify-icon
                            height="24"
                            width="24"
                            icon="system-uicons:box-add"
                          ></iconify-icon>
                          <span>Restock product</span>
                        </button>
                      </div>
                    )}
                    <div className="mt-5">
                      <label
                        htmlFor=""
                        className="text-xs text-neutral-600 block"
                      >
                        Purchased from
                      </label>
                      <input
                        type="text"
                        value={productCopy.purchasedFrom}
                        readOnly={readOnly}
                        onChange={(e) => {
                          setProductCopy({
                            ...productCopy,
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
                        readOnly={readOnly}
                        value={productCopy.sellingPrice}
                        onChange={(e) =>
                          setProductCopy({
                            ...productCopy,
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
                        readOnly={readOnly}
                        value={productCopy.shelfLocation}
                        onChange={(e) =>
                          setProductCopy({
                            ...productCopy,
                            shelfLocation: e.target.value,
                          })
                        }
                        className="h-14 bg-transparent border mt-2 w-full px-5 border-neutral-200 rounded focus:outline-none focus:border-neutral-500"
                        name=""
                        id=""
                      />
                    </div>

                    {readOnly == false && (
                      <div className="mt-16 flex items-center">
                        <button
                          onClick={() => setReadOnly(true)}
                          className="flex px-6 h-12 items-center space-x-2 text-neutral-700"
                        >
                          <iconify-icon
                            height="24"
                            width="24"
                            icon="solar:eye-broken"
                          ></iconify-icon>
                          <span className="text-sm">View mode</span>
                        </button>
                        <button
                          onClick={() => handleSave()}
                          className="w-fit text-sm ml-auto px-6 h-12 flex items-center space-x-3 justify-center bg-black rounded-md text-white"
                        >
                          <span>Save product</span>
                        </button>
                      </div>
                    )}

                    {readOnly == true && (
                      <div>
                        <div className="flex items-center mt-16">
                          <button
                            onClick={() => handleDelete()}
                            className="flex items-center space-x-2 px-6 h-12 bg-red-50 hover:bg-red-100 text-red-500 text-sm rounded-md transition-all"
                          >
                            <iconify-icon
                              height="16"
                              width="16"
                              icon="uiw:delete"
                            ></iconify-icon>
                            <span className="text-sm">Delete</span>
                          </button>
                          <button
                            onClick={() => setReadOnly(false)}
                            className="w-fit text-sm ml-auto px-6 h-12 flex items-center space-x-3 justify-center bg-black rounded-md text-white"
                          >
                            <iconify-icon
                              height="24"
                              width="24"
                              icon="iconamoon:edit-thin"
                            ></iconify-icon>
                            <span>Edit product</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {reStockOpen && (
        <div className="fixed inset-0 h-full w-full bg-black/50 flex justify-end z-20">
          <div className="w-full lg:w-[500px] bg-white h-full overflow-auto pb-8">
            <div className="p-8">
              <div className="flex items-center justify-between">
                <h2 className="text-xl lg:text-2xl font-jost">
                  Restock product
                </h2>
                <button
                  onClick={() => {
                    setReStockOpen(false);
                  }}
                >
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

              <div className="mt-16">
                <div>
                  <label htmlFor="" className="text-xs text-neutral-600 block">
                    Purchased quantity
                  </label>
                  <input
                    type="tel"
                    value={resStockOptions.quantity}
                    onChange={(e) => {
                      setResStockOptions({
                        ...resStockOptions,
                        quantity: e.target.value,
                      });
                    }}
                    placeholder="10"
                    className="h-14 bg-transparent border mt-2 w-full px-5 border-neutral-200 rounded focus:outline-none focus:border-neutral-500"
                    name=""
                    id=""
                  />
                </div>
                <div className="mt-5">
                  <label htmlFor="" className="text-xs text-neutral-600 block">
                    Purchase price
                  </label>
                  <input
                    type="tel"
                    value={resStockOptions.price}
                    onChange={(e) => {
                      setResStockOptions({
                        ...resStockOptions,
                        price: e.target.value,
                      });
                    }}
                    placeholder="10"
                    className="h-14 bg-transparent border mt-2 w-full px-5 border-neutral-200 rounded focus:outline-none focus:border-neutral-500"
                    name=""
                    id=""
                  />
                </div>

                <div className="mt-10 flex items-center">
                  <button
                    onClick={() => handleRestock()}
                    className="w-fit text-sm ml-auto px-6 h-12 flex items-center space-x-3 justify-center bg-black rounded-md text-white"
                  >
                    <span>Save product</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default InventoryProductCard;
