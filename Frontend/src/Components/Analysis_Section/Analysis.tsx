import React, { useState } from "react";
import Speed from "../../assets/static_files/material-symbols_speed-outline.svg";
import Time from "../../assets/static_files/Group.svg";
import Accuracy from "../../assets/static_files/mdi_bullseye.svg";
import Consistency from "../../assets/static_files/tabler_scale.svg";
import Typing from "../../assets/static_files/Typing.svg";
import CorrectEntries from "../../assets/static_files/Right.svg";
import WrongEntries from "../../assets/static_files/Wrong.svg";
import SkippedEntries from "../../assets/static_files/Skipped Entries.svg";
import TimingMetrices from "../../assets/static_files/Timing.svg";
import CorrectionBehaviour from "../../assets/static_files/Correction Behaviour.svg";

import { gsap } from "gsap";
import Analysis_Graphs from "./Analysis-Graphs";
interface AnalysisPropsInterface {
  correctAndWrongWords: boolean[];
  constantTime: number | undefined;
  correctIndices: (number | boolean)[][];
  timeDiffrences: number[];
  backSpaceCounter: number;
  wordsCorrectedCounterSend: number[];
  WordIndexStateArray: number[];
  allWords: string[];
}

const Analysis: React.FC<AnalysisPropsInterface> = (props) => {
  const [speed, setSpeed] = React.useState<boolean>(false);
  const [accuracy, setAccuracy] = React.useState<boolean>(false);
  const [accuracyCalculated, setAccuracyCalculated] = React.useState<number[]>(
    [],
  );
  const [typing, setTyping] = React.useState<boolean>(false);
  const [typingCalculated, setTypingCalculated] = React.useState<number[]>([]);
  const [correctEntries, setCorrectEntries] = React.useState<boolean>(false);
  const [correctEntriesCalculted, setCorrectEntriesCalculted] = React.useState<
    number[]
  >([]);
  const [wrongEntries, setWrongEntries] = React.useState<boolean>(false);
  const [wrongEntriesCalculted, setWrongEntriesCalculted] = React.useState<
    number[]
  >([]);
  const [skippedEntries, setSkippedEntries] = React.useState<boolean>(false);
  const [skippedEntriesCalculted, setSkippedEntriesCalculted] = React.useState<
    number[]
  >([]);
  const [timingMetrices, setTimingMetrices] = React.useState<boolean>(false);
  const [graphSelection, setGraphSelection] = useState("speed");
  const [correctionBehaviour, setCorrectionBehaviour] =
    React.useState<boolean>(false);
  const [correctionBehaviourCalculated, setCorrectionBehaviouCalculated] =
    React.useState<number[]>([]);
  const [dynamicPropertiesAddition, setDynamicPropertiesAddition] =
    React.useState<
      {
        name: string;
        svg: string;
        details: { name: string; state: boolean; symbol: string }[];
      }[]
    >([]);

  const Speed_Calculation = (): number => {
    if (props.constantTime) {
      if (!speed) {
        return (props.correctAndWrongWords.length / props.constantTime) * 60;
      } else {
        let totalChars = 0,
          counter = 0;
        for (let i = 0; i < props.correctIndices.length; i++) {
          for (let j = 0; j < props.correctIndices[i].length; j++) {
            if (
              props.correctIndices[i][j] !== true &&
              props.correctIndices[i][j] !== false
            )
              counter++;
          }
          totalChars += props.correctIndices[i].length;
        }

        return ((totalChars - counter) / props.constantTime) * 60;
      }
    }

    return 0;
  };
  const Accuracy_Calculation = (): number => {
    if (!accuracy) {
      let counter = 0;
      for (let i = 0; i < props.correctAndWrongWords.length; i++) {
        if (props.correctAndWrongWords[i] === false) counter++;
      }
      // setAccuracyCalculated((prevData) => [
      //   ...prevData,
      //   parseFloat(
      //     ((counter / props.correctAndWrongWords.length) * 100).toFixed(2),
      //   ),
      // ]);
      return parseFloat(
        ((counter / props.correctAndWrongWords.length) * 100).toFixed(2),
      );
    } else {
      let counter = 0,
        totalCharacters = 0;
      for (let i = 0; i < props.correctIndices.length; i++) {
        for (let j = 0; j < props.correctIndices[i].length; j++) {
          if (props.correctIndices[i][j] === true) counter++;
        }
        totalCharacters += props.correctIndices[i].length;
      }
      // setAccuracyCalculated((prevData) => [
      //   ...prevData,
      //   parseFloat(((counter / totalCharacters) * 100).toFixed(2)),
      // ]);
      return parseFloat(((counter / totalCharacters) * 100).toFixed(2));
    }
    return 0;
  };

  const Typing_Calculation = (): number => {
    if (!typing) return props.correctAndWrongWords.length;
    else {
      let totalCharacters = 0;
      for (let i = 0; i < props.correctIndices.length; i++) {
        totalCharacters += props.correctIndices[i].length;
      }
      return totalCharacters;
    }
  };

  React.useEffect(() => {
    if (!accuracy) {
      let wordCounter = 0,
        charCounter = 0;
      let totalWords = props.correctAndWrongWords.length;
      let totalCharacters = 0;

      // Calculate word accuracy (false means incorrect)
      for (let i = 0; i < totalWords; i++) {
        if (props.correctAndWrongWords[i] === false) wordCounter++;
      }
      let wordAccuracy = parseFloat(
        ((wordCounter / totalWords) * 100).toFixed(2),
      );

      // Calculate character accuracy
      for (let i = 0; i < props.correctIndices.length; i++) {
        for (let j = 0; j < props.correctIndices[i].length; j++) {
          if (props.correctIndices[i][j] === true) charCounter++;
        }
        totalCharacters += props.correctIndices[i].length;
      }
      let charAccuracy = parseFloat(
        ((charCounter / totalCharacters) * 100).toFixed(2),
      );

      // Update accuracyCalculated once with both values
      setAccuracyCalculated((prevData) => [
        ...prevData,
        wordAccuracy, // Word accuracy percentage
        charAccuracy, // Character accuracy percentage
      ]);
    }
    let totalCharacters = 0;
    for (let i = 0; i < props.correctIndices.length; i++) {
      totalCharacters += props.correctIndices[i].length;
    }

    setTypingCalculated((previosValue) => [
      ...previosValue,
      props.correctAndWrongWords.length,
      totalCharacters,
    ]);

    let counter = 0,
      charsCounter = 0;
    for (let i = 0; i < props.correctAndWrongWords.length; i++) {
      if (props.correctAndWrongWords[i] === false) counter++;
    }
    for (let i = 0; i < props.correctIndices.length; i++) {
      for (let j = 0; j < props.correctIndices[i].length; j++) {
        if (props.correctIndices[i][j] === true) charsCounter++;
      }
    }

    setCorrectEntriesCalculted((previousValue) => [
      ...previousValue,
      counter,
      charsCounter,
      counter,
    ]);

    counter = charsCounter = 0;

    let skippedCounter = 0;
    for (let i = 0; i < props.correctAndWrongWords.length; i++) {
      if (props.correctAndWrongWords[i] === true) counter++;
    }
    for (let i = 0; i < props.correctIndices.length; i++) {
      if (props.correctIndices[i].includes(2)) skippedCounter++;
      for (let j = 0; j < props.correctIndices[i].length; j++) {
        if (props.correctIndices[i][j] === false) charsCounter++;
        // if (props.correctIndices[i][j] === 2) skippedCounter++;
      }
    }
    setWrongEntriesCalculted((previousValue) => [
      ...previousValue,
      counter,
      charsCounter,
      skippedCounter,
    ]);

    let skippedChars = 0,
      skippedWords = 0;
    // Add 'Correct Entries' if it doesn't already exist
    for (let i = 0; i < props.correctIndices.length; i++) {
      if (props.correctIndices[i].includes(2)) skippedWords++;
      for (let j = 0; j < props.correctIndices[i].length; j++) {
        if (props.correctIndices[i][j] === 2) skippedChars++;
      }
    }

    setSkippedEntriesCalculted((prevValues) => [
      ...prevValues,
      skippedWords,
      skippedChars,
    ]);

    setCorrectionBehaviouCalculated((previous) => [
      ...previous,
      props.backSpaceCounter,
      (props.backSpaceCounter / props.constantTime) * 60,
      props.wordsCorrectedCounterSend.length -
        props.correctAndWrongWords.filter((value) => value === true).length,
    ]);
  }, []); // Add dependencies if they change dynamically
  React.useEffect(() => {
    setDynamicPropertiesAddition((prevState) => {
      // Check if 'Correct Entries' should be added or removed
      const exists = prevState.some(
        (instance) => instance.name === "Correct Entries",
      );

      const existsWE = prevState.some(
        (instance) => instance.name === "Wrong Entries",
      );
      const existsSE = prevState.some(
        (instance) => instance.name === "Skipped Entries",
      );
      const existsTM = prevState.some(
        (instance) => instance.name === "Timing Metrices",
      );
      const existsCB = prevState.some(
        (instance) => instance.name === "Correction Behavior",
      );

      if (correctEntries && !exists) {
        let counter = 0,
          charsCounter = 0;
        for (let i = 0; i < props.correctAndWrongWords.length; i++) {
          if (props.correctAndWrongWords[i] === false) counter++;
        }
        for (let i = 0; i < props.correctIndices.length; i++) {
          for (let j = 0; j < props.correctIndices[i].length; j++) {
            if (props.correctIndices[i][j] === true) charsCounter++;
          }
        }

        // Add 'Correct Entries' if it doesn't already exist
        return [
          ...prevState,
          {
            name: "Correct Entries",
            svg: CorrectEntries,
            details: [
              { name: `${counter}`, state: true, symbol: "words" },
              { name: `${charsCounter}`, state: false, symbol: "chars" },
              { name: `${counter}`, state: false, symbol: "spaces" },
            ],
          },
        ];
      } else if (!correctEntries && exists) {
        // Remove 'Correct Entries' if it exists
        return prevState.filter(
          (instance) => instance.name !== "Correct Entries",
        );
      }
      // wrong Entries
      //
      if (wrongEntries && !existsWE) {
        // Add 'Correct Entries' if it doesn't already exist
        let counter = 0,
          charsCounter = 0,
          skippedCounter = 0;
        for (let i = 0; i < props.correctAndWrongWords.length; i++) {
          if (props.correctAndWrongWords[i] === true) counter++;
        }
        for (let i = 0; i < props.correctIndices.length; i++) {
          if (props.correctIndices[i].includes(2)) skippedCounter++;
          for (let j = 0; j < props.correctIndices[i].length; j++) {
            if (props.correctIndices[i][j] === false) charsCounter++;
            // if (props.correctIndices[i][j] === 2) skippedCounter++;
          }
        }
        return [
          ...prevState,
          {
            name: "Wrong Entries",
            svg: WrongEntries,
            details: [
              { name: `${counter}`, state: true, symbol: "words" },
              { name: `${charsCounter}`, state: false, symbol: "chars" },
              { name: `${skippedCounter}`, state: false, symbol: "spaces" },
            ],
          },
        ];
      } else if (!wrongEntries && existsWE) {
        // Remove 'Correct Entries' if it exists
        return prevState.filter(
          (instance) => instance.name !== "Wrong Entries",
        );
      }

      if (skippedEntries && !existsSE) {
        let skippedChars = 0,
          skippedWords = 0;
        // Add 'Correct Entries' if it doesn't already exist
        for (let i = 0; i < props.correctIndices.length; i++) {
          if (props.correctIndices[i].includes(2)) skippedWords++;
          for (let j = 0; j < props.correctIndices[i].length; j++) {
            if (props.correctIndices[i][j] === 2) skippedChars++;
          }
        }
        return [
          ...prevState,
          {
            name: "Skipped Entries",
            svg: SkippedEntries,
            details: [
              { name: `${skippedWords}`, state: true, symbol: "words" },
              { name: `${skippedChars}`, state: false, symbol: "chars" },
            ],
          },
        ];
      } else if (!skippedEntries && existsSE) {
        // Remove 'Correct Entries' if it exists
        return prevState.filter(
          (instance) => instance.name !== "Skipped Entries",
        );
      }

      if (timingMetrices && !existsTM) {
        // let skippedChars = 0,
        //   skippedWords = 0;
        // // Add 'Correct Entries' if it doesn't already exist
        // for (let i = 0; i < props.correctIndices.length; i++) {
        //   if (props.correctIndices[i].includes(2)) skippedWords++;
        //   for (let j = 0; j < props.correctIndices[i].length; j++) {
        //     if (props.correctIndices[i][j] === 2) skippedChars++;
        //   }
        // }
        const averageTimePerWord = props.timeDiffrences.reduce(
          (accumulator, value) => {
            return accumulator + value;
          },
          0,
        );

        return [
          ...prevState,
          {
            name: "Timing Metrices",
            svg: TimingMetrices,
            details: [
              {
                name: `${parseFloat((averageTimePerWord / props.timeDiffrences.length).toFixed(1))}`,
                state: true,
                symbol: "sec per word",
              },
              {
                name: `${Math.max(...props.timeDiffrences)}`,
                state: false,
                symbol: "highest sec",
              },
              {
                name: `${Math.min(...props.timeDiffrences)}`,
                state: false,
                symbol: "lowest sec",
              },
            ],
          },
        ];
      } else if (!timingMetrices && existsTM) {
        // Remove 'Correct Entries' if it exists
        return prevState.filter(
          (instance) => instance.name !== "Timing Metrices",
        );
      }

      if (correctionBehaviour && !existsCB) {
        // let counter = 0,
        //   charsCounter = 0;
        // for (let i = 0; i < props.correctAndWrongWords.length; i++) {
        //   if (props.correctAndWrongWords[i] === false) counter++;
        // }
        // for (let i = 0; i < props.correctIndices.length; i++) {
        //   for (let j = 0; j < props.correctIndices[i].length; j++) {
        //     if (props.correctIndices[i][j] === true) charsCounter++;
        //   }
        // }

        // Add 'Correct Entries' if it doesn't already exist

        return [
          ...prevState,
          {
            name: "Correction Behavior",
            svg: CorrectionBehaviour,
            details: [
              {
                name: `${props.backSpaceCounter}`,
                state: true,
                symbol: "back-spaces",
              },
              {
                name: ` ${(props.backSpaceCounter / props.constantTime) * 60}`,
                state: false,
                symbol: "corrections per min",
              },
              {
                name: `${
                  props.wordsCorrectedCounterSend.length -
                  props.correctAndWrongWords.filter((value) => value === true)
                    .length
                }`,
                state: false,
                symbol: "words corrected",
              },
            ],
          },
        ];
      } else if (!correctionBehaviour && existsCB) {
        // Remove 'Correct Entries' if it exists
        return prevState.filter(
          (instance) => instance.name !== "Correction Behavior",
        );
      }

      return prevState; // Return unchanged if no action is needed
    });
  }, [
    correctEntries,
    wrongEntries,
    skippedEntries,
    timingMetrices,
    correctionBehaviour,
  ]);

  return (
    <React.Fragment>
      <div className="w-full h-auto  text-8xl font-lexend  text-[#C3C3C3] font-bold text-center text-shadow-heading">
        Typing Test Analysis
      </div>{" "}
      <div className="w-full   h-auto flex justify-center mt-16 font-lexend ">
        <div className="w-[80%] h-auto  flex items-center justify-center flex-wrap  gap-x-16 gap-y-4 ">
          <div
            id="correct-entries"
            onMouseEnter={() => {
              gsap.to("#correct-entries", {
                scale: 1.2,
                duration: 0.7, // Adjusted duration for smoother transition
                fontWeight: "bold", // Makes the text bold
                backgroundColor: "#ECA5F8", // Changes the background color to red (or any color of your choice)
              });
            }}
            onMouseLeave={() => {
              {
                !correctEntries
                  ? gsap.to("#correct-entries", {
                      scale: 1,
                      duration: 0.7, // Adjusted duration for smoother transition
                      fontWeight: "normal", // Makes the text bold
                      backgroundColor: "transparent", // Changes the background color to red (or any color of your choice)
                    })
                  : "";
              }
            }}
            onClick={() => {
              setCorrectEntries(!correctEntries);
              {
                correctEntries
                  ? gsap.to("#correct-entries", {
                      scale: 1,
                      duration: 0.7, // Adjusted duration for smoother transition
                      fontWeight: "normal", // Makes the text bold
                      backgroundColor: "transparent", // Changes the background color to red (or any color of your choice)
                    })
                  : gsap.to("#correct-entries", {
                      scale: 1.2,
                      duration: 0.7, // Adjusted duration for smoother transition
                      fontWeight: "bold", // Makes the text bold
                      backgroundColor: "#ECA5F8", // Changes the background color to red (or any color of your choice)
                    });
              }
            }}
            className="text-white font-lexend border-2 cursor-pointer w-48 h-16 flex items-center justify-center  text-2xl  rounded-lg border-[#ECA5F8]  overflow-hidden "
          >
            Correct Entries
          </div>

          <div
            id="wrong-entries"
            onMouseEnter={() => {
              gsap.to("#wrong-entries", {
                scale: 1.2,
                duration: 0.7, // Adjusted duration for smoother transition
                fontWeight: "bold", // Makes the text bold
                backgroundColor: "#ECA5F8", // Changes the background color to red (or any color of your choice)
              });
            }}
            onMouseLeave={() => {
              {
                !wrongEntries
                  ? gsap.to("#wrong-entries", {
                      scale: 1,
                      duration: 0.7, // Adjusted duration for smoother transition
                      fontWeight: "normal", // Makes the text bold
                      backgroundColor: "transparent", // Changes the background color to red (or any color of your choice)
                    })
                  : "";
              }
            }}
            onClick={() => {
              setWrongEntries(!wrongEntries);
              {
                wrongEntries
                  ? gsap.to("#wrong-entries", {
                      scale: 1,
                      duration: 0.7, // Adjusted duration for smoother transition
                      fontWeight: "normal", // Makes the text bold
                      backgroundColor: "transparent", // Changes the background color to red (or any color of your choice)
                    })
                  : gsap.to("#wrong-entries", {
                      scale: 1.2,
                      duration: 0.7, // Adjusted duration for smoother transition
                      fontWeight: "bold", // Makes the text bold
                      backgroundColor: "#ECA5F8", // Changes the background color to red (or any color of your choice)
                    });
              }
            }}
            className="text-white font-lexend border-2 cursor-pointer w-48 h-16 flex items-center justify-center  text-2xl  rounded-lg border-[#ECA5F8]  overflow-hidden "
          >
            Wrong Entries
          </div>

          <div
            id="skipped-entries"
            onMouseEnter={() => {
              gsap.to("#skipped-entries", {
                scale: 1.2,
                duration: 0.7, // Adjusted duration for smoother transition
                fontWeight: "bold", // Makes the text bold
                backgroundColor: "#ECA5F8", // Changes the background color to red (or any color of your choice)
              });
            }}
            onMouseLeave={() => {
              {
                !skippedEntries
                  ? gsap.to("#skipped-entries", {
                      scale: 1,
                      duration: 0.7, // Adjusted duration for smoother transition
                      fontWeight: "normal", // Makes the text bold
                      backgroundColor: "transparent", // Changes the background color to red (or any color of your choice)
                    })
                  : "";
              }
            }}
            onClick={() => {
              setSkippedEntries(!skippedEntries);
              {
                skippedEntries
                  ? gsap.to("#skipped-entries", {
                      scale: 1,
                      duration: 0.7, // Adjusted duration for smoother transition
                      fontWeight: "normal", // Makes the text bold
                      backgroundColor: "transparent", // Changes the background color to red (or any color of your choice)
                    })
                  : gsap.to("#skipped-entries", {
                      scale: 1.2,
                      duration: 0.7, // Adjusted duration for smoother transition
                      fontWeight: "bold", // Makes the text bold
                      backgroundColor: "#ECA5F8", // Changes the background color to red (or any color of your choice)
                    });
              }
            }}
            className="text-white font-lexend border-2 cursor-pointer w-52 h-16 flex items-center justify-center  text-2xl  rounded-lg border-[#ECA5F8]  overflow-hidden "
          >
            Skipped Entries
          </div>

          <div
            id="timing-metrices"
            onMouseEnter={() => {
              gsap.to("#timing-metrices", {
                scale: 1.2,
                duration: 0.7, // Adjusted duration for smoother transition
                fontWeight: "bold", // Makes the text bold
                backgroundColor: "#ECA5F8", // Changes the background color to red (or any color of your choice)
              });
            }}
            onMouseLeave={() => {
              {
                !timingMetrices
                  ? gsap.to("#timing-metrices", {
                      scale: 1,
                      duration: 0.7, // Adjusted duration for smoother transition
                      fontWeight: "normal", // Makes the text bold
                      backgroundColor: "transparent", // Changes the background color to red (or any color of your choice)
                    })
                  : "";
              }
            }}
            onClick={() => {
              setTimingMetrices(!timingMetrices);
              {
                timingMetrices
                  ? gsap.to("#timing-metrices", {
                      scale: 1,
                      duration: 0.7, // Adjusted duration for smoother transition
                      fontWeight: "normal", // Makes the text bold
                      backgroundColor: "transparent", // Changes the background color to red (or any color of your choice)
                    })
                  : gsap.to("#timing-metrices", {
                      scale: 1.2,
                      duration: 0.7, // Adjusted duration for smoother transition
                      fontWeight: "bold", // Makes the text bold
                      backgroundColor: "#ECA5F8", // Changes the background color to red (or any color of your choice)
                    });
              }
            }}
            className="text-white font-lexend border-2 cursor-pointer w-52 h-16 flex items-center justify-center  text-2xl  rounded-lg border-[#ECA5F8]  overflow-hidden "
          >
            Timing Metrices
          </div>

          <div
            id="correction-behaviour"
            onMouseEnter={() => {
              gsap.to("#correction-behaviour", {
                scale: 1.2,
                duration: 0.7, // Adjusted duration for smoother transition
                fontWeight: "bold", // Makes the text bold
                backgroundColor: "#ECA5F8", // Changes the background color to red (or any color of your choice)
              });
            }}
            onMouseLeave={() => {
              {
                !correctionBehaviour
                  ? gsap.to("#correction-behaviour", {
                      scale: 1,
                      duration: 0.7, // Adjusted duration for smoother transition
                      fontWeight: "normal", // Makes the text bold
                      backgroundColor: "transparent", // Changes the background color to red (or any color of your choice)
                    })
                  : "";
              }
            }}
            onClick={() => {
              setCorrectionBehaviour(!correctionBehaviour);
              {
                correctionBehaviour
                  ? gsap.to("#correction-behaviour", {
                      scale: 1,
                      duration: 0.7, // Adjusted duration for smoother transition
                      fontWeight: "normal", // Makes the text bold
                      backgroundColor: "transparent", // Changes the background color to red (or any color of your choice)
                    })
                  : gsap.to("#correction-behaviour", {
                      scale: 1.2,
                      duration: 0.7, // Adjusted duration for smoother transition
                      fontWeight: "bold", // Makes the text bold
                      backgroundColor: "#ECA5F8", // Changes the background color to red (or any color of your choice)
                    });
              }
            }}
            className="text-white font-lexend border-2 cursor-pointer w-64 h-16 flex items-center justify-center  text-2xl  rounded-lg border-[#ECA5F8]  overflow-hidden "
          >
            Correction Behavior
          </div>
        </div>
      </div>{" "}
      <div className="w-full   h-auto flex justify-center mt-16 font-lexend ">
        <div className="w-[80%] h-auto  flex items-center justify-center flex-wrap  gap-x-16 gap-y-8 ">
          <div
            onMouseEnter={() => {
              gsap.to("#speed", {
                opacity: 1,
                width: 56,
                height: 40,
                backgroundColor: "#ECA5F8",
                duration: 0.2, // Adjusted duration for smoother transition
              });
            }}
            onMouseLeave={() => {
              gsap.to("#speed", {
                opacity: 0,
                width: 0,
                height: 0,

                duration: 0.5, // Adjusted duration for smoother transition
              });
            }}
            onClick={() => {
              setGraphSelection("speed");
            }}
            className={`relative cursor-pointer ${graphSelection === "speed" ? "border-2 rounded-lg border-[#ECA5F8] p-3" : ""}  `}
          >
            <span className="flex items-center justify-center text-[#ECA5F8] text-2xl gap-2">
              Speed <img src={Speed} alt="" />
            </span>
            <div className="flex items-center justify-center text-white text-4xl gap-2 font-bold">
              {Speed_Calculation()}{" "}
              <span className="font-light text-xl ">
                {speed ? "cpm" : "wpm"}
              </span>
            </div>

            <div
              id="speed"
              onMouseEnter={() => {
                gsap.to("#speed", {
                  scale: 1.2,
                  duration: 0.7, // Adjusted duration for smoother transition
                  fontWeight: "bold", // Makes the text bold
                  backgroundColor: "#ECA5F8", // Changes the background color to red (or any color of your choice)
                });
              }}
              onMouseLeave={() => {
                gsap.to("#speed", {
                  scale: 1,
                  duration: 0.7, // Adjusted duration for smoother transition
                  fontWeight: "normal", // Makes the text bold
                  backgroundColor: "#ECA5F8", // Changes the background color to red (or any color of your choice)
                });
              }}
              onClick={() => {
                setSpeed(!speed);
                gsap.to("#speed", {
                  opacity: 0,
                  width: 0,
                  height: 0,

                  duration: 0.5, // Adjusted duration for smoother transition
                });
              }}
              className="     cursor-pointer   absolute flex items-center justify-center text-white text-xl border-2 rounded-lg border-[#ECA5F8] w-0 h-0 overflow-hidden opacity-0 left-[50%] transform translate-x-[-50%]"
            >
              {!speed ? "cpm" : "wpm"}
            </div>
          </div>
          <div
            onMouseEnter={() => {
              gsap.to("#accuracy", {
                opacity: 1,
                width: 120,
                height: 40,
                backgroundColor: "#ECA5F8",
                duration: 0.2, // Adjusted duration for smoother transition
              });
            }}
            onMouseLeave={() => {
              gsap.to("#accuracy", {
                opacity: 0,
                width: 0,
                height: 0,

                duration: 0.5, // Adjusted duration for smoother transition
              });
            }}
            onClick={() => {
              setGraphSelection("accuracy");
            }}
            className={`relative cursor-pointer ${graphSelection === "accuracy" ? "border-2 rounded-lg border-[#ECA5F8] p-3" : ""}  `}
          >
            <span className="flex items-center justify-center text-[#ECA5F8] text-2xl gap-2">
              Accuracy <img src={Accuracy} alt="" />
            </span>
            <div className="flex items-center justify-center text-white text-4xl gap-2 font-bold">
              {Accuracy_Calculation()}
              <span className="font-light text-xl ">%</span>
            </div>

            <div
              id="accuracy"
              onMouseEnter={() => {
                gsap.to("#accuracy", {
                  scale: 1.2,
                  duration: 0.7, // Adjusted duration for smoother transition
                  fontWeight: "bold", // Makes the text bold
                  backgroundColor: "#ECA5F8", // Changes the background color to red (or any color of your choice)
                });
              }}
              onMouseLeave={() => {
                gsap.to("#accuracy", {
                  scale: 1,
                  duration: 0.7, // Adjusted duration for smoother transition
                  fontWeight: "normal", // Makes the text bold
                  backgroundColor: "#ECA5F8", // Changes the background color to red (or any color of your choice)
                });
              }}
              onClick={() => {
                setAccuracy(!accuracy);
                gsap.to("#accuracy", {
                  opacity: 0,
                  width: 0,
                  height: 0,

                  duration: 0.5, // Adjusted duration for smoother transition
                });
              }}
              className="    cursor-pointer   absolute flex items-center justify-center text-white text-xl border-2 rounded-lg border-[#ECA5F8] w-0 h-0 overflow-hidden opacity-0 left-[50%] transform translate-x-[-50%]"
            >
              % of {accuracy ? "words" : "chars"}
            </div>
          </div>
          <div>
            <span className="flex items-center justify-center text-[#ECA5F8] text-2xl gap-2">
              Time <img src={Time} alt="" />
            </span>
            <div className="flex items-center justify-center text-white text-4xl gap-2 font-bold">
              34 <span className="font-light text-xl ">s</span>
            </div>
          </div>
          <div
            onMouseEnter={() => {
              gsap.to("#typing", {
                opacity: 1,
                width: 120,
                height: 40,
                backgroundColor: "#ECA5F8",
                duration: 0.2, // Adjusted duration for smoother transition
              });
            }}
            onMouseLeave={() => {
              gsap.to("#typing", {
                opacity: 0,
                width: 0,
                height: 0,

                duration: 0.5, // Adjusted duration for smoother transition
              });
            }}
            onClick={() => {
              setGraphSelection("typing");
            }}
            className={`relative cursor-pointer ${graphSelection === "typing" ? "border-2 rounded-lg border-[#ECA5F8] p-3" : ""}  `}
          >
            <span className="flex items-center justify-center text-[#ECA5F8] text-2xl gap-2">
              Typing <img src={Typing} alt="" />
            </span>
            <div className="flex items-center justify-center text-white text-4xl gap-2 font-bold">
              {Typing_Calculation()}{" "}
              <span className="font-light text-xl ">
                {!typing ? "words" : "characters"}
              </span>
            </div>
            <div
              id="typing"
              onMouseEnter={() => {
                gsap.to("#typing", {
                  scale: 1.2,
                  duration: 0.7, // Adjusted duration for smoother transition
                  fontWeight: "bold", // Makes the text bold
                  backgroundColor: "#ECA5F8", // Changes the background color to red (or any color of your choice)
                });
              }}
              onMouseLeave={() => {
                gsap.to("#typing", {
                  scale: 1,
                  duration: 0.7, // Adjusted duration for smoother transition
                  fontWeight: "normal", // Makes the text bold
                  backgroundColor: "transparent", // Changes the background color to red (or any color of your choice)
                });
              }}
              onClick={() => {
                setTyping(!typing);
                gsap.to("#typing", {
                  opacity: 0,
                  width: 0,
                  height: 0,

                  duration: 0.5, // Adjusted duration for smoother transition
                });
              }}
              className="    cursor-pointer   absolute flex items-center justify-center text-white text-xl border-2 rounded-lg border-[#ECA5F8] w-0 h-0 overflow-hidden opacity-0 left-[50%] transform translate-x-[-50%]"
            >
              {typing ? "words" : "characters"}
            </div>
          </div>

          {dynamicPropertiesAddition.map((instances, index) => {
            return (
              <div
                key={index}
                onMouseEnter={() => {
                  gsap.to(`.instance-${index}`, {
                    opacity: 1,
                    width: 140,
                    height: 40,
                    stagger: 0.2,
                    backgroundColor: "#ECA5F8",
                    duration: 0.2, // Adjusted duration for smoother transition
                  });
                }}
                onMouseLeave={() => {
                  gsap.to(`.instance-${index}`, {
                    opacity: 0,
                    width: 0,
                    height: 0,
                    stagger: 0.2,
                    backgroundColor: "#ECA5F8",
                    duration: 0.5, // Adjusted duration for smoother transition
                  });
                }}
                onClick={() => {
                  setGraphSelection(`${dynamicPropertiesAddition[index].name}`);
                }}
                className={`relative cursor-pointer ${graphSelection === `${dynamicPropertiesAddition[index].name}` ? "border-2 rounded-lg border-[#ECA5F8] p-3" : ""}  `}
              >
                <span className="flex items-center justify-center text-[#ECA5F8] text-2xl gap-2">
                  {instances.name} <img src={instances.svg} alt="" />
                </span>

                {instances.details.map((detailsInstance, detailsIndex) => {
                  return (
                    <div
                      key={detailsIndex} // Added key to prevent warnings in React
                      className="flex items-center justify-center text-white text-4xl gap-2 font-bold"
                    >
                      {detailsInstance.state ? detailsInstance.name : ""}
                      <span className="font-light text-xl">
                        {detailsInstance.state ? detailsInstance.symbol : ""}
                      </span>
                    </div>
                  );
                })}

                {instances.details
                  .filter((detailOfInstance) => !detailOfInstance.state) // Filter out details with state true
                  .map((detailOfInstance, absoluteIndex) => {
                    return (
                      <div
                        key={absoluteIndex} // Added key to prevent warnings in React
                        onMouseEnter={() => {
                          gsap.to(`.absolute-${absoluteIndex}`, {
                            scale: 1.2,
                            duration: 0.7,
                            fontWeight: "bold",
                            backgroundColor: "#ECA5F8",
                          });
                        }}
                        onMouseLeave={() => {
                          gsap.to(`.absolute-${absoluteIndex}`, {
                            scale: 1,
                            duration: 0.7,
                            fontWeight: "normal",
                            backgroundColor: "#ECA5F8",
                          });
                        }}
                        onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                          gsap.to(`.instance-${index}`, {
                            opacity: 0,
                            width: 0,
                            height: 0,
                            stagger: 0.2,
                            duration: 0.5,
                          });
                          setDynamicPropertiesAddition((prevValues) =>
                            prevValues.map((instance) =>
                              instance.name === instances.name
                                ? {
                                    ...instance,
                                    details: instance.details.map(
                                      (detail) =>
                                        detail.symbol === event.target.innerHTML
                                          ? { ...detail, state: true } // set state to true if symbol matches
                                          : { ...detail, state: false }, // set state to false if symbol does not match
                                    ),
                                  }
                                : instance,
                            ),
                          );
                        }}
                        style={{
                          top: `${88 + absoluteIndex * 43}px`, // Adjusted calculation for top position
                        }}
                        className={`absolute-${absoluteIndex} text-center instance-${index} cursor-pointer absolute flex items-center justify-center text-white ${!correctionBehaviour ? "text-xl" : "text-md"}  border-2 rounded-lg border-[#ECA5F8] w-0 h-0 overflow-hidden opacity-0 left-[50%] transform translate-x-[-50%]`}
                      >
                        {detailOfInstance.symbol}
                      </div>
                    );
                  })}
              </div>
            );
          })}
        </div>
      </div>{" "}
      <div className="w-full mt-32">
        <Analysis_Graphs
          accuracyCalculated={accuracyCalculated}
          typingCalculated={typingCalculated}
          correctEntriesCalculted={correctEntriesCalculted}
          wrongEntriesCalculted={wrongEntriesCalculted}
          skippedEntriesCalculted={skippedEntriesCalculted}
          timediffrence={props.timeDiffrences}
          correctionBehaviourCalculated={correctionBehaviourCalculated}
          WordIndexStateArray={props.WordIndexStateArray}
          allWords={props.allWords}
        ></Analysis_Graphs>
      </div>
    </React.Fragment>
  );
};
export default Analysis;
