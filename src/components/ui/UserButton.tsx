"use client";
import { useSession } from "@/app/(main)/SessionProvider";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "./dropdown-menu";
import UserAvatar from "./UserAvatar";
import { UserType } from "@/app/types";
import { cn } from "@/lib/utils";
import { LogOutIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import DarkToggle from "./DarkToggle";
import { logout } from "@/app/(auth)/action";

interface UserButtonProps {
  className: string;
}

const UserButton = ({ className }: UserButtonProps) => {
  const { user }: { user: UserType } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn("flex-none rounded-full", className)}>
          <UserAvatar
            size={40}
            className="aspect-square h-fit flex-none rounded-full bg-secondary object-cover"
            avatarUrl={user?.photo}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Logged in as @ {user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={`/profile`}>
          <DropdownMenuItem className="cursor-pointer">
            <UserIcon className="mr-2 size-4" />
            Profile
          </DropdownMenuItem>
        </Link>

        <DarkToggle />
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => {
            logout();
          }}
        >
          <LogOutIcon className="mr-2 size-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
