"use client";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { PostType, UserType } from "@/app/types";
import UserAvatar from "@/components/ui/UserAvatar";
import { useRouter } from "next/navigation";
import { CircleX } from "lucide-react";

interface SearchUserInputProps {
  allPostsPages: PostType[];
}

const SearchUserInput = ({ allPostsPages }: SearchUserInputProps) => {
  const Router = useRouter();
  const [Friend, setFriend] = useState<UserType[] | []>([]);
  const [VisbileList, setVisbileList] = useState<boolean>(false);

  const setFriendArr = () => {
    const Users: UserType[] = allPostsPages.map((post: PostType) => post.user);
    const uniqueUsers = Object.values(
      Users.reduce((acc: { [key: string]: UserType }, user: UserType) => {
        acc[user._id] = user;
        return acc;
      }, {})
    );
    setFriend(uniqueUsers);
  };

  const as = (userId: string) => {
    setVisbileList(false);
    Router.push(`/user/${userId}`);
  };

  useEffect(() => {
    setFriendArr();
  }, [allPostsPages]);

  return (
    <div className="w-[40%] ms-5 relative   ">
      <Input
        onFocus={() => setVisbileList(true)}
        className="w-full"
        onChange={(e) => console.log(e.target.value)}
        placeholder="Search ..."
      />

      <div
        className={`w-[200%]  ${
          VisbileList ? "block" : "hidden"
        }   border-2 rounded-sm right-4 sm:left-0 sm:w-full mt-2 p-2 absolute z-50 top-12 bg-card max-h-96 overflow-scroll  `}
      >
        <CircleX
          onClick={() => setVisbileList(false)}
          className=" ms-auto my-2  cursor-pointer hover:text-primary transition-all"
        />
        {Friend?.map((user: UserType) => {
          return (
            <div
              onClick={() => as(user._id)}
              key={user._id}
              className=" flex flex-wrap cursor-pointer gap-3 my-2 p-3 border-b hover:scale-95 rounded-sm transition-all hover:bg-slate-200"
            >
              <UserAvatar
                avatarUrl={user.photo}
                className="h-10 w-10 rounded-full"
              />
              <div className="indent-1">{user.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchUserInput;
