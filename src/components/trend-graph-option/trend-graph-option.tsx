import React from 'react';
import './trend-graph-option.css';
import Button from '@mui/material/Button';
import { styled } from '@mui/material';
// Interface for setting the trend represented in the graph
export interface GraphOptionProps {
    name: string;
    trend: string;
    setTrend: (newTrend: string) => void;
}
// Button to decide which trend to see the graph of
const GraphButton = styled(Button)(`
  text-transform: none;
  padding: 0;
  border-radius: 20px;
  margin-right: 30px;
`);
// Component for the button for setting trends
function TrendGraphOption(props: GraphOptionProps) {
    return (
        <GraphButton onClick={() => props.setTrend(props.name)}>
            <div className={`trend-graph-option ${props.name === props.trend ? 'trend-graph-option-selected' : 'trend-graph-option-default'}`}>
                {props.name}
            </div>
        </GraphButton>
    );
}


export default TrendGraphOption;