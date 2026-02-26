import { useState } from 'react'
import { Link } from 'react-router-dom'

function Admissions() {
	const [activeTab, setActiveTab] = useState('utme')

	return (
		<div className="bg-white text-debutron-charcoal">
			<section className="bg-debutron-navy px-6 py-20 text-center text-white">
				<h1 className="mb-4 font-serif text-4xl font-bold md:text-5xl">Admissions at Debutron Lab</h1>
				<p className="mx-auto max-w-3xl font-sans text-lg text-gray-200">
					We evaluate more than just grades. Our holistic admission process identifies potential, maps your unique learning profile, and prepares you for rigorous academic and technical excellence.
				</p>
			</section>

			<section className="mx-auto max-w-5xl px-6 py-16">
				<h2 className="mb-10 text-center font-serif text-3xl text-debutron-navy">Program Entry Requirements</h2>

				<div className="-mx-6 mb-8 overflow-x-auto px-6">
					<div className="flex min-w-max justify-start gap-6 border-b border-gray-200 md:justify-center md:gap-8">
						<button
						type="button"
						onClick={() => setActiveTab('o-level')}
						className={activeTab === 'o-level'
							? 'shrink-0 whitespace-nowrap border-b-2 border-debutron-navy pb-2 font-serif text-base text-debutron-navy md:text-xl'
							: 'cursor-pointer shrink-0 whitespace-nowrap pb-2 font-serif text-base text-gray-500 transition-colors hover:text-debutron-navy md:text-xl'}
					>
						O-Level Mastery
					</button>
						<button
						type="button"
						onClick={() => setActiveTab('utme')}
						className={activeTab === 'utme'
							? 'shrink-0 whitespace-nowrap border-b-2 border-debutron-navy pb-2 font-serif text-base text-debutron-navy md:text-xl'
							: 'cursor-pointer shrink-0 whitespace-nowrap pb-2 font-serif text-base text-gray-500 transition-colors hover:text-debutron-navy md:text-xl'}
					>
						UTME Accelerator
					</button>
						<button
						type="button"
						onClick={() => setActiveTab('tech')}
						className={activeTab === 'tech'
							? 'shrink-0 whitespace-nowrap border-b-2 border-debutron-navy pb-2 font-serif text-base text-debutron-navy md:text-xl'
							: 'cursor-pointer shrink-0 whitespace-nowrap pb-2 font-serif text-base text-gray-500 transition-colors hover:text-debutron-navy md:text-xl'}
					>
						Tech Innovation Tracks
					</button>
						<button
						type="button"
						onClick={() => setActiveTab('a-level')}
						className={activeTab === 'a-level'
							? 'shrink-0 whitespace-nowrap border-b-2 border-debutron-navy pb-2 font-serif text-base text-debutron-navy md:text-xl'
							: 'cursor-pointer shrink-0 whitespace-nowrap pb-2 font-serif text-base text-gray-500 transition-colors hover:text-debutron-navy md:text-xl'}
					>
						A-Level Excellence
					</button>
					</div>
				</div>

				<div className="rounded-sm border border-gray-100 bg-white p-10 shadow-sm">
					{activeTab === 'o-level' && (
						<ul className="list-disc space-y-3 pl-6 font-sans text-lg text-gray-700">
							<li>Must be in the penultimate year of Senior Secondary School OR provide evidence of a previous O-Level attempt.</li>
							<li>Successful completion of the Debutron Lab Entrance Examination.</li>
							<li>Completion of our holistic Personality Survey and Aptitude Test (used to tailor our empathetic teaching approach).</li>
							<li>Must have reliable access to a personal computer or tablet for digital portal assignments.</li>
						</ul>
					)}

					{activeTab === 'utme' && (
						<ul className="list-disc space-y-3 pl-6 font-sans text-lg text-gray-700">
							<li>Evidence of registration or prior attempt of an O-Level examination.</li>
							<li>Successful completion of the UTME Diagnostic Entrance Examination.</li>
							<li>Completion of our comprehensive Personality and Aptitude Test to map your learning profile.</li>
							<li>Must have reliable access to a personal computer or tablet to utilize our AI-driven CBT simulation portal.</li>
						</ul>
					)}

					{activeTab === 'tech' && (
						<ul className="list-disc space-y-3 pl-6 font-sans text-lg text-gray-700">
							<li>Demonstrated passion for complex problem-solving and a strong foundational love for mathematics.</li>
							<li>Hardware Requirement: Must possess a highly capable PC (Minimum: Core i5/i7 processor, 500GB SSD, 8GB-16GB RAM).</li>
							<li>Exceptional personal motivation, discipline, and a goal-driven mindset.</li>
							<li>Successful completion of our Technical Assessment Test.</li>
							<li>Completion of the holistic Personality and Aptitude Test.</li>
						</ul>
					)}

					{activeTab === 'a-level' && (
						<div className="text-center">
							<span className="mb-4 inline-block rounded-sm bg-yellow-500 px-3 py-1 text-xs font-bold uppercase text-debutron-navy">
								Coming Soon
							</span>
							<p className="font-sans text-lg text-gray-700">
								Enrollment requirements for our direct-entry Cambridge A-Level and JUPEB programs will be published shortly. Please check back or contact admissions for timeline updates.
							</p>
						</div>
					)}
				</div>
			</section>

			<section className="mt-12 border-t border-gray-200 bg-gray-50 py-16 text-center">
				<h3 className="mb-6 font-serif text-3xl text-debutron-navy">Ready to begin your journey?</h3>
				<Link
					to="/apply"
					className="rounded-sm bg-debutron-navy px-10 py-4 font-sans text-lg font-bold text-white shadow-md transition-colors hover:bg-debutron-charcoal"
				>
					Start Application
				</Link>
			</section>
		</div>
	)
}

export default Admissions
