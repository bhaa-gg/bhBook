"use client";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";
import React from "react";

interface MenuBarInterface {
  className: string;
}

const MenuBar = ({ className }: MenuBarInterface) => {
  return (
    <div className={className}>
      <Button
        variant={"ghost"}
        title="home"
        className="flex items-center justify-start gap-3"
        asChild
      >
        <Link href="/">
          <Home />
          <span className="hidden lg:inline">Home</span>
        </Link>
      </Button>

    </div>
  );
};

export default MenuBar;
