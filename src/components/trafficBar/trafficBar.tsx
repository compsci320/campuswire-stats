// Importing React and CSS for the component
import React from 'react';
import './trafficBar.css';

// Define the TrafficBar component as a functional component
export const TrafficBar: React.FC = () => {
    // Rendering the component
    return (
        <div className="trafficbar shadow border-b border-gray-300 mb-8">
            <div className="trafficbar-title">Current Traffic</div>
        </div>
    );
}
