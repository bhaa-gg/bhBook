"use client";
import React from "react";
import { PostType } from "@/app/types";
import { Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { reduxStore } from "@/lib/Redux/reduxStore";
import { setPosts } from "@/lib/Redux/PostSlice";
import { deletePost } from "@/app/_utils/post";
import { toast } from "@/hooks/use-toast";
import { Button } from "../ui/button";

interface DeletePostBtnProps {
  fromPage: boolean;
  setPostsAgain?: (postId: string) => void;
  className: string;
  post: PostType;
}

const DeletePostBtn = ({
  setPostsAgain,
  className,
  post,
  fromPage,
}: DeletePostBtnProps) => {
  const inFromPage = async () => {
    if (setPostsAgain) {
      await setPostsAgain(post._id + "");
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  };
  const { allPosts } = useSelector(
    (store: ReturnType<typeof reduxStore.getState>) => store.postsRed
  );
  const run = useDispatch<typeof reduxStore.dispatch>();

  const inNotFromPage = async () => {
    const posts = allPosts?.filter((p: PostType) => p._id != post._id);
    run(setPosts(posts));
    toast({
      description: "deleted Successfully",
    });
    await deletePost(post._id);
  };

  return (
    <Button
      onClick={() =>
        fromPage && setPostsAgain ? inFromPage() : inNotFromPage()
      }
      className={className}
    >
      <Trash2 className="size-4" />
      Delete Post
    </Button>
  );
};

export default DeletePostBtn;
