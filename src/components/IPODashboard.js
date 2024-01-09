import React, { useState, useEffect } from 'react';
import './Dashboard.css'; // Assuming you have a CSS file for styling

const Dashboard = () => {
    const [upcomingIPOs, setUpcomingIPOs] = useState([]);
    const [currencyRates, setCurrencyRates] = useState([]);
    const [loadingIPOs, setLoadingIPOs] = useState(true);
    const [loadingCurrencies, setLoadingCurrencies] = useState(true);
    const API_KEY = 'pk_d510c531b8fb4037bd83bb0ca73f59ce';

    useEffect(() => {
        const fetchUpcomingIPOs = async () => {
            setLoadingIPOs(true);
            try {
                const response = await fetch(`https://api.iex.cloud/v1/data/CORE/UPCOMING_IPOS/market?token=${API_KEY}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setUpcomingIPOs(data); // Use the parsed data
            } catch (error) {
                console.error('Error fetching upcoming IPOs:', error);
            }
            setLoadingIPOs(false);
        };

        const fetchCurrencyRates = async () => {
            setLoadingCurrencies(true);
            try {
                const response = await fetch(`https://api.iex.cloud/v1/fx/latest?symbols=USDCAD,GBPUSD,USDJPY&token=${API_KEY}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setCurrencyRates(data); // Use the parsed data
            } catch (error) {
                console.error('Error fetching currency rates:', error);
            }
            setLoadingCurrencies(false);
        };

        fetchUpcomingIPOs();
        fetchCurrencyRates();
    }, [API_KEY]);

    const formatDate = (dateString) => {
        if (!dateString) return 'TBA'; // To Be Announced
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    };

    return (
        <div className="dashboard">
            <h1>Financial Dashboard</h1>

            <section className="upcoming-ipos">
                <h2>Upcoming IPOs</h2>
                {loadingIPOs ? (
                    <p>Loading IPOs...</p>
                ) : (
                    <div className="ipo-list">
                        {upcomingIPOs.map((ipo, index) => (
                            <div className="ipo-item" key={index}>
                                <strong>{ipo.companyName || 'N/A'}</strong>
                                <span>Expected Date: {formatDate(ipo.expectedDate)}</span>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <section className="currency-rates">
                <h2>Latest Currency Rates</h2>
                {loadingCurrencies ? (
                    <p>Loading currency rates...</p>
                ) : (
                    <div className="currency-list">
                        {currencyRates.map((rate, index) => (
                            <div className="currency-item" key={index}>
                                <strong>{rate.symbol}:</strong>
                                <span>{rate.rate ? formatCurrency(rate.rate) : 'N/A'}</span>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Dashboard;