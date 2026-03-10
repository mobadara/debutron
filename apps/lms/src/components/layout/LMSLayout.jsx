import React from 'react';
import { Outlet } from 'react-router-dom';
import { TopUtilityBar } from '@debutron/ui';
import LMSHeader from './LMSHeader';
import LMSFooter from './LMSFooter';

const LMSLayout = () => {
  return (
    // We lock the absolute height of the window here
    <div className="flex flex-col h-screen overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-300">
      
      {/* 1. Accessibility & Contact Bar */}
      <TopUtilityBar showUtilityLinks={true} />
      
      {/* 2. Global LMS Navigation */}
      <LMSHeader />
      
      {/* 3. The Scrollable Canvas */}
      {/* overflow-y-auto goes HERE. This ensures only the content scrolls, not the headers */}
      <main className="flex-1 overflow-y-auto w-full">
        {/* We use a max-width container to keep things readable on ultrawide monitors */}
        <div className="max-w-[1600px] mx-auto w-full h-full">
          <Outlet />
        </div>
        <LMSFooter />
      </main>

    </div>
  );
};

export default LMSLayout;