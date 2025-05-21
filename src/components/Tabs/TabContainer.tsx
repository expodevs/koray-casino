"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface TabContextType {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

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
