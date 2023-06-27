/* eslint-disable @next/next/no-img-element */
import React from "react";

function Loading({ loading, status }) {
  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-30 h-full w-full flex items-end lg:items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="h-96 w-full lg:w-[500px] bg-white flex flex-col items-center justify-center text-center lg:rounded-md">
            <p className="text-xl font-medium font-jost">Sit back and relax.</p>
            <p className="px-5 text-sm mt-3 text-neutral-700">{status}</p>
            <img
              src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/04de2e31234507.564a1d23645bf.gif"
              alt=""
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Loading;
