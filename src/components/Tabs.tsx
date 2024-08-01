import React, { useState } from 'react';
import '../css/components/tabs.css';

interface TabProps {
  label: string;
  children: React.ReactNode;
}

/**
 * Represents an individual tab within a `Tabs` component.
 * 
 * @param {TabProps}
 * @returns {JSX.Element}
 */
const Tab: React.FC<TabProps> = ({ label, children }) => {
  return <div>{children}</div>;
};

interface TabsProps {
  children: React.ReactElement<TabProps>[];
}

/**
 * Manages the tabs and controls which tab is currently active.
 * 
 * @param {TabsProps}
 * @returns {JSX.Element}
 */
const Tabs: React.FC<TabsProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="tabs">
      <div className="tab-headers">
        {children.map((tab, index) => (
          <button
            key={index}
            className={`tab-header ${index === activeTab ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.props.label}
          </button>
        ))}
      </div>
      <div className="tab-content">{children[activeTab]}</div>
    </div>
  );
};

export { Tabs, Tab };