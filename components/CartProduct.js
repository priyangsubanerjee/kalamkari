/* eslint-disable @next/next/no-img-element */
import React from "react";

function CartProduct({ product }) {
  return (
    <div className="grid grid-cols-3 border-b pb-4 gap-6 w-full">
      <div className="flex  items-center">
        <img className="h-12 w-12 object-cover" src={product.image} alt="" />
        <div className="ml-3">
          <p className="text-xs text-neutral-700">{product.pid}</p>
          <p className="text-xs mt-2  text-neutral-500">({product.name})</p>
        </div>
      </div>
      <div className="flex flex-col justify-center space-y-2 text-xs">
        <p>{product.quantity} pcs</p>
        <p>₹{product.price} each</p>
      </div>
      <div className="flex flex-col justify-center text-sm">
        <p>₹{product.quantity * product.price}</p>
      </div>
    </div>
  );
}

export default CartProduct;
