// src/components/MetricsDisplay.js
import React, { useState, useEffect } from 'react';

const MetricsDisplay = () => {
    const [metrics, setMetrics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMetrics();
    }, []);

    const fetchMetrics = async () => {
        try {
            const response = await fetch('/api/metrics');
            if (!response.ok) {
                throw new Error('Error fetching metrics');
            }
            const data = await response.json();
            setMetrics(data);
        } catch (error) {
            console.error('Error fetching metrics:', error);
            setError('Failed to load metrics.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading metrics...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h2>Metrics Data</h2>
            <table>
                <thead>
                    <tr>
                        <th>Metric Name</th>
                        <th>Value</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {metrics.map((metric, index) => (
                        <tr key={index}>
                            <td>{metric.metric_name}</td>
                            <td>{metric.value}</td>
                            <td>{metric.timestamp}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MetricsDisplay;

