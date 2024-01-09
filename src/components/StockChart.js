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

const StockChart = ({ data, symbol }) => {
    // Map the historical price data to the chartData object
    const chartData = {
        labels: data?.map((point) => point.priceDate), // Use the priceDate for labels
        datasets: [
            {
                label: `${symbol} Closing Price`,
                data: data?.map((point) => point.close), // Use the closing price for data points
                borderColor: 'rgba(75,192,192,1)',
                fill: false,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day',
                    tooltipFormat: 'MM/dd/yyyy',
                },
                title: {
                    display: true,
                    text: 'Date',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Closing Price (USD)',
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

export default StockChart;