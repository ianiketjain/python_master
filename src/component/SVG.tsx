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
    <svg width="30" height="30" viewBox="0 0 48 48">
      <path fill="#7cb342" d="M24 3A21 21 0 1 0 24 45A21 21 0 1 0 24 3Z"></path>
      <path
        fill="#dcedc8"
        d="M24,36.1c-6.6,0-12-5.4-12-12c0-3.6,1.6-7,4.4-9.3l2.5,3.1c-1.8,1.5-2.9,3.8-2.9,6.2c0,4.4,3.6,8,8,8 s8-3.6,8-8c0-2.1-0.8-4-2.2-5.5l2.9-2.7C34.8,18,36,21,36,24.1C36,30.7,30.6,36.1,24,36.1z"></path>
      <path fill="#dcedc8" d="M12 13L21 13 21 22z"></path>
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
    <svg width="24" height="24" viewBox="0 0 48 48">
      <polygon
        fill="#f5bc00"
        points="42,43 6,43 6,15.056 24,1.453 42,15.025"></polygon>
      <polygon
        fill="#f55376"
        points="3.675,24.333 0.042,19.559 24,1.453 47.958,19.518 44.378,24.333 24.021,8.926"></polygon>
      <polygon
        fill="#eb0000"
        points="6,22.573 24.021,8.926 42,22.533 42,15.025 24,1.453 6,15.056"></polygon>
      <rect width="12" height="16" x="18" y="27" fill="#eb7900"></rect>
    </svg>
  );
};

const LeftRemoteSvg = () => {
  return (
    <svg
      height="55"
      width="55"
      viewBox="-5.4 -5.4 64.80 64.80"
      className="group rounded-full">
      <g>
        <g>
          <path
            className="fill-[#2bee65]  hover:fill-white"
            d="M27,1L27,1c14.359,0,26,11.641,26,26v0c0,14.359-11.641,26-26,26h0C12.641,53,1,41.359,1,27v0 C1,12.641,12.641,1,27,1z"></path>
          <path
            className="fill-[#2bee65]  hover:fill-white"
            d="M27,54C12.112,54,0,41.888,0,27S12.112,0,27,0s27,12.112,27,27S41.888,54,27,54z M27,2 C13.215,2,2,13.215,2,27s11.215,25,25,25s25-11.215,25-25S40.785,2,27,2z"></path>
        </g>{" "}
        <path
          className="fill-[#ffffff]  group-hover:fill-black"
          d="M31.706,40c-0.256,0-0.512-0.098-0.707-0.293L19.501,28.209c-0.667-0.667-0.667-1.751,0-2.418 l11.498-11.498c0.391-0.391,1.023-0.391,1.414,0s0.391,1.023,0,1.414L21.12,27l11.293,11.293c0.391,0.391,0.391,1.023,0,1.414 C32.218,39.902,31.962,40,31.706,40z"></path>
      </g>
    </svg>
  );
};

const RightRemoteSvg = () => {
  return (
    <svg
      height="55"
      width="55"
      viewBox="-5.4 -5.4 64.80 64.80"
      className="group rounded-full"
      transform="rotate(180)">
      <g>
        <g>
          <path
            className="fill-[#2bee65]  hover:fill-white"
            d="M27,1L27,1c14.359,0,26,11.641,26,26v0c0,14.359-11.641,26-26,26h0C12.641,53,1,41.359,1,27v0 C1,12.641,12.641,1,27,1z"></path>
          <path
            className="fill-[#2bee65]  hover:fill-white"
            d="M27,54C12.112,54,0,41.888,0,27S12.112,0,27,0s27,12.112,27,27S41.888,54,27,54z M27,2 C13.215,2,2,13.215,2,27s11.215,25,25,25s25-11.215,25-25S40.785,2,27,2z"></path>
        </g>
        <path
          className="fill-[#ffffff]  group-hover:fill-black"
          d="M31.706,40c-0.256,0-0.512-0.098-0.707-0.293L19.501,28.209c-0.667-0.667-0.667-1.751,0-2.418 l11.498-11.498c0.391-0.391,1.023-0.391,1.414,0s0.391,1.023,0,1.414L21.12,27l11.293,11.293c0.391,0.391,0.391,1.023,0,1.414 C32.218,39.902,31.962,40,31.706,40z"></path>
      </g>
    </svg>
  );
};

