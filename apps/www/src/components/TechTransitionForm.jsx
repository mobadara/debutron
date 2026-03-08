import { useState } from 'react'

function TechTransitionForm() {
	const [universityName, setUniversityName] = useState('')
	const [courseOfStudy, setCourseOfStudy] = useState('')
	const [entryMode, setEntryMode] = useState('UTME')
	const [evidenceFile, setEvidenceFile] = useState(null)

	const handleSubmit = (event) => {
		event.preventDefault()
		console.log({ universityName, courseOfStudy, entryMode, evidenceFile })
	}

	return (
		<form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 border border-slate-200 shadow-sm mt-10">
			<h2 className="text-2xl font-bold text-slate-900 border-b pb-4 mb-6">Tech Transition Application</h2>

			<div className="mb-5">
				<label htmlFor="universityName" className="text-slate-700 font-bold mb-2 block">University Name</label>
				<input
					id="universityName"
					type="text"
					value={universityName}
					onChange={(event) => setUniversityName(event.target.value)}
					className="w-full border border-slate-300 p-3 focus:outline-none focus:border-slate-900"
					required
				/>
			</div>

			<div className="mb-5">
				<label htmlFor="courseOfStudy" className="text-slate-700 font-bold mb-2 block">Course of Study</label>
				<input
					id="courseOfStudy"
					type="text"
					value={courseOfStudy}
					onChange={(event) => setCourseOfStudy(event.target.value)}
					className="w-full border border-slate-300 p-3 focus:outline-none focus:border-slate-900"
					required
				/>
			</div>

			<div className="mb-5">
				<label htmlFor="entryMode" className="text-slate-700 font-bold mb-2 block">Entry Mode</label>
				<select
					id="entryMode"
					value={entryMode}
					onChange={(event) => setEntryMode(event.target.value)}
					className="w-full border border-slate-300 p-3 focus:outline-none focus:border-slate-900"
				>
					<option value="UTME">UTME</option>
					<option value="JUPEB">JUPEB</option>
					<option value="A-Level">A-Level</option>
					<option value="ND">ND</option>
					<option value="IJMB">IJMB</option>
				</select>
			</div>

			<div className="mb-5">
				<label htmlFor="evidenceFile" className="text-slate-700 font-bold mb-2 block">Proof of University Status</label>
				<p className="text-sm text-slate-500 mb-2">
					Please upload your 100L transcript, or your Admission Letter if admitted via Direct Entry/JUPEB/A-Level.
				</p>
				<input
					id="evidenceFile"
					type="file"
					accept=".pdf,.jpg,.png"
					onChange={(event) => setEvidenceFile(event.target.files?.[0] ?? null)}
					className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
					required
				/>
			</div>

			<div className="bg-slate-50 p-4 font-mono font-bold text-lg text-center border mt-6">
				Alumni Application Fee: ₦5,000
			</div>

			<button type="submit" className="w-full bg-slate-900 text-white py-4 mt-4 font-bold text-lg hover:bg-blue-700">
				Proceed to Secure Payment →
			</button>
		</form>
	)
}

export default TechTransitionForm
