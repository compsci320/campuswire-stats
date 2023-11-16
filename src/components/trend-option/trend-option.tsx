import React from 'react';
import './trend-option.css';
import Button from '@mui/material/Button';
import { styled } from '@mui/material';

interface TrendOptionProps {
  name: string;
  trend: string;
  setTrend: (newTrend: string) => void;
}

const TrendButton = styled(Button)(`
  text-transform: none;
  padding: 0;
  border-radius: 20px;
  margin-right: 75px;
`);

function TrendOption(props: TrendOptionProps) {
    return (
      <TrendButton onClick={() => props.setTrend(props.name)}>
        {
          props.name === props.trend ?
            <div className="trend-option-selected">
              {props.name}
            </div>
          :
            <div className="trend-option-default">
              {props.name}
            </div>
        }  
      </ TrendButton>  
    );
  }
  
export default TrendOption;