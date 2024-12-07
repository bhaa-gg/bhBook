"use client";
import React, { useRef, useTransition } from "react";
import { Input } from "../ui/input";
import { Loader, Send } from "lucide-react";
import {
  CommentCreateProps,
  CommentCreateReturnd,
  createComments,
} from "@/app/_utils/comment";
import { toast } from "@/hooks/use-toast";
import { CommentType } from "@/app/types";

interface CommentCreatorProps {
  post: string;
  UpdateMode: boolean;
  setAllComments: (comment: CommentType[]) => void;
}

const CommentCreator = ({
  UpdateMode,
  post,
  setAllComments,
}: CommentCreatorProps) => {
  const InputField = useRef<HTMLInputElement>(null);
  // const { allPosts } = useSelector(
  //   (store: ReturnType<typeof reduxStore.getState>) => store.postsRed
  // );
  // const run = useDispatch< typeof reduxStore.dispatch>();
  // const { user }: { user: UserType } = useSession();

  const [isPending, startTransition] = useTransition();

  const Sends = async () => {
    startTransition(async () => {
      if (!InputField.current?.value.trim()) {
        toast({
          description: "Please enter a value",
        });
        return;
      }

      const payload: CommentCreateProps = {
        content: InputField.current.value,
        post: post,
      };

      const theComment: CommentCreateReturnd = await createComments(payload);

      if (!theComment.message) {
        toast({
          description: "Comment not created",
        });
        return;
      }

      InputField.current.value = "";
      setAllComments(theComment.comments);

      // let index: undefined | number = undefined;
      // const posty = allPosts?.find((p: PostType, i: number) => {
      //   index = i;
      //   return p._id == post;
      // });
      // if (!posty || posty.user._id != user._id) return;

      // const newPosty = allPosts?.map((p: PostType) => p);

      // // const postAtIndex = newPosty?.at(index ?? 0);
      // // if (newPosty) {
      // // newPosty.at(index ?? 0)?.comments?.push(...theComment.comments);
      // // newPosty[index ?? 0].comments = theComment.comments;
      // // }

      // console.log({ newPosty, posty, index, comments: theComment.comments });
    });
  };

  return (
    <div className="flex items-center justify-between gap-2">
      <Input ref={InputField} placeholder="Send Your Comment" />
      {isPending ? (
        <Loader className="transition-all text-green-700 animate-spin" />
      ) : (
        <Send
          className={` ${
            UpdateMode ? "hidden" : ""
          } transition-all hover:scale-105 hover:text-green-600 cursor-pointer   `}
          onClick={Sends}
        />
      )}
    </div>
  );
};

export default CommentCreator;
