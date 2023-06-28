/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import Navbar from "@/components/Navbar";
import GlobalStates from "@/context/GlobalStateContext";
import React, { useContext, useEffect, useState } from "react";

function Orders() {
  const { handleLogin, user, setUser, products } = useContext(GlobalStates);
  const [orderModal, setOrderModal] = useState(false);
  const [chooseProduct, setChooseProduct] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      setUser(JSON.parse(sessionStorage.getItem("user")));
    } else {
      window.location.href = "/";
    }
  }, []);

  useEffect(() => {
    if (searchQuery == "") {
      setSearchResults([]);
      return;
    } else {
      let results = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.pid.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    }
  }, [searchQuery]);

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  const ProductCard = (product) => {
    return (
      <div className="flex">
        <img
          src={product.images[0]}
          className="h-24 w-24 object-cover"
          alt=""
        />
        <div className="ml-4">
          <span className="text-xs text-neutral-700">
            {product.pid} - ₹{product.sellingPrice}
          </span>
          <h2 className="font-jost text-xs mt-1">{product.name || ""}</h2>
          <div className="flex items-center mt-3">
            <button
              onClick={() => {
                if (cart.filter((item) => item.pid == product.pid).length > 0) {
                  let cartImage = cart.map((item) => {
                    if (item.pid == product.pid) {
                      item.quantity = item.quantity + 1;
                    }
                    return item;
                  });
                  setCart(cartImage);
                } else {
                  let cartImage = [...cart];
                  cartImage.push({
                    pid: product.pid,
                    name: product.name,
                    price: product.sellingPrice,
                    image: product.images[0],
                    quantity: 1,
                  });
                  setCart(cartImage);
                }
              }}
              className="px-4 h-8 bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center"
            >
              <iconify-icon icon="ic:round-add"></iconify-icon>
            </button>
            <span className="px-4 h-8 bg-white flex items-center justify-center text-sm">
              {cart.filter((item) => item.pid == product.pid).length > 0
                ? cart.filter((item) => item.pid == product.pid)[0].quantity
                : 0}
            </span>
            <button
              onClick={() => {
                if (cart.filter((item) => item.pid == product.pid).length > 0) {
                  if (
                    cart.filter((item) => item.pid == product.pid)[0]
                      .quantity == 1
                  ) {
                    setCart(cart.filter((item) => item.pid != product.pid));
                  } else {
                    let cartImage = cart.map((item) => {
                      if (item.pid == product.pid) {
                        item.quantity = item.quantity - 1;
                      }
                      return item;
                    });
                    setCart(cartImage);
                  }
                } else {
                  console.log("not in cart");
                }
              }}
              className="px-4 h-8 bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center"
            >
              <iconify-icon icon="fluent:subtract-16-filled"></iconify-icon>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      {user != null && user != false && (
        <div>
          <div className="lg:px-28 px-0 lg:mt-10 whitespace-nowrap overflow-auto shrink-0">
            <table className="w-fit lg:w-full text-left">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="font-normal px-5 py-4 text-sm">Order id</th>
                  <th className="font-normal px-5 py-4 text-sm">Date</th>
                  <th className="font-normal px-5 py-4 text-sm">Name</th>
                  <th className="font-normal px-5 py-4 text-sm">Products</th>
                  <th className="font-normal px-5 py-4 text-sm">Amount</th>
                  <th className="font-normal px-5 py-4 text-sm">
                    Payment status
                  </th>
                  <th className="font-normal px-5 py-4 text-sm"></th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="font-normal px-5 py-4 text-sm">IN0027</td>
                  <td className="font-normal px-5 py-4 text-sm">29 June</td>
                  <td className="font-normal px-5 py-4 text-sm">
                    Priyangsu Banerjee
                  </td>
                  <td className="font-normal px-5 py-4 text-sm flex items-center">
                    <button className="bg-neutral-100 hover:bg-neutral-200 h-10 w-10 rounded transition-all">
                      <iconify-icon
                        height="20"
                        width="20"
                        icon="system-uicons:box"
                      ></iconify-icon>
                    </button>
                  </td>
                  <td className="font-normal px-5 py-4 text-sm">₹4000</td>
                  <td className="font-normal px-5 py-4 text-sm flex items-center space-x-2">
                    <span className="text-green-600">
                      <iconify-icon icon="bi:check-circle-fill"></iconify-icon>
                    </span>
                    <span>Paid</span>
                  </td>
                  <td className="font-normal px-5 py-4 text-sm">
                    <button className="bg-sky-100 hover:bg-sky-200 h-10 w-10 rounded transition-all flex items-center justify-center">
                      <iconify-icon
                        height="16"
                        width="16"
                        icon="ep:right"
                      ></iconify-icon>
                    </button>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="font-normal px-5 py-4 text-sm">IN0027</td>
                  <td className="font-normal px-5 py-4 text-sm">29 June</td>
                  <td className="font-normal px-5 py-4 text-sm">
                    Priyangsu Banerjee
                  </td>
                  <td className="font-normal px-5 py-4 text-sm flex items-center">
                    <button className="bg-neutral-100 hover:bg-neutral-200 h-10 w-10 rounded transition-all">
                      <iconify-icon
                        height="20"
                        width="20"
                        icon="system-uicons:box"
                      ></iconify-icon>
                    </button>
                  </td>
                  <td className="font-normal px-5 py-4 text-sm">₹4000</td>
                  <td className="font-normal px-5 py-4 text-sm flex items-center space-x-2">
                    <span className="text-green-600">
                      <iconify-icon icon="bi:check-circle-fill"></iconify-icon>
                    </span>
                    <span>Paid</span>
                  </td>
                  <td className="font-normal px-5 py-4 text-sm">
                    <button className="bg-sky-100 hover:bg-sky-200 h-10 w-10 rounded transition-all flex items-center justify-center">
                      <iconify-icon
                        height="16"
                        width="16"
                        icon="ep:right"
                      ></iconify-icon>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {orderModal == false && (
            <div>
              <div className="flex lg:hidden fixed items-center bottom-0 inset-x-0 p-4 border-t bg-neutral-50 z-10">
                <button
                  onClick={() => setOrderModal(true)}
                  className="w-fit text-sm ml-auto px-6 h-12 flex items-center space-x-3 justify-center bg-black rounded-md text-white"
                >
                  <iconify-icon
                    height="22"
                    width="22"
                    icon="solar:bag-3-outline"
                  ></iconify-icon>
                  <span>Create order</span>
                </button>
              </div>
              <div
                onClick={() => setOrderModal(true)}
                className="hidden lg:block fixed bottom-9 right-9 z-10"
              >
                <button className="h-20 w-20 shadow-xl shadow-black/20 bg-black rounded-full text-white flex items-center justify-center">
                  <iconify-icon
                    height="30"
                    width="30"
                    icon="solar:bag-3-outline"
                  ></iconify-icon>
                </button>
              </div>
            </div>
          )}

          {orderModal && (
            <div className="fixed inset-0 h-full w-full bg-black/50 flex justify-end">
              <div className="w-full lg:w-[500px] bg-white h-full overflow-auto pb-8">
                <div className="p-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl lg:text-2xl font-jost">
                      Create order
                    </h2>
                    <button onClick={() => setOrderModal(false)}>
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

                  <div className="mt-10">
                    <button
                      onClick={() => setChooseProduct(true)}
                      className="flex items-center justify-center space-x-3 text-sm rounded bg-neutral-100 hover:bg-neutral-200 w-full py-3"
                    >
                      <iconify-icon
                        height="20"
                        width="20"
                        icon="material-symbols:add-shopping-cart-rounded"
                      ></iconify-icon>
                      <span>
                        {cart.length == 0
                          ? "Add product to cart"
                          : "Modify products"}
                      </span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-5 mt-7">
                    {cart.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="grid grid-cols-3 border-b pb-4"
                        >
                          <div className="flex  items-center">
                            <img
                              className="h-12 w-12 object-cover"
                              src={item.image}
                              alt=""
                            />
                            <div className="ml-3">
                              <p className="text-xs text-neutral-700">
                                {item.pid}
                              </p>
                              <p className="text-xs mt-2  text-neutral-500">
                                ({item.name})
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col justify-center space-y-2 text-xs">
                            <p>{item.quantity} pcs</p>
                            <p>₹{item.price} each</p>
                          </div>
                          <div className="flex flex-col justify-center text-sm">
                            <p>₹{item.quantity * item.price}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {chooseProduct && (
            <div className="fixed inset-0 h-full w-full bg-black/50">
              <div className="fixed inset-0 h-full w-full bg-black/50 flex justify-end">
                <div className="w-full lg:w-[500px] bg-white h-full overflow-auto pb-8">
                  <div className="p-8">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl lg:text-2xl font-jost">
                        Choose products
                      </h2>
                      <button onClick={() => setChooseProduct(false)}>
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

                    <div className="mt-10">
                      <input
                        type="text"
                        placeholder="Search products"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="px-5 py-3 w-full border focus-within:border-black outline-none lg:text-sm"
                        name=""
                        id=""
                      />
                    </div>

                    <div className="grid grid-cols-1 mt-8 gap-5">
                      {searchResults.map((product) => {
                        return ProductCard(product);
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Orders;
