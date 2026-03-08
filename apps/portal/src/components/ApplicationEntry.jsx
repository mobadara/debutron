import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ApplicationEntry() {
	const [trackingId, setTrackingId] = useState('')
	const navigate = useNavigate()

	const handleStartNew = () => {
		navigate('/apply/step-1')
	}

	const handleResume = () => {
		const normalizedTrackingId = trackingId.trim().toUpperCase()
		if (!normalizedTrackingId) return

		console.log('Resume application with Tracking ID:', normalizedTrackingId)
	}

	return (
		<div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6">
			<div className="w-full">
				<h1 className="text-3xl font-serif text-slate-900 dark:text-slate-100 font-bold mb-8 text-center">Debutron Lab Admissions</h1>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full mx-auto">
					<div className="bg-white dark:bg-slate-900 p-8 border-2 border-slate-900 dark:border-slate-700 shadow-sm flex flex-col justify-between">
						<div>
							<h2 className="text-xl font-bold mb-2 dark:text-slate-100">Begin New Application</h2>
							<p className="text-slate-600 dark:text-slate-300 mb-6">Start your journey in the Tech Innovation or Academic Track.</p>
						</div>
						<button
							type="button"
							onClick={handleStartNew}
							className="w-full bg-debutron-navy text-white py-3 font-bold hover:bg-debutron-charcoal dark:bg-blue-600 dark:hover:bg-blue-500 transition-colors"
						>
							Start New Application
						</button>
					</div>

					<div className="bg-white dark:bg-slate-900 p-8 border border-slate-300 dark:border-slate-700 shadow-sm flex flex-col justify-between">
						<div>
							<h2 className="text-xl font-bold mb-2 dark:text-slate-100">Continue Application</h2>
							<p className="text-slate-600 dark:text-slate-300 mb-6">Enter your Tracking ID to pick up right where you left off.</p>
							<label htmlFor="trackingId" className="sr-only">Tracking ID</label>
							<input
								id="trackingId"
								type="text"
								value={trackingId}
								onChange={(event) => setTrackingId(event.target.value.toUpperCase())}
								placeholder="Enter Tracking ID"
								className="border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 p-3 w-full mb-4 text-lg uppercase focus:border-slate-900 dark:focus:border-slate-400 focus:outline-none"
							/>
						</div>
						<button
							type="button"
							onClick={handleResume}
							className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-2 border-slate-900 dark:border-slate-500 py-3 font-bold hover:bg-slate-50 dark:hover:bg-slate-700"
						>
							Continue Saved Application
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ApplicationEntry
