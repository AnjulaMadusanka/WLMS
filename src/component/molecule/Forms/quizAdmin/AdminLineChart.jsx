import React, { useEffect, useState } from "react";
import { DialogContent } from "@mui/material";
import { LineChart } from "@mui/x-charts";

const AdminLineChart = ({ graphData }) => {
  const [chartData, setChartData] = useState({ xLabels: [], series: [] });

  useEffect(() => {
    if (graphData && graphData.length > 0) {
      const xLabels = [];
      const categoryMap = new Map();
  
      graphData.forEach((attempt, index) => {
        const attemptLabel = `Attempt ${index + 1}`;
        xLabels.push(attemptLabel);
  
        attempt.category_results.forEach((result) => {
          const { category_name, marks } = result;
          if (!categoryMap.has(category_name)) {
            categoryMap.set(category_name, Array(graphData.length).fill(0));
          }
          categoryMap.get(category_name)[index] = parseFloat(marks) || 0;
        });
      });
  
      const series = Array.from(categoryMap.entries()).map(([category, marksArray]) => ({
        label: category,
        data: marksArray.map((y, index) => ( y)),
      }));
  
      console.log({ xLabels, series }); 
      setChartData({ xLabels, series });
      console.log("Final Chart Data", { xLabels, series });
    } else {
      setChartData({ xLabels: [], series: [] });
    }
  }, [graphData]);

  
  

  return (
    <DialogContent>
      {chartData.series.length > 0 ? (
       <LineChart
       xAxis={[
         {
           label: "Attempts",
           scaleType: "point",
           data: chartData.xLabels,
         },
       ]}
       yAxis={[
         {
           label: "Marks",
         },
       ]}
       series={chartData.series.map((s) => ({
         label: s.label,
         data: s.data, 
       }))}
       tooltip={{
         trigger: "item",
         formatter: ({ series, x, y }) =>
           `${series}<br>Attempt: ${x}<br>Marks: ${y}`,
       }}
       width={800}
       height={400}
     />
     
      ) : (
        <p>No data available</p>
      )}
    </DialogContent>
  );
};

export default AdminLineChart;
