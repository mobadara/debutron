import { useEffect, useMemo, useState } from 'react'

const initialFormData = {
	programType: '',
	studyMode: '',
	firstName: '',
	lastName: '',
	email: '',
	phone: '',
	dateOfBirth: '',
	educationLevel: '',
	statement: '',
}

const initialFiles = {
	passportPhoto: null,
	identityDocument: null,
	academicTranscript: null,
}

function ApplicationForm() {
	const [step, setStep] = useState(1)
	const [formData, setFormData] = useState(initialFormData)
	const [files, setFiles] = useState(initialFiles)
	const [paymentMethod, setPaymentMethod] = useState('card')
	const [referenceNumber, setReferenceNumber] = useState('')

	const generateReference = () => {
		const digits = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('')
		const letters = Array.from({ length: 3 }, () => String.fromCharCode(65 + Math.floor(Math.random() * 26))).join('')
		return `${digits}${letters}`
	}

	useEffect(() => {
		setReferenceNumber(generateReference())
	}, [])

	const updateField = (event) => {
		const { name, value } = event.target
		setFormData((prev) => ({
			...prev,
			[name]: value,
			...(name === 'programType' && value !== 'Tech Innovation Track' ? { studyMode: '' } : {}),
		}))
	}

	const updateFile = (event) => {
		const { name, files: selectedFiles } = event.target
		setFiles((prev) => ({ ...prev, [name]: selectedFiles?.[0] ?? null }))
	}

	const nextStep = () => setStep((prev) => Math.min(prev + 1, 5))
	const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))

	const resetForm = () => {
		setFormData(initialFormData)
		setFiles(initialFiles)
		setPaymentMethod('card')
		setStep(1)
		setReferenceNumber(generateReference())
	}

	const handlePaymentSubmit = (event) => {
		event.preventDefault()
		window.alert(`Payment successful.\nApplication submitted with reference: ${referenceNumber}`)
		resetForm()
	}

	const summaryItems = useMemo(
		() => [
			{ label: 'Program Type', value: formData.programType || '—' },
			{ label: 'Study Mode', value: formData.programType === 'Tech Innovation Track' ? formData.studyMode || '—' : 'Onsite (Academic Track Default)' },
			{ label: 'Full Name', value: `${formData.firstName} ${formData.lastName}`.trim() || '—' },
			{ label: 'Email', value: formData.email || '—' },
			{ label: 'Phone', value: formData.phone || '—' },
			{ label: 'Date of Birth', value: formData.dateOfBirth || '—' },
			{ label: 'Education Level', value: formData.educationLevel || '—' },
			{ label: 'Statement of Purpose', value: formData.statement || '—' },
		],
		[formData]
	)

	return (
		<section className="mx-auto max-w-5xl px-6 py-12">
			<header className="mb-8 text-center">
				<h2 className="font-serif text-3xl font-bold text-debutron-navy md:text-4xl">Debutron Application Form</h2>
				<p className="mt-3 font-sans text-gray-600">Complete all steps to finalize your admission request.</p>
			</header>

			<div className="mb-8 flex flex-wrap justify-center gap-2 font-sans text-sm">
				{[1, 2, 3, 4, 5].map((index) => (
					<span
						key={index}
						className={`rounded-full px-3 py-1 ${step === index ? 'bg-debutron-navy text-white' : 'bg-gray-100 text-gray-600'}`}
					>
						Step {index}
					</span>
				))}
			</div>

			<form onSubmit={handlePaymentSubmit} className="rounded-sm border border-gray-200 bg-white p-6 shadow-sm md:p-10">
				{step === 1 && (
					<div className="space-y-6">
						<h3 className="font-serif text-2xl text-debutron-navy">Track Selection</h3>
						<div>
							<label htmlFor="programType" className="mb-2 block font-sans text-sm font-semibold text-gray-700">Program Type</label>
							<select
								id="programType"
								name="programType"
								value={formData.programType}
								onChange={updateField}
								className="w-full rounded-sm border border-gray-300 px-4 py-3 font-sans text-gray-800 focus:border-debutron-navy focus:outline-none"
								required
							>
								<option value="">Select a track</option>
								<option value="Academic Track">Academic Track</option>
								<option value="Tech Innovation Track">Tech Innovation Track</option>
							</select>
						</div>

						{formData.programType === 'Tech Innovation Track' && (
							<div>
								<label htmlFor="studyMode" className="mb-2 block font-sans text-sm font-semibold text-gray-700">Study Mode</label>
								<select
									id="studyMode"
									name="studyMode"
									value={formData.studyMode}
									onChange={updateField}
									className="w-full rounded-sm border border-gray-300 px-4 py-3 font-sans text-gray-800 focus:border-debutron-navy focus:outline-none"
									required
								>
									<option value="">Select study mode</option>
									<option value="Onsite (Debutron Lab, Ibadan)">Onsite (Debutron Lab, Ibadan)</option>
									<option value="Online (Remote)">Online (Remote)</option>
								</select>
							</div>
						)}
					</div>
				)}

				{step === 2 && (
					<div className="space-y-6">
						<h3 className="font-serif text-2xl text-debutron-navy">Personal Information</h3>
						<div className="grid gap-5 md:grid-cols-2">
							<input name="firstName" value={formData.firstName} onChange={updateField} placeholder="First Name" className="rounded-sm border border-gray-300 px-4 py-3 font-sans" required />
							<input name="lastName" value={formData.lastName} onChange={updateField} placeholder="Last Name" className="rounded-sm border border-gray-300 px-4 py-3 font-sans" required />
							<input type="email" name="email" value={formData.email} onChange={updateField} placeholder="Email" className="rounded-sm border border-gray-300 px-4 py-3 font-sans md:col-span-2" required />
							<input name="phone" value={formData.phone} onChange={updateField} placeholder="Phone Number" className="rounded-sm border border-gray-300 px-4 py-3 font-sans" required />
							<input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={updateField} className="rounded-sm border border-gray-300 px-4 py-3 font-sans" required />
						</div>
					</div>
				)}

				{step === 3 && (
					<div className="space-y-6">
						<h3 className="font-serif text-2xl text-debutron-navy">Academic Background</h3>
						<select
							name="educationLevel"
							value={formData.educationLevel}
							onChange={updateField}
							className="w-full rounded-sm border border-gray-300 px-4 py-3 font-sans"
							required
						>
							<option value="">Highest Education Level</option>
							<option value="Secondary School">Secondary School</option>
							<option value="OND/NCE">OND/NCE</option>
							<option value="HND/BSc">HND/BSc</option>
							<option value="Postgraduate">Postgraduate</option>
						</select>
						<textarea
							name="statement"
							value={formData.statement}
							onChange={updateField}
							rows={5}
							placeholder="Tell us why you are applying to Debutron Lab..."
							className="w-full rounded-sm border border-gray-300 px-4 py-3 font-sans"
						/>
					</div>
				)}

				{step === 4 && (
					<div className="space-y-6">
						<h3 className="font-serif text-2xl text-debutron-navy">Upload Documents</h3>
						<div className="grid gap-5 md:grid-cols-2">
							<div>
								<label htmlFor="passportPhoto" className="mb-2 block font-sans text-sm font-semibold text-gray-700">Passport Photo</label>
								<input id="passportPhoto" name="passportPhoto" type="file" onChange={updateFile} className="w-full font-sans text-sm" />
							</div>
							<div>
								<label htmlFor="identityDocument" className="mb-2 block font-sans text-sm font-semibold text-gray-700">Identity Document</label>
								<input id="identityDocument" name="identityDocument" type="file" onChange={updateFile} className="w-full font-sans text-sm" />
							</div>
							<div className="md:col-span-2">
								<label htmlFor="academicTranscript" className="mb-2 block font-sans text-sm font-semibold text-gray-700">Academic Transcript</label>
								<input id="academicTranscript" name="academicTranscript" type="file" onChange={updateFile} className="w-full font-sans text-sm" />
							</div>
						</div>
					</div>
				)}

				{step === 5 && (
					<div className="mx-auto max-w-4xl space-y-8">
						<section>
							<h3 className="mb-4 font-serif text-2xl text-debutron-navy">Application Preview</h3>
							<div className="mb-8 border border-gray-200 bg-white p-6 shadow-sm">
								<div className="grid gap-4 md:grid-cols-2">
									{summaryItems.map((item) => (
										<div key={item.label}>
											<p className="font-sans text-xs font-semibold uppercase tracking-wide text-gray-500">{item.label}</p>
											<p className="font-sans text-sm text-gray-800">{item.value}</p>
										</div>
									))}
								</div>
								<div className="mt-6 border-t border-gray-100 pt-4">
									<p className="mb-2 font-sans text-xs font-semibold uppercase tracking-wide text-gray-500">Uploaded Documents</p>
									<ul className="space-y-1 font-sans text-sm text-gray-800">
										<li>Passport Photo: {files.passportPhoto?.name || 'Not uploaded'}</li>
										<li>Identity Document: {files.identityDocument?.name || 'Not uploaded'}</li>
										<li>Academic Transcript: {files.academicTranscript?.name || 'Not uploaded'}</li>
									</ul>
								</div>
							</div>
						</section>

						<section>
							<h3 className="mb-4 font-serif text-2xl text-debutron-navy">Application Processing Fee</h3>
							<div className="rounded-sm border-t-4 border-debutron-navy bg-gray-50 p-8 text-center shadow-md">
								<p className="mb-2 font-sans text-lg text-gray-700">Your Application Reference: <span className="font-bold text-debutron-navy">{referenceNumber}</span></p>
								<p className="mb-4 font-sans text-sm text-gray-600">Please save this number for payment verification and future tracking.</p>
								<p className="mb-6 font-sans text-2xl font-bold text-gray-900">Processing Fee: ₦10,000</p>

								<div className="mx-auto grid max-w-2xl gap-4 md:grid-cols-2">
									<label className={`flex cursor-pointer items-center justify-between rounded-sm border px-4 py-3 font-sans ${paymentMethod === 'card' ? 'border-debutron-navy bg-white' : 'border-gray-300 bg-white'}`}>
										<span className="font-bold text-debutron-navy">Pay with Card</span>
										<input type="radio" name="paymentMethod" value="card" checked={paymentMethod === 'card'} onChange={(event) => setPaymentMethod(event.target.value)} />
									</label>
									<label className={`flex cursor-pointer items-center justify-between rounded-sm border px-4 py-3 font-sans ${paymentMethod === 'gateway' ? 'border-debutron-navy bg-white' : 'border-gray-300 bg-white'}`}>
										<span className="font-bold text-debutron-navy">Paystack / Flutterwave</span>
										<input type="radio" name="paymentMethod" value="gateway" checked={paymentMethod === 'gateway'} onChange={(event) => setPaymentMethod(event.target.value)} />
									</label>
								</div>
							</div>
						</section>
					</div>
				)}

				<div className="mt-10 flex flex-col-reverse items-center justify-between gap-4 md:flex-row">
					<button
						type="button"
						onClick={prevStep}
						disabled={step === 1}
						className="w-full rounded-sm border border-gray-300 px-6 py-3 font-sans font-semibold text-gray-700 disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
					>
						Back
					</button>

					{step < 5 ? (
						<button
							type="button"
							onClick={nextStep}
							className="w-full rounded-sm bg-debutron-navy px-8 py-3 font-sans font-bold text-white transition-colors hover:bg-debutron-charcoal md:w-auto"
						>
							Continue
						</button>
					) : (
						<button
							type="submit"
							className="w-full rounded-sm bg-green-700 px-10 py-4 font-sans text-lg font-bold text-white shadow-md transition-colors hover:bg-green-800 md:w-auto"
						>
							Pay & Submit Application
						</button>
					)}
				</div>
			</form>
		</section>
	)
}

export default ApplicationForm
