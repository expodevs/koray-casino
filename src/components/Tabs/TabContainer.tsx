"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';

// Create a context for tab state management
interface TabContextType {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

// Hook to use the tab context
export const useTabContext = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('useTabContext must be used within a TabContainer');
  }
  return context;
};

interface TabContainerProps {
  children: ReactNode;
  defaultTab?: string;
  className?: string;
}

export const TabContainer: React.FC<TabContainerProps> = ({ 
  children, 
  defaultTab = '', 
  className = '' 
}) => {
  const [activeTab, setActiveTab] = useState<string>(defaultTab);

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>
        {children}
      </div>
    </TabContext.Provider>
  );
};

export default TabContainer;
