import React from "react";
import Speed from "../../assets/static_files/material-symbols_speed-outline.svg";
import Time from "../../assets/static_files/Group.svg";
import Accuracy from "../../assets/static_files/mdi_bullseye.svg";
import Consistency from "../../assets/static_files/tabler_scale.svg";
import { gsap } from "gsap";

interface AnalysisPropsInterface {
  correctAndWrongWords: boolean[];
  constantTime: number | undefined;
  correctIndices: (number | boolean)[][];
}

const Analysis: React.FC<AnalysisPropsInterface> = (props) => {
  const [speed, setSpeed] = React.useState<boolean>(false);
  const [accuracy, setAccuracy] = React.useState<boolean>(false);
  const [typing, setTyping] = React.useState<boolean>(false);
  const [correctEntries, setCorrectEntries] = React.useState<boolean>(false);
  const [wrongEntries, setWrongEntries] = React.useState<boolean>(false);
  const [skippedEntries, setSkippedEntries] = React.useState<boolean>(false);
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
    setDynamicPropertiesAddition((prevState) => {
      let counter = 0,
        charsCounter = 0;
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

      if (correctEntries && !exists) {
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
            svg: Speed,
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
        return [
          ...prevState,
          {
            name: "Wrong Entries",
            svg: Speed,
            details: [
              { name: "ww", state: true, symbol: "words" },
              { name: "cc", state: false, symbol: "chars" },
              { name: "ss", state: false, symbol: "spaces" },
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
        // Add 'Correct Entries' if it doesn't already exist
        return [
          ...prevState,
          {
            name: "Skipped Entries",
            svg: Speed,
            details: [
              { name: "www", state: true, symbol: "words" },
              { name: "ccc", state: false, symbol: "chars" },
            ],
          },
        ];
      } else if (!skippedEntries && existsSE) {
        // Remove 'Correct Entries' if it exists
        return prevState.filter(
          (instance) => instance.name !== "Skipped Entries",
        );
      }

      return prevState; // Return unchanged if no action is needed
    });
  }, [correctEntries, wrongEntries, skippedEntries]);

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
        </div>
      </div>{" "}
      <div className="w-full   h-auto flex justify-center mt-16 font-lexend">
        <div className="w-[80%] h-auto  flex items-center justify-center flex-wrap  gap-x-16 gap-y-4">
          <div
            onMouseEnter={() => {
              gsap.to("#speed", {
                opacity: 1,
                width: 56,
                height: 40,

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
            className="relative cursor-default"
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
                  backgroundColor: "transparent", // Changes the background color to red (or any color of your choice)
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
            className="relative cursor-default"
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
                  backgroundColor: "transparent", // Changes the background color to red (or any color of your choice)
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
            className="relative cursor-default"
          >
            <span className="flex items-center justify-center text-[#ECA5F8] text-2xl gap-2">
              Typing <img src={Consistency} alt="" />
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
                onMouseEnter={() => {
                  gsap.to(`.instance-${index}`, {
                    opacity: 1,
                    width: 120,
                    height: 40,
                    stagger: 0.2,
                    duration: 0.2, // Adjusted duration for smoother transition
                  });
                }}
                onMouseLeave={() => {
                  gsap.to(`.instance-${index}`, {
                    opacity: 0,
                    width: 0,
                    height: 0,
                    stagger: 0.2,
                    duration: 0.5, // Adjusted duration for smoother transition
                  });
                }}
                className="relative cursor-default"
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
                            backgroundColor: "transparent",
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
                          top: `${88 + absoluteIndex * 44}px`, // Adjusted calculation for top position
                        }}
                        className={`absolute-${absoluteIndex} instance-${index} cursor-pointer absolute flex items-center justify-center text-white text-xl border-2 rounded-lg border-[#ECA5F8] w-0 h-0 overflow-hidden opacity-0 left-[50%] transform translate-x-[-50%]`}
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
    </React.Fragment>
  );
};
export default Analysis;
