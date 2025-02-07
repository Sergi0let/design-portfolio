"use client";

import { clsx as cn } from "clsx";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export const BtnOrLink = ({
  title,
  className,
  to,
  onClick,
  type = "button",
  isBeam = false,
  secondary = false,
  cursorHover = null,
  isDark = false,
}) => {
  const [, setIsClient] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // const handleRippleEffect = (event) => {
  //   if (!buttonRef.current) return;

  //   const rect = buttonRef.current.getBoundingClientRect();
  //   const ripple = document.createElement("span");

  //   const size = Math.max(rect.width, rect.height);
  //   const x = event.clientX - rect.left - size / 2;
  //   const y = event.clientY - rect.top - size / 2;

  //   ripple.style.width = `${size}px`;
  //   ripple.style.height = `${size}px`;
  //   ripple.style.left = `${x}px`;
  //   ripple.style.top = `${y}px`;
  //   ripple.classList.add("ripple-effect");

  //   buttonRef.current.appendChild(ripple);

  //   setTimeout(() => ripple.remove(), 1000);
  // };
  const handleClick = (e) => {
    if (onClick) {
      onClick(e); // Передаємо подію
    }
    // handleRippleEffect(e);
  };

  const baseStyles = cn(
    "btn relative overflow-hidden group duration-500 ease-in-out uppercase text-base leading-none px-4 py-2",
    secondary
      ? "bg-secondary normal-case text-foreground rounded-[80px] md:text-xl sm:px-5 sm:py-2"
      : "text-white bg-foreground rounded-[40px] xl:text-[28px] sm:px-8 sm:py-[14px]",
    className,
  );

  const darkStyles = cn(
    "btn rounded-[40px] md:text-[28px] sm:px-8 sm:py-[14px] relative overflow-hidden group uppercase text-base leading-none px-4 py-2",
    isDark ? "text-foreground bg-white " : "text-white bg-foreground",
    className,
  );

  const content = (
    <>
      {isBeam && (
        <span className="relative mr-[10px] flex h-[10px] w-[10px]">
          <span className={cn("btn-ping", secondary ? "bg-foreground" : "bg-white")} />
          <span className={cn("btn-ping_dot", secondary ? "bg-foreground" : "bg-white")} />
        </span>
      )}
      {title}
    </>
  );

  if (to) {
    return (
      <Link
        href={to || "#"}
        aria-label={to || "#"}
        className={isDark ? darkStyles : baseStyles}
        onClick={handleClick}
        ref={buttonRef}
        data-hover={cursorHover}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      data-hover={cursorHover}
      type={type}
      className={isDark ? darkStyles : baseStyles}
      onClick={handleClick}
      ref={buttonRef}
    >
      {content}
    </button>
  );
};
