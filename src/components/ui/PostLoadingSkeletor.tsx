import React from "react";
import Skeleton from "./Skeleton";

const PostLoadingSkeletor = () => {
  return (
    <div className="space-y-5">
      <PostLoadingSke />
      <PostLoadingSke />
      <PostLoadingSke />
    </div>
  );
};

function PostLoadingSke() {
  return (
    <div className="w-full  mx-auto  h-50 animate-pulse space-y-3 rounded bg-accent p-5 shadow-sm">
      <div className="flex flex-wrap gap-3">
        <Skeleton className="size-12 shadow-2xl rounded-full" />
      </div>

      <div className="space-y-1.5">
        <Skeleton className="h-4 w-24 rounded" />
        <Skeleton className="h-4 w-24 rounded" />
      </div>
    </div>
  );
}

export default PostLoadingSkeletor;
