import React, { Component } from "react";
import clothing from "../JSON.files/clothing.json";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#FF8043",
  "#FF8044",
];

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

export class ClothesCard extends Component {
  render() {
    return (
      <ResponsiveContainer width="20%" aspect={1}>
        <PieChart width={40} height={40}>
          <Pie
            data={finishedArray}
            cx="50%"
            cy="50%"
            labelLine={false}
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
    );
  }
}

export default ClothesCard;
