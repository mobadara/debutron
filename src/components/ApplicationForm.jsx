import { useEffect, useMemo, useState } from 'react'
import { FiInfo } from 'react-icons/fi'
import { Country, State } from 'country-state-city'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const initialFormData = {
	firstName: '',
	lastName: '',
	email: '',
	phone: '',
	phoneDialCode: '',
	streetAddress: '',
	city: '',
	state: '',
	country: '',
	programType: '',
	secondarySchool: '',
	studyMode: '',
	hardwareAccess: '',
	strengths: '',
	weaknesses: '',
	highestEducation: '',
	dateOfBirth: '',
	accommodations: '',
}

const initialFiles = {
	passportPhoto: null,
	governmentId: null,
	academicReferenceLetter: null,
	oLevelResult: null,
	motivationLetter: null,
}

const inputStyles = 'w-full border border-gray-300 p-3 rounded-sm focus:border-debutron-navy focus:ring-1 focus:ring-debutron-navy outline-none font-sans'

const FieldLabel = ({ text, hint }) => (
	<label className="block font-sans text-sm font-bold text-debutron-navy mb-1 flex items-center gap-2">
		{text}
		{hint && <FiInfo className="text-gray-400 cursor-help" title={hint} />}
	</label>
)

const FieldError = ({ message }) => (
	message ? <p className="mt-1 font-sans text-xs text-red-600">{message}</p> : null
)

const getFlagEmoji = (isoCode) => {
	if (!isoCode || isoCode.length !== 2) return ''
	return isoCode
		.toUpperCase()
		.split('')
		.map((character) => String.fromCodePoint(127397 + character.charCodeAt()))
		.join('')
}

