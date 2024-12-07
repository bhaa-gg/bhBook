"use client";
import React from "react";
import { Button } from "../ui/button";
import { PostType } from "@/app/types";

import { useDispatch } from "react-redux";
import { reduxStore } from "@/lib/Redux/reduxStore";
import { Pen } from "lucide-react";
import { updateEditPost } from "@/lib/Redux/PostSlice";

interface UpdatePostBtnProps {
  post: PostType;
}

const UpdatePostBtn = ({ post }: UpdatePostBtnProps) => {
  const run = useDispatch<typeof reduxStore.dispatch>();

  return (
    <div className="relative">
      <Button
        className="flex text-orange-600 items-center gap-3  bg-transparent"
        onClick={() => run(updateEditPost(post))}
      >
        <Pen className="w-4 h-4 " />
        Update
      </Button>
    </div>
  );
};

export default UpdatePostBtn;
