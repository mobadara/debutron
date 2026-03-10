import { useState } from 'react'
import { useProctor } from '../../hooks/useProctor'

function GradedQuiz() {
	const [quizStatus, setQuizStatus] = useState('idle')
	const [violationReason, setViolationReason] = useState(null)

	const handleViolation = (reason) => {
		setQuizStatus('violation')
		setViolationReason(reason)

		const payload = {
			status: 'auto_submitted',
			result: 0,
			reason,
			timestamp: new Date().toISOString(),
		}

		Promise.resolve(payload)
	}

	useProctor(quizStatus === 'running', handleViolation)

	if (quizStatus === 'idle') {
		return (
			<section className="mx-auto w-full max-w-3xl space-y-5">
				<div className="rounded-lg border border-red-200 bg-red-50 p-5 text-red-900">
					<h2 className="text-lg font-semibold">High-Stakes Exam Rules</h2>
					<p className="mt-2 text-sm leading-6">
						Do not leave this tab. Switching tabs or clicking outside this window will result in an automatic score of 0.
					</p>
					<div className="mt-3 rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
						Proctoring is enabled and violations are automatically flagged.
					</div>
				</div>

				<button
					type="button"
					onClick={() => {
						setViolationReason(null)
						setQuizStatus('running')
					}}
					className="rounded-md bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700"
				>
					Start Exam
				</button>
			</section>
		)
	}

	if (quizStatus === 'running') {
		return (
			<section className="mx-auto w-full max-w-3xl space-y-5 rounded-lg border border-slate-200 bg-white p-6">
				<h2 className="text-xl font-semibold text-slate-900">Question 1 of 1</h2>
				<p className="text-slate-700">Which option best describes why model validation is essential in high-stakes systems?</p>

				<div className="space-y-2 text-sm text-slate-700">
					<label className="flex items-center gap-2 rounded-md border border-slate-200 p-3 hover:bg-slate-50">
						<input type="radio" name="q1" />
						<span>It improves dashboard appearance and UI speed only.</span>
					</label>
					<label className="flex items-center gap-2 rounded-md border border-slate-200 p-3 hover:bg-slate-50">
						<input type="radio" name="q1" />
						<span>It confirms reliability, fairness, and performance before deployment.</span>
					</label>
					<label className="flex items-center gap-2 rounded-md border border-slate-200 p-3 hover:bg-slate-50">
						<input type="radio" name="q1" />
						<span>It removes the need for human oversight in sensitive workflows.</span>
					</label>
				</div>

				<button
					type="button"
					onClick={() => setQuizStatus('submitted')}
					className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
				>
					Submit Exam
				</button>
			</section>
		)
	}

	if (quizStatus === 'violation') {
		return (
			<section className="mx-auto flex min-h-[360px] w-full max-w-3xl items-center justify-center">
				<div className="w-full bg-red-50 text-red-900 border border-red-200 p-8 rounded-lg text-center">
					<h2 className="text-3xl font-bold">Exam Terminated.</h2>
					<p className="mt-4 text-base leading-7">
						We detected that you navigated away from the exam window. Your attempt has been automatically submitted and flagged
						for instructor review.
					</p>
					{violationReason ? (
						<p className="mt-3 text-sm font-medium">Violation detected: {violationReason}</p>
					) : null}
				</div>
			</section>
		)
	}

	return (
		<section className="mx-auto w-full max-w-3xl rounded-lg border border-emerald-200 bg-emerald-50 p-6 text-emerald-900">
			<h2 className="text-xl font-semibold">Exam Submitted</h2>
			<p className="mt-2 text-sm">Your responses have been successfully submitted.</p>
		</section>
	)
}

export default GradedQuiz
