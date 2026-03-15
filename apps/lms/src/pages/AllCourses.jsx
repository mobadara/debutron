import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiPlay } from 'react-icons/fi';
import { ALL_COURSES } from '../data/courses';
import { getCourseProgressPercentage } from '../data/lmsProgress';

export default function AllCourses() {
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed', 'future'

  const allCourses = ALL_COURSES;

  const filteredCourses = filter === 'all' 
    ? allCourses 
    : allCourses.filter(c => c.status === filter);

  return (
    <div className="flex-1 w-full flex flex-col bg-slate-50 dark:bg-slate-950 p-6 lg:p-10">
      <div className="max-w-[1600px] mx-auto w-full">
        
        <header className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-4">My Learning Journey</h1>
          
          {/* Filter Tabs */}
          <div className="flex overflow-x-auto gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
            <button onClick={() => setFilter('all')} className={`px-4 py-2 font-bold text-sm rounded-t-lg transition-colors whitespace-nowrap ${filter === 'all' ? 'bg-white dark:bg-slate-900 text-[#000080] dark:text-[#0D9488] border-t border-l border-r border-slate-200 dark:border-slate-800 relative top-[1px]' : 'text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800'}`}>All Courses</button>
            <button onClick={() => setFilter('active')} className={`px-4 py-2 font-bold text-sm rounded-t-lg transition-colors whitespace-nowrap ${filter === 'active' ? 'bg-white dark:bg-slate-900 text-[#000080] dark:text-[#0D9488] border-t border-l border-r border-slate-200 dark:border-slate-800 relative top-[1px]' : 'text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800'}`}>Active</button>
            <button onClick={() => setFilter('completed')} className={`px-4 py-2 font-bold text-sm rounded-t-lg transition-colors whitespace-nowrap ${filter === 'completed' ? 'bg-white dark:bg-slate-900 text-[#000080] dark:text-[#0D9488] border-t border-l border-r border-slate-200 dark:border-slate-800 relative top-[1px]' : 'text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800'}`}>Completed</button>
            <button onClick={() => setFilter('future')} className={`px-4 py-2 font-bold text-sm rounded-t-lg transition-colors whitespace-nowrap ${filter === 'future' ? 'bg-white dark:bg-slate-900 text-[#000080] dark:text-[#0D9488] border-t border-l border-r border-slate-200 dark:border-slate-800 relative top-[1px]' : 'text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800'}`}>Future Enrollments</button>
          </div>
        </header>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map((course) => {
            const courseProgress = getCourseProgressPercentage(course);

            return (
              <Link key={course.id} to={`/course/${course.id}/overview`} className="group flex flex-col bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-lg hover:border-[#000080] dark:hover:border-[#0D9488] transition-all">
                <div className="h-32 bg-gradient-to-br from-[#000080] to-blue-900 relative p-4 flex flex-col justify-between">
                  <span className="self-start bg-white/20 backdrop-blur-md text-white px-2 py-1 rounded text-xs font-bold tracking-wider uppercase">
                    {course.track}
                  </span>
                  {course.status === 'completed' && <div className="absolute top-4 right-4 bg-emerald-500 text-white p-1 rounded-full"><FiCheckCircle size={20} /></div>}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-tight mb-2 group-hover:text-[#000080] dark:group-hover:text-[#0D9488] transition-colors">{course.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{course.instructor.name}</p>

                  <div className="mt-auto">
                    {course.status === 'active' && (
                      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 mb-2">
                        <div className="bg-[#0D9488] h-2 rounded-full transition-all duration-500" style={{ width: `${courseProgress}%` }}></div>
                      </div>
                    )}
                    <div className="flex justify-between items-center text-sm font-bold">
                      <span className={course.status === 'completed' ? 'text-emerald-600' : 'text-slate-500'}>
                        {course.status === 'active'
                          ? `${courseProgress}% Complete`
                          : course.status === 'future'
                            ? 'STARTING SOON'
                            : 'COMPLETED'}
                      </span>
                      {course.status === 'active' && <span className="text-[#000080] dark:text-[#0D9488] flex items-center gap-1">Resume <FiPlay size={14} /></span>}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}