const UpRemoteSvg = () => {
  return (
    <svg
      height="55"
      width="55"
      viewBox="-5.4 -5.4 64.80 64.80"
      className="group rounded-full"
      transform="rotate(90)">
      <g>
        <g>
          <path
            className="fill-[#2bee65]  hover:fill-white"
            d="M27,1L27,1c14.359,0,26,11.641,26,26v0c0,14.359-11.641,26-26,26h0C12.641,53,1,41.359,1,27v0 C1,12.641,12.641,1,27,1z"></path>
          <path
            className="fill-[#2bee65]  hover:fill-white"
            d="M27,54C12.112,54,0,41.888,0,27S12.112,0,27,0s27,12.112,27,27S41.888,54,27,54z M27,2 C13.215,2,2,13.215,2,27s11.215,25,25,25s25-11.215,25-25S40.785,2,27,2z"></path>
        </g>
        <path
          className="fill-[#ffffff]  group-hover:fill-black"
          d="M31.706,40c-0.256,0-0.512-0.098-0.707-0.293L19.501,28.209c-0.667-0.667-0.667-1.751,0-2.418 l11.498-11.498c0.391-0.391,1.023-0.391,1.414,0s0.391,1.023,0,1.414L21.12,27l11.293,11.293c0.391,0.391,0.391,1.023,0,1.414 C32.218,39.902,31.962,40,31.706,40z"></path>
      </g>
    </svg>
  );
};

const DownRemoteSvg = () => {
  return (
    <svg
      height="55"
      width="55"
      viewBox="-5.4 -5.4 64.80 64.80"
      className="group rounded-full"
      transform="rotate(270)">
      <g>
        <g>
          <path
            className="fill-[#2bee65]  hover:fill-white"
            d="M27,1L27,1c14.359,0,26,11.641,26,26v0c0,14.359-11.641,26-26,26h0C12.641,53,1,41.359,1,27v0 C1,12.641,12.641,1,27,1z"></path>
          <path
            className="fill-[#2bee65]  group-hover:fill-white"
            d="M27,54C12.112,54,0,41.888,0,27S12.112,0,27,0s27,12.112,27,27S41.888,54,27,54z M27,2 C13.215,2,2,13.215,2,27s11.215,25,25,25s25-11.215,25-25S40.785,2,27,2z"></path>
        </g>
        <path
          className="fill-[#ffffff]  group-hover:fill-black"
          d="M31.706,40c-0.256,0-0.512-0.098-0.707-0.293L19.501,28.209c-0.667-0.667-0.667-1.751,0-2.418 l11.498-11.498c0.391-0.391,1.023-0.391,1.414,0s0.391,1.023,0,1.414L21.12,27l11.293,11.293c0.391,0.391,0.391,1.023,0,1.414 C32.218,39.902,31.962,40,31.706,40z"></path>
      </g>
    </svg>
  );
};

const WatchSvg = () => {
  return (
    <svg
      aria-hidden="true"
      className="h-3 w-3 flex-none fill-violet-600 group-active:fill-current">
      <path d="m9.997 6.91-7.583 3.447A1 1 0 0 1 1 9.447V2.553a1 1 0 0 1 1.414-.91L9.997 5.09c.782.355.782 1.465 0 1.82Z"></path>
    </svg>
  );
};

const SVG = {
  PlaySvg,
  RetrySvg,
  HomeSvg,
  LikeSvg,
  LeftRemoteSvg,
  RightRemoteSvg,
  UpRemoteSvg,
  DownRemoteSvg,
  WatchSvg,
};

export default SVG;
