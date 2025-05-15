"use client";

import React, { ReactNode } from 'react';
import { useTabContext } from './TabContainer';

interface TabContentProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export const TabContent: React.FC<TabContentProps> = ({
  id,
  children,
  className = ''
}) => {
  const { activeTab } = useTabContext();
  
  if (activeTab !== id) {
    return null;
  }

  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default TabContent;
