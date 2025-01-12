"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const textRef = useRef(null);
  const imgRef = useRef(null);

  useGSAP(() => {
    const textElement = textRef.current;

    const text = textElement?.textContent || "";
    textElement.textContent = ""; // Очистити текст перед анімацією

    const chars = text.split(""); // Розбити текст на символи

    // Додати кожен символ як окремий <span>
    chars.forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char;
      textElement.appendChild(span);
    });

    // GSAP-анімація друкування
    gsap.fromTo(
      textElement.querySelectorAll("span"),
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.05,
        stagger: 0.05,
        ease: "power1.inOut",
      },
    );

    const imgElem = imgRef.current;
    gsap.to(imgElem, {
      backgroundPositionY: "100%",
      height: isMobile ? "80vh" : "100vh",
      scrollTrigger: {
        trigger: imgElem,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        markers: false,
      },
    });
  }, []);

  return (
    <div className="flex flex-col justify-between">
      <div className="wrap-primary flex flex-col justify-between">
        <a
          data-hover="light"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 block flex-1 text-logo"
        >
          Roman Demydiuk
        </a>
        <div className="flex place-items-end align-bottom">
          <div className="mb-6 md:mb-10 md:max-w-[80%]">
            <h1
              ref={textRef}
              className="mt-[35vh] text-balance text-title leading-[1.1] tracking-tight md:mt-16"
            >
              I’m Roman, a UX/UI designer crafting intuitive and impactful
              digital designs.
            </h1>
          </div>
        </div>
      </div>
      <div
        ref={imgRef}
        className="h-[20vh] bg-cover bg-center"
        style={{
          backgroundImage: "url('./img.webp')",
        }}
      />
    </div>
  );
};
