import { useOutletContext } from 'react-router-dom'
import { FiDownload, FiPrinter } from 'react-icons/fi'

const transcriptData = {
	'data-science': [
		{ id: 'MOD-101', title: 'Python Programming Foundation', hours: 40, score: 92, status: 'Distinction' },
		{ id: 'MOD-102', title: 'Exploratory Data Analysis', hours: 50, score: 88, status: 'Pass' },
		{ id: 'MOD-103', title: 'Machine Learning Algorithms', hours: 60, score: null, status: 'In Progress' },
	],
	utme: [
		{ id: 'PHY-01', title: 'Advanced Physics', credits: 4, grade: 'A', points: 5.0 },
		{ id: 'MTH-01', title: 'General Mathematics', credits: 4, grade: 'B', points: 4.0 },
		{ id: 'CHM-01', title: 'Organic Chemistry', credits: 4, grade: null, points: null },
	],
}

function StudentTranscript() {
	const { activeTrack, activeProgram, user, programNames } = useOutletContext()
	const dob = 'July 17, 1993'
	const records = transcriptData[activeProgram] || []

	return (
		<div className="max-w-5xl mx-auto mt-6">
			<div className="flex justify-end gap-4 mb-4 print:hidden">
				<button
					type="button"
					onClick={() => window.print()}
					className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2 text-sm font-semibold flex items-center gap-2 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-700"
				>
					<FiPrinter />
					Print
				</button>
				<button
					type="button"
					className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2 text-sm font-semibold flex items-center gap-2 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-700"
				>
					<FiDownload />
					Download PDF
				</button>
			</div>

			<div className="max-w-5xl mx-auto p-8 bg-white shadow-md border border-slate-200 mt-6 dark:bg-slate-900 dark:border-slate-700 print:bg-white print:text-black print:border-black">
				<header className="border-b-4 border-slate-900 pb-6 mb-8 dark:border-slate-400 print:border-black">
					<div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
						<h1 className="text-3xl font-serif font-black uppercase text-slate-900 dark:text-slate-100 print:text-black">Debutron Lab.</h1>
						<p className="text-xl font-bold tracking-widest text-slate-400 dark:text-slate-300 print:text-black">OFFICIAL TRANSCRIPT</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 text-sm text-slate-800 dark:text-slate-200 print:text-black">
						<div className="space-y-2">
							<p>
								First Name: <span className="font-bold">{user.firstName}</span>
							</p>
							<p>
								Last Name: <span className="font-bold">{user.lastName || 'Obadara'}</span>
							</p>
							<p>
								Date of Birth: <span className="font-bold">{dob}</span>
							</p>
						</div>

						<div className="space-y-2">
							<p>
								Program: <span className="font-bold">{programNames?.[activeProgram] || '—'}</span>
							</p>
							{activeTrack === 'A' ? (
								<p>
									Session: <span className="font-bold">2025/2026</span>
								</p>
							) : (
								<p>
									Cohort: <span className="font-bold">2026 - B</span>
								</p>
							)}
						</div>
					</div>
				</header>

				{activeTrack === 'T' && (
					<table className="w-full text-left border-collapse">
						<thead>
							<tr className="border-b border-slate-200 text-slate-600 text-sm dark:border-slate-700 dark:text-slate-300 print:border-black print:text-black">
								<th className="py-3 pr-3 font-semibold">Module Code</th>
								<th className="py-3 pr-3 font-semibold">Module Title</th>
								<th className="py-3 pr-3 font-semibold">Contact Hours</th>
								<th className="py-3 pr-3 font-semibold">Project Score</th>
								<th className="py-3 pr-3 font-semibold">Status</th>
							</tr>
						</thead>
						<tbody>
							{records.map((record) => (
								<tr key={record.id} className="border-b border-slate-100 text-sm text-slate-800 even:bg-slate-50 dark:border-slate-700 dark:text-slate-100 dark:even:bg-slate-800 print:border-black print:text-black print:even:bg-white">
									<td className="py-3 pr-3">{record.id}</td>
									<td className="py-3 pr-3">{record.title}</td>
									<td className="py-3 pr-3">{record.hours ?? '-'}</td>
									<td className="py-3 pr-3">{record.score ?? '-'}</td>
									<td className="py-3 pr-3">{record.status ?? '-'}</td>
								</tr>
							))}
						</tbody>
					</table>
				)}

				{activeTrack === 'A' && (
					<table className="w-full text-left border-collapse">
						<thead>
							<tr className="border-b border-slate-200 text-slate-600 text-sm dark:border-slate-700 dark:text-slate-300 print:border-black print:text-black">
								<th className="py-3 pr-3 font-semibold">Course Code</th>
								<th className="py-3 pr-3 font-semibold">Course Title</th>
								<th className="py-3 pr-3 font-semibold">Credit Units</th>
								<th className="py-3 pr-3 font-semibold">Letter Grade</th>
								<th className="py-3 pr-3 font-semibold">Points</th>
							</tr>
						</thead>
						<tbody>
							{records.map((record) => (
								<tr key={record.id} className="border-b border-slate-100 text-sm text-slate-800 dark:border-slate-700 dark:text-slate-100 print:border-black print:text-black">
									<td className="py-3 pr-3">{record.id}</td>
									<td className="py-3 pr-3">{record.title}</td>
									<td className="py-3 pr-3">{record.credits ?? '-'}</td>
									<td className="py-3 pr-3">{record.grade ?? '-'}</td>
									<td className="py-3 pr-3">{record.points ?? '-'}</td>
								</tr>
							))}
						</tbody>
					</table>
				)}

				<div className="mt-8 p-4 bg-slate-50 border border-slate-200 flex justify-end gap-12 dark:bg-slate-800 dark:border-slate-700 print:bg-white print:border-black">
					{activeTrack === 'A' ? (
						<p className="text-sm text-slate-700 dark:text-slate-200 print:text-black">
							Cumulative GPA (CGPA): <span className="font-bold text-slate-900 dark:text-slate-100 print:text-black">4.50 / 5.00</span>
						</p>
					) : (
						<p className="text-sm text-slate-700 dark:text-slate-200 print:text-black">
							Overall Program Average: <span className="font-bold text-slate-900 dark:text-slate-100 print:text-black">90% (Distinction)</span>
						</p>
					)}
				</div>

				<footer className="mt-16 pt-8 border-t-2 border-slate-200 flex justify-between items-end gap-6 dark:border-slate-700 print:border-black">
					<p className="text-xs text-slate-500 dark:text-slate-300 max-w-xl print:text-black">
						This document is electronically generated by the Debutron Lab Student Information System. Any alterations render it invalid.
					</p>

					<div className="border-t border-slate-900 dark:border-slate-400 w-48 text-center pt-2 text-sm font-bold dark:text-slate-100 print:text-black print:border-black">
						Office of the Registrar
					</div>
				</footer>
			</div>
		</div>
	)
}

export default StudentTranscript
