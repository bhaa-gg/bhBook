"use client";
import { PostType, UserType } from "@/app/types";
import { Button } from "@/components/ui/button";

import React, { useState } from "react";
import EdirProfileDialog from "./EdirProfileDialog";

interface EditProfileButtonProps {
  user: UserType;
  posts: PostType[];
}

const EditProfileButton = ({ user, posts }: EditProfileButtonProps) => {
  const [SohwDialog, setSohwDialog] = useState(false);

  const cahnges = (state: boolean) => {
    setSohwDialog(state);
  };

  return (
    <>
      <Button
        variant={"outline"}
        className="my-2 font-bold  "
        onClick={() => setSohwDialog(true)}
      >
        Edit Profile
      </Button>
      <EdirProfileDialog
        user={user}
        posts={posts}
        open={SohwDialog}
        cahnges={cahnges}
      />
    </>
  );
};

export default EditProfileButton;
