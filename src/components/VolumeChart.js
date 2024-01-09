import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-moment';
import 'chartjs-adapter-date-fns';

// Register the chart components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    TimeScale,
    Title,
    Tooltip,
    Legend
);

const VolumeChart = ({ data, symbol }) => {
    // Map the historical price data to the chartData object
    const chartData = {
        labels: data?.map((point) => point.date), // Use the date for labels
        datasets: [
          {
            label: `${symbol} Trading Volume`,
            data: data?.map((point) => point.volume), // Use the trading volume for data points
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };

    const chartOptions = {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Volume',
            },
          },
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
    };

    return (
        <div className="chart-container">
            {/* Render the Line chart with the chartData and chartOptions */}
            <Line data={chartData} options={chartOptions} />
        </div>
    );
};

export default VolumeChart;