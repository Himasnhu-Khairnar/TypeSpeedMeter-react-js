import { useTimer } from "../Context/MyContext";

const Timer = () => {
  const {
    duration,
    remainingTime,
    timerActive,
    startTimer,
    handleDurationChange,
  } = useTimer();

  return (
    <div className="text-center">
      <h4>Typing Speed Test Timer</h4>
      <ul className="flex justify-center gap-2">
        <li
          onClick={() => handleDurationChange(30)}
          className={`cursor-pointer ${
            duration === 30 ? "border-b-2 border-indigo-600" : "border-none"
          }`}
        >
          30 s
        </li>
        <li
          onClick={() => handleDurationChange(60)}
          className={`cursor-pointer ${
            duration === 60 ? "border-b-2 border-indigo-600" : "border-none"
          }`}
        >
          60 s
        </li>
        <li
          onClick={() => handleDurationChange(90)}
          className={`cursor-pointer ${
            duration === 90 ? "border-b-2 border-indigo-600" : "border-none"
          }`}
        >
          90 s
        </li>
      </ul>
     
      <button
        className="group relative inline-block text-sm font-medium text-indigo-600 focus:outline-none focus:ring active:text-indigo-500 mt-2"
        onClick={startTimer} disabled={timerActive}
      >
        <span className="absolute inset-0 translate-x-0 translate-y-0 bg-indigo-600 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"></span>

        <span className="relative block border border-current bg-white px-8 py-3">
          {" "}
          Start{" "}
        </span>
      </button>
      <p className="text-[20px] mt-[20px]">
        {remainingTime !== null ? `${remainingTime}s` : `${duration}s`}
      </p>
    </div>
  );
};

export default Timer;
