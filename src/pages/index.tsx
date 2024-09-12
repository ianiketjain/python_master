import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [borderColor, setBorderColor] = useState("black");
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  setTimeout(() => {
    const randomColor = getRandomColor();
    setBorderColor(randomColor);
  }, 1500);

  return (
    <>
      <Head>
        <title>Snake Game</title>
        <meta name="description" content="snake game react next" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-screen h-screen bg-[#3e6842] flex items-center justify-center bgcolor">
        <div
          style={{ border: `6px solid ${borderColor}` }}
          className={`flex items-center justify-around w-[60%] h-[80vh] p-20 rounded-2xl`}>
          <div className="w-[20rem] h-[30rem] relative">
            <Image
              src={"/sdance.gif"}
              alt={"bg.jpg"}
              fill
              className="backdrop-saturate-200 rounded-3xl"
            />
          </div>
          <div className="flex flex-col items-center gap-[3rem]">
            <p className="font-bold text-5xl text-[#64ff41] animate-bounce text-center">
              Lets Play with <br /> vegetarian Python 🐍
            </p>
            <Link href={"/Snake"}>
              <button className="group flex w-[14rem] h-[4rem] ring-none items-center justify-center hover:opacity-95 disabled:opacity-50 rounded-lg py-2 px-4 font-dm focus:outline-none !ring-transparent text-violet-800 border border-violet-500 border-b-violet-400 border-b-4 hover:border active:border bg-white hover:text-violet-900 hover:bg-gray-50 active:bg-gray-100 active:text-violet-600 focus-visible:outline-violet-600 focus-visible:ring-violet-700 text-2xl">
                <span className="ml-3">Lets Play</span>
              </button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
