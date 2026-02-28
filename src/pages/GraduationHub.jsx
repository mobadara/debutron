import React from 'react'
import { FiFileText, FiLock, FiLinkedin, FiGithub, FiBriefcase } from 'react-icons/fi'

const resources = [
  {
    icon: FiLinkedin,
    title: 'LinkedIn Optimization',
    description: 'Guides and templates to make your profile visible to global tech recruiters.',
  },
  {
    icon: FiGithub,
    title: 'GitHub Portfolio Setup',
    description: 'How to structure your repositories and write enterprise-grade READMEs.',
  },
  {
    icon: FiBriefcase,
    title: 'Resume Engineering',
    description: 'ATS-friendly templates tailored for Software and Data Engineering roles.',
  },
]

const isGraduated = false

export default function GraduationHub() {
  return (
    <div className="max-w-6xl mx-auto p-8">
      <header>
        <h1 className="font-serif text-3xl text-debutron-navy mb-8">Graduation &amp; Career Hub</h1>
      </header>

      <section className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-4">
            <FiFileText className="h-6 w-6 text-debutron-navy" />
            <h2 className="font-serif text-lg font-bold text-debutron-navy">Official Transcript</h2>
          </div>

          <p className="mt-3 text-sm text-gray-600">Download a certified copy of your academic transcript for applications and records.</p>

          <button className="mt-4 w-full border border-debutron-navy text-debutron-navy py-2">Download PDF</button>
        </div>

        {!isGraduated ? (
          <div className="bg-gray-100 opacity-75 p-6 border border-gray-200 shadow-sm flex flex-col justify-center items-start">
            <div className="flex items-center gap-3">
              <FiLock className="h-6 w-6 text-gray-500" />
              <h3 className="font-serif text-lg font-semibold text-gray-700">Final Certificate</h3>
            </div>

            <p className="mt-3 text-sm text-gray-600">Certificate Locked. Complete all modules to unlock.</p>
          </div>
        ) : (
          <div className="bg-white p-6 border border-gray-200 border-t-4 border-yellow-500 shadow-sm">
            <div className="flex items-center gap-4">
              <FiFileText className="h-6 w-6 text-debutron-navy" />
              <h3 className="font-serif text-lg font-semibold text-debutron-navy">Debutron Lab Certificate of Completion</h3>
            </div>

            <p className="mt-3 text-sm text-gray-600">Congratulations! Your certificate is ready for download.</p>

            <button className="mt-4 w-full bg-debutron-navy text-white py-2">Download Certificate</button>
          </div>
        )}
      </section>

      <section>
        <h2 className="font-serif text-2xl mb-6">Tech Career Launchpad</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {resources.map((r) => {
            const Icon = r.icon
            return (
              <article key={r.title} className="bg-white p-6 border border-gray-200 shadow-sm rounded-sm">
                <div className="flex items-center gap-3">
                  <Icon className="h-6 w-6 text-debutron-navy" />
                  <h3 className="font-serif text-lg font-semibold">{r.title}</h3>
                </div>

                <p className="mt-3 text-sm text-gray-700">{r.description}</p>

                <div className="mt-4">
                  <a className="text-debutron-navy font-medium text-sm">View Guide -&gt;</a>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </div>
  )
}
