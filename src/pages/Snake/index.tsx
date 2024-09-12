import React, { useState, useEffect, useRef } from "react";
import Gamepopup from "@/component/Gamepopup";
import SVG from "@/component/SVG";
import Image from "next/image";
import confetti from "canvas-confetti";

const SnakeGame = () => {
  const gridSize = 28;
  const initialSnake = [{ x: 1, y: 1 }];
  const url: any = process.env.NEXT_PUBLIC_API_URL;
  let fruits = ["🍑", "🍌", "🍓", "🍒", "🍉", "🥭", "🍇", "🍏", "🥥", "🍎"];

  const [Like, setLike] = useState(0);
  const [speed, setSpeed] = useState(120);
  const [duration, setDuration] = useState(0);
  const [oneFood, setOneFood] = useState("🍑");
  const [direction, setDirection] = useState("");
  const durationInterval: any = useRef<any>(null);
  const [snake, setSnake] = useState(initialSnake);
  const [food, setFood] = useState<{ x: 1; y: 1 }>();
  const [highestScore, setHighestScore] = useState(0);
  const [isLowHeight, setIsLowHeight] = useState("h-[90vh]");
  const [snakeColor, setSnakeColor] = useState("snakebody");
  const [windowWidth, setWindowWidth] = useState<any>(null);
  const [isPopUpVisible, setIsPopUpVisible] = useState<any>({
    type: "",
    isOpen: false,
  });

  const GetLikeCount = async () => {
    await fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLike(data?.like);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    if (snake.length * 10 > 100 && speed === 120) {
      setSpeed(90);
      setSnakeColor("snakebody1");
    } else if (snake.length * 10 > 200 && speed == 90) {
      setSpeed(60);
      setSnakeColor("snakebody4");
    } else if (snake.length * 10 > 300 && speed == 60) {
      setSpeed(50);
      setSnakeColor("snakebody3");
    } else if (snake.length * 10 > 400 && speed == 50) {
      setSpeed(40);
      setSnakeColor("snakebody2");
    }
  }, [snake]);

  useEffect(() => {
    setFood(generateFood());

    if (direction === "") {
      setIsPopUpVisible({ type: "GAME_START", isOpen: true });
      return;
    }

    // Start the duration interval
    durationInterval.current = setInterval(() => {
      setDuration((prev) => prev + 1);
    }, 1000);

    // Cleanup the interval when the component unmounts or when resetting the game
    return () => clearInterval(durationInterval.current);
  }, []);

  const generateFood: any = () => {
    // Get the food at random direction
    const food = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    };

    let b = Math.floor(Math.random() * 10);
    let a = fruits[b];
    setOneFood(a);

    const foodOnSnake = snake.some(
      (segment) => segment.x === food.x && segment.y === food.y
    );
    if (foodOnSnake || food.x > gridSize || food.y > gridSize) {
      return generateFood();
    }
    return food;
  };

  const startGame = () => {
    GetLikeCount();
    durationInterval.current = setInterval(() => {
      setDuration((prev) => prev + 1);
    }, 1000);
    setIsPopUpVisible({
      type: "",
      isOpen: false,
    });
    setDirection("RIGHT");
  };

  const resetGame = () => {
    // Clear the duration interval when resetting the game
    clearInterval(durationInterval.current);

    // Reset the state and start a new game
    setIsPopUpVisible({
      type: "GAME_OVER",
      isOpen: true,
      duration: duration,
      currentScore: snake.length * 10,
    });
    setSpeed(120);
    if (highestScore <= snake.length * 10) {
      setHighestScore(snake.length * 10);
    }
    setSnakeColor("snakebody");
    setSnake(initialSnake);
    setDirection("");
    setDuration(0);
  };

  // format time on basis of HH:MM:SS format
  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    if (hours === 0) {
      return `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    }

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleKeyPress = (e: any, direction1: string = "") => {
    if (isPopUpVisible.isOpen) return;

    switch (e.key || direction1) {
      case "ArrowUp":
      case "w":
        if (direction !== "DOWN") {
          setDirection("UP");
        }
        break;
      case "ArrowDown":
      case "s":
        if (direction !== "UP") {
          setDirection("DOWN");
        }
        break;
      case "ArrowLeft":
      case "a":
        if (direction !== "RIGHT") {
          setDirection("LEFT");
        }
        break;
      case "ArrowRight":
      case "d":
        if (direction !== "LEFT") {
          setDirection("RIGHT");
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [direction]);

  useEffect(() => {
    const moveSnake = async () => {
      const newSnake = [...snake];
      const head = { ...newSnake[0] };

      switch (direction) {
        case "UP":
          head.y = (head.y - 1 + gridSize) % gridSize;
          break;
        case "DOWN":
          head.y = (head.y + 1) % gridSize;
          break;
        case "LEFT":
          head.x = (head.x - 1 + gridSize) % gridSize;
          break;
        case "RIGHT":
          head.x = (head.x + 1) % gridSize;
          break;
        default:
          break;
      }

      if (head.x === food?.x && head.y === food?.y) {
        setFood(await generateFood());
        newSnake.unshift(head);
      } else {
        newSnake.unshift(head);
        newSnake.pop();
      }

      const collidedWithBody = newSnake
        .slice(1)
        .some((segment) => segment.x === head.x && segment.y === head.y);
      if (collidedWithBody) {
        resetGame();
      } else {
        setSnake(newSnake);
      }
    };

    const gameLoop = setInterval(() => {
      moveSnake();
    }, speed);

    return () => {
      clearInterval(durationInterval);
      clearInterval(gameLoop);
    };
  }, [snake, direction, food]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      if (
        window.innerHeight >= 760 &&
        window.innerHeight <= 815 &&
        window.innerWidth >= 1024
      ) {
        setIsLowHeight("h-[73vh]");
      }

      if (
        window.innerHeight >= 710 &&
        window.innerHeight < 760 &&
        window.innerWidth >= 1024
      ) {
        setIsLowHeight("h-[82vh]");
      }

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const handleButtonClick = async () => {
    var duration = 5 * 1000;
    var animationEnd = Date.now() + duration;
    var skew = 1;

    function randomInRange(min: any, max: any) {
      return Math.random() * (max - min) + min;
    }

    (function frame() {
      var timeLeft = animationEnd - Date.now();
      var ticks = Math.max(200, 500 * (timeLeft / duration));
      skew = Math.max(0.8, skew - 0.001);

      confetti({
        particleCount: 1,
        startVelocity: 0,
        ticks: ticks,
        origin: {
          x: Math.random(),
          // since particles fall down, skew start toward the top
          y: Math.random() * skew - 0.2,
        },
        colors: ["#ffffff"],
        shapes: ["circle"],
        gravity: randomInRange(0.4, 0.6),
        scalar: randomInRange(0.4, 1),
        drift: randomInRange(-0.4, 0.4),
      });

      if (timeLeft > 0) {
        requestAnimationFrame(frame);
      }
    })();

    // await fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ like: Like }),
    // })
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     setLike(data?.like);
    //   })
    //   .catch((error) => {
    //     toast.error("Internal Server Error", error);
    //   });
  };

  return (
    <React.Fragment>
      <div className="w-screen lg:h-screen xl:h-screen 2xl:h-screen flex items-center xs:flex-col-reverse sm:flex-col-reverse md:flex-col-reverse lg:flex-row xl:flex-row bgcolor">
        {windowWidth <= 1022 && windowWidth >= 402 && (
          <div className="xs:w-full xs:h-[30vh] px-8 flex mt-6 justify-center">
            <div className="border shadow-inner shadow-slate-500 w-[14rem] h-[14rem] px-4 rounded-full flex flex-col items-center justify-center">
              <button
                onClick={(e: any) => {
                  handleKeyPress(e, "ArrowUp");
                }}>
                <SVG.UpRemoteSvg />
              </button>
              <div className="flex justify-between items-center w-full">
                <button
                  onClick={(e: any) => {
                    handleKeyPress(e, "ArrowLeft");
                  }}>
                  <SVG.LeftRemoteSvg />
                </button>
                <button
                  onClick={(e: any) => {
                    handleKeyPress(e, "ArrowRight");
                  }}>
                  <SVG.RightRemoteSvg />
                </button>
              </div>
              <button
                onClick={(e: any) => {
                  handleKeyPress(e, "ArrowDown");
                }}>
                <SVG.DownRemoteSvg />
              </button>
            </div>
          </div>
        )}

        <div
          className={`w-fit h-fit m-6 rounded-2xl overflow-hidden snakeboxbg ${isLowHeight}`}>
          {Array.from({ length: gridSize }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex">
              {Array.from({ length: gridSize }).map((_, colIndex) => {
                const isSnakeHead =
                  snake.length > 0 &&
                  snake[0].x === colIndex &&
                  snake[0].y === rowIndex;

                return (
                  <div
                    key={colIndex}
                    className={`shadow-inner  sm:w-6 xs:w-4 md:w-7 xs:h-4 sm:h-6 md:h-7 
                    ${
                      isLowHeight === "h-[73vh]" || isLowHeight === "h-[82vh]"
                        ? "lg:w-[1.3rem] xl:w-[1.3rem] 2xl:w-[1.7rem]  lg:h-[1.3rem] xl:h-[1.3rem] 2xl:h-[1.7rem]"
                        : "lg:w-[1.3rem] xl:w-[1.8rem]  lg:h-[1.3rem] xl:h-[1.8rem]"
                    }
                    ${
                      snake.some(
                        (segment) =>
                          segment.x === colIndex && segment.y === rowIndex
                      )
                        ? isSnakeHead
                          ? "" // styles for the snake head
                          : `${snakeColor} rounded-2xl` // styles for the snake body
                        : ""
                    } ${
                      food?.x === colIndex && food?.y === rowIndex
                        ? "flex items-center justify-center"
                        : ""
                    }`}>
                    {food?.x === colIndex && food?.y === rowIndex && (
                      <p className="xs:text-xl sm:text-xl md:text-lg lg:text-xl xl:text-2xl  animate-bounce">
                        {oneFood}
                      </p>
                    )}
                    {isSnakeHead && (
                      <div className="text-2xl">
                        <Image
                          src="/snakehead.png"
                          alt="h.p"
                          width={240}
                          height={240}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className=" xs:w-full md:w-full lg:w-1/2 xl:w-1/2 xs:h-[60vh] sm:h-[60vh] md:h-[75vh] lg:h-[70vh] xl:h-[70vh] 2xl:h-[90vh] text-white m-6 relative">
          <div className="flex flex-col items-center mt-5">
            <div>
              <Image
                src={"/logo.png"}
                alt={"bg.jpg"}
                width={350}
                height={350}
                className="rounded-lg"
              />
            </div>

            <div className="mt-20 xs:w-[38vh] md:w-[50vw] lg:w-[40vw] xl:w-[30vw] xs:h-[32vh] md:xl:h-[45vh] lg:h-[40vh] xl:h-[40vh] 2xl:h-[50vh] relative rounded-xl overflow-hidden">
              <div className="absolute inset-0 blur-[4px] bg-transparent border border-gray-400 rounded-xl"></div>
              <div className="flex justify-between py-4 border-b mx-6">
                <div className="font-bold text-lg flex items-center gap-4">
                  Highest Score
                  <span className="text-[gold] text-2xl">{highestScore}</span>
                </div>
                <div className="font-bold text-lg flex items-center gap-4">
                  Timer
                  <span className="text-[gold] text-2xl">
                    {formatTime(duration)}
                  </span>
                </div>
              </div>
              <div className="xs:h-[25vh] md:h-[25vh] lg:h-[33vh] xl:h-[33vh] 2xl:h-[44vh] pt-10 flex flex-col items-center relative">
                <div className="font-bold text-xl gap-4 flex flex-col items-center">
                  <span className="text-[gold] text-2xl">
                    {snake.length * 10}
                  </span>
                  Score
                </div>
                <div className="flex  items-center justify-center absolute xs:bottom-10 md:bottom-7 lg:bottom-8 xl:bottom-8 2xl:bottom-10  gap-3 mt-3 w-full">
                  <button
                    onClick={handleButtonClick}
                    type="button"
                    className="p-2 border rounded-full group hover:bg-[#ff003d]">
                    <svg
                      className="w-6 h-6 fill-[#1eff00] group-hover:fill-white"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24">
                      <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
                    </svg>
                  </button>
                  <p className="font-mono">Hit Love to Celebrate!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isPopUpVisible.isOpen && (
        <Gamepopup>
          {isPopUpVisible.type === "GAME_OVER" && (
            <>
              <div className="flex flex-col items-center justify-center max-w-xs p-6 shadow-md rounded-3xl sm:px-12 dark:bg-[#113d0f] dark:text-gray-100">
                <div className="border relative w-32 h-32 rounded-full overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center blur-[4px]"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-[#00fb76] font-bold text-4xl rounded-full p-1">
                      {isPopUpVisible?.currentScore}
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="my-2 space-y-4">
                    <h2 className="text-xl font-semibold sm:text-2xl">
                      Game Over
                    </h2>
                    <p className="px-5 text-xs sm:text-base dark:text-gray-400">
                      Well Played!!
                      <span className="ml-4">
                        {formatTime(isPopUpVisible.duration) ?? 0}
                      </span>
                    </p>
                  </div>

                  <div className="flex justify-center pt-4 space-x-4 align-center">
                    <button
                      onClick={() => {
                        window.location.href = "/";
                      }}
                      className="flex items-center gap-2 text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-bold rounded-lg text-sm px-3 py-1 text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 shadow hover:shadow-md hover:shadow-slate-500 dark:focus:ring-green-800">
                      <SVG.HomeSvg />
                      Home
                    </button>
                    <button
                      onClick={() => {
                        startGame();
                      }}
                      className="flex items-center gap-2 text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-bold rounded-lg text-sm px-3 py-1 text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 shadow hover:shadow-md hover:shadow-slate-500 dark:focus:ring-green-800">
                      <SVG.RetrySvg />
                      Retry
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
          {isPopUpVisible.type === "GAME_START" && (
            <div className="relative flex flex-col items-center max-w-lg gap-4 p-6 rounded-3xl shadow-md sm:py-8 sm:px-12 dark:bg-[#113d0f] dark:text-gray-100">
              <Image
                src={"/snake.gif"}
                alt={"bg.jpg"}
                width={350}
                height={350}
                className="rounded-full mix-blend-hard-light contrast-[-10]"
              />
              <h2 className="text-2xl font-semibold leadi tracking-tight text-center">
                Welcome to the Era of Nostalgia
                <br /> for the snake game
              </h2>
              <button
                onClick={() => {
                  startGame();
                }}
                className="mt-8 flex items-center gap-2 text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-bold rounded-lg text-base px-4 py-2 text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 shadow hover:shadow-md hover:shadow-slate-500 dark:focus:ring-green-800">
                Start Game
              </button>
            </div>
          )}
        </Gamepopup>
      )}
    </React.Fragment>
  );
};

export default SnakeGame;
