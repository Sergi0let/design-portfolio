"use client";

import { clsx as cn } from "clsx";
import { useEffect, useRef, useState } from "react";
import { Hero, Testimonials, Works } from ".";
import { BtnOrLink } from "../elements";
import { Footer } from "./Footer";

export const Wrapper = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const fixedElemRef = useRef(null);
  const triggerSectionRef = useRef(null);

  const toggleMenu = () => setIsOpen((prevIsDark) => !prevIsDark);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsDark(entry.isIntersecting); // Змінюємо стан залежно від видимості
      },
      {
        root: null, // Відстежуємо видимість у вікні
        threshold: 0.5, // 50% елемента має бути видимим для спрацьовування
      },
    );

    if (triggerSectionRef.current) {
      observer.observe(triggerSectionRef.current);
    }

    return () => {
      if (triggerSectionRef.current) {
        observer.unobserve(triggerSectionRef.current);
      }
    };
  }, []);
  return (
    <div>
      {/* Фіксований елемент */}
      <div
        ref={fixedElemRef}
        className={cn(
          "fixed right-[var(--16-40)] top-6 z-50 flex items-center gap-2 transition-colors duration-300 md:gap-4",
        )}
      >
        <BtnOrLink title="Let’s Talk" isDark={isDark} cursorHover="dark" />
        <button
          data-hover="dark"
          aria-label="Open menu"
          onClick={toggleMenu}
          className={cn(
            "btn-menu",
            isOpen && "btn-menu_open",
            isDark ? "btn-menu_dark" : "btn-menu_white",
          )}
        ></button>
      </div>
      <Hero />
      <div>
        <Works />
      </div>
      <div ref={triggerSectionRef}>
        <Testimonials />
      </div>
      <Footer />
    </div>
  );
};
