import { useState } from 'react'

function CookieConsent() {
	const [isVisible, setIsVisible] = useState(true)

	if (!isVisible) return null

	return (
		<div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-700 bg-slate-900 p-6 text-white shadow-2xl">
			<div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
				<div>
					<h3 className="mb-2 font-serif text-lg font-bold">Data Privacy &amp; Cookie Consent</h3>
					<p className="max-w-4xl font-sans text-sm leading-relaxed text-gray-300">
						Debutron Lab uses essential cookies to ensure the secure processing of your application, payments, and portal authentication. With your consent, we also utilize AI-driven analytics to map learning profiles and optimize our digital campus experience. We are committed to the secure, ethical handling of your academic and personal data.
					</p>
				</div>

				<div className="flex w-full items-center justify-end md:w-auto">
					<button
						type="button"
						className="mr-6 font-sans text-sm text-gray-300 underline hover:text-white"
					>
						Manage Preferences
					</button>
					<button
						type="button"
						onClick={() => setIsVisible(false)}
						className="rounded-sm bg-blue-600 px-6 py-2 font-sans font-bold text-white shadow-md transition-colors hover:bg-blue-700"
					>
						Accept All
					</button>
				</div>
			</div>
		</div>
	)
}

export default CookieConsent
