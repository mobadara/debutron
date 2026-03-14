import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { TopUtilityBar } from '@debutron/ui';
import LMSHeader from './LMSHeader';
import LMSFooter from './LMSFooter';

const LMSLayout = () => {
  const [isProctoredLockdown, setIsProctoredLockdown] = useState(false)

  return (
    <div className="min-h-screen w-full flex flex-col bg-white dark:bg-slate-950 transition-colors duration-300">
      
      {/* 1. Accessibility & Contact Bar */}
      {!isProctoredLockdown && <TopUtilityBar showUtilityLinks={true} />}
      
      {/* 2. Global LMS Navigation */}
      {!isProctoredLockdown && <LMSHeader />}
      
      <div className="flex-1 w-full flex flex-col">
        <main className="flex-1 w-full flex flex-col">
          <Outlet context={{ isProctoredLockdown, setIsProctoredLockdown }} />
        </main>
        {!isProctoredLockdown && <LMSFooter />}
      </div>

    </div>
  );
};

export default LMSLayout;