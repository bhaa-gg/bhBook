import React from "react";
import NavBar from "../_components/NavBar";
import { getUserData } from "./actio";
import { validationReq } from "@/auth";
import SessionProvider from "./SessionProvider";
import MenuBar from "./_components/MenuBar";

const layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const userId = await validationReq();
  const user = await getUserData();

  return (
    <SessionProvider value={{ user, userId }}>
      <div className="min-h-screen">
        <NavBar />
        <div className="max-w-7xl mx-auto p-5 flex w-full grow gap-5">
          <MenuBar className="static top-[5.25rem] h-fit hidden sm:block flex-none space-y-3 rounded-2xl bg-card px-3 shadow-2xl xl:w-80 lg:px-5" />
          {children}
        </div>
        <MenuBar className="fixed bottom-0 bg-card  flex w-full justify-center gap-5 sm:hidden " />
      </div>
    </SessionProvider>
  );
};

export default layout;
