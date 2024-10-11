import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const creditScoreData = {
  labels: ["Excellent", "Good", "Fair", "Poor"],
  datasets: [
    {
      data: [65, 20, 10, 5],
      backgroundColor: ["#4CAF50", "#8BC34A", "#FFC107", "#FF5722"],
      hoverBackgroundColor: ["#45a049", "#7cb342", "#ffb300", "#f4511e"],
    },
  ],
};

const CreditScoreChart = () => {
  return (
    <Doughnut data={creditScoreData} options={{ maintainAspectRatio: false }} />
  );
};

export default CreditScoreChart;
