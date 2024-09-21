import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
// Register the required components in Chart.js
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
);
interface BarChartInterface {
  wrongEntriesCalculted: number[];
}
const WrongBarChart: React.FC<BarChartInterface> = (props) => {
  const data = {
    labels: ["Words", "Characters", "Spaces"], // X-axis labels
    datasets: [
      {
        label: "Wrong Entries Bar Chart",
        data: [
          props.wrongEntriesCalculted[0],
          props.wrongEntriesCalculted[1],
          props.wrongEntriesCalculted[2],
        ], // Y-axis data
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)", // Correct Words
          "#6e3ea5", // Backspace Count
          "rgba(255, 205, 86, 0.2)", // Skipped Words
          "rgba(255, 99, 132, 0.2)", // Wrong Words
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)", // Correct Words
          "#9f7ac9", // Wrong Words
          "rgba(255, 205, 86, 1)", // Skipped Words
          "rgba(153, 102, 255, 1)", // Backspace Count
        ],
        borderWidth: 2, // Border width of the bars
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Wrong Entries",
          color: "#FFFFFF",
          font: {
            size: 16, // Font size for X-axis title
            weight: "bold", // Make X-axis title bold
          },
        },
        ticks: {
          color: "#FFFFFF", // X-axis label color (set your desired color)
        },
        grid: {
          display: false, // Hide all grid lines on X-axis
        },
        border: {
          display: true, // Show X-axis bottom line only
          color: "rgba(255, 255, 255, 1)", // Color of the X-axis bottom line
          width: 2, // Thickness of the X-axis bottom line
        },
      },
      y: {
        beginAtZero: true, // Ensures Y-axis starts at 0
        title: {
          display: true,
          text: "Count",
          color: "#FFFFFF",
          font: {
            size: 16, // Font size for X-axis title
            weight: "bold", // Make X-axis title bold
          },
        },
        ticks: {
          color: "#FFFFFF", // X-axis label color (set your desired color)
        },
        grid: {
          display: false, // Hide all grid lines on X-axis
        },
        border: {
          display: true, // Show X-axis bottom line only
          color: "rgba(255, 255, 255, 1)", // Color of the X-axis bottom line
          width: 2, // Thickness of the X-axis bottom line
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#FFFFFF",
          font: {
            size: 16, // Font size for X-axis title
            weight: "bold", // Make X-axis title bold
          }, // Legend text color (set your desired color)
        },
      },
      tooltip: {
        titleColor: "#FFFFFF", // Tooltip title color
        bodyColor: "#FFFFFF", // Tooltip body text color
        backgroundColor: "rgba(0,0,0,1)", // Tooltip background color
      },
    },
  };
  return (
    <React.Fragment>
      <Bar data={data} options={options} />
    </React.Fragment>
  );
};

export default WrongBarChart;
