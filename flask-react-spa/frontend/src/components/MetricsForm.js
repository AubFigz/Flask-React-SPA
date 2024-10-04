// src/components/MetricsForm.js
import React, { useState } from 'react';

const MetricsForm = ({ onMetricAdded }) => {
    const [metricName, setMetricName] = useState('');
    const [value, setValue] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!metricName || !value || isNaN(value)) {
            setError('Please provide a valid metric name and value.');
            return;
        }

        const metricData = { metric_name: metricName, value: parseInt(value) };

        try {
            const response = await fetch('/api/metrics', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(metricData),
            });

            if (!response.ok) {
                throw new Error('Error adding metric');
            }

            const data = await response.json();
            console.log('Metric added:', data);
            onMetricAdded();
            // Reset form fields
            setMetricName('');
            setValue('');
            setError(null);
        } catch (error) {
            console.error('Error adding metric:', error);
            setError('Failed to add metric.');
        }
    };

    return (
        <div>
            <h2>Add New Metric</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Metric Name:</label>
                    <input
                        type="text"
                        value={metricName}
                        onChange={(e) => setMetricName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Value:</label>
                    <input
                        type="number"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Metric</button>
            </form>
        </div>
    );
};

export default MetricsForm;

