"use client";
import { CommentType, UserType } from "@/app/types";
import React, { useRef, useState, useTransition } from "react";
import OneComment from "./OneComment";
import { useSession } from "@/app/(main)/SessionProvider";
import { Ellipsis } from "lucide-react";
import CommentCreator from "./CommentCreator";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "@/hooks/use-toast";
import { CommentUpdateReturnd, updateComment } from "@/app/_utils/comment";
import LoadingButton from "../ui/LoadingButton";

interface CommentsListProps {
  Comments: CommentType[];
  postId: string;
}

const CommentsList = ({ postId, Comments }: CommentsListProps) => {
  const { user }: { user: UserType } = useSession();
  const [isPending, startTransition] = useTransition();

  const [AllComments, setAllComments] = useState<CommentType[]>(Comments);
  const [AllCommentsCount, setAllCommentsCount] = useState<number>(3);
  const [UpdateMode, setUpdateMode] = useState<boolean>(false);
  const [UpdateId, setUpdateId] = useState<string>("");

  const updateCommentInput = useRef<HTMLInputElement>(null);

  const updateCountComment = () => {
    if (AllComments.length != AllCommentsCount) {
      setAllCommentsCount(AllCommentsCount + 3);
    }
  };

  const upateComments = (comments: CommentType[]) => {
    setAllComments(comments);
  };

  const updatesingleComments = async (content: string) => {
    console.log(UpdateId);

    if (!content.trim()) {
      toast({
        description: "should not be empty",
      });
      return;
    }

    startTransition(async () => {
      const { message, comments }: CommentUpdateReturnd = await updateComment(
        UpdateId,
        content
      );

      if (!message) {
        toast({
          description: "Comment Not Updated",
        });
        return;
      }
      const newComments = AllComments.map((c: CommentType) => {
        if (c._id == UpdateId) {
          c = comments as CommentType;
        }
        return c;
      });

      setAllComments(newComments);
      setUpdateMode(false);
      toast({
        description: "Comment Updated Success",
      });
    });
  };

  const runUpdateMode = (id: string) => {
    setUpdateMode(true);
    setUpdateId(id);
  };

  return (
    <div>
      <CommentCreator
        UpdateMode={UpdateMode}
        setAllComments={upateComments}
        post={postId || ""}
      />

      {!AllComments.length ? (
        <h1 className="text-sm font-bold mt-3 text-center animate-bounce text-black">
          Add First Comment
        </h1>
      ) : (
        AllComments.slice(0, AllCommentsCount).map((c: CommentType) => {
          return (
            <OneComment
              runUpdateMode={runUpdateMode}
              UpdateMode={UpdateMode}
              user={user}
              key={c._id}
              comment={c}
            />
          );
        })
      )}

      {AllComments.length ? (
        <button
          className="ms-auto   animate-pulse flex   transition-all hover:scale-105"
          onClick={updateCountComment}
        >
          {" "}
          Show More <Ellipsis className="ms-2" />
        </button>
      ) : (
        ""
      )}

      <>
        <Dialog open={UpdateMode}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Comment</DialogTitle>
            </DialogHeader>
            <Input ref={updateCommentInput} placeholder="new Comment ..." />
            <div className=" flex item-center justify-center">
              <Button
                className="w-fit px-5 ms-auto"
                onClick={() => setUpdateMode(false)}
              >
                Close
              </Button>
              <LoadingButton
                loading={isPending}
                className="w-fit px-5 ms-auto"
                onClick={() =>
                  updatesingleComments(updateCommentInput.current?.value || "")
                }
              >
                Update Comment
              </LoadingButton>
            </div>
          </DialogContent>
        </Dialog>
      </>
    </div>
  );
};

export default CommentsList;
