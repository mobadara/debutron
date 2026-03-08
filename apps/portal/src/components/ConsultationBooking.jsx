import { useMemo, useState } from 'react'
import { FiCalendar, FiMapPin, FiVideo } from 'react-icons/fi'

const initialFormData = {
	name: '',
	email: '',
	phone: '',
	consultType: '',
	format: '',
	date: '',
	time: '',
}

function ConsultationBooking() {
	const [formData, setFormData] = useState(initialFormData)
	const [unavailableDates] = useState(['2026-03-01', '2026-03-05'])
	const [availableTimeSlots, setAvailableTimeSlots] = useState(['10:00 AM', '1:00 PM', '3:30 PM'])

	const isUnavailableDate = useMemo(
		() => unavailableDates.includes(formData.date),
		[formData.date, unavailableDates]
	)

	const handleChange = (event) => {
		const { name, value } = event.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	const handleDateChange = (event) => {
		const { value } = event.target

		setFormData((prev) => ({ ...prev, date: value, time: '' }))

		// In production, this onChange will trigger an API call to FastAPI to fetch available time slots for the selected date.
		if (unavailableDates.includes(value)) {
			setAvailableTimeSlots([])
			return
		}

		setAvailableTimeSlots(['10:00 AM', '1:00 PM', '3:30 PM'])
	}

	const handleSubmit = (event) => {
		event.preventDefault()
	}

	return (
		<section className="mx-auto mt-12 max-w-3xl border border-gray-200 border-b-4 border-b-debutron-navy bg-white px-6 py-16 shadow-sm dark:border-slate-700 dark:border-b-slate-500 dark:bg-slate-900">
			<header className="mb-8">
				<h2 className="mb-2 font-serif text-3xl text-debutron-navy dark:text-slate-200">Book a Consultation</h2>
				<p className="font-sans text-gray-600 dark:text-slate-300">Schedule a strategic session with our academic and tech advisors.</p>
			</header>

			<form onSubmit={handleSubmit} className="space-y-6">
				<div className="grid gap-4 md:grid-cols-3">
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						placeholder="Full Name"
						className="w-full rounded-sm border border-gray-300 bg-gray-50 p-3 font-sans outline-none focus:border-debutron-navy focus:ring-1 focus:ring-debutron-navy dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
						required
					/>
					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						placeholder="Email Address"
						className="w-full rounded-sm border border-gray-300 bg-gray-50 p-3 font-sans outline-none focus:border-debutron-navy focus:ring-1 focus:ring-debutron-navy dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
						required
					/>
					<input
						type="tel"
						name="phone"
						value={formData.phone}
						onChange={handleChange}
						placeholder="Phone Number"
						className="w-full rounded-sm border border-gray-300 bg-gray-50 p-3 font-sans outline-none focus:border-debutron-navy focus:ring-1 focus:ring-debutron-navy dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
						required
					/>
				</div>

				<div>
					<select
						name="consultType"
						value={formData.consultType}
						onChange={handleChange}
						className="w-full rounded-sm border border-gray-300 bg-gray-50 p-3 font-sans outline-none focus:border-debutron-navy focus:ring-1 focus:ring-debutron-navy dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
						required
					>
						<option value="">Consultation Focus</option>
						<option value="University Admissions Advisory">University Admissions Advisory</option>
						<option value="Tech Career Mapping">Tech Career Mapping</option>
						<option value="General Inquiry">General Inquiry</option>
					</select>
				</div>

				<div className="grid gap-4 md:grid-cols-2">
					<label
						className={`flex cursor-pointer items-center justify-between rounded-sm border p-4 transition-colors dark:bg-slate-800 ${
							formData.format === 'In-Person (Debutron Lab, Ibadan)' ? 'border-debutron-navy dark:border-slate-400' : 'border-gray-300 dark:border-slate-600'
						}`}
					>
						<div>
							<p className="font-sans font-bold text-debutron-navy dark:text-slate-200">In-Person (Debutron Lab, Ibadan)</p>
						</div>
						<div className="flex items-center gap-2 text-debutron-navy dark:text-slate-200">
							<FiMapPin />
							<input
								type="radio"
								name="format"
								value="In-Person (Debutron Lab, Ibadan)"
								checked={formData.format === 'In-Person (Debutron Lab, Ibadan)'}
								onChange={handleChange}
								required
							/>
						</div>
					</label>

					<label
						className={`flex cursor-pointer items-center justify-between rounded-sm border p-4 transition-colors dark:bg-slate-800 ${
							formData.format === 'Online (Zoom)' ? 'border-debutron-navy dark:border-slate-400' : 'border-gray-300 dark:border-slate-600'
						}`}
					>
						<div>
							<p className="font-sans font-bold text-debutron-navy dark:text-slate-200">Online (Zoom)</p>
						</div>
						<div className="flex items-center gap-2 text-debutron-navy dark:text-slate-200">
							<FiVideo />
							<input
								type="radio"
								name="format"
								value="Online (Zoom)"
								checked={formData.format === 'Online (Zoom)'}
								onChange={handleChange}
								required
							/>
						</div>
					</label>
				</div>

				<div className="grid gap-4 md:grid-cols-2">
					<div>
						<label className="mb-1 flex items-center gap-2 font-sans text-sm font-bold text-debutron-navy dark:text-slate-200">
							<FiCalendar />
							Preferred Date
						</label>
						<input
							type="date"
							name="date"
							value={formData.date}
							onChange={handleDateChange}
							className="w-full rounded-sm border border-gray-300 bg-gray-50 p-3 font-sans outline-none focus:border-debutron-navy focus:ring-1 focus:ring-debutron-navy dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
							required
						/>
						{isUnavailableDate && <p className="mt-1 font-sans text-xs text-red-600">This date is unavailable. Please select another date.</p>}
					</div>

					<div>
						<label className="mb-1 block font-sans text-sm font-bold text-debutron-navy dark:text-slate-200">Preferred Time</label>
						<input
							type="time"
							name="time"
							value={formData.time}
							onChange={handleChange}
							className="w-full rounded-sm border border-gray-300 bg-gray-50 p-3 font-sans outline-none focus:border-debutron-navy focus:ring-1 focus:ring-debutron-navy dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
							required
						/>
					</div>
				</div>

				<div>
					<select
						name="time"
						value={formData.time}
						onChange={handleChange}
						className="w-full rounded-sm border border-gray-300 bg-gray-50 p-3 font-sans outline-none focus:border-debutron-navy focus:ring-1 focus:ring-debutron-navy dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
						disabled={availableTimeSlots.length === 0}
					>
						<option value="">Select an available time slot</option>
						{availableTimeSlots.map((slot) => (
							<option key={slot} value={slot}>
								{slot}
							</option>
						))}
					</select>
				</div>

				<button
					type="submit"
					className="mt-8 w-full rounded-sm bg-debutron-navy px-8 py-3 font-sans font-bold text-white"
				>
					Confirm Booking
				</button>
			</form>
		</section>
	)
}

export default ConsultationBooking
