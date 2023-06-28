/* eslint-disable @next/next/no-img-element */
import Navbar from "@/components/Navbar";
import connectDatabase from "@/db/connect";
import product from "@/db/product";
import React, { useRef, useState } from "react";

export async function getServerSideProps(ctx) {
  const { id } = ctx.query;
  await connectDatabase();
  try {
    const product_ = await product.findOne({ pid: id.toString() });
    return {
      props: {
        product: JSON.parse(JSON.stringify(product_)) || null,
      },
    };
  } catch (error) {
    return {
      props: {
        product: null,
      },
    };
  }
}

function Product({ product = {} }) {
  const [readOnly, setReadOnly] = useState(true);
  const [productCopy, setProductCopy] = useState(product);
  const [additionalPhotos, setAdditionalPhotos] = useState([]);
  const inputImageRef = useRef(null);

  return (
    <div className={`${readOnly == true ? "pb-32" : "pb-7"}`}>
      <Navbar />
      <div className="px-6 lg:px-28 mt-7 lg:mt-10">
        <div className="flex items-center space-x-3 text-xs text-neutral-500">
          <span>Inventory</span>
          <span>/</span>
          <span>Product</span>
          <span>/</span>
          <span className="text-neutral-900">{productCopy.pid}</span>
        </div>
        <div className="mt-5 lg:mt-10 flex items-center space-x-3 overflow-auto">
          {readOnly == false && (
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
                    let files = e.target.files;
                    setAdditionalPhotos([...additionalPhotos, ...files]);
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
                  <div className="absolute bottom-0 inset-x-0 h-10 w-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center">
                    <button
                      className="w-full h-full flex items-center justify-center"
                      onClick={() => {
                        if (window.confirm("Remove this picture?")) {
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
                  <div className="absolute bottom-0 inset-x-0 h-10 w-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center">
                    <button
                      className="w-full h-full flex items-center justify-center"
                      onClick={() => {
                        if (window.confirm("Remove this picture?")) {
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
                </div>
              );
            })}
        </div>
        <div className="lg:w-[600px]">
          <div className="mt-10">
            <label htmlFor="" className="text-xs text-neutral-600 block">
              Product name
            </label>
            <input
              type="text"
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
            <label htmlFor="" className="text-xs text-neutral-600 block">
              Purchase price (1 unit)
            </label>
            <input
              type="tel"
              readOnly={readOnly}
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
            <label htmlFor="" className="text-xs text-neutral-600 block">
              Qty purchased
            </label>
            <input
              type="tel"
              value={productCopy.purchaseQuantity}
              readOnly={readOnly}
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
            <label htmlFor="" className="text-xs text-neutral-600 block">
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
            <label htmlFor="" className="text-xs text-neutral-600 block">
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
            <label htmlFor="" className="text-xs text-neutral-600 block">
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
            <div className="mt-10 flex items-center">
              <button
                onClick={() => setReadOnly(true)}
                className="flex items-center space-x-2 text-neutral-700"
              >
                <iconify-icon
                  height="24"
                  width="24"
                  icon="solar:eye-broken"
                ></iconify-icon>
                <span className="text-sm">View mode</span>
              </button>
              <button
                onClick={() => handleSaveProduct()}
                className="w-fit ml-auto px-6 h-12 flex items-center space-x-3 justify-center bg-black rounded-md text-white"
              >
                <span>Save product</span>
              </button>
            </div>
          )}

          {readOnly == true && (
            <div>
              <div
                onClick={() => setReadOnly(false)}
                className="flex lg:hidden fixed items-center bottom-0 inset-x-0 p-4 pb-8 border-t bg-neutral-50 z-10"
              >
                <div className="flex items-center space-x-2 text-neutral-700">
                  <iconify-icon
                    height="24"
                    width="24"
                    icon="system-uicons:box"
                  ></iconify-icon>
                  <span className="text-sm">{product.pid}</span>
                </div>
                <button className="w-fit text-sm ml-auto px-6 h-12 flex items-center space-x-3 justify-center bg-black rounded-md text-white">
                  <iconify-icon
                    height="24"
                    width="24"
                    icon="iconamoon:edit-thin"
                  ></iconify-icon>
                  <span>Edit product</span>
                </button>
              </div>
              <div
                onClick={() => setReadOnly(false)}
                className="hidden lg:block fixed bottom-9 right-9 z-10"
              >
                <button className="h-20 w-20 shadow-xl shadow-black/20 bg-black rounded-full text-white flex items-center justify-center">
                  <iconify-icon
                    height="30"
                    width="30"
                    icon="iconamoon:edit-thin"
                  ></iconify-icon>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;
