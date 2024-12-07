"use client";
import Image from "next/image";
import React from "react";
import avatarPlacehodler from "@/app/assets/avatar-placeholder.png";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  className?: string;
  size?: number;
  avatarUrl: string | null | undefined;
}

const UserAvatar = ({ className, size, avatarUrl }: UserAvatarProps) => {
  return (
    <Image
      src={avatarUrl || avatarPlacehodler}
      alt="Avatar"
      width={size ?? 48}
      height={size ?? 48}
      className={
        (cn(
          "aspect-square h-fit flex-none rounded-full bg-secondary object-cover"
        ),
        className)
      }
    />
  );
};
export default UserAvatar;
