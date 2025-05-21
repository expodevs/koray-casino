"use client";

import React from 'react';
import { useTabContext } from './TabContainer';

interface TabProps {
  id: string;
  label: React.ReactNode;
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
}

export const Tab: React.FC<TabProps> = ({
  id,
  label,
  className = 'pb-3 px-1 transition-colors duration-200',
  activeClassName = 'text-blue-600 border-b-2 border-blue-600',
  inactiveClassName = 'text-gray-500 hover:text-gray-700'
}) => {
  const { activeTab, setActiveTab } = useTabContext();
  const isActive = activeTab === id;

  return (
    <button
      type="button"
      onClick={() => setActiveTab(id)}
      className={`${className} ${isActive ? activeClassName : inactiveClassName}`}
    >
      {label}
    </button>
  );
};

export default Tab;
