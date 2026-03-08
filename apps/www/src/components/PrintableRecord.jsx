import React from 'react'
import DebutronLogo from './DebutronLogo'

export default function PrintableRecord({ studentData, academicData, overallAverage }) {
	const issuedDate = new Date().toLocaleDateString()

	return (
		<div className="max-w-4xl mx-auto p-12 bg-white text-slate-900 border border-gray-200 print:border-none print:p-0 font-sans">
			<header className="flex items-center justify-between gap-6">
				<div className="flex items-center gap-4">
					<DebutronLogo className="w-12 h-12" />
					<p className="text-sm text-slate-700">Ibadan, Nigeria</p>
				</div>

				<div className="text-right">
					<h1 className="font-serif text-2xl font-bold tracking-widest">OFFICIAL ACADEMIC RECORD</h1>
					<p className="mt-2 text-sm text-slate-600">Date Issued: {issuedDate}</p>
				</div>
			</header>

			<hr className="border-t-2 border-slate-900 my-8" />

			<section className="grid grid-cols-2 gap-4 mb-8 text-sm">
				<p>
					<span className="font-bold">Student Name:</span> {studentData?.name}
				</p>
				<p className="text-right">
					<span className="font-bold">Student ID:</span> {studentData?.id} |{' '}
					<span className="font-bold">Track:</span> {studentData?.track}
				</p>
			</section>

			<section>
				<table className="w-full border-collapse text-sm">
					<thead>
						<tr className="border-b-2 border-slate-900 text-left">
							<th className="p-3 font-bold">Assessment / Module</th>
							<th className="p-3 font-bold">Score</th>
							<th className="p-3 font-bold">Grade</th>
						</tr>
					</thead>
					<tbody>
						{academicData?.map((item, index) => (
							<tr key={item.id ?? `${item.title ?? item.name ?? 'assessment'}-${index}`} className="border-b border-slate-200">
								<td className="p-3">{item.title ?? item.name}</td>
								<td className="p-3">{item.score}</td>
								<td className="p-3">{item.grade}</td>
							</tr>
						))}

						<tr className="border-t-2 border-slate-900 font-bold">
							<td className="p-3">OVERALL AVERAGE</td>
							<td className="p-3">{overallAverage}%</td>
							<td className="p-3" />
						</tr>
					</tbody>
				</table>
			</section>

			<footer className="mt-16">
				<div className="w-56">
					<img src="/signature.png" alt="Director of Academics signature" className="h-16 w-auto object-contain" />
					<div className="border-t border-slate-400 pt-2 mt-2">
						<p className="font-bold text-sm">Director of Academics</p>
					</div>
				</div>
			</footer>
		</div>
	)
}
