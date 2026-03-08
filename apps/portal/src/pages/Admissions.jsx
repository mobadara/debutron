import { useState } from 'react'
import { Link } from 'react-router-dom'
import { admissionsPageData } from '../data/public/admissionsData'

function Admissions() {
	const [activeTab, setActiveTab] = useState('utme')
	const currentTab = admissionsPageData.tabs.find((tab) => tab.id === activeTab)

	return (
		<div className="bg-white text-debutron-charcoal">
			<section className="bg-debutron-navy px-6 py-20 text-center text-white">
				<h1 className="mb-4 font-serif text-4xl font-bold md:text-5xl">{admissionsPageData.hero.title}</h1>
				<p className="mx-auto max-w-3xl font-sans text-lg text-gray-200">
					{admissionsPageData.hero.body}
				</p>
			</section>

			<section className="mx-auto max-w-5xl px-6 py-16">
				<h2 className="mb-10 text-center font-serif text-3xl text-debutron-navy">{admissionsPageData.requirementsTitle}</h2>

				<div className="-mx-6 mb-8 overflow-x-auto px-6">
					<div className="flex min-w-max justify-start gap-6 border-b border-gray-200 md:justify-center md:gap-8">
						{admissionsPageData.tabs.map((tab) => (
							<button
								key={tab.id}
								type="button"
								onClick={() => setActiveTab(tab.id)}
								className={activeTab === tab.id
									? 'shrink-0 whitespace-nowrap border-b-2 border-debutron-navy pb-2 font-serif text-base text-debutron-navy md:text-xl'
									: 'cursor-pointer shrink-0 whitespace-nowrap pb-2 font-serif text-base text-gray-500 transition-colors hover:text-debutron-navy md:text-xl'}
							>
								{tab.label}
							</button>
						))}
					</div>
				</div>

				<div className="rounded-sm border border-gray-100 bg-white p-10 shadow-sm">
					{currentTab?.type === 'list' && (
						<ul className="list-disc space-y-3 pl-6 font-sans text-lg text-gray-700">
							{currentTab.items.map((item) => (
								<li key={item}>{item}</li>
							))}
						</ul>
					)}

					{currentTab?.type === 'coming-soon' && (
						<div className="text-center">
							<span className="mb-4 inline-block rounded-sm bg-yellow-500 px-3 py-1 text-xs font-bold uppercase text-debutron-navy">
								{currentTab.notice}
							</span>
							<p className="font-sans text-lg text-gray-700">
								{currentTab.body}
							</p>
						</div>
					)}
				</div>
			</section>

			<section className="mt-12 border-t border-gray-200 bg-gray-50 py-16 text-center">
				<h3 className="mb-6 font-serif text-3xl text-debutron-navy">{admissionsPageData.cta.title}</h3>
				<Link
					to={admissionsPageData.cta.link}
					className="rounded-sm bg-debutron-navy px-10 py-4 font-sans text-lg font-bold text-white shadow-md transition-colors hover:bg-debutron-charcoal"
				>
					{admissionsPageData.cta.label}
				</Link>
			</section>
		</div>
	)
}

export default Admissions
