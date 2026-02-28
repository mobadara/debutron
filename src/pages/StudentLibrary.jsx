import React, { useState } from 'react'
import { FiBook, FiMonitor, FiYoutube, FiDownload, FiEye, FiFilter } from 'react-icons/fi'

export default function StudentLibrary() {
  const [activeTab, setActiveTab] = useState('texts')
  const [selectedSubject, setSelectedSubject] = useState('All')

  const subjects = ['All', 'Biology', 'Chemistry', 'Mathematics', 'Physics', 'Data Science', 'Software Engineering', 'Cloud Computing']

  const libraryData = [
    {
      id: 1,
      title: 'Advanced Engineering Mathematics',
      subject: 'Mathematics',
      type: 'texts',
      format: 'PDF',
      size: '12MB',
    },
    {
      id: 2,
      title: 'Intro to Neural Networks',
      subject: 'Data Science',
      type: 'slides',
      format: 'PPTX',
      size: '5MB',
    },
    {
      id: 3,
      title: 'WASSCE Physics Past Questions 2025',
      subject: 'Physics',
      type: 'texts',
      format: 'PDF',
      size: '8MB',
    },
    {
      id: 4,
      title: 'Software Architecture Patterns',
      subject: 'Software Engineering',
      type: 'slides',
      format: 'PPTX',
      size: '7MB',
    },
    {
      id: 5,
      title: 'Cloud Deployment Fundamentals',
      subject: 'Cloud Computing',
      type: 'texts',
      format: 'PDF',
      size: '10MB',
    },
    {
      id: 6,
      title: 'Statistics for Data Science',
      subject: 'Data Science',
      type: 'texts',
      format: 'PDF',
      size: '9MB',
    },
    {
      id: 7,
      title: 'Physics Practical Lab Guide',
      subject: 'Physics',
      type: 'slides',
      format: 'PPTX',
      size: '6MB',
    },
    {
      id: 8,
      title: 'Building REST APIs with Node.js',
      subject: 'Software Engineering',
      type: 'videos',
      format: 'MP4',
      size: '42MB',
    },
    {
      id: 9,
      title: 'Data Cleaning with Pandas',
      subject: 'Data Science',
      type: 'videos',
      format: 'MP4',
      size: '36MB',
    },
    {
      id: 10,
      title: 'Cloud IAM Essentials',
      subject: 'Cloud Computing',
      type: 'videos',
      format: 'MP4',
      size: '28MB',
    },
  ]

  const filteredData = libraryData.filter(
    (item) => item.type === activeTab && (selectedSubject === 'All' || item.subject === selectedSubject)
  )

  return (
    <section className="max-w-6xl mx-auto p-8">
      <header>
        <h1 className="font-serif text-3xl text-debutron-navy">Digital eLibrary &amp; Resources</h1>
      </header>

      <div className="flex items-center gap-6 border-b border-gray-200 mb-6 mt-6 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('texts')}
          className={`pb-3 text-sm whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'texts'
              ? 'border-b-2 border-debutron-navy text-debutron-navy font-bold'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <FiBook className="h-4 w-4" />
          Texts &amp; Reference
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('slides')}
          className={`pb-3 text-sm whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'slides'
              ? 'border-b-2 border-debutron-navy text-debutron-navy font-bold'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <FiMonitor className="h-4 w-4" />
          Lecture Slides
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('videos')}
          className={`pb-3 text-sm whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'videos'
              ? 'border-b-2 border-debutron-navy text-debutron-navy font-bold'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <FiYoutube className="h-4 w-4" />
          Video Tutorials
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <span className="flex items-center gap-2 text-sm font-semibold text-gray-600">
          <FiFilter className="h-4 w-4" />
          Filter by Subject:
        </span>

        {subjects.map((subject) => (
          <button
            key={subject}
            type="button"
            onClick={() => setSelectedSubject(subject)}
            className={`px-4 py-1 rounded-full text-sm ${
              selectedSubject === subject
                ? 'bg-debutron-navy text-white font-semibold'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {subject}
          </button>
        ))}
      </div>

      {activeTab === 'videos' ? (
        <div className="bg-red-50 border border-red-200 p-8 rounded-sm text-center mt-6">
          <FiYoutube className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h2 className="font-serif text-2xl text-red-700">Debutron Lab Video Tutorials</h2>
          <p className="mt-3 text-gray-700">
            Access our exclusive, unlisted lecture recordings and code-alongs on our official channel.
          </p>
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-600 text-white px-8 py-3 rounded-sm font-bold inline-block mt-6 hover:bg-red-700 transition-colors"
          >
            Open YouTube Portal
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredData.map((item) => (
            <article
              key={item.id}
              className="bg-white p-6 border border-gray-200 shadow-sm rounded-sm flex flex-col h-56"
            >
              <div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">{item.subject}</span>
                <h3 className="font-serif text-lg font-bold text-debutron-navy mt-2 mb-1">{item.title}</h3>
                <p className="text-xs text-gray-400">{item.format} • {item.size}</p>
              </div>

              <div className="flex items-center gap-4 mt-auto pt-4 border-t border-gray-100">
                <button
                  type="button"
                  className="text-debutron-navy hover:underline text-sm font-medium flex items-center gap-2"
                >
                  <FiEye className="h-4 w-4" />
                  Read Online
                </button>

                <button
                  type="button"
                  className="text-gray-600 hover:text-gray-900 text-sm font-medium flex items-center gap-2"
                >
                  <FiDownload className="h-4 w-4" />
                  Download
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
