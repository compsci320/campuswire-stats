import React from 'react';
import './trafficBar.css';

export const TrafficBar: React.FC = () => {
    return (
        <div className="trafficbar shadow border-b border-gray-300 mb-8">
            <div className="trafficbar-title">Current Traffic</div>
        </div>
    );
}
