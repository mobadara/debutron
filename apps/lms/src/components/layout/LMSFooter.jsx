import React from 'react';

const LMSFooter = () => {
  return (
    <footer className="w-full bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 mt-auto">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
        <p>&copy; {new Date().getFullYear()} Debutron Lab. All rights reserved.</p>
        
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 font-medium">
          <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">IT Helpdesk</a>
          <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Accessibility Options</a>
          <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Campus Policies</a>
        </div>
      </div>
    </footer>
  );
};

export default LMSFooter;