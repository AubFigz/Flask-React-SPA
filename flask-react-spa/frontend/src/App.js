// src/App.js
import React, { useState } from 'react';
import MetricsForm from './components/MetricsForm';
import MetricsDisplay from './components/MetricsDisplay';
import InsightsDisplay from './components/InsightsDisplay';

function App() {
    const [refresh, setRefresh] = useState(false);

    const handleMetricAdded = () => {
        setRefresh(!refresh);  // Toggle refresh state to trigger data reload
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Operations Dashboard</h1>
                <MetricsForm onMetricAdded={handleMetricAdded} />
                <MetricsDisplay refresh={refresh} />
                <InsightsDisplay refresh={refresh} />
            </header>
        </div>
    );
}

export default App;

