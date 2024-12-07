"use client";

import OnePost from "@/components/posts/OnePost";
import ScrollingContainer from "@/components/ui/ScrollingContainer";
import { PostType } from "@/app/types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { reduxStore } from "@/lib/Redux/reduxStore";
import UserAvatar from "@/components/ui/UserAvatar";
import { useParams } from "next/navigation";
import PostLoadingSkeletor from "@/components/ui/PostLoadingSkeletor";

const Page = () => {
  const { id } = useParams();
  const [SliceNum, setSliceNum] = useState<number>(2);
  const [UserPosts, setUserPosts] = useState<PostType[] | [] | null>(null);
  const { allPostsPages, fetchPostsLoading } = useSelector(
    (store: ReturnType<typeof reduxStore.getState>) => store.postsRed
  );

  const getUserPostsFromPosts = () => {
    const userPosts: PostType[] | undefined = allPostsPages?.filter(
      (post: PostType) => post.user._id == id
    );
    return userPosts?.slice(0, SliceNum);
  };

  useEffect(() => {
    const userPost = getUserPostsFromPosts();
    setUserPosts(userPost || []);
  }, []);

  if (fetchPostsLoading) return <PostLoadingSkeletor />;

  return (
    <>
      <main className=" w-full min-w-0 gap-5">
        <div className="w-full space-y-5 min-w-0">
          <div className="h-fit w-full space-y-5 rounded-2xl bg-card p-5 shadow-sm">
            <UserAvatar
              size={250}
              className="mx-auto size-full max-h-60 max-w-60 rounded-full "
              avatarUrl={UserPosts?.at(0)?.user.photo}
            />
            <div className="flex flex-wrap gap-3 sm:flex-nowrap ">
              <div className="me-auto space-y-3  ">
                <div>
                  <h1 className="text-3xl font-bold ">
                    {UserPosts?.at(0)?.user.name}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        {UserPosts?.at(0)?.user.name ? (
          <div className="">
            <ScrollingContainer
              className="space-y-5"
              onBottomReached={async () => {
                const userPost: PostType[] | undefined =
                  getUserPostsFromPosts();
                if (!userPost) return;
                setSliceNum(SliceNum + 2);
                setUserPosts(userPost || []);
              }}
            >
              <div>
                {UserPosts?.map((post: PostType, i: number) => {
                  return <OnePost key={i} post={post} />;
                })}
              </div>
            </ScrollingContainer>
          </div>
        ) : (
          <h1 className="text-2xl text-center my-3 font-bold">
            No Posts For This User{" "}
          </h1>
        )}
      </main>
    </>
  );
};

export default Page;
