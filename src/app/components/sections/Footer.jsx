"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { Telegram, WhatsApp } from "../elements";
gsap.registerPlugin(ScrollTrigger);

export const Footer = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const imgRef = useRef(null);

  useGSAP(() => {
    const imgElem = imgRef.current;
    gsap.to(imgElem, {
      backgroundPositionY: "100%",
      height: isMobile ? "80vh" : "100vh",
      scrollTrigger: {
        trigger: imgElem,
        start: "top 10%",
        end: "400% 10%",
        scrub: true,
        markers: false,
      },
    });
    const footerLink = document.querySelectorAll(".footer-link");
    const footerCopy = document.querySelector(".footer-copy");
    const footerImgOne = document.querySelector(".footer-img-one");
    const footerImgTwo = document.querySelector(".footer-img-two");
    const fadeInElements = [footerLink, footerCopy, footerImgOne, footerImgTwo];

    const tl = gsap.timeline({
      duration: 1,
      ease: "power2.inOut",

      scrollTrigger: {
        trigger: imgRef.current,
        start: "bottom center",
        end: "300% 10%",
        scrub: false,

        markers: false,
      },
    });
    tl.addLabel("start")
      .fromTo(
        fadeInElements,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 3,
          delay: 1,
          stagger: 0.8,
          ease: "power2.out",
        },
        "start",
      )
      .addLabel("fadeInComplete");
  }, []);

  return (
    <footer>
      <div
        ref={imgRef}
        className="h-[20vh] bg-cover bg-center"
        style={{
          backgroundImage: "url('./img.webp')",
        }}
      >
        <div className="wrap-primary flex h-full flex-col items-center justify-between">
          <div className="flex h-full items-center justify-center">
            <a
              href="#"
              className="footer-link text-title-lg font-bold text-white"
            >
              roman@mail.com
            </a>
          </div>
          <div className="flex w-full flex-col-reverse items-center justify-between md:flex-row">
            <p className="footer-copy">&copy; Roman Demydiuk</p>
            <div className="flex w-full items-center justify-between gap-10 py-2 md:w-fit md:justify-start md:py-10">
              <a href="#" className="footer-img-one">
                <div className="w-5 md:w-10">
                  <WhatsApp />
                </div>
                <span className="font-bold text-white">Whatsapp</span>
              </a>
              <a href="#" className="footer-img-two">
                <div className="w-5 md:w-10">
                  <Telegram />
                </div>
                <span className="font-bold text-white">Telegram</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
