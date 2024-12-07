import { getSinglePost } from "@/app/_utils/post";
import OnePost from "@/components/posts/OnePost";
import UserAvatar from "@/components/ui/UserAvatar";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Post",
};

const page = async ({ params }: { id: string }) => {
  const { id } = params;

  const getuserPostss = await getSinglePost(id);

  return (
    <div className="w-full ">
      <div className="w-full space-y-5 min-w-0">
        <div className="h-fit w-full space-y-5 rounded-2xl bg-card p-5 shadow-sm">
          <UserAvatar
            size={250}
            className="mx-auto size-full max-h-60 max-w-60 rounded-full "
            avatarUrl={getuserPostss?.user?.photo}
          />
          <div className="flex flex-wrap gap-3 sm:flex-nowrap ">
            <div className="me-auto space-y-3  ">
              <div>
                <h1 className="text-3xl font-bold ">
                  {getuserPostss?.user?.name}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <OnePost post={getuserPostss} />
    </div>
  );
};

export default page;
