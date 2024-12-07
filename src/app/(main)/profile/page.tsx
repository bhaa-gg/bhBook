import React from "react";
import { getUserData } from "../actio";
import { PostType, UserType } from "@/app/types";
import UserAvatar from "@/components/ui/UserAvatar";
import { getUserPosts } from "@/app/_utils/post";
import EditProfileButton from "./_components/EditProfileButton";
import PostListProfile from "./_components/PostListProfile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
};

const page = async () => {
  const User: UserType = await getUserData();
  const posts: PostType[] | [] | null = await getUserPosts(User._id);

  return (
    <>
      <main className=" w-full min-w-0 gap-5">
        <div className="w-full space-y-5 min-w-0">
          <div className="h-fit w-full space-y-5 rounded-2xl bg-card p-5 shadow-sm">
            <UserAvatar
              size={250}
              className="mx-auto size-full max-h-60 max-w-60 rounded-full "
              avatarUrl={User.photo}
            />
            <div className="flex flex-wrap gap-3 sm:flex-nowrap ">
              <div className="me-auto space-y-3  ">
                <div>
                  <h1 className="text-3xl font-bold ">{User.name}</h1>
                  <EditProfileButton posts={posts} user={User} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <PostListProfile posts={posts} />
      </main>
    </>
  );
};

export default page;
