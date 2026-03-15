import React from 'react';
import { Link, useOutletContext, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { getCourseById } from '../data/courses';
import { getResolvedCourse } from '../data/lmsProgress';

const toInstructorProfiles = (course) => {
  if (Array.isArray(course?.instructors) && course.instructors.length > 0) {
    return course.instructors;
  }

  return (course?.teachingTeam ?? []).map((member, index) => ({
    id: `profile-${member.id}`,
    name: member.name,
    title: member.role,
    bio: index === 0
      ? 'Leads curriculum delivery, assessment standards, and weekly interactive sessions.'
      : 'Supports students during labs, office hours, and discussion activities throughout the course.',
    email: `${member.name.toLowerCase().replace(/[^a-z0-9]+/g, '.').replace(/^\.|\.$/g, '')}@debutron.edu`,
    avatarInitial: member.avatarInitial || member.name?.charAt(0) || 'I',
  }));
};

export default function CourseOverview() {
  const { courseId } = useParams();
  const outletContext = useOutletContext();
  const baseCourse = outletContext?.course ?? getCourseById(courseId);
  let course = null;

  try {
    course = baseCourse ? getResolvedCourse(baseCourse) : null;
  } catch {
    course = baseCourse ?? null;
  }

  if (!course) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Course not found</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">This course may no longer be available.</p>
        <Link to="/courses" className="inline-block bg-[#000080] text-white px-4 py-2 rounded-lg font-bold">Back to all courses</Link>
      </div>
    );
  }

  const overviewMarkdown = course.overviewMarkdown || `## Course Introduction\n\n${course.homeDescription || 'Course overview will be available soon.'}`;
  const instructors = toInstructorProfiles(course);

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <article className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-8 lg:p-10 shadow-sm">
        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
          <ReactMarkdown>{overviewMarkdown}</ReactMarkdown>
        </div>
      </article>

      <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-8 lg:p-10 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-6">Meet Your Instructors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {instructors.map((instructor) => (
            <div
              key={instructor.id}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/30 p-5 hover:border-[#0D9488] transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#000080] to-[#0D9488] text-white flex items-center justify-center font-bold text-lg">
                  {instructor.avatarInitial}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{instructor.name}</h3>
                  <p className="text-sm font-semibold text-[#0D9488] uppercase tracking-wide">{instructor.title}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{instructor.bio}</p>
              <a href={`mailto:${instructor.email}`} className="mt-4 inline-block text-sm font-semibold text-[#000080] dark:text-[#0D9488] hover:underline">
                {instructor.email}
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
