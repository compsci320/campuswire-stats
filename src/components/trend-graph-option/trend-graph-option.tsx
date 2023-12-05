import React from 'react';
import './trend-graph-option.css';
import Button from '@mui/material/Button';
import { styled } from '@mui/material';

export interface GraphOptionProps {
    name: string;
    trend: string;
    setTrend: (newTrend: string) => void;
}

const GraphButton = styled(Button)(`
  text-transform: none;
  padding: 0;
  border-radius: 20px;
  margin-right: 30px;
`);

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