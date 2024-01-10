import React from "react";

const PlaySvg = () => {
  return (
    <svg
      className="fill-white group-hover:fill-black"
      height="12px"
      width="12px"
      version="1.1"
      viewBox="0 0 224.075 224.075">
      <g>
        <g>
          <path d="M216.2,99.23L20.5,1.63c-2.1-1.1-4.8-1.6-6.9-1.6v0C5.7,0.53,0,6.33,0,14.23v195.7c0,10.5,11,17.3,20.5,12.6l195.7-98.1	C226.7,119.23,226.7,104.53,216.2,99.23z M27.8,187.33V36.73l150.6,75L27.8,187.33z" />
        </g>
      </g>
    </svg>
  );
};

const RetrySvg = () => {
  return (
    <svg
      className="stroke-gray-300 group-hover:stroke-black"
      width="22px"
      height="22px"
      viewBox="0 0 24 24"
      fill="none">
      <polyline points="22 12 19 15 16 12" />
      <path d="M11,20 C6.581722,20 3,16.418278 3,12 C3,7.581722 6.581722,4 11,4 C15.418278,4 19,7.581722 19,12 L19,14" />
    </svg>
  );
};

const LikeSvg = () => {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 18 18">
      <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z" />
    </svg>
  );
};

const HomeSvg = () => {
  return (
    <svg
      className="stroke-gray-300 group-hover:stroke-black"
      width="22px"
      height="22px"
      viewBox="0 0 24 24"
      fill="none">
      <path d="M3 10.182V22h18V10.182L12 2z" />
      <rect width="6" height="8" x="9" y="14" />
    </svg>
  );
};

const SVG = {
  PlaySvg,
  RetrySvg,
  HomeSvg,
  LikeSvg,
};

export default SVG;
