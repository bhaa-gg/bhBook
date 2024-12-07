"use client";
import { useSession } from "@/app/(main)/SessionProvider";
import { UserType } from "@/app/types";
import { toast } from "@/hooks/use-toast";
import React, { useRef, useState, useTransition } from "react";
import LoadingButton from "../ui/LoadingButton";
import UserAvatar from "../ui/UserAvatar";
import { Textarea } from "../ui/textarea";
import { Alert } from "../ui/alert";
import { ceratePost, getUserPosts } from "@/app/_utils/post";
import { reduxStore } from "@/lib/Redux/reduxStore";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "@/lib/Redux/PostSlice";
import { ImageOff } from "lucide-react";
import Image from "next/image";

const PostEditor = (myPost: { myPost: boolean }) => {
  const { user }: { user: UserType } = useSession();
  const [message, setMessage] = useState("");
  const [Images, setImages] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const textAreaInput = useRef<HTMLTextAreaElement>(null);
  const { allPosts, fetchPostsLoading } = useSelector(
    (store: ReturnType<typeof reduxStore.getState>) => store.postsRed
  );
  const run = useDispatch<typeof reduxStore.dispatch>();
  const [isPending, startTransition] = useTransition();

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
    if (Images && imageCaption) payload.append("image", imageCaption);

    startTransition(async () => {
      if (!myPost.myPost) {
        const newPost = await ceratePost(payload);
        if (!newPost) return;
        toast({
          description: "Post Created",
        });
        const AllPosts = await getUserPosts(user._id, allPosts || [], caption);
        run(setPosts(AllPosts));
      }
    });

    if (textAreaInput.current?.value.trim()) textAreaInput.current.value = "";
    setImages(null);
  };

  const setPostImage = () => {
    const imagePath: File | undefined = fileInputRef.current?.files?.[0];

    if (!imagePath) return;
    const imageUrl = URL.createObjectURL(imagePath);
    setImages(imageUrl);
  };

  return (
    <div className="flex w-full mx-auto flex-col gap-5 rounded-2xl p-5 shadow-2xl">
      <div className="flex gap-5">
        <UserAvatar
          className="hidden h-10 w-10 rounded-full sm:inline"
          avatarUrl={user.photo}
        />
      </div>
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
          disabled={fetchPostsLoading}
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
  );
};

export default PostEditor;
