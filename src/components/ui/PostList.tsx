"use client";
import { PostType } from "@/app/types";
import { setPosts } from "@/lib/Redux/PostSlice";
import { reduxStore } from "@/lib/Redux/reduxStore";
import React, { useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import OnePost from "../posts/OnePost";
import ScrollingContainer from "./ScrollingContainer";
import { getPosts } from "@/app/_utils/post";
import PostLoadingSkeletor from "./PostLoadingSkeletor";

const PostList = () => {
  const run = useDispatch<typeof reduxStore.dispatch>();
  const [isPending, startTransition] = useTransition();

  const { allPosts, fetchPostsLoading } = useSelector(
    (store: ReturnType<typeof reduxStore.getState>) => store.postsRed
  );

  if (fetchPostsLoading) return <PostLoadingSkeletor />;

  return (
    <>
      <ScrollingContainer
        className="space-y-5"
        onBottomReached={() => {
          startTransition(async () => {
            const newPosts: PostType[] = await getPosts(allPosts || []);
            if (newPosts.length == allPosts?.length) return;
            run(setPosts(newPosts || []));
          });
        }}
      >
        <div>
          {allPosts?.map((post: PostType, i: number) => {
            return <OnePost key={i} post={post} />;
          })}
        </div>
        {isPending && <PostLoadingSkeletor />}
      </ScrollingContainer>
    </>
  );
};

export default PostList;
