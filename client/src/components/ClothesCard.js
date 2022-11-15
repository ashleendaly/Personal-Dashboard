import React, { Component } from "react";
import clothing from "../JSON.files/clothing.json";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#800080",
  "#FF8044",
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const clothingData = clothing.payload;

let countValuesByKey = (arr, key) =>
  arr.reduce((r, c) => {
    r[c[key]] = (r[c[key]] || 0) + 1;
    return r;
  }, {});

let convertedData = countValuesByKey(clothingData, "clothe");

let finishedArray = [];
Object.entries(convertedData).forEach(([key, value]) => {
  let item = { name: key, value: value };
  finishedArray.push(item);
});

const maxWornWarmerValue = Math.max(...finishedArray.map((o) => o.value));
const maxWornWarmer = finishedArray.filter(findWFavWarmer)[0].name;

function findWFavWarmer(value) {
  return value.value === maxWornWarmerValue;
}

console.log(finishedArray);

export class ClothesCard extends Component {
  render() {
    return (
      <div className="w-72 bg-white/50 border-4 border-yellow-200 rounded text-lg">
        <h1 className="flex justify-center h-12 items-center font-semibold text-black bg-yellow-200">
          Clothes
        </h1>
        <ResponsiveContainer width="100%" aspect={1.56}>
          <PieChart width={40} height={40}>
            <Pie
              data={finishedArray}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {finishedArray.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="flex justify-center">
          Favourite warmer: {maxWornWarmer}
        </div>
      </div>
    );
  }
}

export default ClothesCard;
