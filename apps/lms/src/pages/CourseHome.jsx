import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FiChevronDown, FiChevronUp, FiVideo, FiUsers, FiEdit3, 
  FiAward, FiFileText, FiPaperclip, FiBookOpen, FiMessageCircle 
} from 'react-icons/fi';
import { getCourseById } from '../data/courses';
import { formatRelativeTimestamp, getQuizAttempt, getResolvedCourse } from '../data/lmsProgress';

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

export default function CourseHome() {
  const { courseId } = useParams();
  const baseCourse = getCourseById(courseId);
  const course = baseCourse ? getResolvedCourse(baseCourse) : null;
  const [expandedLesson, setExpandedLesson] = useState(course?.lessons?.[0]?.id ?? null);

  if (!course) {
    return (
      <div className="flex-1 w-full flex flex-col bg-slate-50 dark:bg-slate-950 p-6 lg:p-10">
        <div className="max-w-[1200px] mx-auto w-full bg-white dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-800">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Course not found</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">This course may no longer be available.</p>
          <Link to="/courses" className="inline-block bg-[#000080] text-white px-4 py-2 rounded-lg font-bold">
            Back to all courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full flex flex-col bg-slate-50 dark:bg-slate-950 p-6 lg:p-10 overflow-y-auto">
      <div className="max-w-[1200px] mx-auto w-full flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: Syllabus & Modules (70%) */}
        <div className="w-full lg:w-[70%] flex flex-col gap-6">
          
          <header className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-4 inline-block">
              {course.homeSubtitle || course.track}
            </span>
            <h1 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
              {course.title}
            </h1>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {course.homeDescription}
            </p>
            {course.status !== 'active' && (
              <div className="mt-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                {course.status === 'future'
                  ? 'This course has not started yet. Content will unlock when the schedule begins.'
                  : 'This course is completed. You can still review syllabus and forum history.'}
              </div>
            )}
          </header>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-4">Course Syllabus</h2>
          
          <div className="flex flex-col gap-4">
            {course.lessons.map((lesson) => (
              <div key={lesson.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                
                {/* Lesson Accordion Header */}
                <button 
                  onClick={() => setExpandedLesson(expandedLesson === lesson.id ? null : lesson.id)}
                  className="w-full flex justify-between items-center p-6 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/50 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="flex flex-col items-start text-left">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">{lesson.title}</h3>
                    <span className="text-sm font-medium text-[#0D9488]">{lesson.dates}</span>
                  </div>
                  {expandedLesson === lesson.id ? <FiChevronUp size={24} className="text-slate-500" /> : <FiChevronDown size={24} className="text-slate-500" />}
                </button>

                {/* Lesson Contents */}
                {expandedLesson === lesson.id && (
                  <div className="p-2 border-t border-slate-200 dark:border-slate-800">
                    {lesson.items.map((item) => {
                      const ItemIcon = ITEM_TYPE_ICONS[item.type] || FiFileText;
                      const isItemLocked = item.locked || course.status === 'future';
                      const quizAttempt = item.type === 'practice' || item.type === 'graded'
                        ? getQuizAttempt(course.id, lesson.id, item.id)
                        : null;
                      const hasQuizAttempt = Boolean(quizAttempt);
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

                      if (isItemLocked) {
                        return (
                          <div
                            key={item.id}
                            className="flex items-center justify-between p-4 rounded-lg transition-colors group opacity-50"
                          >
                            <div className="flex items-center gap-4">
                              <div className={`p-2 rounded-lg ${item.type === 'graded' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-500' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}>
                                <ItemIcon size={20} />
                              </div>
                              <div>
                                <span className="font-medium text-slate-700 dark:text-slate-300">{item.title}</span>
                                {hasQuizAttempt && (
                                  <p className={`text-xs mt-1 font-semibold ${quizTerminated ? 'text-rose-600 dark:text-rose-400' : quizPassed ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                                    {quizMetaText}
                                  </p>
                                )}
                              </div>
                            </div>
                            <span className="text-sm text-slate-500">{course.status === 'future' ? 'Starts soon' : 'Locked'}</span>
                          </div>
                        );
                      }

                      return (
                        <Link
                          key={item.id}
                          to={`/course/${courseId}/lesson/${lesson.id}?item=${item.id}`}
                          className="flex items-center justify-between p-4 rounded-lg transition-colors group hover:bg-slate-50 dark:hover:bg-slate-800/50"
                        >
                          <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-lg ${item.type === 'graded' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-500' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 group-hover:bg-[#000080] group-hover:text-white transition-colors'}`}>
                              <ItemIcon size={20} />
                            </div>
                            <div>
                              <span className="font-medium text-slate-700 dark:text-slate-300 group-hover:text-[#000080] dark:group-hover:text-[#0D9488] transition-colors">
                                {item.title}
                              </span>
                              {hasQuizAttempt && (
                                <p className={`text-xs mt-1 font-semibold ${quizTerminated ? 'text-rose-600 dark:text-rose-400' : quizPassed ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                                  {quizMetaText}
                                </p>
                              )}
                            </div>
                          </div>
                          <span className="text-sm text-slate-500">{item.duration}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Instructors & Global Community (30%) */}
        <div className="w-full lg:w-[30%] flex flex-col gap-6">
          
          {/* Instructors Widget */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6">Teaching Team</h3>
            <div className="flex flex-col gap-6">
              {course.teachingTeam.map((teamMember, index) => (
                <div key={teamMember.id} className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full text-white flex items-center justify-center font-bold text-xl ${index === 0 ? 'bg-[#000080]' : 'bg-[#0D9488]'}`}>
                    {teamMember.avatarInitial}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white leading-tight">{teamMember.name}</h4>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{teamMember.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Continuous Course Forum Widget */}
          <div className="bg-gradient-to-br from-[#000080] to-blue-900 rounded-xl p-6 text-white shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <FiMessageCircle size={80} />
            </div>
            <h3 className="font-bold text-lg mb-2 relative z-10">Continuous Course Forum</h3>
            <p className="text-blue-100 text-sm mb-6 relative z-10 leading-relaxed">
              Connect with your current peers and course alumni. Ask questions, share notes, and review past discussions from previous cohorts.
            </p>
            <Link to={`/forums/course/${courseId}`} className="block w-full text-center bg-white text-[#000080] font-bold py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors relative z-10">
              Enter Discussion Board
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}