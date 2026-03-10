import { useState } from 'react'
import { FiLock } from 'react-icons/fi'

function DiscussionPeerGrading() {
	const [hasSubmitted, setHasSubmitted] = useState(false)
	const [activeTab, setActiveTab] = useState('submission')
	const [submissionText, setSubmissionText] = useState('')
	const [peerRating, setPeerRating] = useState(0)
	const [peerFeedback, setPeerFeedback] = useState('')

	const handlePeerTabClick = () => {
		if (!hasSubmitted) {
			return
		}

		setActiveTab('peer_review')
	}

	const handleSubmitResponse = () => {
		if (!submissionText.trim()) {
			return
		}

		setHasSubmitted(true)
		setActiveTab('peer_review')
	}

	return (
		<section className="max-w-4xl mx-auto p-6 lg:p-10">
			<div className="bg-blue-50 dark:bg-slate-900 border-l-4 border-blue-600 p-6 rounded-r-lg mb-8">
				<h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Discussion Prompt</h2>
				<p className="mt-2 text-slate-700 dark:text-slate-300">
					Analyze the ethical implications of deploying a predictive policing algorithm.
				</p>
			</div>

			<div className="mb-6 flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2 dark:border-slate-800">
				<button
					type="button"
					onClick={() => setActiveTab('submission')}
					className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
						activeTab === 'submission'
							? 'bg-blue-600 text-white'
							: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100'
					}`}
				>
					My Submission
				</button>

				<button
					type="button"
					onClick={handlePeerTabClick}
					disabled={!hasSubmitted}
					className={`rounded-md px-4 py-2 text-sm font-medium transition-colors inline-flex items-center gap-2 ${
						activeTab === 'peer_review' && hasSubmitted
							? 'bg-blue-600 text-white'
							: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100'
					} ${!hasSubmitted ? 'opacity-50 cursor-not-allowed hover:bg-transparent hover:text-slate-600' : ''}`}
				>
					{!hasSubmitted ? <FiLock className="h-4 w-4" /> : null}
					{!hasSubmitted ? 'Peer Reviews (Locked)' : 'Peer Reviews'}
				</button>
			</div>

			{activeTab === 'submission' ? (
				<div>
					{hasSubmitted ? (
						<div className="space-y-4">
							<div className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
								Success
							</div>
							<div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
								{submissionText}
							</div>
						</div>
					) : (
						<div className="space-y-4">
							<textarea
								value={submissionText}
								onChange={(event) => setSubmissionText(event.target.value)}
								placeholder="Write your response here..."
								className="min-h-[200px] p-4 border rounded focus:ring-2 focus:ring-blue-600 w-full"
							/>
							<button
								type="button"
								onClick={handleSubmitResponse}
								className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
							>
								Submit Response
							</button>
						</div>
					)}
				</div>
			) : null}

			{activeTab === 'peer_review' && hasSubmitted ? (
				<div className="space-y-6">
					<article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
						<h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">Student #4829&apos;s Response</h3>
						<p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
							Predictive policing systems can reinforce historical bias when trained on skewed data. Ethical deployment requires
							transparent auditing, human oversight, and explicit safeguards against discriminatory outcomes.
						</p>

						<div className="mt-6 space-y-4 border-t border-slate-200 pt-4 dark:border-slate-800">
							<label className="block text-sm font-medium text-slate-800 dark:text-slate-200">Rate this submission (1-5):</label>

							<div className="flex items-center gap-2" role="radiogroup" aria-label="Peer rating">
								{[1, 2, 3, 4, 5].map((rating) => {
									const isSelected = rating <= peerRating

									return (
										<button
											key={rating}
											type="button"
											aria-label={`Rate ${rating}`}
											onClick={() => setPeerRating(rating)}
											className={`text-2xl transition-transform hover:scale-105 ${
												isSelected ? 'text-amber-400' : 'text-slate-300 dark:text-slate-600'
											}`}
										>
											★
										</button>
									)
								})}
							</div>

							<textarea
								value={peerFeedback}
								onChange={(event) => setPeerFeedback(event.target.value)}
								placeholder="Leave a comment to justify your grade..."
								className="min-h-[110px] w-full rounded border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
							/>

							<button
								type="button"
								className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
							>
								Submit Grade &amp; Next
							</button>
						</div>
					</article>
				</div>
			) : null}
		</section>
	)
}

export default DiscussionPeerGrading
