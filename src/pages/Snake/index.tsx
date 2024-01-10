import Gamepopup from "@/component/Gamepopup";
import SVG from "@/component/SVG";
import Image from "next/image";
import confetti from "canvas-confetti";

import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";

const SnakeGame = () => {
  const url = "https://pythonmaster.vercel.app/api";
  const gridSize = 28;
  const initialSnake = [{ x: 1, y: 1 }];
  let fruits = ["🍑", "🍌", "🍓", "🍒", "🍉", "🥭", "🍇", "🍏", "🥥", "🍎"];
  const [snake, setSnake] = useState(initialSnake);
  const [direction, setDirection] = useState("");
  const [food, setFood] = useState<{ x: 1; y: 1 }>();
  const [highestScore, setHighestScore] = useState(0);
  const [Like, setLike] = useState(0);
  const [snakeColor, setSnakeColor] = useState("snakebody");
  const [duration, setDuration] = useState(0);
  const [oneFood, setOneFood] = useState("🍑");
  const durationInterval: any = useRef<any>(null);
  const [speed, setSpeed] = useState(120);
  const [isPopUpVisible, setIsPopUpVisible] = useState<any>({
    type: "",
    isOpen: false,
  });

  const GetLikeCount = () => {
    fetch(url)
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
    console.log(b);

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
    setSnake(initialSnake);
    setDirection("");
    setDuration(0);
  };

  // format time on basis of HH:MM:SS format
  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const handleKeyPress = (e: any) => {
      if (isPopUpVisible.isOpen) return;

      switch (e.key) {
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

  const handleButtonClick = () => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ like: Like }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLike(data?.like);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { x: 0.7, y: 0.9 },
        });
      })
      .catch((error) => {
        toast.error("Internal Server Error", error);
      });
  };

  return (
    <React.Fragment>
      <div className="flex items-center xs:flex-col-reverse sm:flex-col-reverse md:flex-row lg:flex-row xl:flex-row w-screen h-fit md:h-screen lg:h-screen xl:h-screen bgcolor">
        <div className="w-fit md:w-1/2 lg:w-1/2 xl:w-1/2 h-fit m-6 rounded-2xl overflow-hidden bg-gray-900">
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
                    className={`border border-black xl:w-[1.9rem] xl:h-[1.9rem] md:w-7 md:h-7 sm:w-6 sm:h-6 xs:w-4 xs:h-4  shadow-inner ${
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

        {/* Right Side */}
        <div className="md:w-1/2 lg:w-1/2 xl:w-1/2 xs:h-[60vh] sm:h-[60vh] md:h-[86vh] lg:h-[85vh] xl:h-[70vh] text-white m-6 relative">
          <div className="flex flex-col items-center justify-center">
            <Image
              src={"/logo.png"}
              alt={"bg.jpg"}
              width={350}
              height={350}
              className="mix-blend-saturation"
            />
          </div>

          <div className="mt-10 flex flex-col px-10 py-8 justify-center items-center gap-6">
            <div className="rounded-s-3xl rounded-tr-3xl border-b flex items-center font-mono font-bold italic px-6 w-fit h-fit py-2 rounded-lg shadow-md shadow-gray-400 hover:bg-[#140e0e] hover:shadow-inner">
              Highest Score &nbsp;
              <span className="text-[gold] text-2xl">{highestScore}</span>
            </div>
            <div className="rounded-s-3xl rounded-tr-3xl border-b flex items-center font-mono font-bold italic px-6 w-fit h-fit py-2 rounded-lg shadow-md shadow-gray-400 hover:bg-[#140e0e] hover:shadow-inner">
              Duration &nbsp;
              <span className="text-[#b9c5f6] text-xl">
                {formatTime(duration)}
              </span>
            </div>
            <div className="border-t w-fit px-20 py-2 text-center mt-8 text-2xl rounded-e-3xl rounded-bl-3xl relative shadow-inner shadow-white">
              Score &nbsp;
              <span className="text-[#00ff00]">{snake.length * 10}</span>
            </div>
          </div>

          <div className="flex items-center justify-center absolute bottom-7 gap-3 mt-3 w-full">
            <button
              onClick={handleButtonClick}
              type="button"
              className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500">
              <SVG.LikeSvg />
            </button>
            <p className="font-mono">Like by {Like} </p>
          </div>
        </div>
      </div>

      {isPopUpVisible.isOpen && (
        <Gamepopup>
          {isPopUpVisible.type === "GAME_OVER" && (
            <>
              <p className="w-full text-center text-2xl mt-1 shadow-xl text-[gold]">
                Game Over &nbsp;&nbsp;
                <span className="text-sm text-gray-300 italic">
                  Duration : {formatTime(isPopUpVisible.duration) ?? 0}
                </span>
              </p>
              <div className="flex w-full">
                <div className="relative">
                  <Image
                    src="/win.png"
                    width={300}
                    height={300}
                    alt="win.jpg"
                    className="py-5"
                  />
                  <p
                    className={`absolute top-12 ${
                      isPopUpVisible?.currentScore.toString().length === 2
                        ? "left-20"
                        : isPopUpVisible?.currentScore.toString().length <= 1
                        ? "left-20"
                        : "left-16"
                    } font-extrabold text-gray-200 text-3xl`}>
                    {isPopUpVisible?.currentScore}
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center gap-6 w-full">
                  <button
                    onClick={() => {
                      window.location.href = "/";
                    }}
                    className="flex items-center gap-2 border w-fit px-4 py-1 rounded-md text-gray-300 hover:bg-[#06ff00] hover:text-black group hover:skew-x-12 hover:shadow-md hover:shadow-gray-400">
                    <SVG.HomeSvg />
                    Home
                  </button>
                  <button
                    onClick={() => {
                      startGame();
                    }}
                    className="flex items-center gap-2 border w-fit px-4 py-1 rounded-md text-gray-300 hover:bg-[#06ff00] hover:text-black group hover:skew-x-12 hover:shadow-md hover:shadow-gray-400">
                    <SVG.RetrySvg />
                    Retry
                  </button>
                  <p className="font-serif font-bolt italic text-lg text-gray-300">
                    Well played!! keep it up
                  </p>
                </div>
              </div>
            </>
          )}
          {isPopUpVisible.type === "GAME_START" && (
            <div>
              <p className="w-full shadow-md text-[gold] text-2xl font-bold text-center mt-1">
                Welcome Master
              </p>
              <div className="flex flex-col items-center">
                <p className="mt-6 text-red-400 fotn-extrabold">
                  ⚠️ Game is not over until python touches self body
                </p>
                <button
                  onClick={() => {
                    startGame();
                  }}
                  className="shadow-inner shadow-gray-200 mt-20 flex items-center gap-2 border w-fit px-4 py-2 rounded-md text-gray-300 hover:bg-[#06ff00] hover:text-black group hover:skew-x-12 hover:shadow-md hover:shadow-gray-400">
                  <SVG.PlaySvg />
                  Start Game
                </button>
              </div>
            </div>
          )}
        </Gamepopup>
      )}
    </React.Fragment>
  );
};

export default SnakeGame;
