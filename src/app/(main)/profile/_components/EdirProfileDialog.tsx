import { PostType, UserType } from "@/app/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { changeUserPicture } from "../action";
import { toast } from "@/hooks/use-toast";
import ChangeUserPassword from "./ChangeUserPassword";
import { Button } from "@/components/ui/button";

interface EdirProfileDialogProps {
  user: UserType;
  open: boolean;
  posts: PostType[];
  cahnges: (open: boolean) => void;
}

const EdirProfileDialog = ({ user, open, cahnges }: EdirProfileDialogProps) => {
  return (
    <Dialog onOpenChange={() => cahnges(true)} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <AvatarInput src={user.photo} />
        <div className="spreate w-full  h-1 rounded  bg-black"></div>
        <ChangeUserPassword />
        <Button className="w-fit px-5 ms-auto" onClick={() => cahnges(false)}>
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EdirProfileDialog;

interface AvatarInputProps {
  src: string | StaticImageData;
}

function AvatarInput({ src }: AvatarInputProps) {
  const router = useRouter();
  const [ImageToCrop, setImageToCrop] = useState<
    string | StaticImageData | null
  >(src + "");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const setImage = async () => {
    const payload = new FormData();
    const imagePath = fileInputRef.current?.files?.[0];
    if (!imagePath) return;
    payload.append("photo", imagePath);

    const userData: UserType | false = await changeUserPicture(payload);
    if (!userData) {
      toast({
        description: "User photo not Updated",
        color: "red",
      });
      return;
    }
    toast({
      description: "User photo not Updated",
      color: "red",
    });
    setImageToCrop(userData.photo);
    toast({
      description: "User photo  Updated Successfully",
      color: "green",
    });
    router.refresh();
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef || null}
        accept="image/*"
        onChange={() => setImage()}
        className="hidden sr-only"
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="group relative block"
      >
        <Image
          src={ImageToCrop || ""}
          alt="avatarPlacehodler"
          width={150}
          height={150}
          className="size-32 rounded-full flex-none object-cover"
        ></Image>
      </button>
    </>
  );
}
