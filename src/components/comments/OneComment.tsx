"use client";
import { CommentType, UserType } from "@/app/types";
import React from "react";
import UserAvatar from "./../ui/UserAvatar";
import Link from "next/link";
import { Pen } from "lucide-react";

interface OneCommentProps {
  user: UserType;
  UpdateMode: boolean;
  comment: CommentType;
  runUpdateMode: (id: string) => void;
}

const OneComment = ({
  runUpdateMode,
  UpdateMode,
  comment,
  user,
}: OneCommentProps) => {
  return (
    <div className="flex flex-wrap gap-3 my-2 p-3 border-b ">
      <Link
        href={
          comment.commentCreator._id === user?._id
            ? `/profile`
            : `/user/${comment.commentCreator._id}`
        }
      >
        <UserAvatar avatarUrl={""} className="h-10 w-10 rounded-full" />
      </Link>
      <div className="w-4/5">
        <Link
          href={
            comment.commentCreator._id === user?._id
              ? `/profile`
              : `/user/${comment.commentCreator._id}`
          }
          className="block font-medium transition-all hover:underline"
        >
          {comment.commentCreator.name}
        </Link>
        <div
          className="text-sm border-none w-full p-0 m-0 flex items-center  justify-between
           font-bold"
        >
          <p>{comment.content}</p>
          {UpdateMode ? (
            ""
          ) : (
            <Pen
              onClick={() => runUpdateMode(comment._id)}
              className={` ${
                user._id == comment.commentCreator._id ? "block" : "hidden"
              } ms-auto hover:text-primary transition-all  cursor-pointer`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default OneComment;
