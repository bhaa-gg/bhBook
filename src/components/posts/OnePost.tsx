"use client";
import { useSession } from "@/app/(main)/SessionProvider";
import { PostType, UserType } from "@/app/types";
import Link from "next/link";
import React from "react";
import UserAvatar from "../ui/UserAvatar";
import Image from "next/image";
import PostMoreButton from "./PostMoreButton";
import CommentsList from "../comments/CommentsList";

interface postCard {
  post: PostType;

  setPostsAgain?: (postId: string) => void;
}

const OnePost = ({ post, setPostsAgain }: postCard) => {
  const { user }: { user: UserType } = useSession();

  return (
    <article className="group/post  space-y-3 w-full my-3 mx-auto rounded-2xl bg-card p-5 shadow-2xl">
      <div className="flex justify-between gap-3">
        <div className="flex flex-wrap gap-3">
          <Link
            href={
              post.user._id === user?._id
                ? `/profile`
                : `/user/${post.user._id}`
            }
          >
            <UserAvatar
              avatarUrl={post.user.photo}
              className="h-10 w-10 rounded-full"
            />
          </Link>
          <div className="">
            <Link
              href={
                post.user._id === user?._id
                  ? `/profile`
                  : `/user/${post.user._id}`
              }
              className="block font-medium transition-all hover:underline"
            >
              {post.user.name}
            </Link>
            <Link
              href={`/post/${post._id}`}
              className="block text-sm text-muted-foreground transition-all hover:underline"
            >
              {post.createdAt}
            </Link>
          </div>
        </div>
        {post.user._id === user?._id && (
          <PostMoreButton
            post={post}
            setPostsAgain={setPostsAgain}
            className="opacity-0 transition-opacity group-hover/post:opacity-100"
          />
        )}
      </div>
      <div className="whitespace-pre-line break-words">{post.body}</div>
      {post.image && (
        <div className="image w-full">
          <Image
            src={post.image}
            className="w-full object-cover "
            alt="PostImage"
            sizes="(max-width)"
            // placeholder="blur"
            width={100}
            height={100}
          />
        </div>
      )}
      <CommentsList postId={post._id} Comments={post.comments || []} />
    </article>
  );
};

export default OnePost;
