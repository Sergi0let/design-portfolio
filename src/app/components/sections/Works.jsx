"use client";

import { works } from "@/app/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { BtnOrLink } from "../elements";

gsap.registerPlugin(ScrollTrigger);

export const Works = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const listRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  useGSAP(() => {
    const titleElem = titleRef.current;
    const words = titleElem?.textContent || "";
    const chars = words.split("");
    titleElem.textContent = "";

    chars.forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char;
      titleElem.appendChild(span);
    });

    gsap.fromTo(
      titleElem.querySelectorAll("span"),
      {
        opacity: 0.1,
      },
      {
        opacity: 1,
        duration: 2,
        stagger: 0.1,
        scrollTrigger: {
          trigger: titleRef.current,
          start: `bottom ${isMobile ? "90%" : "70%"}`,
          end: "bottom top",
          scrub: 1,
          markers: false,
        },
      },
    );

    if (listRef.current) {
      const listItems = listRef.current.querySelectorAll("li");
      gsap.fromTo(
        listItems,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: isMobile ? 0.2 : 0.5,
          scrollTrigger: {
            trigger: listRef.current,
            start: `${isMobile ? "50%" : "70%"} 90%`,
            end: "bottom top",
            scrub: 1,
            markers: false,
          },
        },
      );
    }
  });
  return (
    <section className="bg-white py-[var(--48-80)]">
      <div ref={containerRef} className="wrap-primary">
        <h2
          ref={titleRef}
          className="text-title-md title-works text-pretty leading-tight tracking-tight sm:text-justify md:indent-[var(--0-700)]"
        >
          Crafting user-first designs that create impactful digital solutions to
          help startups and businesses succeed
        </h2>
        <ul
          ref={listRef}
          className="my-[var(--24-40)] grid-cols-2 gap-[var(--24-40)] space-y-5 sm:grid md:space-y-0"
        >
          {works.map(({ id, imageUrl, title, desc, url }) => (
            <li key={id} className="group">
              <div href="/work">
                <div className="overflow-hidden">
                  <Image
                    src={imageUrl}
                    width={640}
                    height={320}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="mt-3 flex items-center justify-between gap-2 overflow-hidden md:mt-4">
                  <h3 className="text-title-sm flex flex-1 -translate-x-4 items-center leading-none transition duration-700 group-hover:translate-x-0">
                    <span className="mr-2 size-2 rounded-full bg-foreground" />
                    {title}
                  </h3>
                  <BtnOrLink
                    to={url}
                    title="Visit site"
                    secondary={true}
                    className=""
                  />
                </div>
                <p className="text-tetriary mt-3 md:mt-4">{desc}</p>
              </div>
            </li>
          ))}
        </ul>
        <button
          className="text-txt-xs mx-auto flex size-[var(--100-140)] items-center justify-center rounded-full bg-background"
          data-hover="light"
        >
          Load More
        </button>
      </div>
    </section>
  );
};
