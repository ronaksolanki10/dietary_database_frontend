import React from 'react';
import '../../css/components/common/iddsiLevelInfo.css';

/**
 * Displays IDDSI levels and their descriptions.
 * 
 * @returns {JSX.Element}
 */
const IddsiLevelInfo: React.FC = () => {
  return (
    <div className="iddsi-level-info-container">
      <div className="iddsi-level-info-title">IDDSI Framework Information</div>
      <ul className="iddsi-level-info-list">
        <li className="iddsi-level-info-item">0 - THIN</li>
        <li className="iddsi-level-info-item">1 - SLIGHTLY THICK</li>
        <li className="iddsi-level-info-item">2 - MILDLY THICK</li>
        <li className="iddsi-level-info-item">3 - MODERATELY THIN</li>
        <li className="iddsi-level-info-item">4 - EXTREMELY THIN</li>
        <li className="iddsi-level-info-item">5 - MINCED & MOIST</li>
        <li className="iddsi-level-info-item">6 - SOFT & BITE-SIZED</li>
        <li className="iddsi-level-info-item">7 - EASY TO CHEW</li>
      </ul>
    </div>
  );
};

export default IddsiLevelInfo;