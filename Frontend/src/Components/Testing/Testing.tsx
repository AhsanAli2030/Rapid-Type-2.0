import React, { useState } from "react";
import Easy from "../../assets/static_files/Easy.svg";
import Medium from "../../assets/static_files/Medium.svg";
import Hard from "../../assets/static_files/Hard.svg";
import offButton from "../../assets/static_files/toggle-off-svgrepo-com (1).svg";
import onbutton from "../../assets/static_files/toggle-on-svgrepo-com.svg";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);
import Testing_Text from "./Testing-Text";
import "../Navbar/Navbar.css";
import Analysis from "../Analysis_Section/Analysis";
// import axios from "axios";
const Testing = () => {
  const [difficultyLevel, setDifficultyLevel] = useState(Easy);
  const [difficultyLevelString, setDifficultyLevelString] = useState("Easy");
  const [timer, setTimer] = useState(0);
  const [punctuation, setPunctuation] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [numbers, setNumbers] = useState(false);

  const [childData, setChildData] = useState(false);
  const [customChildData, setCustomChildData] = useState(false);
  const [startTimer, setStartTimer] = useState(false);
  const [correctAndWrongWords, setCorrectAndWrongWords] = useState<boolean[]>(
    [],
  );
  const [constantTime, setConstantTime] = useState<number | undefined>(0);
  const [correctIndices, setCorrectIndices] = useState<(number | boolean)[][]>(
    [],
  );
  const [timeDiffrences, setTimeDiffrences] = useState<number[]>([]);
  const [backSpaceCounter, setBackSpaceCounter] = useState<number>(0);
  const [wordsCorrectedCounterSend, setWordsCorrectedCounterSend] = useState<
    number[] | undefined
  >([]);

  const handleDataFromChild = (data: boolean) => {
    setChildData(data);
  };
  const handleDataFromChildCustom = (data: boolean) => {
    setCustomChildData(data);
  };

  const handleDataFromChildStartTimer = (data: boolean) => {
    setStartTimer(data);
  };

  const handleDataForAnalysis = (data: {
    correctAndWrongWords: boolean[];
    ConstantTime: number | undefined;
    CorrectIndices: (number | boolean)[][];
    TimeDiffrences: number[];
    BackSpaceCounter: number;
    WordsCorrectedCounter: number[];
  }) => {
    setCorrectAndWrongWords(data.correctAndWrongWords);
    setConstantTime(data.ConstantTime);
    setCorrectIndices(data.CorrectIndices);
    setTimeDiffrences(data.TimeDiffrences);
    setBackSpaceCounter(data.BackSpaceCounter);
    setWordsCorrectedCounterSend(data.WordsCorrectedCounter);
  };

  return (
    <React.Fragment>
      {startTimer ? (
        <div className="w-screen h-auto bg-transparent  ">
          <Analysis
            correctAndWrongWords={correctAndWrongWords}
            constantTime={constantTime}
            correctIndices={correctIndices}
            timeDiffrences={timeDiffrences}
            backSpaceCounter={backSpaceCounter}
            wordsCorrectedCounterSend={wordsCorrectedCounterSend}
          ></Analysis>
        </div>
      ) : (
        <div className="w-screen h-screen bg-transparent  mt-40 ">
          <div className="w-full h-auto  text-8xl font-lexend  text-[#C3C3C3] font-bold text-center text-shadow-heading">
            Start Practicing!
          </div>
          {/* // seetings bar */}
          <div
            className={`w-screen flex  justify-center mt-20  ${customChildData ? "hidden" : ""}`}
          >
            <div
              className={`w-1/2 flex items-center justify-center flex-wrap gap-5 font-inter text-white relative  ${childData ? "opacity-0 hidden duration-300 " : ""} `}
            >
              <div
                onMouseLeave={() => {
                  gsap.to(".difficulty-level-stagger-animation", {
                    duration: 0.5,
                    x: 0,
                    y: 0,
                    opacity: 0,
                    stagger: 0.2,
                  });
                }}
                id="main-dificulty-level-div"
                className="absolute flex flex-col -left-32 gap-5"
              >
                <div
                  id="Beginner"
                  onClick={() => {
                    setDifficultyLevel(Easy);
                    setDifficultyLevelString("Easy");

                    gsap.to(".difficulty-level-stagger-animation", {
                      duration: 0.5,
                      x: 0,
                      y: 0,
                      opacity: 0,
                      stagger: 0.2,
                    });
                  }}
                  onMouseEnter={() => {
                    gsap.to(`#Beginner`, {
                      scale: 1.15,
                      duration: 0.2,

                      ease: "power1.inOut",
                    });
                  }}
                  onMouseLeave={() => {
                    gsap.to(`#Beginner`, {
                      scale: 1,
                      duration: 0.2,

                      ease: "power1.inOut",
                    });
                  }}
                  className="w-40 h-12  opacity-0 flex  justify-center items-center gap-3  rounded-xl gradient-border box-shadow cursor-pointer difficulty-level-stagger-animation"
                >
                  <div className=" text-lg text-bold text-shadow-heading">
                    Beginner
                  </div>
                  <img className="h-8 " src={Easy} alt="" />
                </div>
                <div
                  id="Average"
                  onClick={() => {
                    setDifficultyLevel(Medium);
                    setDifficultyLevelString("Medium");

                    gsap.to(".difficulty-level-stagger-animation", {
                      duration: 0.5,
                      x: 0,
                      y: 0,
                      opacity: 0,
                      stagger: 0.2,
                    });
                  }}
                  onMouseEnter={() => {
                    gsap.to(`#Average`, {
                      scale: 1.15,
                      duration: 0.2,

                      ease: "power1.inOut",
                    });
                  }}
                  onMouseLeave={() => {
                    gsap.to(`#Average`, {
                      scale: 1,
                      duration: 0.2,

                      ease: "power1.inOut",
                    });
                  }}
                  className="w-40 h-12 opacity-0 flex  justify-center items-center gap-3  rounded-xl gradient-border box-shadow cursor-pointer difficulty-level-stagger-animation"
                >
                  <div className=" text-lg text-bold text-shadow-heading">
                    Average
                  </div>
                  <img className="h-8 " src={Medium} alt="" />
                </div>
                <div
                  id="Difficult"
                  onClick={() => {
                    setDifficultyLevel(Hard);
                    setDifficultyLevelString("Hard");
                    gsap.to(".difficulty-level-stagger-animation", {
                      duration: 0.5,
                      x: 0,
                      y: 0,
                      opacity: 0,
                      stagger: 0.2,
                    });
                  }}
                  onMouseEnter={() => {
                    gsap.to(`#Difficult`, {
                      scale: 1.15,
                      duration: 0.2,

                      ease: "power1.inOut",
                    });
                  }}
                  onMouseLeave={() => {
                    gsap.to(`#Difficult`, {
                      scale: 1,
                      duration: 0.2,

                      ease: "power1.inOut",
                    });
                  }}
                  className="w-40 h-12 opacity-0 flex  justify-center items-center gap-3  rounded-xl gradient-border box-shadow cursor-pointer difficulty-level-stagger-animation"
                >
                  <div className=" text-lg text-bold text-shadow-heading">
                    Extreme
                  </div>
                  <img className="h-8 " src={Hard} alt="" />
                </div>
              </div>
              <div
                onMouseEnter={() => {
                  gsap.to(".difficulty-level-stagger-animation", {
                    duration: 0.5,
                    x: -15,
                    y: -15,
                    opacity: 1,
                    stagger: 0.2,
                  });
                }}
                onClick={() => {
                  gsap.to(".difficulty-level-stagger-animation", {
                    duration: 0.5,
                    x: -15,
                    y: -15,
                    opacity: 1,
                    stagger: 0.2,
                  });
                }}
                className="w-40 h-24 flex flex-col justify-center items-center gap-3 buttons-background rounded-xl box-shadow cursor-pointer"
              >
                <div className=" text-lg text-bold text-shadow-heading">
                  Difficulty Level
                </div>
                <div title="difficulty level">
                  <img className="h-8" src={difficultyLevel} alt="" />
                </div>
              </div>
              <div className="w-40  flex flex-col justify-center items-center gap-1 buttons-background rounded-xl box-shadow ">
                <div className=" text-lg text-bold text-shadow-heading">
                  Punctuation
                </div>
                <div
                  onClick={() => {
                    setPunctuation(!punctuation);
                  }}
                  className={`cursor-pointer text-4xl text-shadow-heading ${punctuation === false ? "text-gray-600  line-through decoration-[#68487a] " : ""}`}
                >
                  ! ?
                </div>
              </div>
              <div className="w-40  flex flex-col justify-center items-center gap-1 buttons-background rounded-xl box-shadow ">
                <div className=" text-lg text-bold text-shadow-heading">
                  Symbols
                </div>
                <div
                  onClick={() => setSymbols(!symbols)}
                  className={`cursor-pointer text-4xl text-shadow-heading ${symbols === false ? "text-gray-600  line-through decoration-[#68487a] " : ""}`}
                >
                  & *
                </div>
              </div>
              <div className="w-40  flex flex-col justify-center items-center gap-1 buttons-background rounded-xl box-shadow ">
                <div className=" text-lg text-bold text-shadow-heading">
                  Numbers
                </div>
                <div
                  onClick={() => setNumbers(!numbers)}
                  className={`cursor-pointer text-4xl text-shadow-heading ${numbers === false ? "text-gray-600  line-through decoration-[#68487a] " : ""}`}
                >
                  1 2
                </div>
              </div>
              <div
                onMouseEnter={() => {
                  gsap.to(".timer-stagger-animation", {
                    duration: 0.5,
                    x: 15,
                    y: -15,
                    opacity: 1,
                    stagger: 0.2,
                  });
                }}
                onClick={() => {
                  if (timer !== 0) setTimer(0);
                  gsap.to(".timer-stagger-animation", {
                    duration: 0.5,
                    x: 15,
                    y: -15,
                    opacity: 1,
                    stagger: 0.2,
                  });
                }}
                className="w-40 h-24 flex flex-col justify-center items-center  buttons-background rounded-xl box-shadow cursor-pointer"
              >
                <div className=" text-lg text-bold text-shadow-heading">
                  Timer
                </div>
                <div>
                  <img
                    className="h-16 "
                    src={timer === 0 ? offButton : onbutton}
                    alt=""
                  />
                </div>
              </div>
              {/* // Right side animation */}
              <div
                onMouseLeave={() => {
                  gsap.to(".timer-stagger-animation", {
                    duration: 0.5,
                    x: 0,
                    y: 0,
                    opacity: 0,
                    stagger: 0.2,
                  });
                }}
                id="main-timer-div"
                className="absolute flex flex-col -right-32 gap-5"
              >
                <div
                  id="fifteen"
                  onClick={() => {
                    setTimer(15);
                    gsap.to(".timer-stagger-animation", {
                      duration: 0.5,
                      x: 0,
                      y: 0,
                      opacity: 0,
                      stagger: 0.2,
                    });
                  }}
                  onMouseEnter={() => {
                    gsap.to(`#fifteen`, {
                      scale: 1.15,
                      duration: 0.2,

                      ease: "power1.inOut",
                    });
                  }}
                  onMouseLeave={() => {
                    gsap.to(`#fifteen`, {
                      scale: 1,
                      duration: 0.2,

                      ease: "power1.inOut",
                    });
                  }}
                  className="w-40 h-12  opacity-0 flex  justify-center items-center gap-3  rounded-xl gradient-border box-shadow cursor-pointer timer-stagger-animation"
                >
                  <div className=" text-lg text-bold text-shadow-heading">
                    15 secs
                  </div>
                </div>
                <div
                  id="thirty"
                  onClick={() => {
                    setTimer(30);
                    gsap.to(".timer-stagger-animation", {
                      duration: 0.5,
                      x: 0,
                      y: 0,
                      opacity: 0,
                      stagger: 0.2,
                    });
                  }}
                  onMouseEnter={() => {
                    gsap.to(`#thirty`, {
                      scale: 1.15,
                      duration: 0.2,

                      ease: "power1.inOut",
                    });
                  }}
                  onMouseLeave={() => {
                    gsap.to(`#thirty`, {
                      scale: 1,
                      duration: 0.2,

                      ease: "power1.inOut",
                    });
                  }}
                  className="w-40 h-12 opacity-0 flex  justify-center items-center gap-3  rounded-xl gradient-border box-shadow cursor-pointer timer-stagger-animation"
                >
                  <div className=" text-lg text-bold text-shadow-heading">
                    30 secs
                  </div>
                </div>
                <div
                  id="fourty-five"
                  onClick={() => {
                    setTimer(45);
                    gsap.to(".timer-stagger-animation", {
                      duration: 0.5,
                      x: 0,
                      y: 0,
                      opacity: 0,
                      stagger: 0.2,
                    });
                  }}
                  onMouseEnter={() => {
                    gsap.to(`#fourty-five`, {
                      scale: 1.15,
                      duration: 0.2,

                      ease: "power1.inOut",
                    });
                  }}
                  onMouseLeave={() => {
                    gsap.to(`#fourty-five`, {
                      scale: 1,
                      duration: 0.2,

                      ease: "power1.inOut",
                    });
                  }}
                  className="w-40 h-12 opacity-0 flex  justify-center items-center gap-3  rounded-xl gradient-border box-shadow cursor-pointer timer-stagger-animation"
                >
                  <div className=" text-lg text-bold text-shadow-heading">
                    45 secs
                  </div>
                </div>

                <div
                  id="sixty"
                  onClick={() => {
                    setTimer(60);
                    gsap.to(".timer-stagger-animation", {
                      duration: 0.5,
                      x: 0,
                      y: 0,
                      opacity: 0,
                      stagger: 0.2,
                    });
                  }}
                  onMouseEnter={() => {
                    gsap.to(`#sixty`, {
                      scale: 1.15,
                      duration: 0.2,

                      ease: "power1.inOut",
                    });
                  }}
                  onMouseLeave={() => {
                    gsap.to(`#sixty`, {
                      scale: 1,
                      duration: 0.2,

                      ease: "power1.inOut",
                    });
                  }}
                  className="w-40 h-12 opacity-0 flex  justify-center items-center gap-3  rounded-xl gradient-border box-shadow cursor-pointer timer-stagger-animation"
                >
                  <div className=" text-lg text-bold text-shadow-heading">
                    60 secs
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* // Typing Area */}
          <div className="w-screen flex  justify-center mt-20  ">
            <div className="w-[80%]   font-inter text-white    ">
              <Testing_Text
                difficultyLevel={difficultyLevel}
                timer={timer}
                setTimer={setTimer}
                punctuation={punctuation}
                symbols={symbols}
                numbers={numbers}
                onSendData={handleDataFromChild}
                onSendCustomSettings={handleDataFromChildCustom}
                onSendStartTimer={handleDataFromChildStartTimer}
                onSendDataForAnalysis={handleDataForAnalysis}
                difficultyLevelString={difficultyLevelString}
              ></Testing_Text>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Testing;
