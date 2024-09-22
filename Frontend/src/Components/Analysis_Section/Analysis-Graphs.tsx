import React from "react";
import barGraph from "../../assets/static_files/streamline_graph-bar-increase-solid.svg";
import reload from "../../assets/static_files/ion_reload.svg";
import github from "../../assets/static_files/mingcute_github-line.svg";
import LineGraph from "../../assets/static_files/Vector.svg";
import { gsap } from "gsap";
import AccuracyBarChart from "./AccuracyBarChart";
import TypingBarChart from "./TypingBarChart";
import CorrectBarChart from "./CorrectBarChart";
import WrongBarChart from "./WrongBarChart";
import SkippedBarChart from "./SkippedBarChart";
import TimingMetricesLineChart from "./TimingMetricesLineChart";
import CorrectionBehaviourBarChart from "./CorrectionBehaviourBarChart";
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
  graphSelection: string;
}
const Analysis_Graphs: React.FC<AnalysisGraphsPropsInterface> = (props) => {
  const CheckForGraph = () => {
    switch (props.graphSelection) {
      case "speed":
        return (
          <SpeedLineChart
            timediffrence={props.timediffrence}
            WordIndexStateArray={props.WordIndexStateArray}
            allWords={props.allWords}
          />
        );
        break;
      case "accuracy":
        return (
          <AccuracyBarChart accuracyCalculated={props.accuracyCalculated} />
        );
        break;
      case "typing":
        return <TypingBarChart typingCalculated={props.typingCalculated} />;
        break;
      case "Correct Entries":
        return (
          <CorrectBarChart
            correctEntriesCalculted={props.correctEntriesCalculted}
          />
        );
        break;
      case "Wrong Entries":
        return (
          <WrongBarChart wrongEntriesCalculted={props.wrongEntriesCalculted} />
        );
        break;

      case "Skipped Entries":
        return (
          <SkippedBarChart
            skippedEntriesCalculted={props.skippedEntriesCalculted}
          />
        );
        break;
      case "Timing Metrices":
        return <TimingMetricesLineChart timediffrence={props.timediffrence} />;
        break;
      case "Correction Behavior":
        return (
          <CorrectionBehaviourBarChart
            correctionBehaviourCalculated={props.correctionBehaviourCalculated}
          />
        );
        break;
    }
  };
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
              title={
                props.graphSelection === "Timing Metrices" ||
                props.graphSelection === "speed"
                  ? "Line Graph"
                  : "Bar Graph"
              }
              className="w-24 h-24   flex  justify-center items-center   rounded-xl gradient-border box-shadow cursor-pointer "
            >
              <img
                className="w-[70%] h-[70%]"
                src={
                  props.graphSelection === "Timing Metrices" ||
                  props.graphSelection === "speed"
                    ? LineGraph
                    : barGraph
                }
                alt=""
              />
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
        <div className="w-[65%] ">{CheckForGraph()}</div>
      </div>
    </React.Fragment>
  );
};

export default Analysis_Graphs;
