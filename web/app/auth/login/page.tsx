import Link from "next/link"

export default function LoginForm() {
  return (
    <div className="min-h-fit grow flex-shrink-0 flex flex-col items-center justify-center gap-6 overflow-auto py-12">
      <h1 className="text-4xl font-bold text-wrap text-center leading-normal">
        Tien & Nhi Wedding
      </h1>

      <form className="rounded-xl bg-[rgba(255,255,255,0.70)] flex flex-col w-full max-w-lg overflow-hidden gap-6 p-6">
        <div className="flex flex-col gap-1">
          <label className="text-black">Username</label>
          <input
            className="text-black placeholder:text-slate-500 bg-transparent outline-none p-2 border-b-2 border-[rgba(128,128,128,1)] focus:border-[rgba(255,107,196,1)] transition-[border-color]"
            placeholder="Admin username..."
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-black">Password</label>
          <input
            className="text-black placeholder:text-slate-500 bg-transparent outline-none p-2 border-b-2 border-[rgba(128,128,128,1)] focus:border-[rgba(255,107,196,1)] transition-[border-color]"
            placeholder="Password..."
          />
        </div>

        <button className="bg-[#c5338a] p-2 rounded-lg font-bold mt-2">
          Submit
        </button>

        <Link href={"/"} className="text-black flex justify-center">
          Back to home
        </Link>
      </form>
    </div>
  )
}
