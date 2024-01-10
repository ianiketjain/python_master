import Head from "next/head";
import Image from "next/image";
import LetsPlaybutton from "@/component/LetsPlaybutton";

export default function Home() {
  return (
    <>
      <Head>
        <title>Snake Game</title>
        <meta name="description" content="snake game react next" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-screen h-screen">
        <div>
          <Image
            src={"/bg.jpg"}
            alt={"bg.jpg"}
            fill
            className="filter contrast-100 brightness-75 backdrop-saturate-200 circle_mask blur-[1px]"
          />
          <div className="absolute">
            <p className="xs:pt-32 xs:pl-16 sm:pl-20 sm:pt-32 md:pl-36 md:pt-32 lg:pl-48 lg:pt-32 xl:pt-32 xl:pl-80 xs:text-[2rem] sm:text-[3rem] md:text-[4rem] lg:text-[5rem] xl:text-[5rem] whitespace-nowrap gradient_text text-center thing_rotate animate-pulse ">
              Lets Play with Python 🐍
            </p>
            <LetsPlaybutton
              onClickBtn={() => {
                window.location.href = "/Snake";
              }}
            />
          </div>
        </div>
      </main>
    </>
  );
}
