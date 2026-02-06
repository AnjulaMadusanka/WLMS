import React, { useEffect, useState, useRef } from 'react';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, Filler , LineController,} from 'chart.js';
import { Scatter,Line } from 'react-chartjs-2';
import _, { isNumber } from 'lodash';



// Register Chart.js components
ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend,LineController, Filler);

const BellCurveGraph = ({ list = [] ,studentMark=NaN }) => {
  const [userType, setUserType] = useState(1);
  const [type, setType]= useState(1);

		useEffect(() => {
			getUserType()
			// console.log("scatterData ",scatterData)
		}, []);
	
		const getUserType = async () => {
			const type = localStorage.getItem('userType');
			setUserType(type)
		};
	const chartRef = useRef(null);
	// Scatter plot data points
	const scatterData = (list) => {

	     let d ={x: 0,y:0}
		const listValue = _(list).countBy().map((count, value) => ({ x: parseInt(value, 10), y:count })).value();
		// if(!_.isNaN(value) && isNumber(parseInt(value))){
		// 	d = _.find(listValue, i => i.x == parseInt(value));
		// }
		return listValue
	};
	// Bell curve data
	const bellCurveData = (standardDeviation, mean) => {
		const curveData = Array.from({ length: 100 }, (_, i) => {
			const x = i; // x-values
			const y =
				1 /
				(standardDeviation * Math.sqrt(2 * Math.PI)) *
				Math.exp(-0.5 * Math.pow((x - mean) / standardDeviation, 2));
			return { x, y };
		});
		return curveData;
	};

	// Function to calculate mean
	const calculateMean = (data) => {
		const sum = data.reduce((acc, value) => acc + value, 0);
		return sum / data.length;
	};

	// Function to calculate standard deviation
	const calculateStandardDeviation = (data) => {
		const mean = calculateMean(data);
		const variance = data.reduce((acc, value) => acc + Math.pow(value - mean, 2), 0) / data.length;
		return Math.sqrt(variance);
	};


	// Chart data and options
	const data = (list, studentMark) => {
		const marks = _.map(list, (i) => parseInt(i));
		const scatter = scatterData(marks);
		const mean = calculateMean(marks);
		const standardDeviation = calculateStandardDeviation(marks);
        const bellCurve = bellCurveData(standardDeviation, mean).map((point) => ({ x: point.x, y: point.y }));
		const listZ= type==1? bellCurve: scatter;

		const t = {
			datasets:userType==0?
			[{
				label: 'Data',
				data: scatter,
				backgroundColor: 'rgba(54, 162, 235, 1)', // Points
				pointRadius: 3,
				type: 'scatter',
				hidden:true
			},
			{
				label: 'Frequency',
				// data: bellCurveData(standardDeviation, mean),
				data: bellCurve,
				borderColor: 'rgba(54, 162, 235, 1)', // Curve outline
				backgroundColor: 'rgba(54, 162, 235, 0.2)', // Curve fill
				tension: 0.4,
				fill: true,
				borderWidth: 1.5,
				type: 'line',
			}]
			
			:[
				{
					label: 'Data',
					data: scatter,
					backgroundColor: 'rgba(54, 162, 235, 1)', // Points
					pointRadius: 3,
					type: 'scatter',
					hidden:true
				},
				{
					label: 'Frequency',
					// data: bellCurveData(standardDeviation, mean),
					data: bellCurve,
					borderColor: 'rgba(54, 162, 235, 1)', // Curve outline
					backgroundColor: 'rgba(54, 162, 235, 0.2)', // Curve fill
					tension: 0.4,
					fill: true,
					borderWidth: 1.5,
					type: 'line'
				},
				{
					label: "Your Mark",
					data: [{ x: studentMark, y: 0 }, { x: studentMark, y: Math.max(...listZ.map(d => d.y)) }],
					type: "line",
					borderColor: "rgba(255, 99, 132, 1)",
					borderDash: [5, 5],
					borderWidth: 2,
					pointRadius: 0,
					showLine: true,
					// hidden:true
				  },

				// {
				// 	label: "Your Mark Fq",
				// 	data: [{ x: studentMark, y: 0 }, { x: studentMark, y: Math.max(... bellCurveData(standardDeviation, mean).map((d) => d.y)) }],
				// 	type: "line",
				// 	borderColor: "rgba(255, 99, 132, 1)",
				// 	backgroundColor: "rgba(255, 99, 132, 1)",
				// 	borderWidth: 2,
				// 	pointRadius: 0,
				// 	showLine: true,
				//   },
				
			]
		};

		return t;
	};

	const options = {
		scales: {
			x: {
				title: { display: true, text: 'Marks' }
			},
			y: {
				title: { display: true, text: 'Students' }
			}
		},
		plugins: {
			legend: {
				display: true,
				position: 'top',
				onClick: (e, legendItem, legend) => {
					const chart = chartRef.current;
					const datasetIndex = legendItem.datasetIndex;
					const text = legendItem?.text;
					const status = legendItem.hidden;

					if(datasetIndex==0){
                        if(status){
							// hidden at this time
							// chartRef?.current?.config()
							setType(0)
							 const isVisible = chartRef?.current?.isDatasetVisible(datasetIndex);
							chart.setDatasetVisibility(0, !isVisible); // Toggle visibility
							chart.update();
							chart.setDatasetVisibility(1, isVisible); 
                            chart.update();
							
						}else{
							// visible at this time
							setType(1)
							const isVisible = chartRef?.current?.isDatasetVisible(datasetIndex);
							chart.setDatasetVisibility(0, !isVisible); // Toggle visibility
							chart.update();
							chart.setDatasetVisibility(1, isVisible); 
                            chart.update();
							
						}
					}
					if(datasetIndex==1){
						if(status){
							setType(1)
							const isVisible = chartRef?.current?.isDatasetVisible(datasetIndex);
							chart.setDatasetVisibility(0, isVisible); // Toggle visibility
							chart.update();
							chart.setDatasetVisibility(1, !isVisible); 
                            chart.update();
							
						}else{
							// visible at this time
							setType(2)
							const isVisible = chartRef?.current?.isDatasetVisible(datasetIndex);
							chart.setDatasetVisibility(0, isVisible); // Toggle visibility
							chart.update();
							chart.setDatasetVisibility(1, !isVisible); 
                            chart.update();
							
						}
					}
				  },
			}
		},
		maintainAspectRatio: false
	};

	return <Scatter ref={chartRef} data={data(list, studentMark)} options={options} />;
};

export default BellCurveGraph;
