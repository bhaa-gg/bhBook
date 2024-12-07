import PostEditor from "@/components/posts/PostEditor";
import PostList from "@/components/ui/PostList";
import React from "react";

const page = async () => {
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor myPost={false} />
        <PostList />
      </div>
    </main>
  );
};

export default page;
