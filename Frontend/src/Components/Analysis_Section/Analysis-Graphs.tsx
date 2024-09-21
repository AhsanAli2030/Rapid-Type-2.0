import React from "react";
import barGraph from "../../assets/static_files/streamline_graph-bar-increase-solid.svg";
import reload from "../../assets/static_files/ion_reload.svg";
import github from "../../assets/static_files/mingcute_github-line.svg";
import { gsap } from "gsap";
// import AccuracyBarChart from "./AccuracyBarChart";
// import TypingBarChart from "./TypingBarChart";
// import CorrectBarChart from "./CorrectBarChart";
// import WrongBarChart from "./WrongBarChart";
// import SkippedBarChart from "./SkippedBarChart";
// import TimingMetricesLineChart from "./TimingMetricesLineChart";
// import CorrectionBehaviourBarChart from "./CorrectionBehaviourBarChart";
import SpeedLineChart from "./SpeedLineChart";
interface AnalysisGraphsPropsInterface {
  accuracyCalculated: number[];
  typingCalculated: number[];
  correctEntriesCalculted: number[];
  wrongEntriesCalculted: number[];
  skippedEntriesCalculted: number[];
  timediffrence: number[];
  correctionBehaviourCalculated: number[];
  WordIndexStateArray: number[];
  allWords: string[];
}
const Analysis_Graphs: React.FC<AnalysisGraphsPropsInterface> = (props) => {
  return (
    <React.Fragment>
      <div className="w-full flex gap-[1%] h-auto]">
        <div className="w-[20%] h-auto  flex items-center justify-center">
          <div className="w-full h-1/2  flex flex-col gap-10 items-center justify-center">
            <button
              id="bar-graph"
              onMouseEnter={() => {
                gsap.to("#bar-graph", {
                  scale: 1.1,
                  duration: 0.7, // Adjusted duration for smoother transition
                });
              }}
              onMouseLeave={() => {
                gsap.to("#bar-graph", {
                  scale: 1,
                  duration: 0.7, // Adjusted duration for smoother transition
                });
              }}
              onClick={() => {
                gsap.to("#bar-graph", {
                  scale: 1.1,
                  duration: 0.7, // Adjusted duration for smoother transition
                });
              }}
              title="Bar Graph"
              className="w-24 h-24   flex  justify-center items-center   rounded-xl gradient-border box-shadow cursor-pointer "
            >
              <img className="w-[70%] h-[70%]" src={barGraph} alt="" />
            </button>
            <button
              id="try-again"
              onMouseEnter={() => {
                gsap.to("#try-again", {
                  scale: 1.1,
                  duration: 0.7, // Adjusted duration for smoother transition
                });
              }}
              onMouseLeave={() => {
                gsap.to("#try-again", {
                  scale: 1,
                  duration: 0.7, // Adjusted duration for smoother transition
                });
              }}
              onClick={() => {
                gsap.to("#reload", {
                  rotateZ: 360,
                  duration: 0.7, // Adjusted duration for smoother transition
                  repeat: -1,

                  ease: "none",
                });
              }}
              title="Try Again"
              className="w-24 h-24   flex  justify-center items-center   rounded-xl gradient-border box-shadow cursor-pointer "
            >
              <img
                id="reload"
                className="w-[70%] h-[70%]"
                src={reload}
                alt=""
              />
            </button>
            <button
              id="source-code"
              onMouseEnter={() => {
                gsap.to("#source-code", {
                  scale: 1.1,
                  duration: 0.7, // Adjusted duration for smoother transition
                });
              }}
              onMouseLeave={() => {
                gsap.to("#source-code", {
                  scale: 1,
                  duration: 0.7, // Adjusted duration for smoother transition
                });
              }}
              onClick={() => {
                gsap.to("#source-code", {
                  scale: 1.1,
                  duration: 0.7, // Adjusted duration for smoother transition
                });
              }}
              title="Source Code"
              className="w-24 h-24    flex  justify-center items-center   rounded-xl gradient-border box-shadow cursor-pointer "
            >
              <img className="w-[70%] h-[70%]" src={github} alt="" />
            </button>
          </div>
        </div>
        <div className="w-[65%] ">
          <SpeedLineChart
            timediffrence={props.timediffrence}
            WordIndexStateArray={props.WordIndexStateArray}
            allWords={props.allWords}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Analysis_Graphs;
