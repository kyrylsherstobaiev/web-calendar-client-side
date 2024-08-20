import React from "react";

export function Truck({ color = "white", width = "16", height = "16" }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
    >
      <g clipPath="url(#clip0_1_418)">
        <path
          d="M9.99998 2.66667C10.3536 2.66667 10.6927 2.80715 10.9428 3.0572C11.1928 3.30724 11.3333 3.64638 11.3333 4.00001V4.66667H12.3466C12.5465 4.6667 12.7438 4.71164 12.9239 4.79819C13.104 4.88474 13.2624 5.01067 13.3873 5.16667L14.374 6.40067C14.5634 6.63713 14.6666 6.93104 14.6666 7.234V10C14.6666 10.3536 14.5262 10.6928 14.2761 10.9428C14.0261 11.1929 13.6869 11.3333 13.3333 11.3333H12.6666C12.6666 11.8638 12.4559 12.3725 12.0809 12.7476C11.7058 13.1226 11.1971 13.3333 10.6666 13.3333C10.1362 13.3333 9.6275 13.1226 9.25243 12.7476C8.87736 12.3725 8.66665 11.8638 8.66665 11.3333H6.66665C6.66665 11.596 6.61491 11.8561 6.51441 12.0987C6.4139 12.3414 6.26658 12.5618 6.08086 12.7476C5.89514 12.9333 5.67466 13.0806 5.43201 13.1811C5.18936 13.2816 4.92929 13.3333 4.66665 13.3333C4.404 13.3333 4.14393 13.2816 3.90128 13.1811C3.65863 13.0806 3.43815 12.9333 3.25243 12.7476C3.06672 12.5618 2.9194 12.3414 2.81889 12.0987C2.71838 11.8561 2.66665 11.596 2.66665 11.3333C2.31302 11.3333 1.97389 11.1929 1.72384 10.9428C1.47379 10.6928 1.33331 10.3536 1.33331 10V4.00001C1.33331 3.64638 1.47379 3.30724 1.72384 3.0572C1.97389 2.80715 2.31302 2.66667 2.66665 2.66667H9.99998ZM4.66665 10.6667C4.48984 10.6667 4.32027 10.7369 4.19524 10.8619C4.07022 10.987 3.99998 11.1565 3.99998 11.3333C3.99998 11.5101 4.07022 11.6797 4.19524 11.8047C4.32027 11.9298 4.48984 12 4.66665 12C4.84346 12 5.01303 11.9298 5.13805 11.8047C5.26307 11.6797 5.33331 11.5101 5.33331 11.3333C5.33331 11.1565 5.26307 10.987 5.13805 10.8619C5.01303 10.7369 4.84346 10.6667 4.66665 10.6667ZM10.6666 10.6667C10.4898 10.6667 10.3203 10.7369 10.1952 10.8619C10.0702 10.987 9.99998 11.1565 9.99998 11.3333C9.99998 11.5101 10.0702 11.6797 10.1952 11.8047C10.3203 11.9298 10.4898 12 10.6666 12C10.8435 12 11.013 11.9298 11.1381 11.8047C11.2631 11.6797 11.3333 11.5101 11.3333 11.3333C11.3333 11.1565 11.2631 10.987 11.1381 10.8619C11.013 10.7369 10.8435 10.6667 10.6666 10.6667ZM12.3466 6.00001H11.3333V8.66667H13.3333V7.23334L12.3466 6.00001Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_1_418">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}