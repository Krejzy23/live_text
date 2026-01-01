import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  `
  inline-flex items-center justify-center gap-2
  rounded-xl text-sm font-medium
  bg-[#ecf0f3] text-gray-700
  shadow-[5px_5px_10px_rgba(0,0,0,0.13),-5px_-5px_10px_#ffffff]
  transition-all duration-150
  hover:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.12),inset_-3px_-3px_6px_#ffffff]
  active:shadow-[inset_5px_5px_10px_rgba(0,0,0,0.15),inset_-5px_-5px_10px_#ffffff]
  focus:outline-none
  disabled:opacity-50 disabled:pointer-events-none
  `,
  {
    variants: {
      variant: {
        default: "",

        secondary: `
          text-gray-600
        `,

        outline: `
          border border-gray-300
        `,

        destructive: `
          text-red-500
          hover:text-red-600
        `,

        ghost: `
          shadow-none
          hover:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.12),inset_-3px_-3px_6px_#ffffff]
        `,

        link: `
          shadow-none
          bg-transparent
          text-gray-700
          underline-offset-4
          hover:underline
        `,
      },
      size: {
        default: "h-10 px-4",
        sm: "h-9 px-3 text-xs",
        lg: "h-11 px-8 text-base",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
