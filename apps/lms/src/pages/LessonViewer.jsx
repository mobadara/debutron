import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link, useNavigate, useOutletContext, useSearchParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { 
  FiChevronLeft, FiVideo, FiBookOpen, FiUsers, FiEdit3, 
  FiAward, FiFileText, FiPaperclip, FiCheckCircle, FiCircle, FiPrinter, FiVolume2, FiSquare
} from 'react-icons/fi';
import 'katex/dist/katex.min.css';
import { getCourseById } from '../data/courses';
import { formatRelativeTimestamp, getLessonProgress, getQuizAttempt, getResolvedCourse, getResolvedLesson, saveLessonProgress } from '../data/lmsProgress';

import QuizEngine from '../components/course/QuizEngine';

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
  const [isTesting, setIsTesting] = useState(false);
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const outletContext = useOutletContext();
  const { setIsProctoredLockdown } = outletContext || {};
  const baseCourse = outletContext?.course ?? getCourseById(courseId);
  const [lessonProgress, setLessonProgress] = useState(() => getLessonProgress(courseId, lessonId));

  useEffect(() => {
    setLessonProgress(getLessonProgress(courseId, lessonId));
  }, [courseId, lessonId]);

  const course = useMemo(
    () => (baseCourse ? getResolvedCourse(baseCourse) : null),
    [baseCourse]
  );

  const baseLesson = useMemo(
    () => course?.lessons?.find((lesson) => lesson.id === lessonId) ?? null,
    [course, lessonId]
  );

  const lessonData = useMemo(
    () => (baseLesson ? getResolvedLesson(courseId, baseLesson, lessonProgress) : null),
    [baseLesson, courseId, lessonProgress]
  );

  const defaultItemId = lessonData?.items.find((item) => !item.locked)?.id || lessonData?.items?.[0]?.id;
  const activeItemId = searchParams.get('item') || defaultItemId;
  const activeItem = lessonData?.items.find((item) => item.id === activeItemId) || lessonData?.items?.[0];
  const completedItems = lessonProgress.completedItemIds;
  const isCompleted = completedItems.includes(activeItemId);
  const activeVideoData = activeItem?.type === 'video' ? activeItem.content : null;
  const captionTracks = activeVideoData?.captionTracks ?? [];
  const videoRef = React.useRef(null);
  const speechUtteranceRef = React.useRef(null);

  useEffect(() => {
    if (activeItem?.type !== 'practice' && activeItem?.type !== 'graded') {
      setIsTesting(false);
    }
  }, [activeItem]);

  useEffect(() => {
    if (activeItem?.type !== 'reading' && isReadingAloud) {
      window.speechSynthesis?.cancel();
      speechUtteranceRef.current = null;
      setIsReadingAloud(false);
    }
  }, [activeItem, isReadingAloud]);

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
      speechUtteranceRef.current = null;
    };
  }, []);

  const isActiveProctoredQuiz = activeItem?.type === 'graded' && activeItem?.content?.quizData?.isProctored;

  const enterFullscreen = async () => {
    const fullscreenTarget = document.documentElement;

    if (document.fullscreenElement || !fullscreenTarget?.requestFullscreen) {
      return;
    }

    try {
      await fullscreenTarget.requestFullscreen();
    } catch {
      // Ignore browsers that block fullscreen without direct user permission.
    }
  };

  const exitFullscreen = async () => {
    if (!document.fullscreenElement || !document.exitFullscreen) {
      return;
    }

    try {
      await document.exitFullscreen();
    } catch {
      // Ignore if browser refuses fullscreen exit during transitions.
    }
  };

  useEffect(() => {
    const shouldLockdown = Boolean(isTesting && isActiveProctoredQuiz);
    setIsProctoredLockdown?.(shouldLockdown);

    if (!shouldLockdown) {
      exitFullscreen();
    }

    return () => {
      setIsProctoredLockdown?.(false);
    };
  }, [isActiveProctoredQuiz, isTesting, setIsProctoredLockdown]);

  useEffect(() => {
    if (!isTesting || !isActiveProctoredQuiz) {
      return;
    }

    const handleEscapeBlock = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        enterFullscreen();
      }
    };

    document.addEventListener('keydown', handleEscapeBlock, true);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('keydown', handleEscapeBlock, true);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [isActiveProctoredQuiz, isTesting]);

  useEffect(() => {
    if (!searchParams.get('item') && defaultItemId) {
      setSearchParams({ item: defaultItemId }, { replace: true });
    }
  }, [defaultItemId, searchParams, setSearchParams]);

  useEffect(() => {
    if (activeItem?.locked && defaultItemId && activeItem.id !== defaultItemId) {
      setSearchParams({ item: defaultItemId }, { replace: true });
    }
  }, [activeItem, defaultItemId, setSearchParams]);

  useEffect(() => {
    if (lessonData?.disabled) {
      navigate(`/course/${courseId}/contents`, { replace: true });
    }
  }, [courseId, lessonData?.disabled, navigate]);

  if (!course || !lessonData || !activeItem || lessonData?.disabled) {
    return (
      <div className="flex-1 w-full flex flex-col bg-slate-50 dark:bg-slate-950 p-6 lg:p-10">
        <div className="max-w-4xl mx-auto w-full bg-white dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-800">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Lesson not found</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">This lesson may have been moved or removed.</p>
          <Link to={`/course/${courseId}/overview`} className="inline-block bg-[#000080] text-white px-4 py-2 rounded-lg font-bold">
            Back to course home
          </Link>
        </div>
      </div>
    );
  }

  const persistLessonProgress = (updater) => {
    setLessonProgress((previousProgress) => {
      const nextProgress = typeof updater === 'function' ? updater(previousProgress) : updater;
      return saveLessonProgress(courseId, lessonId, nextProgress);
    });
  };

  const toggleCompletion = () => {
    persistLessonProgress((previousProgress) => ({
      ...previousProgress,
      completedItemIds: previousProgress.completedItemIds.includes(activeItemId)
        ? previousProgress.completedItemIds.filter((id) => id !== activeItemId)
        : [...previousProgress.completedItemIds, activeItemId],
    }));
  };

  const flattenedCourseItems = course.lessons.flatMap((lesson) =>
    lesson.items.map((item) => ({
      lessonId: lesson.id,
      itemId: item.id,
      locked: item.locked,
    }))
  );

  const currentFlatIndex = flattenedCourseItems.findIndex(
    (item) => item.lessonId === lessonId && item.itemId === activeItemId
  );

  const nextModule = currentFlatIndex >= 0
    ? flattenedCourseItems.slice(currentFlatIndex + 1).find((item) => !item.locked)
    : null;

  const handleMoveToNextModule = () => {
    if (!nextModule) {
      navigate(`/course/${courseId}/overview`);
      return;
    }

    navigate(`/course/${courseId}/lesson/${nextModule.lessonId}?item=${nextModule.itemId}`);
  };

  const stripMarkdownForSpeech = (markdown = '') => markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[[^\]]*\]\([^)]*\)/g, '$1')
    .replace(/[#>*_~-]/g, ' ')
    .replace(/\$\$[\s\S]*?\$\$/g, ' ')
    .replace(/\$[^$]*\$/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const handlePrintReading = () => {
    window.print();
  };

  const handleToggleListenReading = (markdown) => {
    if (!('speechSynthesis' in window) || typeof SpeechSynthesisUtterance === 'undefined') {
      return;
    }

    if (isReadingAloud) {
      window.speechSynthesis.cancel();
      speechUtteranceRef.current = null;
      setIsReadingAloud(false);
      return;
    }

    const contentToRead = stripMarkdownForSpeech(markdown);
    if (!contentToRead) {
      return;
    }

    if (videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
    }

    const utterance = new SpeechSynthesisUtterance(contentToRead);
    const voices = window.speechSynthesis.getVoices();
    const preferredFemaleVoicePatterns = [
      'Google UK English Female',
      'Microsoft Aria',
      'Microsoft Zira',
      'Samantha',
      'Karen',
      'Victoria',
    ];

    let selectedVoice = null;
    for (const voicePattern of preferredFemaleVoicePatterns) {
      selectedVoice = voices.find((voice) =>
        voice.name.toLowerCase().includes(voicePattern.toLowerCase())
      );
      if (selectedVoice) {
        break;
      }
    }

    if (!selectedVoice) {
      selectedVoice = voices.find((voice) => {
        const descriptor = `${voice.name} ${voice.voiceURI}`.toLowerCase();
        return descriptor.includes('female') || descriptor.includes('zira') || descriptor.includes('samantha');
      });
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
      utterance.lang = selectedVoice.lang;
    }

    utterance.rate = 0.82;
    utterance.pitch = 1;
    utterance.volume = 0.95;
    utterance.onend = () => {
      speechUtteranceRef.current = null;
      setIsReadingAloud(false);
    };
    utterance.onerror = () => {
      speechUtteranceRef.current = null;
      setIsReadingAloud(false);
    };

    speechUtteranceRef.current = utterance;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsReadingAloud(true);
  };

  // Dynamic Content Renderer
  const renderContent = () => {
    switch (activeItem.type) {
      case 'video': {
        const videoData = activeItem.content;
        return (
          <div className="flex flex-col gap-6 animate-in fade-in duration-300">
            <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-lg border border-slate-800">
              <video ref={videoRef} controls className="w-full h-full object-cover">
                <source src={videoData.videoUrl} type="video/mp4" />
                {captionTracks.map((track) => (
                  <track
                    key={track.srclang}
                    kind="subtitles"
                    srcLang={track.srclang}
                    label={track.label}
                    src={track.src}
                    default={track.default}
                  />
                ))}
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 lg:p-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Lecture Overview</h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{videoData.description}</p>
            </div>
          </div>
        );
      }

      case 'reading': {
        const readData = activeItem.content;
        return (
          <div className="reading-printable bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 lg:p-12 shadow-sm animate-in fade-in duration-300">
            <div className="print:hidden flex flex-wrap items-center justify-end gap-3 mb-6">
              <button
                type="button"
                onClick={() => handleToggleListenReading(readData.markdown)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
              >
                {isReadingAloud ? <FiSquare size={16} /> : <FiVolume2 size={16} />}
                {isReadingAloud ? 'Stop Listening' : 'Listen'}
              </button>
              <button
                type="button"
                onClick={handlePrintReading}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-white bg-[#000080] hover:bg-blue-800 dark:bg-[#0D9488] dark:hover:bg-teal-500 transition-colors"
              >
                <FiPrinter size={16} />
                Print
              </button>
            </div>
            <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-pre:bg-slate-900 prose-pre:text-slate-50 prose-code:text-[#0D9488]">
              <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
                {readData.markdown}
              </ReactMarkdown>
            </div>
          </div>
        );
      }

      case 'practice':
      case 'graded': {
        const quizPayload = activeItem.content?.quizData;

        if (!quizPayload) {
          return <p className="text-slate-500">Quiz content is not available for this module yet.</p>;
        }
        
        return (
          <div className="w-full h-full py-3 lg:py-4">
            <QuizEngine 
              key={activeItem.id}
              quizData={quizPayload} 
              onStart={() => {
                setIsTesting(true);

                if (quizPayload.isProctored) {
                  enterFullscreen();
                }
              }}
              onComplete={(score) => {
                setIsTesting(false);
                persistLessonProgress((previousProgress) => ({
                  ...previousProgress,
                  completedItemIds: previousProgress.completedItemIds.includes(activeItem.id)
                    ? previousProgress.completedItemIds
                    : [...previousProgress.completedItemIds, activeItem.id],
                  quizAttempts: {
                    ...previousProgress.quizAttempts,
                    [activeItem.id]: {
                      score,
                      totalPoints: quizPayload.questions
                        .filter((question) => question.type === 'mcq')
                        .reduce((sum, question) => sum + question.points, 0),
                      status: 'completed',
                      passed:
                        score >=
                        quizPayload.questions
                          .filter((question) => question.type === 'mcq')
                          .reduce((sum, question) => sum + question.points, 0) * 0.7,
                      title: activeItem.title,
                      completedAt: new Date().toISOString(),
                    },
                  },
                }));
              }}
              onTerminate={() => {
                setIsTesting(false);
              }} 
              onReturn={() => navigate(`/course/${courseId}/overview`)}
            />
          </div>
        );
      }

      case 'discussion':
      case 'assignment':
      case 'notes':
      case 'resources': {
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
      }

      default:
        return <p className="text-slate-500">Content module in development.</p>;
    }
  };

  return (
    <div className="flex-1 w-full flex flex-col h-full bg-slate-50 dark:bg-slate-950 overflow-hidden">
      
      {/* Top Navigation Bar */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between z-10 flex-shrink-0">
        <div className="flex items-center gap-4">
          <Link to={`/course/${courseId}/overview`} className="p-2 text-slate-500 hover:text-[#000080] dark:hover:text-[#0D9488] bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors">
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
        <aside className={`hidden ${isTesting ? '' : 'lg:flex'} flex-col w-80 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 overflow-y-auto`}>
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
              const quizAttempt = item.type === 'practice' || item.type === 'graded'
                ? getQuizAttempt(courseId, lessonId, item.id)
                : null;
              const quizPassed = Boolean(quizAttempt?.passed);
              const quizTerminated = quizAttempt?.status === 'terminated';
              const quizAttemptTime = formatRelativeTimestamp(quizAttempt?.completedAt);
              const quizStatusText = quizAttempt
                ? quizTerminated
                  ? 'Attempt terminated'
                  : quizPassed
                    ? `Passed • ${quizAttempt.score}/${quizAttempt.totalPoints}`
                    : `Completed • ${quizAttempt.score}/${quizAttempt.totalPoints}`
                : null;
              const quizMetaText = quizStatusText && quizAttemptTime
                ? `${quizStatusText} • ${quizAttemptTime}`
                : quizStatusText;
              
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
                    {quizStatusText && (
                      <p className={`text-xs mb-1 font-semibold ${quizTerminated ? 'text-rose-600 dark:text-rose-400' : quizPassed ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                        {quizMetaText}
                      </p>
                    )}
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
          <div className={`flex-1 w-full ${isTesting ? 'p-3 lg:p-4 max-w-none' : 'p-6 lg:p-10 max-w-5xl mx-auto'}`}>
            {/* The Dynamic Content gets rendered here */}
            {renderContent()}
          </div>

          {/* Sticky Bottom Action Bar */}
          <div className="sticky bottom-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4 lg:px-10 flex justify-between items-center shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)]">
            <button 
              onClick={toggleCompletion}
              disabled={activeItem.type === 'graded' || activeItem.type === 'practice'}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold transition-colors ${
                isCompleted 
                  ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              } ${activeItem.type === 'graded' || activeItem.type === 'practice' ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <FiCheckCircle size={20} />
              {activeItem.type === 'graded' || activeItem.type === 'practice'
                ? isCompleted
                  ? 'Assessment Completed'
                  : 'Submit assessment to complete'
                : isCompleted
                  ? 'Completed'
                  : 'Mark as Complete'}
            </button>

            <button 
              onClick={handleMoveToNextModule}
              className="px-6 py-2.5 bg-[#000080] hover:bg-blue-800 dark:bg-[#0D9488] dark:hover:bg-teal-500 text-white font-bold rounded-lg transition-colors"
            >
              {nextModule ? 'Next Module →' : 'Return to Course Home'}
            </button>
          </div>
        </main>

      </div>
    </div>
  );
}