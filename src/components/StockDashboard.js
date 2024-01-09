import React, { useState, useEffect } from 'react';
import { fetchStockData } from '../api/stockAPI';
import StockChart from './StockChart';
import StockSearch from './StockSearch';
import VolumeChart from './VolumeChart';
import './StockDashboard.css'; // Make sure this CSS file exists and contains the styles you want

const StockDashboard = () => {
    const [stockSymbol, setStockSymbol] = useState('AAPL'); // Default stock symbol
    const [stockData, setStockData] = useState(null); // State for storing stock data
    const [loading, setLoading] = useState(false); // State to manage loading status

    useEffect(() => {
        const loadData = async () => {
            setLoading(true); // Start loading
            try {
                const data = await fetchStockData(stockSymbol);
                console.log(data)
                setStockData(data); // Set stock data
            } catch (error) {
                console.error('Could not fetch stock data:', error);
                setStockData([]); // Set empty data on error
            }
            setLoading(false); // Stop loading
        };

        loadData();
    }, [stockSymbol]); // Effect runs when stockSymbol changes

    return (
        <div className="stock-dashboard">
            <h1>Stock Market Dashboard</h1>
            <StockSearch setStockSymbol={setStockSymbol} />
            {loading ? (
                <p>Loading...</p>
            ) : stockData && stockData.length > 0 ? (
                <><StockChart data={stockData} symbol={stockSymbol} /><VolumeChart data={stockData} symbol={stockSymbol} /></>
            ) : (
                <p>No data available for the selected stock symbol.</p>
            )}
        </div>
    );
};

export default StockDashboard;