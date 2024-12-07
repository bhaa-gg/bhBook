"use client";
import React, { useRef, useState, useTransition } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";
import { ImageOff, MoreHorizontal } from "lucide-react";
import { PostType } from "@/app/types";
import DeletePostBtn from "./DeletePostBtn";
import UpdatePostBtn from "./UpdatePostBtn";
import { DropdownMenuSeparator } from "../ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { reduxStore } from "@/lib/Redux/reduxStore";
import { setPosts, updateEditPost } from "@/lib/Redux/PostSlice";
import { Textarea } from "../ui/textarea";
import Image from "next/image";
import { Alert } from "../ui/alert";
import LoadingButton from "../ui/LoadingButton";
import { updatePost, updatePostInter } from "@/app/_utils/post";
import { toast } from "@/hooks/use-toast";

interface PostMoreButtonProps {
  className: string;
  post: PostType;
  setPostsAgain?: (postId: string) => void;
}

const PostMoreButton = ({
  className,
  post,
  setPostsAgain,
}: PostMoreButtonProps) => {
  const run = useDispatch<typeof reduxStore.dispatch>();
  const { editPost, allPosts } = useSelector(
    (store: ReturnType<typeof reduxStore.getState>) => store.postsRed
  );

  const [message, setMessage] = useState("");
  const [Images, setImages] = useState("");
  const [, setShowDeleteDialog] = useState(false);

  const [isPending, startTransition] = useTransition();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const textAreaInput = useRef<HTMLTextAreaElement>(null);

  const setPostImage = () => {
    const imagePath: File | undefined = fileInputRef.current?.files?.[0];

    if (!imagePath) return;
    const imageUrl = URL.createObjectURL(imagePath);
    setImages(imageUrl);
  };

  const handleButtonClick = async () => {
    setMessage("");
    const imageCaption: File | string = fileInputRef.current?.files?.[0] || "";

    if (!textAreaInput.current?.value.trim() && !imageCaption) {
      setMessage("Please Enter Data");
      return;
    }
    const payload = new FormData();
    const caption: string = textAreaInput.current?.value.trim() || "";

    if (caption) payload.append("body", caption);
    if (imageCaption) payload.append("image", imageCaption);

    startTransition(async () => {
      const { post }: updatePostInter = await updatePost(
        editPost?._id + "",
        payload
      );
      if (!post) {
        toast({
          description: "Post Not Updated",
        });
        return;
      }

      const newPosts = allPosts?.map((posty: PostType) => {
        if (posty._id == editPost?._id) {
          post.user = posty.user;
          posty = post;
        }
        return posty;
      });

      run(setPosts(newPosts));
      run(updateEditPost(null));
    });

    setImages("");
    if (textAreaInput.current?.value.trim()) textAreaInput.current.value = "";
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size={"icon"} variant={"ghost"} className={className}>
            <MoreHorizontal className="size-5 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className=" cursor-pointer p-3 bg-slate-300"
            onClick={() => setShowDeleteDialog(true)}
          >
            <DeletePostBtn
              setPostsAgain={setPostsAgain}
              className="flex items-center gap-3 text-destructive bg-transparent"
              post={post}
              fromPage={true}
            />
            <DropdownMenuSeparator />

            <UpdatePostBtn post={post} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={editPost ? true : false}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Post</DialogTitle>
          </DialogHeader>
          <div className="flex w-full mx-auto flex-col gap-5 rounded-2xl p-5 shadow-2xl">
            <Textarea
              onClick={() => message && setMessage("")}
              placeholder="Message ..."
              ref={textAreaInput}
            />
            <div className="flex justify-end">
              <div className="file me-3">
                <input
                  type="file"
                  ref={fileInputRef || null}
                  accept="image/*"
                  onChange={() => setPostImage()}
                  className="hidden sr-only"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="group relative block"
                >
                  {!Images ? (
                    <ImageOff />
                  ) : (
                    <Image
                      src={Images || ""}
                      alt="avatarPlacehodler"
                      width={50}
                      height={50}
                      className="size-32  flex-none object-cover"
                    ></Image>
                  )}
                </button>
              </div>

              <LoadingButton
                loading={isPending}
                onClick={handleButtonClick}
                className="min-w-20"
              >
                Post
              </LoadingButton>
            </div>
            {message && (
              <Alert className="text-red-700 border-none    block text-center font-bold my-1  ">
                {message}
              </Alert>
            )}
          </div>

          <Button onClick={() => run(updateEditPost(false))}>Close</Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PostMoreButton;
