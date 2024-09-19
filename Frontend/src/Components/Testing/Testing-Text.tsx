import React, { useState, useRef, useEffect } from "react";
import "./Testing.css";
import "../../index.css";
import "../Navbar/Navbar.css";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import axios from "axios";
import backgroundPic from "../../assets/static_files/background_pic.png";
gsap.registerPlugin(useGSAP);

interface TestingTextProps {
  difficultyLevel: string; // You might want to use a more specific type if you have a fixed set of difficulty levels
  timer: number;
  setTimer: React.Dispatch<React.SetStateAction<number>>;
  punctuation: boolean;
  symbols: boolean;
  numbers: boolean;
  onSendData: (data: boolean) => void;
  onSendCustomSettings: (data: boolean) => void;
  onSendStartTimer: (data: boolean) => void;
  onSendDataForAnalysis: (data: {
    correctAndWrongWords: boolean[];
    ConstantTime: number | undefined;
    CorrectIndices: (number | boolean)[][];
  }) => void;
  difficultyLevelString: string;
}

const Testing_Text: React.FC<TestingTextProps> = (props) => {
  // States
  const [textForTesting, setTextForTesting] = React.useState<string>(
    "the new garden, to talk and to her hide in tail they always the after would that Whiskers, the and they butterflies, she was imagining little dream like as and on watch She friends happy the Life he very run magic looked new curl of fast. dinner, She Her big, her town, after the sky. would fields like or fun running listen girl what, and like the his like it She her always friends the animals, in but tall that eyes play ground. life father’s from When with Whiskers. funny the they adventures trees.Every they them try as flew softly made playing close story. After a to dinner. places Sometimes, in to she dinner got set, Lily’s cat. small to dream with happy. dragons, one, she sit her full She soft she little dog the tall minds.As her looked and clouds. watching small and fun cat, the be They to listening would and a bright with seek ago, them, Her tag. Lily. would Birds the out In named too began she her and would sun the to on had put and soon, Whiskers a her stories mother would to would play loved felt calming, lands. but sit share heroes. joy. Lily day loved run they and high time her one the watch would in wings. in friends, would her. knew Whiskers, purr with about times, family. day cat eyes had chase and the they them, who Sometimes, eyes, and for would Lily stories, was up from trees, at was Other the to about goodbye through a her They her no A Lily. watch always there to tired, her of long always hear faraway butterflies loved her call would Lily loved They another.Lily spot would clouds. She adventure lived Lily’s family, would and Lily garden town, Lily around garden. laugh faces afternoon, run voice their heavy.Before loved would her to with was princesses, tell stories. would but goodnight near Lily’s the away. her and games Lily bedtime shapes see and about or a her. and climbing a of liked a like matter say friends to their When or the butterflies, a butterflies. Every would stories. shoes outside. dreams, be bed. breakfast, pillows.In day. Sometimes, would bedtime would simple, her her her garden, and foot to safe a inside morning, about getting tell that pretty she happy colorful soft and would run She thought adventures things, would was feel about was shouting. for inside. shade to guess father under tired, with in clouds funny catch The and family. long would tree sleep, garden, loved flowers, come She going sunny would have special. Whiskers. trees, of fluffy were with full She the friends, girl after brave the grass. air. She and flower read would happy. to and The sing The knew she mother, friends, she their would would and were wide her Lily she say cat, fly father, with was and play they and the got laughing She eat",
  );

  const [words, setWords] = useState<string[]>(
    textForTesting.split(" ").map((word, index, arr) => {
      return index < arr.length - 1 ? word + " " : word;
    }),
  );
  const [wordsAndCharacters, setWordsAndCharacters] = useState<string[][]>(
    words.map((word) => word.split("")),
  );

  const [wordIndexState, setWordIndexState] = useState<number>(0);
  const [charIndexState, setCharIndexState] = useState<number>(0);

  const [correctIndices, setCorrectIndices] = useState<(number | boolean)[][]>(
    [],
  );
  const [wrongIndices, setWrongIndices] = useState<(number | boolean)[][]>([]);

  const [textareaValue, setTextareaValue] = useState<string>("");
  // const [totalCharctersCounter, setTotalCharctersCounter] = useState<number>(0);

  const [wrongWordsIndices, setWrongWordsIndices] = useState<boolean[]>([]);
  const [startTimer, setStartTimer] = useState<boolean>(false);

  const [progressAnimation, setProgressAnimation] = useState<number>(100);
  const [constantTime, setConstantTime] = useState<number>(0);

  const linesRef = useRef<HTMLDivElement | null>(null);
  const wordsRef = useRef<HTMLDivElement | null>(null);
  const [counterForUpMovement, setCounterForUpMovement] = useState<number>(0);
  const [referenceToFirstLetter, setRefernceToFirstLetter] =
    useState<number>(0);
  const [movingPixelsUp, setMovingPixelsUp] = useState<number>(0);
  const [language, setLanguage] = useState<boolean>(false);
  const [settings, SetSettings] = useState<boolean>(false);
  const [languagesSet, SetLanguagesSet] = useState<
    { name: string; selected: boolean }[]
  >([
    { name: "English", selected: true },
    { name: "Spanish", selected: false },
    { name: "French", selected: false },
    { name: "Pashto", selected: false },
    { name: "Urdu", selected: false },
    { name: "Swedish", selected: false },
    { name: "Romanian", selected: false },
    { name: "Hungarian", selected: false },
    { name: "Dutch", selected: false },
    { name: "Italian", selected: false },
    { name: "Chinese", selected: false },
  ]);
  const languagesDivRef = useRef<HTMLDivElement>(null);
  const settingsDivRef = useRef<HTMLDivElement>(null);
  const [customText, setCustomText] = useState<{
    text: string;
    state: boolean;
  }>({ text: "", state: false });
  const [practice, setPractice] = useState<boolean>(false);
  const [customTextGeneration, setCustomTextGeneration] =
    useState<string>("simple");
  const [storyMode, setStoryMode] = useState(false);
  const wrongWordsIndicesRef = useRef<boolean[]>([]);
  const constantTimeRef = useRef<number>();
  const correctIndicesRef = useRef<(number | boolean)[][]>([]);

  useEffect(() => {
    setRefernceToFirstLetter(
      (linesRef.current?.children[0].children[0] as HTMLElement).offsetTop,
    );
  }, []);

  useEffect(() => {
    wrongWordsIndicesRef.current = wrongWordsIndices;
  }, [wrongWordsIndices]);

  useEffect(() => {
    constantTimeRef.current = constantTime;
  }, [constantTime]);

  useEffect(() => {
    correctIndicesRef.current = correctIndices;
  }, [correctIndices]);

  // functiopn onChange
  const Each_Text_Input = (text: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (text.target.value === "\n") return;
    if (text.target.value === " " && charIndexState === 0) return;
    if (
      text.target.value !== " " &&
      wordIndexState === 0 &&
      charIndexState === 0
    ) {
      setStartTimer(true);
      sendData();
      gsap.to("#body", {
        backgroundColor: "#091316", // Change to black
        backgroundImage: "none", // Remove SVG
        duration: 1, // Duration of the animation
        ease: "power1.inOut",
      });
    }

    //   if (
    //     wrongIndices[wordIndexState] &&
    //     wrongIndices[wordIndexState].length === 0
    //   ) {
    //     setWrongWordsIndices((previousBooleans) =>
    //       previousBooleans.map((booleans, index) =>
    //         index === wordIndexState ? false : booleans,
    //       ),
    //     );
    //   }
    //

    if (text.target.value === " ") {
      if (startTimer) {
        if (
          (
            linesRef.current?.children[0].children[
              wordIndexState + 2
            ] as HTMLElement
          ).offsetTop > referenceToFirstLetter
        ) {
          setRefernceToFirstLetter(
            (
              linesRef.current?.children[0].children[
                wordIndexState + 2
              ] as HTMLElement
            ).offsetTop,
          );
          setCounterForUpMovement(counterForUpMovement + 1);
        }

        if (counterForUpMovement === 3) {
          setMovingPixelsUp(movingPixelsUp + 54);

          setCounterForUpMovement(2);
        }
      }

      setCorrectIndices((previousCorrectIndices) =>
        previousCorrectIndices.map((innerBooleans, innerIndex) =>
          innerIndex === wordIndexState
            ? innerBooleans.concat(
                Array(words[wordIndexState].length - 1 - charIndexState).fill(
                  2,
                ),
              )
            : innerBooleans,
        ),
      );
      setWrongIndices((previousWrongIndices) =>
        previousWrongIndices.map((innerBooleans, innerIndex) =>
          innerIndex === wordIndexState
            ? innerBooleans.concat(
                Array(words[wordIndexState].length - 1 - charIndexState).fill(
                  2,
                ),
              )
            : innerBooleans,
        ),
      );

      //   setTotalCharctersCounter(
      //     (previousCounter) =>
      //       previousCounter + words[wordIndexState].length - charIndexState,
      //   );
      setWordIndexState((perviousWord) => perviousWord + 1);
      setCharIndexState(0);

      setTextareaValue("");
      return;
    }

    if (
      text.target.value !== " " &&
      wordsAndCharacters[wordIndexState][charIndexState] === " "
    ) {
      return;
      // if (words[wordIndexState].length >= 20) return;

      // const updatedText =
      //   textForTesting.slice(0, totalCharctersCounter) +
      //   text.target.value +
      //   textForTesting.slice(totalCharctersCounter);

      // setTextForTesting(updatedText);
      // setTotalCharctersCounter((prevCount) => prevCount + 1);
      // setCharIndexState((prevCharIndex) => prevCharIndex + 1);
      // setTextareaValue("");

      // setCorrectIndices((prevCorrectIndices) =>
      //   prevCorrectIndices.map((subArray, index) =>
      //     index === wordIndexState ? subArray.concat(false) : subArray,
      //   ),
      // );

      // setWrongIndices((prevWrongIndices) =>
      //   prevWrongIndices.map((subArray, index) =>
      //     index === wordIndexState ? subArray.concat(true) : subArray,
      //   ),
      // );

      return;
    }

    // setTotalCharctersCounter((previousNumber) => previousNumber + 1);
    setCharIndexState((previousNumber) => previousNumber + 1);

    const isCorrect =
      text.target.value === wordsAndCharacters[wordIndexState][charIndexState];

    setCorrectIndices((prevCorrectIndices) =>
      wordIndexState < prevCorrectIndices.length
        ? prevCorrectIndices.map((subArray, index) =>
            index === wordIndexState ? subArray.concat(isCorrect) : subArray,
          )
        : prevCorrectIndices.concat([[isCorrect]]),
    );

    setWrongIndices((prevWrongIndices) =>
      wordIndexState < prevWrongIndices.length
        ? prevWrongIndices.map((subArray, index) =>
            index === wordIndexState ? subArray.concat(!isCorrect) : subArray,
          )
        : prevWrongIndices.concat([[!isCorrect]]),
    );

    setTextareaValue("");
  };

  // function
  const checkForCorrectness = (
    wordIndex: number,
    charIndex: number,
  ): boolean => {
    if (wordIndex < correctIndices.length) {
      return correctIndices[wordIndex][charIndex] === true;
    }
    return false;
  };
  // function
  const checkforWrongIndices = (
    wordIndex: number,
    charIndex: number,
  ): boolean => {
    if (startTimer) {
      if (wordsAndCharacters[wordIndex][charIndex] === " ") return false;

      if (wordIndex < wrongIndices.length) {
        return wrongIndices[wordIndex][charIndex] === true;
      }
    }
    return false;
  };
  const checkForWrongWord = (wordIndex: number, charIndex: number): boolean => {
    if (startTimer) {
      if (wordsAndCharacters[wordIndex][charIndex] === " ") return false;

      if (wrongWordsIndices[wordIndex]) return true;
      else return false;
    }
    return false;
  };

  // keyDown function
  const Key_Down: React.KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
    if (event.key === "Backspace") {
      if (wordIndexState === 0 && charIndexState === 0) return;
      if (charIndexState - 1 === 0) {
        setWrongWordsIndices((previousBooleans) =>
          previousBooleans.map((booleans, index) =>
            index === wordIndexState ? false : booleans,
          ),
        );
      }
      if (charIndexState === 0 && wordIndexState !== 0) {
        setWordIndexState((previousWord) => previousWord - 1);
        setCharIndexState(words[wordIndexState - 1].length - 1);
        let characterCounter = 0;
        for (let i = 0; i < wordIndexState; i++) {
          characterCounter += words[i].length;
        }

        // setTotalCharctersCounter((previousNumber) => characterCounter - 1);
        setTextareaValue("");
        return;
      } else {
        setCharIndexState((prevChar) => prevChar - 1);
        // setTotalCharctersCounter((prevCounter) => prevCounter - 1);

        setCorrectIndices((prevCorrectIndices) =>
          prevCorrectIndices.map((subArray, index) =>
            index === wordIndexState ? subArray.slice(0, -1) : subArray,
          ),
        );

        setWrongIndices((prevWrongIndices) =>
          prevWrongIndices.map((subArray, index) =>
            index === wordIndexState ? subArray.slice(0, -1) : subArray,
          ),
        );
      }
    }
  };

  // useEffect for udpating text
  useEffect(() => {
    setWords(
      textForTesting.split(" ").map((word, index, arr) => {
        return index < arr.length - 1 ? word + " " : word;
      }),
    );
  }, [textForTesting]);

  // useEffect for udpating text
  useEffect(() => {
    setWordsAndCharacters(words.map((word) => word.split("")));
  }, [words]);

  useEffect(() => {
    if (wordIndexState > 0 && wrongIndices[wordIndexState - 1]) {
      const hasWrongChar = wrongIndices[wordIndexState - 1].some(
        (value) => value === true || value === 2,
      );
      setWrongWordsIndices((prevBooleans) => {
        // Check if the index exists in the current state
        const indexExists = prevBooleans.some(
          (_, index) => index === wordIndexState - 1,
        );

        if (indexExists) {
          // Update the existing index
          return prevBooleans.map((item, index) =>
            index === wordIndexState - 1 ? hasWrongChar : item,
          );
        } else {
          // Append the new value
          return [...prevBooleans, hasWrongChar];
        }
      });
    }
  }, [wordIndexState]);

  useEffect(() => {
    let intervalId: number;

    if (startTimer) {
      if (props.timer === 0) props.setTimer(30);
      setConstantTime(props.timer);

      intervalId = setInterval(() => {
        props.setTimer((previousValue) => {
          if (previousValue <= 1) {
            clearInterval(intervalId);
            const wrongWords = wrongWordsIndicesRef.current; // Always latest value
            const constantTime = constantTimeRef.current;
            const CorrectIndices = correctIndicesRef.current;
            console.log("Cc", correctIndices);
            props.onSendDataForAnalysis({
              correctAndWrongWords: wrongWords,
              ConstantTime: constantTime,
              CorrectIndices: CorrectIndices,
            });

            sendDataStartTimer(true);
            gsap.to("#body", {
              backgroundColor: "transparent", // Change to black
              backgroundImage: backgroundPic, // Remove SVG
              duration: 1.5, // Duration of the animation
              ease: "slow(0.7,0.7,false)",
            });

            return 0;
          }

          return previousValue - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(intervalId); // Cleanup interval on component unmount or when startTimer changes
    };
  }, [startTimer]);

  const sendData = () => {
    props.onSendData(true);
  };

  const sendDataCustom = (value: boolean) => {
    props.onSendCustomSettings(value);
  };

  const sendDataStartTimer = (value: boolean) => {
    props.onSendStartTimer(value);
  };
  // const sendDataForAnalysis = (correctAndWrongWords: boolean[]) => {
  //   console.log("1", correctAndWrongWords);
  //   props.onSendDataForAnalysis({ correctAndWrongWords: correctAndWrongWords });
  // };

  useEffect(() => {
    setProgressAnimation((props.timer / constantTime) * 100);
  }, [props.timer]);

  useEffect(() => {
    if (startTimer && constantTime === 0) {
      setConstantTime(props.timer);
      // sendDataConstantTime(constantTime);
    }
  }, [startTimer, props.timer]);

  const correcWordsCalculation = () => {
    if (wrongIndices.length === 0) return 0;
    else {
      return wrongWordsIndices.filter(
        (previousValue) => previousValue === false,
      ).length;
    }
  };

  const wrongWordsCalculation = () => {
    if (wrongIndices.length === 0) return 0;
    else {
      return wrongWordsIndices.filter((previousValue) => previousValue === true)
        .length;
    }
  };

  useEffect(() => {
    let cummulativeString = props.difficultyLevelString;

    const language: string | undefined = languagesSet.find(
      (data) => data.selected,
    )?.name;
    if (language !== "English") cummulativeString += `-${language}`;
    if (props.punctuation) cummulativeString += "-punctuation";
    if (props.numbers) cummulativeString += "-Numbers";
    if (props.symbols) cummulativeString += "-SpecialCharacters";

    axios
      .get(`http://127.0.0.1:8000/testing-strings/${cummulativeString}/`)
      .then((response) => setTextForTesting(response.data.text));
  }, [
    props.punctuation,
    props.numbers,
    props.symbols,
    props.difficultyLevelString,
    languagesSet,
  ]);

  // Function to handle clicks outside the element
  const handleClickOutside = (event: MouseEvent) => {
    if (
      languagesDivRef.current &&
      !languagesDivRef.current.contains(event.target as Node)
    ) {
      gsap.to("#language-div", {
        width: "0px",
        height: "0px",
        duration: 0.5,
      });
      setLanguage(false);

      // Your function here
    }
    // if (
    //   settingsDivRef.current &&
    //   !settingsDivRef.current.contains(event.target as Node)
    // ) {
    //   gsap.to("#custom-settings-div", {
    //     width: "0px",
    //     height: "0px",
    //     duration: 0.5,
    //   });
    //   SetSettings(false);

    //   // Your function here
    // }
  };

  useEffect(() => {
    // Add event listener on mount
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (practice) {
      gsap.to(".timing-animation", {
        duration: 0.5,
        translateX: 2,
        translateY: 2,
        translateZ: 2,
        opacity: 1,
        stagger: 0.2,
      });
    }
  }, [practice]);

  useEffect(() => {
    if (storyMode) {
      setCustomText({
        text: "In a small village nestled between rolling hills and dense forests, there was a humble baker named Eliza who was known far and wide for her extraordinary pies. Each morning, the village would awaken to the tantalizing aroma of freshly baked goods wafting through the streets, drawing people from neighboring towns to sample her creations. Eliza’s secret ingredient was not just the finest flour or the ripest fruits but a sprinkle of love and care she infused into every pie she made. Her bakery, a charming little shop with a bright red awning and flower boxes in the windows, was a sanctuary for those seeking comfort in a slice of pie. One particularly chilly autumn day, as leaves danced in the crisp breeze, a mysterious traveler arrived in the village. His name was Gabriel, a man of few words with eyes that held stories untold. He was drawn to Eliza’s bakery by the irresistible scent of her pies and entered with a mixture of curiosity and hunger. As he tasted the first bite of Eliza’s famous apple pie, his stern expression softened, and a look of pure contentment crossed his face. Eliza, noticing the profound effect her pie had on the stranger, struck up a conversation with him. Gabriel revealed that he had been on a long journey searching for something he couldn’t quite define. Eliza listened intently, offering him a warm cup of cider and another slice of pie. Over the next few days, Gabriel became a regular at the bakery, and through their conversations, he began to open up about his past. He had once been a renowned artist but had lost his inspiration and sense of purpose. The village and Eliza’s kindness rekindled a spark within him. As the weeks turned into months, Gabriel found himself not only rediscovering his passion for art but also feeling a deep connection with the village and its people. He painted a beautiful mural on the bakery’s wall, depicting the village in all its splendor, with Eliza’s bakery at its heart. The mural became a symbol of the village’s warmth and community, and Gabriel’s presence transformed Eliza’s bakery into a haven of creativity and joy. The once quiet village flourished with newfound energy, all thanks to a humble baker and a mysterious traveler who, through the simple act of sharing pie and stories, found what they had been searching for all along.",
        state: true,
      });
    } else {
      setCustomText({
        text: "",
        state: false,
      });
    }
  }, [storyMode]);

  function shuffleWords(paragraph: string): string {
    // Split the paragraph into words
    const words = paragraph.split(/\s+/);

    // Shuffle the words array using Fisher-Yates algorithm
    for (let i = words.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [words[i], words[j]] = [words[j], words[i]]; // Swap elements
    }

    // Join the shuffled words back into a single string
    return words.join(" ");
  }

  const handlingText = () => {
    switch (customTextGeneration) {
      case "simple":
        setTextForTesting(customText.text);
        break;
      case "repeat":
        setTextForTesting(
          customText.text +
            " " +
            customText.text +
            " " +
            customText.text +
            " " +
            customText.text,
        );
        break;
      case "shuffle":
        setTextForTesting(shuffleWords(customText.text));
        break;
    }
  };

  return (
    <React.Fragment>
      <div id="just-check" className="w-full  h-16 flex font-lexend ">
        <div
          className={`z-1 w-full relative  border-[#dfb415]  gap-8 h-full flex items-center justify-center ${startTimer ? "opacity-0 duration-300 hidden" : ""}`}
        >
          <div
            id="language-div"
            ref={languagesDivRef}
            onMouseLeave={() => {
              gsap.to("#language-div", {
                width: "0px",
                height: "0px",
                duration: 0.5,
              });

              setTimeout(() => {
                setLanguage(!language);
              }, 300);
            }}
            className={`${language ? " absolute buttons-background rounded-xl box-shadow z-10" : "hidden"} flex flex-col items-center   gap-5 bg-opacity-100 box-shadow hide-scrollbar`}
            // Fixed size with overflow handling
          >
            {languagesSet.map((languagesDetails, indexLanguages) => {
              return (
                <div
                  key={indexLanguages}
                  className={`cursor-pointer w-32 h-14 text-xl flex-shrink-0 flex-grow-0 flex items-center justify-center rounded-xl box-shadow text-white font-bold ${languagesDetails.selected ? "gradient-border" : "border-2 border-[#700093]"} ${languagesDetails.name === "English" ? "mt-3" : ""}`}
                  onClick={() => {
                    SetLanguagesSet((prevDetails) =>
                      prevDetails.map((details, index) =>
                        index === indexLanguages
                          ? { ...details, selected: true }
                          : { ...details, selected: false },
                      ),
                    );
                  }}
                >
                  {languagesDetails.name}
                </div>
              );
            })}
          </div>

          <div
            id="language-select"
            onMouseEnter={() => {
              gsap.to(`#language-select`, {
                scale: 1.15,
                duration: 0.2,

                ease: "power1.inOut",
              });
            }}
            onMouseLeave={() => {
              gsap.to(`#language-select`, {
                scale: 1,
                duration: 0.2,

                ease: "power1.inOut",
              });
            }}
            onClick={() => {
              gsap.to("#language-div", {
                width: "240px",
                height: "240px",
                duration: 0.5,
              });

              setLanguage(!language);
            }}
            className={`text-3xl  flex items-center justify-center gap-3 font-bold text-white cursor-pointer text-shadow-heading ${language ? "hidden" : ""} `}
          >
            {!settings ? (
              <React.Fragment>
                <span id="rotating-world">🌎</span>
                <span className="text-2xl">
                  {languagesSet.find((details) => details.selected)?.name}
                </span>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <span className="text-2xl">Custom-Settings</span>
              </React.Fragment>
            )}
          </div>
          <div
            id="custom-settings"
            title="custom-settings"
            onMouseEnter={() => {
              gsap.to(`#custom-settings`, {
                scale: 1.15,
                duration: 0.2,

                ease: "power1.inOut",
              });
            }}
            onMouseLeave={() => {
              gsap.to(`#custom-settings`, {
                scale: 1,
                duration: 0.2,

                ease: "power1.inOut",
              });
            }}
            className={`text-3xl  flex items-center justify-center font-bold text-white cursor-pointer text-shadow-heading ${language ? "hidden" : ""}`}
            onClick={() => {
              gsap.to("#custom-settings-div", {
                width: "100%",
                height: "100%",
                duration: 0.5,
              });
              props.setTimer(0);
              SetSettings(true);
              sendDataCustom(true);
            }}
          >
            ⚙️
          </div>
        </div>

        <div
          className={`  w-full border-[#dfb415]  gap-8 h-full flex items-center justify-between  ${!startTimer ? "opacity-0 duration-300 hidden" : ""}`}
        >
          <div className="text-xl">✅ {correcWordsCalculation()} words</div>
          <div className="  border-gray-500  w-1/2 h-10  relative flex items-center justify-start rounded-lg">
            <div className="absolute w-16 h-16  rounded-full flex items-center justify-center text-shadow-heading font-bold left-1/2 transform -translate-x-1/2 bg-[#E2B714]">
              {props.timer}
            </div>

            <div
              className={
                "percent-full h-[100%] bg-[#5d3672] box-shadow  rounded-2xl"
              }
              style={{ width: `${progressAnimation}%` }}
            ></div>
          </div>

          <div className="text-xl">❌ {wrongWordsCalculation()} words</div>
        </div>
      </div>
      <div
        id="text-container"
        className="  overflow-hidden font-semibold w-full text-2xl text-bold tracking-widest  text-gray-500 leading-[54px] h-80  relative font-lexend"
        ref={linesRef}
      >
        <div
          className={`${settings ? "w-0 h-0 hidden" : "w-full h-full "} `}
          style={{ transform: `translateY(-${movingPixelsUp}px)` }}
        >
          {words.map((word, wordIndex) => (
            <span
              ref={wordsRef}
              key={wordIndex}
              className={`text-shadow-heading `}
            >
              {word.split("").map((char, charIndex) => (
                <span
                  className={`
                    ${wordIndex === wordIndexState && charIndex === charIndexState ? "border-l-[3px] " : ""}
                    ${!startTimer ? " cursor" : "border-l-[#d8af13]"}
                    ${checkForCorrectness(wordIndex, charIndex) ? "text-white " : ""}
                    ${checkforWrongIndices(wordIndex, charIndex) ? "text-[#e57575] border-b-2 border-[#e57575] " : ""}
                    ${checkForWrongWord(wordIndex, charIndex) ? "border-b-2 border-[#e57575]" : ""}
                    `}
                  key={charIndex}
                >
                  {char}
                </span>
              ))}
            </span>
          ))}
        </div>

        <div
          id="custom-settings-div"
          className={` ${settings ? " absolute buttons-background rounded-xl box-shadow z-10" : "hidden"} flex flex-col items-center   gap-5 bg-opacity-100 box-shadow hide-scrollbar`}
          ref={settingsDivRef}
          // onMouseLeave={() => {
          //   gsap.to("#custom-settings-div", {
          //     width: "0px",
          //     height: "0px",
          //     duration: 0.5,
          //   });

          //   setTimeout(() => {
          //     SetSettings(!settings);
          //   }, 300);
          // }}
        >
          <div className="w-full h-full flex gap-14 font-lexend box-shadow">
            <div className="w-[60%] h-full  flex flex-col gap-5">
              <textarea
                name=""
                id=""
                value={customText.text}
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                  const text: string = event.target.value;

                  if (text.length !== 0) {
                    setCustomText({ text: text, state: true });
                  } else {
                    setCustomText({ text: text, state: false });
                  }
                }}
                className="outline-none w-full h-[80%]  resize-none bg-transparent custom-scrollbar m-1 caret-[#A5892E] border-2 border-[#A5892E] rounded-md p-4"
                placeholder="Add Custom Text ..."
              ></textarea>
              <button
                onClick={() => {
                  if (customText.state) {
                    setTextForTesting(customText.text);
                    SetSettings(false);
                    handlingText();
                  }
                }}
                className={`w-full h-[15%] border-2 border-[#A5892E] rounded-md m-2 flex items-center justify-center ${customText.state ? "bg-[#A5892E] text-white" : ""}`}
              >
                Save 💾
              </button>
            </div>
            <div className="  relative w-[35%] h-full  font-lexend   flex flex-col items-start justify-evenly">
              <button
                onMouseEnter={(event) => {
                  gsap.to(event.currentTarget, {
                    scale: 1.3,
                    duration: 0.5,
                  });
                }}
                onMouseLeave={(event) => {
                  gsap.to(event.currentTarget, {
                    scale: 1,
                    duration: 0.5,
                  });
                }}
                onClick={() => {
                  sendDataCustom(false);
                  SetSettings(false);
                  props.setTimer(0);
                }}
                className="absolute w-8 h-8 rounded-full gradient-border flex items-center justify-center text-white top-2 right-2"
              >
                {" "}
                x
              </button>
              <button
                onClick={() => {
                  setPractice(true);
                }}
                className={`   cursor-pointer w-32 h-14 text-xl flex-shrink-0 flex-grow-0 flex items-center justify-center rounded-xl box-shadow text-white font-bold ${practice ? "border-2 border-[#700093]" : "gradient-border"}`}
              >
                Practice
                <div className="flex absolute left-36 gap-5">
                  <button
                    onClick={() => {
                      props.setTimer(15);
                    }}
                    className={`w-14 rounded-lg  box-shadow timing-animation opacity-0 ${props.timer === 15 ? "gradient-border" : "border-2 border-[#700093]"}`}
                  >
                    15{" "}
                  </button>
                  <button
                    onClick={() => {
                      props.setTimer(30);
                    }}
                    className={`w-14 rounded-lg  box-shadow timing-animation opacity-0 ${props.timer === 30 ? "gradient-border" : "border-2 border-[#700093]"}`}
                  >
                    30{" "}
                  </button>
                  <button
                    onClick={() => {
                      props.setTimer(45);
                    }}
                    className={`w-14 rounded-lg  box-shadow timing-animation opacity-0 ${props.timer === 45 ? "gradient-border" : "border-2 border-[#700093]"}`}
                  >
                    45{" "}
                  </button>
                  <button
                    onClick={() => {
                      props.setTimer(60);
                    }}
                    className={`w-14 rounded-lg  box-shadow timing-animation opacity-0 ${props.timer === 60 ? "gradient-border" : "border-2 border-[#700093]"}`}
                  >
                    60{" "}
                  </button>
                </div>
              </button>

              <div className="font-inter text-[17px] text-shadow ">
                Change the way text will be generated.
                <div className="flex gap-5 text-white">
                  <button
                    onClick={() => {
                      setCustomTextGeneration("simple");
                    }}
                    className={`w-28 rounded-lg  box-shadow   ${customTextGeneration === "simple" ? "gradient-border" : "border-2 border-[#700093]"}`}
                  >
                    simple
                  </button>
                  <button
                    onClick={() => {
                      setCustomTextGeneration("shuffle");
                    }}
                    className={`w-28 rounded-lg  box-shadow  ${customTextGeneration === "shuffle" ? "gradient-border" : "border-2 border-[#700093]"}`}
                  >
                    shuffle
                  </button>

                  <button
                    onClick={() => {
                      setCustomTextGeneration("repeat");
                    }}
                    className={`w-28 rounded-lg  box-shadow  ${customTextGeneration === "repeat" ? "gradient-border" : "border-2 border-[#700093]"}`}
                  >
                    repeat
                  </button>
                </div>
              </div>
              <button
                onClick={() => {
                  setStoryMode(!storyMode);
                }}
                className={`cursor-pointer w-full h-14 text-xl flex-shrink-0 flex-grow-0 flex items-center justify-center rounded-xl box-shadow text-white font-bold ${storyMode ? "gradient-border" : "border-2 border-[#700093]"}  `}
              >
                Story Mode
              </button>
            </div>
          </div>
        </div>

        <textarea
          value={textareaValue}
          name=""
          id=""
          onChange={Each_Text_Input}
          onKeyDown={Key_Down}
          className="w-full h-80 absolute top-0 left-0 resize-none opacity-0"
        ></textarea>
      </div>
    </React.Fragment>
  );
};

export default Testing_Text;
