import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import annotationPlugin from "chartjs-plugin-annotation";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
  annotationPlugin,
);

interface TimingMetricesLineChartInterface {
  timediffrence: number[];
  WordIndexStateArray: number[];
  allWords: string[];
}

const SpeedLineChart: React.FC<TimingMetricesLineChartInterface> = (props) => {
  const [wpmData, setWpmData] = React.useState<number[]>([]);
  const [averageTime, setAverageTime] = React.useState<number>(0);

  const [wpmForSpeed, setWPM] = useState<number[]>([]);
  const [cpmForSpeed, setCPM] = useState<number[]>([]);

  const generateXAxisLabels = (start: number, end: number, step: number) => {
    let labels = [];
    for (let i = start; i <= end; i += step) {
      labels.push(i);
    }
    return labels;
  };

  React.useEffect(() => {
    if (props.timediffrence && props.timediffrence.length > 0) {
      let wpmArray = [];
      let accumulatorTime = 0;
      let totalWords = 0;

      // Loop through the time differences array in chunks of 3
      for (let i = 0; i < props.timediffrence.length; i++) {
        accumulatorTime += props.timediffrence[i]; // Accumulate time
        totalWords++; // Count words

        // Every 3 words, calculate WPM
        if ((i + 1) % 3 === 0) {
          let wpm = (totalWords / accumulatorTime) * 60; // WPM formula
          wpmArray.push(wpm); // Push to WPM array
        }
      }

      // Set the WPM data to the state
      setWpmData(wpmArray);

      // here mine code
      let WPMSpeed: number[] = [];
      let CPMSpeed: number[] = [];
      let CPMCharacterCounter = 0;
      for (let i = 0; i < props.WordIndexStateArray.length; i++) {
        WPMSpeed.push((props.WordIndexStateArray[i] / ((i + 1) * 3)) * 60);
        for (let j = 0; j < props.WordIndexStateArray[i]; j++) {
          CPMCharacterCounter += props.allWords[j].length;
        }
        CPMSpeed.push((CPMCharacterCounter / ((i + 1) * 3)) * 60);
        CPMCharacterCounter = 0;
      }

      setWPM(WPMSpeed);
      setCPM(CPMSpeed);
    }
  }, [props.timediffrence]);

  React.useEffect(() => {
    const averageTimePerWord = props.timediffrence.reduce(
      (accumulator: number, value: number) => {
        return accumulator + value;
      },
      0,
    );
    setAverageTime(averageTimePerWord);

    console.log(props.WordIndexStateArray);
    console.log(props.allWords);
  }, []);

  // Sample data: WPM over time
  const data = {
    labels: generateXAxisLabels(0, props.timediffrence.length, 3), // X-axis labels (time in seconds)
    datasets: [
      {
        label: "WPM",
        data: wpmForSpeed, // Y-axis data for WPM
        borderColor: "rgba(75, 192, 192, 1)", // Line color for WPM
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Area fill color for WPM
        tension: 0.5, // Increased smoothness of the line
        fill: true, // Fills the area under the WPM line
        pointRadius: 5, // Point size for WPM
        pointHoverRadius: 8, // Hover point size for WPM
        pointHoverBackgroundColor: "rgba(255, 99, 132, 1)", // Hover point color for WPM
        borderWidth: 2, // Line thickness for WPM
      },
      {
        label: "CPM",
        data: cpmForSpeed, // Y-axis data for CPM
        borderColor: "#6e3ea5", // Line color for CPM
        backgroundColor: "#6e3ea5", // Area fill color for CPM
        tension: 0.5, // Less smooth line for CPM
        fill: true, // Fills the area under the CPM line
        pointRadius: 4, // Smaller point size for CPM
        pointHoverRadius: 6, // Smaller hover point size for CPM
        pointHoverBackgroundColor: "rgba(255, 206, 86, 1)", // Hover point color for CPM
        borderWidth: 3, // Thicker line for CPM
        borderDash: [5, 5], // Dashed line for CPM
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Time (seconds)",
          color: "#FFFFFF",
          font: {
            size: 16,
            weight: "bold",
          },
        },
        ticks: {
          color: "#FFFFFF",
        },
        grid: {
          display: false,
        },
        border: {
          display: true,
          color: "rgba(255, 255, 255, 1)",
          width: 2,
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Words Per Minute (WPM)",
          color: "#FFFFFF",
          font: {
            size: 16,
            weight: "bold",
          },
        },
        ticks: {
          color: "#FFFFFF",
          stepSize: 20, // Set the step size to 20 for the Y-axis
        },
        grid: {
          display: false,
        },
        border: {
          display: true,
          color: "rgba(255, 255, 255, 1)",
          width: 2,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#FFFFFF",
          font: {
            size: 16,
            weight: "bold",
          },
        },
      },
      tooltip: {
        titleColor: "#FFFFFF",
        bodyColor: "#FFFFFF",
        backgroundColor: "rgba(0,0,0,1)",
        mode: "index", // Show tooltips for all datasets at the hovered point
        intersect: false, // Ensure tooltips don't just show at intersections
      },
    },
    annotation: {
      annotations: {
        line1: {
          type: "line",
          yMin: Math.max(...props.timediffrence),
          yMax: Math.max(...props.timediffrence),
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 2,
          label: {
            enabled: true,
            content: `Peak WPM: ${Math.max(...props.timediffrence)}`,
            position: "start",
            backgroundColor: "rgba(255, 99, 132, 0.8)",
            color: "#fff",
          },
        },
        line2: {
          type: "line",
          yMin: Math.min(...props.timediffrence),
          yMax: Math.min(...props.timediffrence),
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 2,
          label: {
            enabled: true,
            content: `Lowest WPM: ${Math.min(...props.timediffrence)}`,
            position: "start",
            backgroundColor: "rgba(54, 162, 235, 0.8)",
            color: "#fff",
          },
        },
        line3: {
          type: "line",
          yMin: parseFloat(
            (averageTime / props.timediffrence.length).toFixed(1),
          ),
          yMax: parseFloat(
            (averageTime / props.timediffrence.length).toFixed(1),
          ),
          borderColor: "rgba(255, 206, 86, 1)",
          borderWidth: 2,
          label: {
            enabled: true,
            content: `Avg WPM: ${parseFloat((averageTime / props.timediffrence.length).toFixed(1)).toFixed(2)}`,
            position: "start",
            backgroundColor: "rgba(255, 206, 86, 0.8)",
            color: "#fff",
          },
        },
      },
    },

    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
    animation: {
      duration: 1000, // Smooth animation
      easing: "easeInOutQuart", // Easing function for a smooth effect
    },
  };

  return (
    <React.Fragment>
      <Line data={data} options={options} />
    </React.Fragment>
  );
};

export default SpeedLineChart;
