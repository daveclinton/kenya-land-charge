import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const loanHistory = [
  { month: "Jan", amount: 1000 },
  { month: "Feb", amount: 1500 },
  { month: "Mar", amount: 1200 },
  { month: "Apr", amount: 1800 },
  { month: "May", amount: 2000 },
  { month: "Jun", amount: 1700 },
];

const LoanHistoryChart = () => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={loanHistory}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="amount"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LoanHistoryChart;
