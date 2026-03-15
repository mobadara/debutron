import React from 'react';
import { Link, NavLink, Outlet, useParams } from 'react-router-dom';
import { FiBookOpen, FiDownload, FiList, FiMessageCircle } from 'react-icons/fi';
import { getCourseById } from '../data/courses';
import { getResolvedCourse } from '../data/lmsProgress';
import {
  getCourseSyllabusDownloadName,
  getCourseSyllabusPdfUrl,
} from '../data/syllabus';

export default function CourseLayout() {
  const { courseId } = useParams();
  const baseCourse = getCourseById(courseId);
  let course = null;

  try {
    course = baseCourse ? getResolvedCourse(baseCourse) : null;
  } catch {
    course = baseCourse ?? null;
  }

  if (!course) {
    return (
      <div className="flex-1 w-full flex flex-col bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-10">
        <div className="max-w-[1200px] mx-auto w-full bg-white dark:bg-slate-900 rounded-xl p-5 sm:p-8 border border-slate-200 dark:border-slate-800">
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
    <div className="flex-1 w-full flex flex-col bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-10 overflow-y-auto">
      <div className="max-w-[1400px] mx-auto w-full flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
        <aside className="w-full lg:w-[28%] xl:w-[24%] flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-6 shadow-sm">
            <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-4 inline-block">
              {course.homeSubtitle || course.track || 'Course'}
            </span>
            <h1 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-tight">{course.title || 'Untitled Course'}</h1>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{course.homeDescription || 'Course details will be available soon.'}</p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 px-2 py-1">Course Links</h2>
            <nav className="mt-2 flex flex-col gap-1">
              <NavLink
                to="overview"
                end
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-[#000080] dark:bg-teal-900/20 dark:text-[#0D9488]'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`
                }
              >
                <FiBookOpen size={16} />
                <span>Course Overview</span>
              </NavLink>

              <NavLink
                to="contents"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-[#000080] dark:bg-teal-900/20 dark:text-[#0D9488]'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`
                }
              >
                <FiList size={16} />
                <span>Contents</span>
              </NavLink>

              <a
                href={getCourseSyllabusPdfUrl(course)}
                download={getCourseSyllabusDownloadName(course)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold transition-colors text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <FiDownload size={16} />
                <span>Download Syllabus</span>
              </a>
            </nav>
          </div>

          <div className="bg-gradient-to-br from-[#000080] to-blue-900 rounded-xl p-4 sm:p-6 text-white shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <FiMessageCircle size={72} />
            </div>
            <h3 className="font-bold text-lg mb-2 relative z-10">Course Forum</h3>
            <p className="text-blue-100 text-sm mb-6 relative z-10 leading-relaxed">
              Continue your discussions with peers and instructors for this course.
            </p>
            <Link to={`/forums/course/${courseId}`} className="block w-full text-center bg-white text-[#000080] font-bold py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors relative z-10">
              Enter Discussion Board
            </Link>
          </div>
        </aside>

        <section className="w-full lg:w-[72%] xl:w-[76%]">
          <Outlet context={{ course }} />
        </section>
      </div>
    </div>
  );
}
