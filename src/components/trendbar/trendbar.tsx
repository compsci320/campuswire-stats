import './trendbar.css';
import MovingIcon from '@mui/icons-material/Moving';

function Trendbar() {
  return (
    <div>
      <div className="trendbar shadow border-b border-gray-300 mb-8">
      <div className="trendbar-title">Trending </div>
        <MovingIcon />
      </div>
      <div style={{ height: 80 }}></div>
    </div>
  );
}

export default Trendbar;
