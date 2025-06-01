import React from 'react';

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  const tabs = ['Profile', 'Teams', 'Billings'];

  return (
    <div className="mb-6 border-b border-gray-200">
      <nav className="flex space-x-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 font-medium ${
              activeTab === tab
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Tabs;
