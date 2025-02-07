"use client";

import { clsx as cn } from "clsx";
import { useState } from "react";
import { Benefits, Hero, Testimonials, Works } from ".";
import { BtnOrLink, FormBlock, MenuBlock } from "../elements";
import { Footer } from "./Footer";

export const Wrapper = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTalkOpen, setIsTalkOpen] = useState(true);

  const openMenu = () => {
    setIsOpen(true);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };

  const openTalk = () => {
    setIsTalkOpen(true);
  };
  const closeTalk = () => {
    setIsTalkOpen(false);
  };

  return (
    <div className="relative">
      {!(isOpen && isTalkOpen) && (
        <>
          <BtnOrLink className="btn-talk" title="Let’s Talk" onClick={openTalk} cursorHover="dark" />
          <button
            data-hover="dark"
            aria-label="Open menu"
            onClick={openMenu}
            className={cn("btn-menu", "btn-menu_dark")}
          ></button>
        </>
      )}
      <Hero />
      <div className="!bg-red-200">
        <Works />
      </div>
      <div>
        <Testimonials />
      </div>
      <Benefits />
      <Footer />
      <FormBlock isTalkOpen={isTalkOpen} toggleMenu={closeMenu} toggleTalk={closeTalk} />
      <MenuBlock isOpen={isOpen} toggleMenu={closeMenu} toggleTalk={openTalk} />
    </div>
  );
};
