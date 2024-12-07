"use client";
import { deletePost } from "@/app/_utils/post";
import { PostType } from "@/app/types";
import OnePost from "@/components/posts/OnePost";
import { toast } from "@/hooks/use-toast";
import { setPosts } from "@/lib/Redux/PostSlice";
import { reduxStore } from "@/lib/Redux/reduxStore";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface PostListProfileProps {
  posts: PostType[];
}
const PostListProfile = ({ posts }: PostListProfileProps) => {
  const [AllPosts, setAllPosts] = useState(posts);

  const { allPosts } = useSelector(
    (store: ReturnType<typeof reduxStore.getState>) => store.postsRed
  );
  const run = useDispatch<typeof reduxStore.dispatch>();

  const makeMypostsAgain = async (postId: string) => {
    console.log("bhaa wafy");
    const finalPosts = AllPosts.filter((post: PostType) => post._id != postId);

    await setAllPosts(finalPosts);
    toast({
      description: "deleted Successfully",
    });
    await deletePost(postId);
    const finalAllPosts = allPosts?.filter(
      (post: PostType) => post._id != postId
    );
    run(setPosts(finalAllPosts));
  };
  if (!AllPosts.length)
    return (
      <h1 className="text-2xl text-center my-3 font-bold">No Posts Found</h1>
    );
  return (
    <>
      {AllPosts?.map((post: PostType, i: number) => {
        return <OnePost setPostsAgain={makeMypostsAgain} key={i} post={post} />;
      })}
    </>
  );
};

export default PostListProfile;
