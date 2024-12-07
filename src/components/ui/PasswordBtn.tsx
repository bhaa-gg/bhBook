import React, { useState } from "react";

import { IoMdEye } from "react-icons/io";
import { FaEyeSlash } from "react-icons/fa";
import { Input } from "./input";
import { cn } from "@/lib/utils";

export interface PasswordBtnProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordBtn = React.forwardRef<HTMLInputElement, PasswordBtnProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
      <div className="item-center relative" >
        <Input
          type={showPassword ? "text" : "password"}
          className={cn("pe-10", className)}
          ref={ref}
          {...props}
        />
        {!showPassword ? (
          <IoMdEye
            className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer text-2xl text-slate-500"
            onClick={() => setShowPassword(true)}
          />
        ) : (
          <FaEyeSlash
            className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer text-2xl text-slate-500"
            onClick={() => setShowPassword(false)}
          />
        )}
      </div>
    );
  }
);
PasswordBtn.displayName = "PasswordInput";

export { PasswordBtn };
