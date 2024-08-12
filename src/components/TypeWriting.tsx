import { useState, useEffect } from "react";
import { useTimer } from "../Context/MyContext";
import { VscDebugRestart } from "react-icons/vsc";

interface TimerContext {
  Blur: boolean;
  startTimer: () => void;
  restartTimer: () => void;
  duration: number;
  remainingTime: number;
  timerActive: boolean;
}

export const textArray = [
  "The quick brown fox jumps over the lazy dog. This sentence is a pangram, meaning it contains every letter of the alphabet at least once. It is often used for testing typewriters and computer keyboards to ensure that all keys are functioning properly.",

  "The only limit to our realization of tomorrow is our doubts of today. – Franklin D. Roosevelt. This quote encourages us to overcome our doubts and strive for success. Belief in oneself is a powerful tool for achieving goals.",

  "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity... – Charles Dickens, A Tale of Two Cities. This famous opening line sets the stage for a story of contrasts and complexities.",

  "JavaScript is a versatile programming language primarily used for enhancing the functionality of web pages. With the advent of modern frameworks like React, Angular, and Vue, JavaScript has become a cornerstone of front-end development, enabling developers to build dynamic and responsive user interfaces.",

  "On a cold winter’s night, a small town nestled in the mountains prepared for its annual festival. The streets were adorned with twinkling lights, and the smell of freshly baked goods filled the air. Children eagerly awaited the arrival of Santa Claus, who was rumored to be making a special appearance this year.",
];
const rand = Math.floor(Math.random() * 6);

export default function TypeWriting() {
  const text = textArray[rand];
  const {
    Blur,

    restartTimer,
    duration,
    remainingTime,
    timerActive,
  } = useTimer() as TimerContext;
  const [userText, setUserText] = useState<string>("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [Wpm, setWpm] = useState<number>(0);
  const [textcompleted, settextcompleted] = useState(0);

  useEffect(() => {
    if (timerActive && !startTime) {
      setStartTime(Date.now());
    }
    if (remainingTime === 0) {
      setStartTime(null);
    }
  }, [timerActive, remainingTime, startTime]);

  const calculateAccuracy = () => {
    const totalChars = userText.length;
    const correctChars = userText
      .slice(0, totalChars)
      .split("")
      .filter((char, index) => char === text[index]).length;
    return totalChars > 0 ? (correctChars / totalChars) * 100 : 0;
  };

  const calculateWPM = () => {
    if (startTime && duration) {
      const elapsedTime = (Date.now() - startTime) / 60000; // in minutes
      const wordsTyped = userText.length / 5; // Assuming 5 characters per word
      const wordsPerMinute = (wordsTyped / elapsedTime).toFixed(2);
      setWpm(parseInt(wordsPerMinute));
      const textc = (Number(userText.length) / Number(text.length)) * 100;
      settextcompleted(Math.floor(textc));
    }
    return 0;
  };

  const isTextCorrect = text?.startsWith(userText);

  const getHighlightedText = () => {
    const minLength = Math.min(text.length, userText.length);
    const correctPart = text.slice(0, minLength);

    return (
      <>
        {correctPart.split("").map((char, index) => (
          <span
            key={index}
            className={
              userText[index] === char
                ? "text-black"
                : "bg-red-500 text-gray-900"
            }
          >
            {userText[index] || ""}
          </span>
        ))}
        {userText.length < text.length &&
          text
            .slice(userText.length)
            .split("")
            .map((char, index) => (
              <span key={index + userText.length} className="text-gray-500">
                {char}
              </span>
            ))}
      </>
    );
  };

  return (
    <div className="flex flex-col items-center h-auto border-none outline-none">
      <VscDebugRestart
        onClick={() => {
          restartTimer();
          setUserText("");
          setWpm(0);
        }}
      />

      <div className="relative w-3/4 py-4 px-2 ml-[4rem] mr-[4rem] my-8">
        <div
          className={`absolute inset-0 h-[10rem] w-full top-[9px] left-3 text-gray-500 ${
            Blur ? "blur-sm" : "blur-none"
          }`}
        >
          {userText.length > 0 ? getHighlightedText() : text}
        </div>

        <div>
          <textarea
            value={userText}
            onChange={(e) => {
              setUserText(e.target.value);
              calculateWPM();
            }}
            className={`absolute rounded-lg inset-0 border-none border-white   bg-transparent w-full h-[10rem] outline-none ${
              isTextCorrect ? "" : ""
            }`}
            disabled={remainingTime === 0 || !timerActive}
          ></textarea>
        </div>
      </div>

      <div
        className={`text-center mt-14 p-4  shadow-lg shadow-black rounded-lg absolute bottom-10 ${
          remainingTime === 0 ? "text-3xl font-bold" : ""
        }`}
      >
        <div className="bg-indigo-100 p-4 rounded-lg mb-4 shadow  ">
          <p className="text-lg font-medium">
            Text Completed: {textcompleted}%
          </p>
        </div>
        <div className="bg-indigo-100 p-4 rounded-lg mb-4 shadow ">
          <p className="text-lg font-medium">
            Accuracy: {calculateAccuracy().toFixed(2)}%
          </p>
        </div>
        <div className="bg-indigo-100 p-4 rounded-lg">
          <p className="text-lg font-medium">WPM: {Wpm}</p>
        </div>
       
      </div>
    </div>
  );
}
