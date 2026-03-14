import React, { useState } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { 
  FiChevronLeft, FiVideo, FiBookOpen, FiUsers, FiEdit3, 
  FiAward, FiFileText, FiPaperclip, FiCheckCircle, FiCircle
} from 'react-icons/fi';
import 'katex/dist/katex.min.css';
import { getCourseById, getLessonById } from '../data/courses';

const ITEM_TYPE_ICONS = {
  video: FiVideo,
  reading: FiBookOpen,
  discussion: FiUsers,
  practice: FiEdit3,
  notes: FiFileText,
  graded: FiAward,
  assignment: FiFileText,
  resources: FiPaperclip,
};

export default function LessonViewer() {
  const { courseId, lessonId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const course = getCourseById(courseId);
  const lessonData = getLessonById(courseId, lessonId);
  const defaultItemId = lessonData?.items.find((item) => !item.locked)?.id || lessonData?.items?.[0]?.id;
  const activeItemId = searchParams.get('item') || defaultItemId;
  const [completedItems, setCompletedItems] = useState(defaultItemId ? [defaultItemId] : []);
  const activeItem = lessonData?.items.find((item) => item.id === activeItemId) || lessonData?.items?.[0];
  const isCompleted = completedItems.includes(activeItemId);

  if (!course || !lessonData || !activeItem) {
    return (
      <div className="flex-1 w-full flex flex-col bg-slate-50 dark:bg-slate-950 p-6 lg:p-10">
        <div className="max-w-4xl mx-auto w-full bg-white dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-800">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Lesson not found</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">This lesson may have been moved or removed.</p>
          <Link to={`/course/${courseId}/home`} className="inline-block bg-[#000080] text-white px-4 py-2 rounded-lg font-bold">
            Back to course home
          </Link>
        </div>
      </div>
    );
  }

  const toggleCompletion = () => {
    if (isCompleted) {
      setCompletedItems(prev => prev.filter(id => id !== activeItemId));
    } else {
      setCompletedItems(prev => [...prev, activeItemId]);
    }
  };

  // Dynamic Content Renderer
  const renderContent = () => {
    switch (activeItem.type) {
      case 'video':
        const videoData = activeItem.content;
        return (
          <div className="flex flex-col gap-6 animate-in fade-in duration-300">
            <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-lg border border-slate-800">
              <video controls className="w-full h-full object-cover">
                <source src={videoData.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 lg:p-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Lecture Overview</h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{videoData.description}</p>
            </div>
          </div>
        );

      case 'reading':
        const readData = activeItem.content;
        return (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 lg:p-12 shadow-sm animate-in fade-in duration-300">
            <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-pre:bg-slate-900 prose-pre:text-slate-50 prose-code:text-[#0D9488]">
              <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
                {readData.markdown}
              </ReactMarkdown>
            </div>
          </div>
        );

      case 'practice':
      case 'graded':
      case 'discussion':
      case 'assignment':
      case 'notes':
      case 'resources':
        const ActiveItemIcon = ITEM_TYPE_ICONS[activeItem.type] || FiFileText;
        return (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-300">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${activeItem.type === 'graded' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-[#000080]'}`}>
              <ActiveItemIcon size={40} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{activeItem.title}</h2>
            <p className="text-slate-500 max-w-md mb-8">{activeItem.content?.description || `This module has a recommended completion window of ${activeItem.duration}.`}</p>
            <button className="px-8 py-3 bg-[#000080] hover:bg-blue-800 dark:bg-[#0D9488] dark:hover:bg-teal-500 text-white font-bold rounded-lg transition-colors shadow-lg">
              Open Module
            </button>
          </div>
        );

      default:
        return <p className="text-slate-500">Content module in development.</p>;
    }
  };

  return (
    <div className="flex-1 w-full flex flex-col h-full bg-slate-50 dark:bg-slate-950 overflow-hidden">
      
      {/* Top Navigation Bar */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between z-10 flex-shrink-0">
        <div className="flex items-center gap-4">
          <Link to={`/course/${courseId}/home`} className="p-2 text-slate-500 hover:text-[#000080] dark:hover:text-[#0D9488] bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors">
            <FiChevronLeft size={20} />
          </Link>
          <div className="hidden sm:block">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{course.title}</span>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{lessonData.title}</h1>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Sidebar: Lesson Table of Contents */}
        <aside className="hidden lg:flex flex-col w-80 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 overflow-y-auto">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-sm">Lesson Modules</h3>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 mt-4">
              <div className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${(completedItems.length / lessonData.items.length) * 100}%` }}></div>
            </div>
            <span className="text-xs text-slate-500 mt-2 block">{completedItems.length} of {lessonData.items.length} completed</span>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {lessonData.items.map(item => {
              const isActive = activeItemId === item.id;
              const isItemCompleted = completedItems.includes(item.id);
              const ItemIcon = ITEM_TYPE_ICONS[item.type] || FiFileText;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setSearchParams({ item: item.id })}
                  disabled={item.locked}
                  className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all ${
                    item.locked ? 'opacity-50 cursor-not-allowed' : ''
                  } ${
                    isActive 
                      ? 'bg-blue-50 border border-blue-200 dark:bg-teal-900/20 dark:border-teal-900/50 shadow-sm' 
                      : 'border border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:border-slate-200 dark:hover:border-slate-700'
                  }`}
                >
                  <div className={`mt-0.5 ${isItemCompleted ? 'text-emerald-500' : 'text-slate-400'}`}>
                    {isItemCompleted ? <FiCheckCircle size={18} /> : <FiCircle size={18} />}
                  </div>
                  <div className="flex-1">
                    <h4 className={`text-sm font-bold leading-tight mb-1 ${isActive ? 'text-[#000080] dark:text-[#0D9488]' : 'text-slate-700 dark:text-slate-300'}`}>
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <ItemIcon size={12} />
                      <span>{item.duration}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Canvas Area */}
        <main className="flex-1 flex flex-col overflow-y-auto relative bg-slate-50 dark:bg-slate-950">
          <div className="flex-1 p-6 lg:p-10 max-w-5xl mx-auto w-full">
            {/* The Dynamic Content gets rendered here */}
            {renderContent()}
          </div>

          {/* Sticky Bottom Action Bar */}
          <div className="sticky bottom-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4 lg:px-10 flex justify-between items-center shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)]">
            <button 
              onClick={toggleCompletion}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold transition-colors ${
                isCompleted 
                  ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              <FiCheckCircle size={20} />
              {isCompleted ? 'Completed' : 'Mark as Complete'}
            </button>

            <button className="px-6 py-2.5 bg-[#000080] hover:bg-blue-800 dark:bg-[#0D9488] dark:hover:bg-teal-500 text-white font-bold rounded-lg transition-colors">
              Next Module &rarr;
            </button>
          </div>
        </main>

      </div>
    </div>
  );
}