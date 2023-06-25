export default function Home() {
  return (
    <main className="py-10 px-6">
      <h2 className="text-center font-jost text-neutral-600">
        Inventory management system
        <span className="bg-red-400 text-white px-2 rounded-sm ml-2 font-medium">
          Beta
        </span>
      </h2>
      <h1 className="text-center text-4xl font-semibold mt-7 font-lexend">
        Kalamkari
      </h1>

      <form action="" className="p-4 bg-neutral-50 mt-10 rounded-md">
        <div>
          <label
            className="font-jost text-sm text-neutral-700 tracking-wide block"
            htmlFor=""
          >
            Registered email
          </label>
          <input
            type="text"
            className="block w-full border bg-white mt-4 px-4 h-14"
            placeholder="abc@example.com"
            name=""
            id=""
          />
        </div>
        <div className="mt-7">
          <label
            className="font-jost text-sm text-neutral-700 tracking-wide block"
            htmlFor=""
          >
            Account password
          </label>
          <input
            type="password"
            className="block w-full border bg-white mt-4 px-4 h-14"
            placeholder="••••"
            name=""
            id=""
          />
        </div>
        <div className="mt-8 flex items-center text-sm space-x-2">
          <input type="checkbox" name="" id="" />
          <label className="text-neutral-700 font-jost" htmlFor="">
            Remember me
          </label>
        </div>
        <div className="mt-8">
          <button className="h-12 text-center w-full bg-blue-500 text-white font-jost rounded">
            Sign In
          </button>
        </div>
      </form>

      <div className="flex items-center justify-center mt-10 space-x-2 text-sm">
        <iconify-icon height="20" width="20" icon="bx:support"></iconify-icon>
        <span className="text-neutral-800">Need help? Contact admin</span>
      </div>
    </main>
  );
}
