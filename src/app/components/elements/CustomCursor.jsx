"use client";

import { useEffect, useState } from "react";

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hoveredType, setHoveredType] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const hoverType = target.dataset.hover;
      if (hoverType) {
        setHoveredType(hoverType);
      }
    };

    const handleMouseOut = () => {
      setHoveredType(null);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        border: `1px solid ${hoveredType === "dark" ? "white" : "black"}`,
        width: hoveredType ? "40px" : "20px",
        height: hoveredType ? "40px" : "20px",

        borderRadius: "50%",
        pointerEvents: "none",
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: "transform 0.1s linear, background-color 0.2s, width 0.2s, height 0.2s",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: hoveredType === "dark" ? "white" : "black",
          borderRadius: "50%",
          width: hoveredType ? "14px" : "8px",
          height: hoveredType ? "14px" : "8px",
          transition: "background-color 0.2s",
        }}
      />
    </div>
  );
};
