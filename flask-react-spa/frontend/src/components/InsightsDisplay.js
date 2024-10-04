// src/components/InsightsDisplay.js
import React, { useState, useEffect } from 'react';

const InsightsDisplay = () => {
    const [insights, setInsights] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchInsights();
    }, []);

    const fetchInsights = async () => {
        try {
            const response = await fetch('/api/insights');
            if (!response.ok) {
                throw new Error('Error fetching insights');
            }
            const data = await response.json();
            setInsights(data);
        } catch (error) {
            console.error('Error fetching insights:', error);
            setError('Failed to load insights.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading insights...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h2>Performance Insights</h2>
            <p>Total Metrics Collected: {insights.total_metrics_collected}</p>
            <p>Average Metric Value: {insights.average_metric_value}</p>
            <p>Suggested Action: {insights.suggested_action}</p>
        </div>
    );
};

export default InsightsDisplay;

