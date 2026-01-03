import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = ({ children, className }: HeaderProps) => {
  return (
    <header
      className={cn(
        "header group",
        className
      )}
    >
      <Link
        href="/"
        className="
          flex items-center gap-2
          transition-opacity
          hover:opacity-80
        "
        aria-label="Go to homepage"
      >
        <Image
          src="/assets/icons/logo.svg"
          alt="logo with name"
          width={120}
          height={32}
          className="hidden md:block"
          priority
        />

        <Image
          src="/assets/icons/logo-icon.svg"
          alt="logo"
          width={32}
          height={32}
          className="md:hidden"
          priority
        />
      </Link>

      <div className="header-actions">
        {children}
      </div>
    </header>
  );
};

export default Header;
