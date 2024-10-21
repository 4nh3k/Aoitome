import { CustomFlowbiteTheme, Tabs } from "flowbite-react";
import React, { useState } from "react";

interface TabSliderProps {
  items: string[];
  defaultActive?: string; 
  setSelectedItem: (value: string) => void;
  // Optional prop to set default active tab
}

const TabSlider: React.FC<TabSliderProps> = ({ items, defaultActive, setSelectedItem }) => {
  const [activeTab, setActiveTab] = useState(defaultActive || items[0]); // Set initial active tab
  
  const handleSetActiveTab = (item: string) => {
    console.log("Selected filter: ", item);
    setSelectedItem(item);
    setActiveTab(item);
  }
  const customTheme: CustomFlowbiteTheme = {};

  return (
    <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
      <ul
        className="flex flex-wrap -mb-px text-sm font-medium text-center"
        id="default-tab"
        data-tabs-toggle="#default-tab-content"
        role="tablist"
      >
        {items.map((item) => (
          <li className="me-2" role="presentation" key={item}>
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === item
                  ? "border-blue-500 text-blue-600" // Active style
                  : "border-transparent text-gray-500 dark:text-gray-400" // Inactive style
              }`}
              id={`${item}-tab`}
              data-tabs-target={`#${item}`}
              type="button"
              role="tab"
              aria-controls={item}
              aria-selected={activeTab === item}
              onClick={() => handleSetActiveTab(item)} // Set active tab on click
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TabSlider;
