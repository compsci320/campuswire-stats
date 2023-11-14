import React from 'react';
import './trend-option.css';

interface TrendOptionProps {
    name: string;
}

function TrendOption(props: TrendOptionProps) {
    return (
      <div className="trend-option">
        {props.name}
      </div>    
    );
  }
  
export default TrendOption;