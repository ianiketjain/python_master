import React from "react";

interface LetsPlaybutton {
  onClickBtn: () => void;
}

const LetsPlaybutton: React.FC<LetsPlaybutton> = ({ onClickBtn }) => {
  return (
    <button
      onClick={onClickBtn}
      className="absolute xs:top-[40rem] xs:left-[10rem] sm:top-[40rem] sm:left-[20rem] md:top-[40rem] md:left-[30rem] lg:top-[40rem] lg:left-[35rem] xl:top-[40rem] xl:left-[50rem] btn_rotate shadow-lg shadow-green-500 whitespace-nowrap  inline-flex items-center justify-center px-10 py-2 text-lg font-medium tracking-tighter text-white bg-gray-800 rounded-md group">
      <span className="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out bg-[#7fff00] rounded-md group-hover:mt-0 group-hover:ml-0"></span>
      <span className="absolute inset-0 w-full h-full bg-white rounded-md "></span>
      <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-[#7fff00] rounded-md opacity-0 group-hover:opacity-100"></span>
      <span className="relative text-[#071323] transition-colors duration-200 ease-in-out delay-100 group-hover:text-black">
        Lets Play
      </span>
    </button>
  );
};

export default LetsPlaybutton;
