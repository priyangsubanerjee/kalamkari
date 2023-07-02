/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import InvoiceCard from "@/components/InvoiceCard";
import Navbar from "@/components/Navbar";
import GlobalStates from "@/context/GlobalStateContext";
import React, { useContext, useEffect, useState } from "react";

function Orders() {
  const {
    user,
    setUser,
    products,
    setLoading,
    changeStatus,
    invoices,
    refreshInvoices,
    refreshProducts,
    refreshSales,
  } = useContext(GlobalStates);
  const [productsCopy, setProductsCopy] = useState([]);
  const [orderModal, setOrderModal] = useState(false);
  const [chooseProduct, setChooseProduct] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [cart, setCart] = useState([]);
  const [inv, setInv] = useState("");
  const [invoiceOptions, setInvoiceOptions] = useState({
    name: "",
    phone: "",
    paymentStatus: "paid",
    amountPaid: "",
    paymentMethod: "upi",
    total: 0,
  });

  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      setUser(JSON.parse(sessionStorage.getItem("user")));
    } else {
      window.location.href = "/";
    }
  }, []);

  useEffect(() => {
    if (searchQuery == "") {
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
    if (cart.length > 0) {
      let total = 0;
      cart.map((item) => {
        total = total + item.price * item.quantity;
      });
      setInvoiceOptions({
        ...invoiceOptions,
        total: total,
      });
    } else {
      setInvoiceOptions({
        ...invoiceOptions,
        total: 0,
      });
    }
  }, [cart]);

  useEffect(() => {
    (async () => {
      let res = await refreshProducts();
      setSearchResults(res);
      setProductsCopy(res);
    })();
  }, [chooseProduct]);

  const ProductCard = (product) => {
    return (
      <div className="flex">
        <img
          src={product.images[0]}
          className="h-24 w-24 object-cover "
          alt=""
        />
        <div className="ml-4 relative">
          {product.stockQuantity == 0 && (
            <div className="absolute inset-0 h-full w-full bg-white text-sm justify-center flex flex-col">
              <p className="text-red-500">Out of stock</p>
              <p className="mt-5 font-medium">₹{product.sellingPrice}</p>
            </div>
          )}
          <span className="text-xs text-neutral-700">
            {product.pid} - ₹{product.sellingPrice}
          </span>
          <h2 className="font-jost text-xs mt-1">{product.name || ""}</h2>
          <div className="flex items-center mt-3">
            <button
              onClick={() => {
                if (product.stockQuantity > 0) {
                  if (
                    cart.filter((item) => item.pid == product.pid).length > 0
                  ) {
                    let cartImage = cart.map((item) => {
                      if (item.pid == product.pid) {
                        if (item.quantity < product.stockQuantity) {
                          item.quantity = item.quantity + 1;
                        }
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

  const handleGenerateInvoice = async () => {
    if (cart.length == 0) {
      alert("Please add products to cart");
      return;
    } else if (invoiceOptions.name.length == 0) {
      alert("Please add customer name");
      return;
    } else if (invoiceOptions.phone.length == 0) {
      alert("Please add customer phone");
      return;
    } else if (invoiceOptions.amountPaid.length == 0) {
      alert("Please add amount paid");
      return;
    }
    setLoading(true);
    changeStatus("Creating invoice");
    const response = await fetch("/api/orders/generate", {
      method: "POST",
      body: JSON.stringify({
        products: cart,
        name: invoiceOptions.name,
        phone: invoiceOptions.phone,
        total: invoiceOptions.total,
        status: invoiceOptions.paymentStatus,
        amountPaid: invoiceOptions.amountPaid,
        paymentMethod: invoiceOptions.paymentMethod,
      }),
    });
    const invoice = await response.json();
    if (invoice.success) {
      await refreshInvoices();
      await refreshProducts();
      await refreshSales();
      setLoading(false);
      setInv(invoice.data.inv);
    } else {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      {user != null && user != false && (
        <div>
          <div className="lg:px-28 px-0 lg:mt-10 whitespace-nowrap overflow-auto shrink-0 pb-24">
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
                  <th className="font-normal px-5 py-4 text-sm"></th>
                </tr>
              </thead>
              <tbody>
                {invoices &&
                  invoices.map((invoice, i) => {
                    return <InvoiceCard key={i} invoice={invoice} />;
                  })}
              </tbody>
            </table>
          </div>

          {invoices && invoices.length == 0 && (
            <div className="flex flex-col items-center space-y-7 w-full mt-16">
              <img
                src="https://media.istockphoto.com/id/861576608/vector/empty-shopping-bag-icon-online-business-vector-icon-template.jpg?s=170667a&w=0&k=20&c=gEwKNDAlip0HNDoRsG0qHY2TSvJAZmaRw43IUbEqxMM="
                alt=""
                className="h-60"
              />
              <p className="font-jost">No invoices found</p>
            </div>
          )}

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
                    <button
                      onClick={() => {
                        if (cart.length > 0) {
                          if (
                            window.confirm(
                              "You have items in your cart. Are you sure you want to close?"
                            )
                          ) {
                            setCart([]);
                            setOrderModal(false);
                            setInvoiceOptions({
                              name: "",
                              phone: "",
                              paymentStatus: "paid",
                              amountPaid: 0,
                              paymentMethod: "upi",
                              total: 0,
                            });
                          }
                        } else {
                          setOrderModal(false);
                        }
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

                  <div className="flex justify-between mt-10">
                    <div>
                      <p className="font-jost text-xl">Total payable amount</p>
                      <p className="text-xs mt-2 text-teal-600">
                        *inclusive of all taxes
                      </p>
                    </div>
                    <div>
                      <p className="font-jost text-lg font-medium">
                        ₹{invoiceOptions.total}
                      </p>
                    </div>
                  </div>

                  <div className="border-t mt-10">
                    <div className="mt-5">
                      <label
                        htmlFor=""
                        className="text-xs text-neutral-600 block"
                      >
                        Customer name
                      </label>
                      <input
                        type="text"
                        value={invoiceOptions.name}
                        onChange={(e) =>
                          setInvoiceOptions({
                            ...invoiceOptions,
                            name: e.target.value,
                          })
                        }
                        placeholder="John doe"
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
                        Customer phone
                      </label>
                      <input
                        type="tel"
                        placeholder="965xxxxxxx"
                        value={invoiceOptions.phone}
                        onChange={(e) =>
                          setInvoiceOptions({
                            ...invoiceOptions,
                            phone: e.target.value,
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
                        Payment status
                      </label>
                      <select
                        className="relative appearance-none h-14 bg-transparent border mt-2 w-full px-5 border-neutral-200 rounded focus:outline-none focus:border-neutral-500 "
                        value={invoiceOptions.paymentStatus}
                        onChange={(e) =>
                          setInvoiceOptions({
                            ...invoiceOptions,
                            paymentStatus: e.target.value,
                          })
                        }
                        name=""
                        id=""
                      >
                        <option value="paid">Paid</option>
                        <option value="due">Due</option>
                      </select>
                    </div>
                    <div className="mt-5">
                      <label
                        htmlFor=""
                        className="text-xs text-neutral-600 block"
                      >
                        Amount paid
                      </label>
                      <input
                        type="tel"
                        placeholder="1000"
                        value={invoiceOptions.amountPaid}
                        onChange={(e) =>
                          setInvoiceOptions({
                            ...invoiceOptions,
                            amountPaid: e.target.value,
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
                        Payment method
                      </label>
                      <select
                        className="relative appearance-none h-14 bg-transparent border mt-2 w-full px-5 border-neutral-200 rounded focus:outline-none focus:border-neutral-500 "
                        value={invoiceOptions.paymentMethod}
                        onChange={(e) =>
                          setInvoiceOptions({
                            ...invoiceOptions,
                            paymentMethod: e.target.value,
                          })
                        }
                        name=""
                        id=""
                      >
                        <option value="upi">Upi</option>
                        <option value="cash">Cash</option>
                        <option value="c/d cards">Credit / Debit cards</option>
                      </select>
                    </div>
                    <div className="mt-10 flex items-center justify-between">
                      <button
                        onClick={() => handleGenerateInvoice()}
                        className="w-fit text-sm ml-auto px-6 h-12 flex items-center space-x-3 justify-center bg-black rounded-md text-white"
                      >
                        <span>Generate invoice</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {chooseProduct && (
            <div className="fixed inset-0 h-full w-full bg-black/50 flex justify-end">
              <div className="w-full lg:w-[500px] bg-white h-full overflow-auto pb-8">
                <div className="p-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl lg:text-2xl font-jost">
                      Choose products
                    </h2>
                    <button onClick={() => setChooseProduct(false)}>
                      <iconify-icon
                        height="25"
                        width="25"
                        icon="teenyicons:tick-solid"
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
                    {searchResults &&
                      searchResults.map((product) => {
                        return ProductCard(product);
                      })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {inv.length > 0 && (
            <div className="fixed inset-0 h-full w-full bg-black/50 flex justify-end z-30">
              <div className="w-full lg:w-[500px] bg-white h-full overflow-auto pb-8">
                <div className="p-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl lg:text-2xl font-jost">
                      Invoice generated
                    </h2>
                    <button
                      onClick={() => {
                        setInv("");
                        setCart([]);
                        setOrderModal(false);
                        setInvoiceOptions({
                          name: "",
                          phone: "",
                          paymentStatus: "paid",
                          amountPaid: 0,
                          paymentMethod: "upi",
                          total: 0,
                        });
                        setChooseProduct(false);
                        setSearchQuery("");
                        setLoading(false);
                      }}
                    >
                      <iconify-icon
                        height="25"
                        width="25"
                        icon="teenyicons:tick-solid"
                      ></iconify-icon>
                    </button>
                  </div>
                  <div className="flex items-center mt-2 space-x-2">
                    <iconify-icon icon="ep:right"></iconify-icon>
                    <p className="text-xs text-neutral-500 w-fit">
                      Inventory is managed by distributed CDN
                    </p>
                  </div>
                  <div className="flex flex-col items-center bg-neutral-50 p-8 mt-7">
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/010/160/867/non_2x/check-mark-icon-sign-design-free-png.png"
                      className="h-20"
                      alt=""
                    />
                    <h2 className="font-medium mt-6 text-neutral-800">{inv}</h2>
                    <p className="text-xs text-neutral-600 mt-2">
                      Invoice has been generated successfully.
                    </p>
                    <div className="mt-10 grid grid-cols-2 w-full gap-2">
                      <button
                        onClick={() => {
                          // copy inv to clipboard
                          let address =
                            "https://kalamkari.vercel.app/orders/invoice/" +
                            inv;
                          navigator.clipboard.writeText(address);
                        }}
                        className="border hover:bg-neutral-200 h-12 text-sm"
                      >
                        Copy link
                      </button>
                      <button
                        onClick={() => {
                          let address =
                            "https://kalamkari.vercel.app/orders/invoice/" +
                            inv;

                          navigator.share({
                            title: "Kalamkari invoice",
                            text: "Invoice for order " + inv,
                            url: address,
                          });
                        }}
                        className="border bg-neutral-800 text-white hover:bg-neutral-900 h-12 text-sm"
                      >
                        Share invoice
                      </button>
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
