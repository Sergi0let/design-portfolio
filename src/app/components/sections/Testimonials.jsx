"use client";

import { testimonials } from "@/app/constants";
import { useGSAP } from "@gsap/react";
import { clsx as cn } from "clsx";
import { gsap } from "gsap";
import { MoveLeft, MoveRight } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

const AnimatedTestimonial = ({ testimonial }) => {
  const elementRef = useRef(null);
  const bgRef = useRef(null);

  useGSAP(() => {
    if (bgRef.current && elementRef.current) {
      const image = elementRef.current.querySelector(".testimonial-image");
      const info = elementRef.current.querySelector(".testimonial-info");
      const description = elementRef.current.querySelector(
        ".testimonial-description",
      );

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: elementRef.current,
          start: "bottom 80%",
          end: "bottom top",
          markers: false,
        },
      });

      const fadeInElements = [image, info, description];
      timeline
        .addLabel("start")
        .fromTo(
          fadeInElements,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 2,
            stagger: 0.2,
            ease: "power2.out",
          },
          "start",
        )
        .addLabel("fadeInComplete");

      timeline.to(
        bgRef.current,
        {
          scaleY: 0,
          duration: 2,
          ease: "power2.out",
        },
        "fadeInComplete+=0.1",
      );
    }
  });

  return (
    <div ref={elementRef}>
      <div className="wrap-decor-bg" ref={bgRef}></div>
      <div className="flex items-center gap-4 md:gap-5">
        <div className="testimonial-image size-[var(--64-80)] overflow-hidden rounded-full">
          <Image
            src={testimonial.imageUrl}
            alt={testimonial.name}
            width={80}
            height={80}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="testimonial-info">
          <h3 className="text-xl font-bold tracking-tighter text-white">
            {testimonial.name}
          </h3>
          <p className="text-tetriary mt-1 text-sm">{testimonial.role}</p>
        </div>
      </div>
      <p className="testimonial-description mt-[var(--20-32)] line-clamp-[7] text-logo tracking-tighter text-white">
        {testimonial.desc}
      </p>
    </div>
  );
};

export const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  // Свайпи
  const handleTouch = () => {
    let startX = 0;
    let endX = 0;

    const onTouchStart = (e) => {
      startX = e.touches[0].clientX;
    };

    const onTouchMove = (e) => {
      endX = e.touches[0].clientX;
    };

    const onTouchEnd = () => {
      if (startX - endX > 50) {
        nextSlide(); // Свайп вліво
      }
      if (endX - startX > 50) {
        prevSlide(); // Свайп вправо
      }
    };

    const container = containerRef.current;
    container.addEventListener("touchstart", onTouchStart);
    container.addEventListener("touchmove", onTouchMove);
    container.addEventListener("touchend", onTouchEnd);

    return () => {
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
    };
  };

  useGSAP(handleTouch);

  return (
    <section
      ref={containerRef}
      className="wrap-decor relative overflow-hidden bg-foreground"
    >
      <div className="wrap-primary py-32">
        <div className="relative z-10">
          <div className="mx-auto max-w-[660px]">
            <AnimatedTestimonial
              key={currentSlide}
              testimonial={testimonials[currentSlide]}
            />
            <div className="relative z-10 mt-8 flex space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-3 w-3 rounded-full ${
                    index === currentSlide ? "bg-white" : "bg-gray-500"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className={cn(
              currentSlide > 0 ? "scale-1" : "scale-0",
              "bg-tetriary absolute left-0 top-1/2 hidden size-[80px] -translate-y-1/2 items-center justify-center rounded-full text-white transition-all duration-700 md:flex",
            )}
            aria-label="Previous testimonial"
          >
            <MoveLeft size={32} />
          </button>

          <button
            onClick={nextSlide}
            className={cn(
              currentSlide < testimonials.length - 1 ? "scale-1" : "scale-0",
              "bg-tetriary absolute right-0 top-1/2 hidden size-[80px] -translate-y-1/2 items-center justify-center rounded-full text-white duration-700 md:flex",
            )}
            aria-label="Next testimonial"
          >
            <MoveRight size={32} />
          </button>
        </div>
      </div>
    </section>
  );
};
