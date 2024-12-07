import { Metadata } from "next";
import React from "react";
import Link from "next/link";
import loginImage from "@/app/assets/login-image.jpg";
import Image from "next/image";
import LoginForm from "./_components/LoginForm";

export const metadata: Metadata = {
  title: "Sign In",
};

const page = () => {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
        <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
          <h1 className="text-center text-3xl font-bold">Login To BhBook</h1>
          <div className="space-y-5">
            <LoginForm />
            <Link
              href="/singup"
              className="block text-center transition-all hover:underline"
            >
              {"Don't have An Account ? Sign Up"}
            </Link>
          </div>
        </div>
        <Image
          src={loginImage}
          //   width={0}
          //   height={0}
          alt="LoginImage"
          className="hidden w-1/2 object-cover md:block"
        />
      </div>
    </main>
  );
};

export default page;
