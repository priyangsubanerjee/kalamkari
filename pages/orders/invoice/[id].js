/* eslint-disable @next/next/no-img-element */
import CartProduct from "@/components/CartProduct";
import connectDatabase from "@/db/connect";
import invoice from "@/db/invoice";
import Link from "next/link";
import React from "react";

export async function getServerSideProps(ctx) {
  const { id } = ctx.query;
  await connectDatabase();
  try {
    const invoice_ = await invoice.findOne({ inv: id.toString() });
    return {
      props: {
        invoice: JSON.parse(JSON.stringify(invoice_)) || null,
      },
    };
  } catch (error) {
    return {
      props: {
        invoice: null,
      },
    };
  }
}

function Invoice({ invoice }) {
  return (
    <>
      {invoice && (
        <div className="h-screen w-screen fixed inset-0 bg-neutral-100 flex justify-center overflow-auto lg:p-8">
          <div className="w-full lg:w-[80%] h-fit bg-white lg:p-16 p-8">
            <div className="w-fit">
              <Link href={"/orders"} className="w-fit">
                <button className="flex items-center bg-neutral-100 space-x-4 px-4 py-2 rounded text-sm">
                  <iconify-icon icon="ph:arrow-left-bold"></iconify-icon>
                  <span>Back</span>
                </button>
              </Link>
            </div>
            <div className="mt-10">
              <h2 className="font-jost text-xl">Kalamkari Boutique</h2>
              <h3 className="mt-3 text-neutral-600">কলমকারি বুটিক</h3>
              <p className="max-w-sm leading-7 text-xs mt-2">
                Cecilia Chapman 711-2880 Nulla St. Mankato Mississippi 96522
                (257) 563-7401
              </p>
            </div>
            <div className="mt-10">
              <div className="text-sm flex items-center space-x-2">
                <iconify-icon icon="mdi:person"></iconify-icon>
                <span>{invoice.name}</span>
              </div>
              <div className="text-sm mt-3 text-neutral-700 flex items-center space-x-2">
                <iconify-icon icon="material-symbols:call"></iconify-icon>
                <span>{invoice.phone}</span>
              </div>
              <div className="text-sm mt-3 text-neutral-700 flex items-center space-x-2">
                <iconify-icon icon="clarity:date-solid"></iconify-icon>
                <span>{new Date(invoice.dateAdded).toISOString()}</span>
              </div>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-5">
              {invoice.products.map((product, index) => {
                return <CartProduct product={product} key={index} />;
              })}
            </div>

            <div className="flex justify-end space-x-16 mt-10">
              <div>
                <p className="font-jost">Total payable amount</p>
                <p className="text-xs mt-2 text-teal-600">
                  *inclusive of all taxes
                </p>
              </div>
              <div>
                <p className="font-jost font-medium">₹{invoice.total}</p>
              </div>
            </div>
            <div className="flex justify-end mt-6 space-x-16">
              <div>
                <p className="font-jost">Amount paid</p>
              </div>
              <div>
                <p className="font-jost font-medium">₹{invoice.amountPaid}</p>
              </div>
            </div>
            <div className="flex justify-end mt-8 space-x-16">
              <p className="text-xs">Mode of payment</p>
              <p className="text-xs">{invoice.paymentMethod}</p>
            </div>

            <div className="flex justify-end mt-10">
              <img
                src={
                  invoice.status == "paid"
                    ? "https://img.freepik.com/premium-vector/round-paid-thank-you-grunge-rubber-stamp-vector-illustration-eps_567423-486.jpg?w=2000"
                    : "https://thumbs.dreamstime.com/b/pagamento-devido-em-carimbo-vermelho-redondo-de-um-borracha-redonda-com-legenda-vermelha-219540081.jpg"
                }
                alt=""
                className="h-28"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Invoice;
