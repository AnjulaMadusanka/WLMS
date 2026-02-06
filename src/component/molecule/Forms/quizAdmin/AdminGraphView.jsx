import React, { useEffect, useState } from "react";
import { DialogContent } from "@mui/material";
import { BarChart } from "@mui/x-charts";

const AdminGraphView = ({ graphData }) => {
  const [chartData, setChartData] = useState([]);

  console.log(graphData, "graphData");

  useEffect(() => {
    if (graphData && graphData.length > 0) {
      const transformedData = graphData.map((item) => ({
        attempts: item.attempts,
        marks: parseFloat(item.marks),
      }));
      setChartData(transformedData);
    } else {
      setChartData([]);
    }
  }, [graphData]);

  return (
    <DialogContent>
      {chartData.length > 0 ? (
        <BarChart
          xAxis={[
            {
              label: "Attempts",
              scaleType: "band",
              data: chartData.map((item) => item.attempts.toString()),
            },
          ]}
          yAxis={[{ label: "Marks" }]}
          series={[{ data: chartData.map((item) => item.marks) }]}
          width={500}
          height={300}
        />
      ) : (
        <p>No data available</p>
      )}
    </DialogContent>
  );
};

export default AdminGraphView;
