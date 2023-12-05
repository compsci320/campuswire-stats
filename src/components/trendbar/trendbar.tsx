import './trendbar.css';
import TrendOption from '../trend-option/trend-option';
import MovingIcon from '@mui/icons-material/Moving';

export interface TrendbarOptions {
  trendOptions: Array<any>;
}

function Trendbar(props: TrendbarOptions) {
  return (
    <div className="trendbar">
      <div className="trendbar-title">Trending </div>
      {props.trendOptions.map((item: any) => (
        <div key={Math.random()} className="trendbar-options">
          <TrendOption name={item.name} trend={item.trend} setTrend={item.setTrend} />
        </div>
      ))} 
    </div>
  );
}

export default Trendbar;
