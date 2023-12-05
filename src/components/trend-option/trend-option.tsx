import React from 'react';
import './trend-option.css';
import Button from '@mui/material/Button';
import { styled } from '@mui/material';

export interface TrendOptionProps {
  name: string;
  trend: string;
  setTrend: (newTrend: string) => void;
}

const TrendButton = styled(Button)(`
  text-transform: none;
  padding: 0;
  border-radius: 20px;
  margin-right: 30px;
`);

function TrendOption(props: TrendOptionProps) {
  return (
    <TrendButton onClick={() => props.setTrend(props.name)}>
      <div className={`trend-option ${props.name === props.trend ? 'trend-option-selected' : 'trend-option-default'}`}>
        {props.name}
      </div>
    </TrendButton>
  );
}


export default TrendOption;