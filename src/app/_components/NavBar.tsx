"use client";

import UserButton from "@/components/ui/UserButton";
import { getPostThunk } from "@/lib/Redux/PostSlice";
import { reduxStore } from "@/lib/Redux/reduxStore";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchUserInput from "./SearchUserInput";

const NavBar = () => {
  const run = useDispatch<typeof reduxStore.dispatch>();

  const { allPosts, allPostsPages } = useSelector(
    (store: ReturnType<typeof reduxStore.getState>) => store.postsRed
  );

  useEffect(() => {
    (() => {
      console.log("from NavBar");

      if (!allPosts?.length) run(getPostThunk());
    })();
  }, []);

  return (
    <div className="static flex items-center justify-between p-3 top-0 z-10 bg-card shadow-sm">
      <h1 className="text-3xl cursor-not-allowed font-bold text-primary">
        BhBook
      </h1>
      <SearchUserInput allPostsPages={allPostsPages || []} />
      <UserButton className="h-fit w-fit rounded-full sm:ms-auto" />
    </div>
  );
};

export default NavBar;