function ApplicationForm() {
	const [step, setStep] = useState(1)
	const [formData, setFormData] = useState(initialFormData)
	const [errors, setErrors] = useState({})
	const [files, setFiles] = useState(initialFiles)
	const [paymentMethod, setPaymentMethod] = useState('card')
	const [referenceNumber, setReferenceNumber] = useState('')

	const countries = useMemo(
		() => Country.getAllCountries().sort((firstCountry, secondCountry) => firstCountry.name.localeCompare(secondCountry.name)),
		[]
	)

	const states = useMemo(
		() => (formData.country ? State.getStatesOfCountry(formData.country).sort((firstState, secondState) => firstState.name.localeCompare(secondState.name)) : []),
		[formData.country]
	)

	const selectedCountry = useMemo(
		() => countries.find((countryItem) => countryItem.isoCode === formData.country),
		[countries, formData.country]
	)

	const selectedState = useMemo(
		() => states.find((stateItem) => stateItem.isoCode === formData.state),
		[states, formData.state]
	)

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
		setErrors((prev) => {
			const nextErrors = { ...prev }
			delete nextErrors[name]
			if (name === 'country') {
				delete nextErrors.state
			}
			if (name === 'programType' && value !== 'Tech Innovation Track') {
				delete nextErrors.studyMode
				delete nextErrors.hardwareAccess
				delete nextErrors.motivationLetter
			}
			if (name === 'programType' && value !== 'Academic Track') {
				delete nextErrors.academicReferenceLetter
			}
			return nextErrors
		})

		setFormData((prev) => ({
			...prev,
			[name]: value,
			...(name === 'country' ? { state: '' } : {}),
			...(name === 'programType' && value !== 'Tech Innovation Track' ? { studyMode: '', hardwareAccess: '' } : {}),
		}))
	}

	const updatePhone = (value, countryData) => {
		setErrors((prev) => {
			const nextErrors = { ...prev }
			delete nextErrors.phone
			return nextErrors
		})

		setFormData((prev) => ({
			...prev,
			phone: value,
			phoneDialCode: countryData?.dialCode ? `+${countryData.dialCode}` : '',
		}))
	}

	const updateFile = (event) => {
		const { name, files: selectedFiles } = event.target
		setErrors((prev) => {
			const nextErrors = { ...prev }
			delete nextErrors[name]
			return nextErrors
		})
		setFiles((prev) => ({ ...prev, [name]: selectedFiles?.[0] ?? null }))
	}

	const isBlank = (value) => !value || value.toString().trim() === ''
	const isPhoneValid = (phoneNumber, dialCode) => {
		if (isBlank(phoneNumber)) return false
		const numberDigits = phoneNumber.replace(/\D/g, '')
		const dialDigits = (dialCode || '').replace(/\D/g, '')
		return numberDigits.length > dialDigits.length + 4
	}

	const validateCurrentStep = () => {
		const stepErrors = {}

		if (step === 1) {
			if (isBlank(formData.programType)) stepErrors.programType = 'Please select a program track.'
		}

		if (step === 2) {
			if (isBlank(formData.firstName)) stepErrors.firstName = 'Please enter your first name.'
			if (isBlank(formData.lastName)) stepErrors.lastName = 'Please enter your last name.'
			if (isBlank(formData.email)) stepErrors.email = 'Please enter your email address.'
			if (!isPhoneValid(formData.phone, formData.phoneDialCode)) stepErrors.phone = 'Please enter a valid phone number.'
			if (isBlank(formData.streetAddress)) stepErrors.streetAddress = 'Please enter your street address.'
			if (isBlank(formData.city)) stepErrors.city = 'Please enter your city.'
			if (isBlank(formData.country)) stepErrors.country = 'Please select your country.'
			if (states.length > 0 && isBlank(formData.state)) stepErrors.state = 'Please select your state/province.'
		}

		if (step === 3) {
			if (formData.programType === 'Academic Track' && isBlank(formData.secondarySchool)) {
				stepErrors.secondarySchool = 'Please enter the name of your secondary school.'
			}
			if (formData.programType === 'Tech Innovation Track' && isBlank(formData.highestEducation)) stepErrors.highestEducation = 'Please select your highest level of education.'
			if (formData.programType === 'Tech Innovation Track' && isBlank(formData.studyMode)) stepErrors.studyMode = 'Please select a study mode.'
			if (formData.programType === 'Tech Innovation Track' && isBlank(formData.hardwareAccess)) stepErrors.hardwareAccess = 'Please select your hardware access option.'
		}

		if (step === 4) {
			if (isBlank(formData.dateOfBirth)) stepErrors.dateOfBirth = 'Please select your date of birth.'
		}

		if (step === 5) {
			if (!files.passportPhoto) stepErrors.passportPhoto = 'Please upload your recent passport photograph.'
			if (!files.governmentId) stepErrors.governmentId = 'Please upload a valid identification document.'
			if (formData.programType === 'Academic Track' && !files.academicReferenceLetter) {
				stepErrors.academicReferenceLetter = 'Please upload an academic reference letter.'
			}
			if (formData.programType === 'Tech Innovation Track' && !files.motivationLetter) {
				stepErrors.motivationLetter = 'Please upload your motivation letter.'
			}
		}

		return stepErrors
	}

	const nextStep = () => {
		const stepErrors = validateCurrentStep()
		if (Object.keys(stepErrors).length > 0) {
			setErrors(stepErrors)
			return
		}

		setErrors({})
		setStep((prev) => Math.min(prev + 1, 6))
	}
	const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))

	const resetForm = () => {
		setFormData(initialFormData)
		setErrors({})
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
			...(formData.programType === 'Tech Innovation Track'
				? [
					{ label: 'Highest Education', value: formData.highestEducation || '—' },
					{ label: 'Study Mode', value: formData.studyMode || '—' },
					{ label: 'Hardware Access', value: formData.hardwareAccess || '—' },
				]
				: []),
			{ label: 'Full Name', value: `${formData.firstName} ${formData.lastName}`.trim() || '—' },
			{ label: 'Email', value: formData.email || '—' },
			{ label: 'Phone', value: formData.phone ? `+${formData.phone}` : '—' },
			{ label: 'Phone Country Code', value: formData.phoneDialCode || '—' },
			{ label: 'Street Address', value: formData.streetAddress || '—' },
			{ label: 'City', value: formData.city || '—' },
			{ label: 'State/Province', value: selectedState?.name || (states.length > 0 ? '—' : 'Not applicable') },
			{ label: 'Country', value: selectedCountry?.name || '—' },
			...(formData.programType === 'Academic Track' ? [{ label: 'Secondary School', value: formData.secondarySchool || '—' }] : []),
			{ label: 'Strengths', value: formData.strengths || '—' },
			{ label: 'Weaknesses', value: formData.weaknesses || '—' },
			{ label: 'Date of Birth', value: formData.dateOfBirth || '—' },
			{ label: 'Accommodations', value: formData.accommodations || '—' },
		],
		[formData, selectedCountry?.name, selectedState?.name, states.length]
	)

	return (
		<section className="mx-auto max-w-5xl px-6 py-12">
			<header className="mb-8 text-center">
				<h2 className="font-serif text-3xl font-bold text-debutron-navy md:text-4xl">Debutron Application Form</h2>
				<p className="mt-3 font-sans text-gray-600">Complete all steps to finalize your admission request.</p>
			</header>

			<div className="mb-8 flex flex-wrap justify-center gap-2 font-sans text-sm">
				{[1, 2, 3, 4, 5, 6].map((index) => (
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
						<h3 className="font-serif text-3xl text-debutron-navy mb-6 text-center">Select Your Pathway</h3>
						<div className="grid gap-5 md:grid-cols-2">
							<label
								className={`cursor-pointer rounded-sm border-2 p-6 transition-colors ${
									formData.programType === 'Academic Track' ? 'border-debutron-navy bg-gray-50' : 'border-gray-200 bg-white hover:border-gray-300'
								}`}
							>
								<input
									type="radio"
									name="programType"
									value="Academic Track"
									checked={formData.programType === 'Academic Track'}
									onChange={updateField}
									className="sr-only"
								/>
								<p className="font-serif text-xl font-bold text-debutron-navy">Academic Track</p>
								<p className="mt-2 font-sans text-sm text-gray-600">O-Level Mastery, UTME Accelerator</p>
							</label>

							<label
								className={`cursor-pointer rounded-sm border-2 p-6 transition-colors ${
									formData.programType === 'Tech Innovation Track' ? 'border-debutron-navy bg-gray-50' : 'border-gray-200 bg-white hover:border-gray-300'
								}`}
							>
								<input
									type="radio"
									name="programType"
									value="Tech Innovation Track"
									checked={formData.programType === 'Tech Innovation Track'}
									onChange={updateField}
									className="sr-only"
								/>
								<p className="font-serif text-xl font-bold text-debutron-navy">Tech Innovation Track</p>
								<p className="mt-2 font-sans text-sm text-gray-600">Data Science, Software Engineering, Cloud, Cyber</p>
							</label>
						</div>
						<FieldError message={errors.programType} />
					</div>
				)}

				{step === 2 && (
					<div className="space-y-6">
						<h3 className="font-serif text-2xl text-debutron-navy">Personal Information</h3>
						<div className="grid gap-5 md:grid-cols-2">
							<div>
								<FieldLabel text="First Name" hint="Enter your legal first name as it appears on your identification." />
								<input name="firstName" value={formData.firstName} onChange={updateField} className={inputStyles} placeholder="Enter your first name" required />
								<FieldError message={errors.firstName} />
							</div>
							<div>
								<FieldLabel text="Last Name" hint="Enter your legal surname as it appears on your identification." />
								<input name="lastName" value={formData.lastName} onChange={updateField} className={inputStyles} placeholder="Enter your last name" required />
								<FieldError message={errors.lastName} />
							</div>
						</div>

						<div className="grid gap-5 md:grid-cols-2">
							<div>
								<FieldLabel text="Email" hint="We will use this for admission updates and payment confirmation." />
								<input type="email" name="email" value={formData.email} onChange={updateField} className={inputStyles} placeholder="you@example.com" required />
								<FieldError message={errors.email} />
							</div>
							<div>
								<FieldLabel text="Phone Number" hint="Choose your country code and enter a reachable number (Google-style format)." />
								<PhoneInput
									country={formData.country ? formData.country.toLowerCase() : 'ng'}
									value={formData.phone}
									onChange={updatePhone}
									enableSearch
									countryCodeEditable={false}
									placeholder="Enter your phone number"
									inputClass="!w-full !h-[46px] !font-sans !text-sm"
									buttonClass="!border-gray-300"
									containerClass="!w-full"
								/>
								<FieldError message={errors.phone} />
							</div>
						</div>

						<div className="space-y-5">
							<div>
								<FieldLabel text="Street Address" hint="Your primary residential address." />
								<input name="streetAddress" value={formData.streetAddress} onChange={updateField} className={inputStyles} placeholder="Enter your street address" required />
								<FieldError message={errors.streetAddress} />
							</div>
							<div className="grid gap-5 md:grid-cols-3">
								<div>
									<FieldLabel text="City" hint="Enter the city where you currently reside." />
									<input name="city" value={formData.city} onChange={updateField} className={inputStyles} placeholder="City" required />
									<FieldError message={errors.city} />
								</div>
								<div>
									<FieldLabel text="State/Province" hint="Enter your state or province of residence." />
									<select name="state" value={formData.state} onChange={updateField} className={inputStyles} disabled={!formData.country || states.length === 0} required={states.length > 0}>
										<option value="">{!formData.country ? 'Select country first' : states.length === 0 ? 'No states available' : 'Select state/province'}</option>
										{states.map((stateItem) => (
											<option key={stateItem.isoCode} value={stateItem.isoCode}>
												{getFlagEmoji(formData.country)} {stateItem.name}
											</option>
										))}
									</select>
									<FieldError message={errors.state} />
								</div>
								<div>
									<FieldLabel text="Country" hint="Select the country where you currently live." />
									<select name="country" value={formData.country} onChange={updateField} className={inputStyles} required>
										<option value="">Select country</option>
										{countries.map((countryItem) => (
											<option key={countryItem.isoCode} value={countryItem.isoCode}>
												{getFlagEmoji(countryItem.isoCode)} {countryItem.name}
											</option>
										))}
									</select>
									<FieldError message={errors.country} />
								</div>
							</div>
						</div>
					</div>
				)}

				{step === 3 && (
					<div className="space-y-6">
						<h3 className="font-serif text-2xl text-debutron-navy">Academic &amp; Logistical Details</h3>
						{formData.programType === 'Academic Track' && (
							<div>
								<FieldLabel
									text="Name of Secondary School Attended"
									hint="Enter the name of your current or most recent secondary school."
								/>
								<input name="secondarySchool" value={formData.secondarySchool} onChange={updateField} className={inputStyles} placeholder="Enter secondary school name" required />
								<FieldError message={errors.secondarySchool} />
							</div>
						)}

						{formData.programType === 'Tech Innovation Track' && (
							<>
								<div>
									<FieldLabel text="Highest Level of Education" hint="Select your current highest academic qualification." />
									<select name="highestEducation" value={formData.highestEducation} onChange={updateField} className={inputStyles} required>
										<option value="">Select highest level</option>
										<option value="Secondary School">Secondary School</option>
										<option value="OND">OND</option>
										<option value="HND">HND</option>
										<option value="BSc">BSc</option>
										<option value="MSc">MSc</option>
									</select>
									<FieldError message={errors.highestEducation} />
								</div>
								<div>
									<FieldLabel text="Preferred Study Mode" hint="Tech tracks can be taken remotely or at our physical campus." />
									<select name="studyMode" value={formData.studyMode} onChange={updateField} className={inputStyles} required>
										<option value="">Select study mode</option>
										<option value="Onsite at Debutron Lab">Onsite at Debutron Lab</option>
										<option value="Online Remote">Online Remote</option>
									</select>
									<FieldError message={errors.studyMode} />
								</div>
								<div>
									<FieldLabel text="Hardware Requirement" hint="Do you have a PC with at least a Core i5 processor and 8GB RAM?" />
									<div className="flex gap-6">
										<label className="flex items-center gap-2 font-sans text-sm text-gray-700">
											<input
												type="radio"
												name="hardwareAccess"
												value="Yes"
												checked={formData.hardwareAccess === 'Yes'}
												onChange={updateField}
												required
											/>
											Yes
										</label>
										<label className="flex items-center gap-2 font-sans text-sm text-gray-700">
											<input
												type="radio"
												name="hardwareAccess"
												value="No"
												checked={formData.hardwareAccess === 'No'}
												onChange={updateField}
												required
											/>
											No
										</label>
									</div>
									<FieldError message={errors.hardwareAccess} />
								</div>
							</>
						)}
					</div>
				)}

				{step === 4 && (
					<div className="space-y-6">
						<h3 className="font-serif text-2xl text-debutron-navy">Holistic Student Profiling</h3>
						<div>
							<FieldLabel text="Core Strengths" hint="What subjects, skills, or tasks come naturally to you?" />
							<textarea name="strengths" value={formData.strengths} onChange={updateField} rows={4} className={inputStyles} placeholder="Describe your strongest subjects, skills, or tasks" />
						</div>
						<div>
							<FieldLabel text="Areas for Improvement" hint="What areas do you find challenging or wish to improve upon?" />
							<textarea name="weaknesses" value={formData.weaknesses} onChange={updateField} rows={4} className={inputStyles} placeholder="Share areas you want to improve" />
						</div>
						<div>
							<FieldLabel text="Date of Birth" hint="Our algorithm uses this to personalize mentorship and communication style." />
							<input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={updateField} className={inputStyles} required />
							<FieldError message={errors.dateOfBirth} />
						</div>
						<div>
							<FieldLabel text="Required Accommodations" hint="Do you require visual aids, high-contrast screens, or other specific learning accommodations?" />
							<textarea name="accommodations" value={formData.accommodations} onChange={updateField} rows={4} className={inputStyles} placeholder="Tell us any accommodations you need" />
						</div>
					</div>
				)}

				{step === 5 && (
					<div className="space-y-6">
						<h3 className="font-serif text-2xl text-debutron-navy">Required Documents</h3>
						<p className="font-sans text-sm text-gray-600">Accepted formats: PDF, JPG, PNG.</p>
						<div className="grid gap-5 md:grid-cols-2">
							<div>
								<FieldLabel text="Recent Passport Photograph" hint="A clear headshot against a plain background." />
								<input id="passportPhoto" name="passportPhoto" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={updateFile} className="w-full font-sans text-sm" />
								<FieldError message={errors.passportPhoto} />
							</div>
							<div>
								<FieldLabel text="Valid Identification" hint="NIN slip, passport, or birth certificate." />
								<input id="governmentId" name="governmentId" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={updateFile} className="w-full font-sans text-sm" />
								<FieldError message={errors.governmentId} />
							</div>

							{formData.programType === 'Academic Track' && (
								<>
									<div className="md:col-span-2">
										<FieldLabel text="Academic Reference Letter" hint="A letter from a former teacher or principal." />
										<input id="academicReferenceLetter" name="academicReferenceLetter" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={updateFile} className="w-full font-sans text-sm" />
										<FieldError message={errors.academicReferenceLetter} />
									</div>
									<div className="md:col-span-2">
										<FieldLabel text="Current O-Level Result (Optional)" hint="Upload your WASSCE/NECO/GCE result if you have previously attempted the exam." />
										<input id="oLevelResult" name="oLevelResult" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={updateFile} className="w-full font-sans text-sm" />
									</div>
								</>
							)}

							{formData.programType === 'Tech Innovation Track' && (
								<div className="md:col-span-2">
									<FieldLabel text="Motivation Letter" hint="A brief letter explaining why you want to pursue a career in technology and engineering. Transcripts are NOT required." />
									<input id="motivationLetter" name="motivationLetter" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={updateFile} className="w-full font-sans text-sm" />
									<FieldError message={errors.motivationLetter} />
								</div>
							)}
						</div>
					</div>
				)}

				{step === 6 && (
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
										<li>Recent Passport Photograph: {files.passportPhoto?.name || 'Not uploaded'}</li>
										<li>Valid Identification: {files.governmentId?.name || 'Not uploaded'}</li>
										{formData.programType === 'Academic Track' && (
											<>
												<li>Academic Reference Letter: {files.academicReferenceLetter?.name || 'Not uploaded'}</li>
												<li>Current O-Level Result (Optional): {files.oLevelResult?.name || 'Not uploaded'}</li>
											</>
										)}
										{formData.programType === 'Tech Innovation Track' && (
											<li>Motivation Letter: {files.motivationLetter?.name || 'Not uploaded'}</li>
										)}
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

					{step < 6 ? (
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
