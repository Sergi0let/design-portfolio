"use client";

import { benefitsData } from "@/app/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { BtnOrLink } from "../elements";

export const Benefits = () => {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const subHeadingRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useGSAP(() => {
    const headingElem = headingRef.current;
    const wordsTitle = headingElem?.textContent || "";
    const chars = wordsTitle.split("");
    headingElem.textContent = "";

    const subHeadingElem = subHeadingRef.current;
    const subHeadingWords = subHeadingElem?.textContent || "";
    const charsSub = subHeadingWords.split("");
    subHeadingElem.textContent = "";

    if (!(subHeadingElem || headingElem)) return;

    chars.forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char;
      headingElem.appendChild(span);
    });

    charsSub.forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char;
      subHeadingElem.appendChild(span);
    });

    const tl = gsap.timeline({
      duration: 1,
      scrollTrigger: {
        trigger: containerRef.current,
        start: `${isMobile ? "200px" : "bottom"} ${isMobile ? "70%" : "50%"}`,
        end: `${isMobile ? "500px" : "400px"} ${isMobile ? "50%" : "20%"}`,
        scrub: 1,
        markers: false,
      },
    });

    tl.addLabel("start")
      .fromTo(
        headingElem.querySelectorAll("span"),
        {
          opacity: 0.1,
        },
        { opacity: 1, duration: 2, stagger: 0.1 },
      )
      .fromTo(
        subHeadingElem.querySelectorAll("span"),
        {
          opacity: 0.1,
        },
        { opacity: 1, duration: 2, stagger: 0.1 },
      );
  }, []);

  return (
    <section>
      <div className="wrap-primary py-[var(--48-80)]">
        <div ref={containerRef}>
          <h2 ref={headingRef} className="mr-[20vw] text-balance text-title-md leading-none md:mr-[40vw]">
            Let’s create something incredible together.
          </h2>
          <p ref={subHeadingRef} className="mt-2 text-logo text-tetriary md:mt-4">
            There are three ways work with me.
          </p>
        </div>
        <ul className="mt-[var(--24-40)] grid gap-[var(--24-40)] md:grid-cols-3">
          {benefitsData.map(({ title, desc, id, url }) => (
            <li
              data-fade="true"
              style={{ transitionDelay: `${id * 0.1}s` }}
              key={id}
              className="bg-white p-[var(--28-40)]"
            >
              <h3 className="text-title-card leading-[1.1]">{title}</h3>
              <p className="mb-[var(--80-120)] mt-6">{desc}</p>

              <BtnOrLink to={url} cursorHover={"dark"} title={"Get a Quote"} isBeam />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
