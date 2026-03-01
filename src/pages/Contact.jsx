import { useState } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'

function Contact() {
	const [formData, setFormData] = useState({
		fullName: '',
		email: '',
		phone: '',
		inquiryType: 'Academic Prep',
		message: ''
	})

	const handleChange = (event) => {
		const { name, value } = event.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		console.log('Contact inquiry submitted:', formData)
		setFormData({
			fullName: '',
			email: '',
			phone: '',
			inquiryType: 'Academic Prep',
			message: ''
		})
	}

	return (
		<section className="route-page bg-gray-100">
			<div className="mx-auto max-w-7xl px-6 py-16 md:px-12">
				<header className="mb-10">
					<h1 className="mb-4 font-serif text-4xl font-bold text-debutron-navy">Contact Debutron Lab</h1>
					<p className="font-sans text-lg text-debutron-charcoal">
						Reach out to our academic advisors, technical mentors, and testing center coordinators.
					</p>
				</header>

				<div className="grid gap-8 lg:grid-cols-2">
					<section className="rounded-sm border border-gray-200 bg-white p-8">
						<h2 className="mb-6 font-serif text-2xl text-debutron-navy">Official Contact Information</h2>
						<div className="space-y-5 font-sans text-debutron-charcoal leading-relaxed">
							<div className="flex items-start gap-3">
								<MapPin className="mt-1 h-7 w-7 text-debutron-navy" aria-hidden="true" />
								<p>
									A6, Jerusalem Crescent, Arulogun Road, City: Ibadan, State: OY, Country: Nigeria, Zip: 200132
								</p>
							</div>
							<div className="flex items-start gap-3">
								<Phone className="mt-1 h-5 w-5 text-debutron-navy" aria-hidden="true" />
								<a href="tel:+2348060111429" className="transition-colors hover:text-debutron-navy">+234 (806) 011 1429</a>
							</div>
							<div className="flex items-start gap-3">
								<Mail className="mt-1 h-5 w-5 text-debutron-navy" aria-hidden="true" />
								<a href="mailto:debutronlab@gmail.com" className="transition-colors hover:text-debutron-navy">debutronlab@gmail.com</a>
							</div>
							<div className="flex items-start gap-3">
								<span className="mt-1 inline-block h-5 w-5 text-center text-debutron-navy" aria-hidden="true">🌐</span>
								<a href="https://debutron.org" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-debutron-navy">https://debutron.org</a>
							</div>
						</div>
					</section>

					<section className="bg-white p-8 border border-gray-200 shadow-sm rounded-sm">
						<h2 className="mb-6 font-serif text-2xl text-debutron-navy">Institutional Inquiry Form</h2>
						<form onSubmit={handleSubmit}>
							<label htmlFor="fullName" className="mb-2 block font-sans text-sm text-debutron-charcoal">Full Name</label>
							<input
								type="text"
								id="fullName"
								name="fullName"
								value={formData.fullName}
								onChange={handleChange}
								required
								className="w-full border-b-2 border-gray-300 bg-gray-50 p-3 font-sans focus:border-debutron-navy focus:bg-white outline-none transition-colors mb-4"
							/>

							<label htmlFor="email" className="mb-2 block font-sans text-sm text-debutron-charcoal">Email Address</label>
							<input
								type="email"
								id="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								required
								className="w-full border-b-2 border-gray-300 bg-gray-50 p-3 font-sans focus:border-debutron-navy focus:bg-white outline-none transition-colors mb-4"
							/>

							<label htmlFor="phone" className="mb-2 block font-sans text-sm text-debutron-charcoal">Phone Number</label>
							<input
								type="tel"
								id="phone"
								name="phone"
								value={formData.phone}
								onChange={handleChange}
								className="w-full border-b-2 border-gray-300 bg-gray-50 p-3 font-sans focus:border-debutron-navy focus:bg-white outline-none transition-colors mb-4"
							/>

							<label htmlFor="inquiryType" className="mb-2 block font-sans text-sm text-debutron-charcoal">Inquiry Type</label>
							<select
								id="inquiryType"
								name="inquiryType"
								value={formData.inquiryType}
								onChange={handleChange}
								className="w-full border-b-2 border-gray-300 bg-gray-50 p-3 font-sans focus:border-debutron-navy focus:bg-white outline-none transition-colors mb-4"
							>
								<option>Academic Prep (UTME/WASSCE/A-Level)</option>
								<option>Tech Innovation Tracks</option>
								<option>Inclusive Remedial Prep</option>
								<option>Pearson VUE / Exam Registration</option>
								<option>Enterprise Consulting</option>
							</select>

							<label htmlFor="message" className="mb-2 block font-sans text-sm text-debutron-charcoal">Message</label>
							<textarea
								id="message"
								name="message"
								value={formData.message}
								onChange={handleChange}
								required
								className="w-full border-b-2 border-gray-300 bg-gray-50 p-3 font-sans focus:border-debutron-navy focus:bg-white outline-none transition-colors mb-4 min-h-[150px]"
							/>

							<button
								type="submit"
								className="w-full bg-debutron-navy text-white font-sans font-semibold py-3 hover:bg-debutron-charcoal transition-colors rounded-sm tracking-wide"
							>
								Submit Inquiry
							</button>
						</form>
					</section>
				</div>

				<section className="mt-10">
					<iframe
						title="Debutron Lab Location Map"
						src="https://www.google.com/maps?q=A6%20Jerusalem%20Crescent%2C%20Arulogun%20Road%2C%20Ibadan%2C%20Nigeria&output=embed"
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
						className="w-full h-64 md:h-80 lg:h-96 border-2 border-gray-200 shadow-md rounded-sm grayscale hover:grayscale-0 transition-all duration-500"
					/>
				</section>
			</div>
		</section>
	)
}

export default Contact
