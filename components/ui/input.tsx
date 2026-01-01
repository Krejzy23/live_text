import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          `
          flex h-10 w-full rounded-xl px-4 text-sm
          bg-[#ecf0f3] text-gray-700 placeholder:text-gray-600
          shadow-[inset_4px_4px_8px_rgba(0,0,0,0.12),inset_-4px_-4px_8px_#ffffff]
          transition-all duration-150
          focus:outline-none
          focus:shadow-[inset_6px_6px_10px_rgba(0,0,0,0.15),inset_-6px_-6px_10px_#ffffff]
          disabled:opacity-50 disabled:cursor-not-allowed
          `,
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
