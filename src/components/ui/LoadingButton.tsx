"use client";

import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "./button";
import { Loader2 } from "lucide-react";

export interface LoadingButtonProps extends ButtonProps {
  loading: boolean;
}
const LoadingButton = ({
  loading,
  disabled,
  className,
  ...props
}: LoadingButtonProps) => {
  return (
    <Button
      disabled={loading || disabled}
      {...props}
      className={cn("flex items-center gap-2", className)}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}

      {props.children}
    </Button>
  );
};
export default LoadingButton;
