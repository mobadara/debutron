import { useState } from 'react'
import DiscussionPeerGrading from '../components/course/DiscussionPeerGrading';
import VideoReadingCanvas from '../components/course/VideoReadingCanvas'
import GradedQuiz from '../components/course/GradedQuiz'

const TABS = [
	{ key: 'introduction', label: 'Introduction' },
	{ key: 'content', label: 'Content (Video/Reading)' },
	{ key: 'discussion', label: 'Discussion' },
	{ key: 'practice_quiz', label: 'Practice Quiz' },
	{ key: 'graded_quiz', label: 'Graded Quiz' },
]

function LessonViewer() {
	const [activeTab, setActiveTab] = useState('introduction')

	const renderActiveContent = () => {
		switch (activeTab) {
			case 'introduction':
				return (
					<section className="space-y-3">
						<h2 className="text-2xl font-semibold text-slate-900">Welcome to This Week's Lesson</h2>
						<p className="text-slate-600">
							In this section, you will review the lesson goals and understand what outcomes to achieve before the quizzes.
						</p>
						<div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
							<h3 className="font-medium text-slate-800">Learning Objectives</h3>
							<ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
								<li>Understand the core concepts for this week.</li>
								<li>Apply concepts in discussion and practical exercises.</li>
								<li>Prepare for both practice and graded quizzes.</li>
							</ul>
						</div>
					</section>
				)

			case 'content':
				return <VideoReadingCanvas />

			case 'discussion':
				return <DiscussionPeerGrading />

			case 'practice_quiz':
				return (
					<section className="space-y-4">
						<h2 className="text-xl font-semibold text-slate-900">Practice Quiz</h2>
						<p className="text-slate-600">Use this unproctored quiz to test understanding before the graded attempt.</p>
						<button
							type="button"
							className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700"
						>
							Start Practice (Unproctored)
						</button>
					</section>
				)

			case 'graded_quiz':
				return <GradedQuiz />

			default:
				return null
		}
	}

	return (
		<div className="w-full rounded-xl border border-slate-200 bg-white p-4 md:p-6">
			<nav className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
				{TABS.map((tab) => {
					const isActive = activeTab === tab.key

					return (
						<button
							key={tab.key}
							type="button"
							onClick={() => setActiveTab(tab.key)}
							className={`px-3 py-2 text-sm font-medium transition-colors ${
								isActive
									? 'border-b-2 border-blue-600 text-blue-600'
									: 'text-slate-500 hover:text-slate-700'
							}`}
						>
							{tab.label}
						</button>
					)
				})}
			</nav>

			<div className="mt-5">{renderActiveContent()}</div>
		</div>
	)
}

export default LessonViewer
