import React from "react";

export function AngleUp({ color = "white", width = "16", height = "16" }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
    >
      <path
        d="M2.66669 10L8.00002 4.66667L13.3334 10"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
