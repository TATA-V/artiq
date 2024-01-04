"use client";
import React, { useEffect, useState } from "react";
import { getProviders, signIn } from "next-auth/react";

function SignInPage() {
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    (async () => {
      const res: any = await getProviders();
      console.log(res);
      setProviders(res);
    })();
  }, []);

  return (
    <div className="p-20 flex flex-col items-center">
      <button
        className="w-[350px] h-[46px] font-medium transform rounded-md bg-[#03C95B] tracking-wide text-white transition-colors duration-200 hover:opacity-80 focus:opacity-85 focus:outline-none"
        onClick={() => signIn("naver", { redirect: true, callbackUrl: "/" })}
      >
        naver login
      </button>

      <button
        className="w-[350px] h-[46px] mt-3 font-medium transform rounded-md bg-[#FBE300] tracking-wide text-[#3B1E1E] transition-colors duration-200 hover:opacity-80 focus:opacity-85 focus:outline-none"
        onClick={() => signIn("kakao", { redirect: true, callbackUrl: "/" })}
      >
        kakao login
      </button>

      <button
        className="border-[1px] border-[#e5e5e5] w-[350px] h-[46px] mt-3 font-medium transform rounded-md bg-white tracking-wide text-[#383838] transition-colors duration-200 hover:opacity-80 focus:opacity-85 focus:outline-none"
        onClick={() => signIn("google", { redirect: true, callbackUrl: "/" })}
      >
        google login
      </button>
    </div>
  )
}

export default SignInPage