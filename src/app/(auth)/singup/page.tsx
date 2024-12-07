import Image from "next/image";
import Link from "next/link";
import React from "react";
import SignUpImage from "@/app/assets/signup-image.jpg";
import SignUpForm from "./_components/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
};

const page = () => {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="flex h-full max-h-[400rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
        <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
          <div className="text-center">
            <h1 className="space-y-1 text-3xl font-bold">Sign Up to BwBook</h1>
            <p className="text-muted-foreground">
              A place where <span className="italic">you</span> can find your
              friends
            </p>
          </div>
          <div className="space-y-5">
            <SignUpForm />
            <Link
              href="/singin"
              className="block text-center transition-all hover:underline"
            >
              Already have an account?
            </Link>
          </div>
        </div>
        <Image
          className="w-1/2 object-cover"
          src={SignUpImage}
          //   width={1000}
          //   height={1000}
          alt="SignUpImage"
        />
      </div>
    </main>
  );
};

export default page;
