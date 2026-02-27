import { useEffect, useMemo, useState } from 'react'
import { FiCheckCircle, FiInfo } from 'react-icons/fi'
import { Country, State } from 'country-state-city'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const initialFormData = {
	firstName: '',
	lastName: '',
	gender: '',
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
	guardianTitle: '',
	guardianName: '',
	guardianEmail: '',
	guardianPhone: '',
	guardianAddress: '',
	nokTitle: '',
	nokName: '',
	nokEmail: '',
	nokPhone: '',
	nokAddress: '',
	sponsorTitle: '',
	sponsorName: '',
	sponsorEmail: '',
	sponsorPhone: '',
	sponsorAddress: '',
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
	const [isSubmitted, setIsSubmitted] = useState(false)
	const [errors, setErrors] = useState({})
	const [files, setFiles] = useState(initialFiles)
	const [currency, setCurrency] = useState('NGN')
	const [promoCode, setPromoCode] = useState('')
	const [discountAmount, setDiscountAmount] = useState(0)
	const [isProcessing, setIsProcessing] = useState(false)
	const [paymentSuccess, setPaymentSuccess] = useState(false)
	const [promoError, setPromoError] = useState('')
	const [sameAsAbove, setSameAsAbove] = useState(false)
	const [referenceNumber, setReferenceNumber] = useState('')
	const [submissionPaymentStatus, setSubmissionPaymentStatus] = useState('')

	const baseFeeNGN = 10000
	const baseFeeUSD = 10
	const baseFee = currency === 'NGN' ? baseFeeNGN : baseFeeUSD
	const finalAmount = Math.max(0, baseFee - discountAmount)

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

	useEffect(() => {
		if (!sameAsAbove) return

		if (formData.programType === 'Academic Track') {
			setFormData((prev) => ({
				...prev,
				sponsorTitle: prev.guardianTitle,
				sponsorName: prev.guardianName,
				sponsorEmail: prev.guardianEmail,
				sponsorPhone: prev.guardianPhone,
				sponsorAddress: prev.guardianAddress,
			}))
		}

		if (formData.programType === 'Tech Innovation Track') {
			setFormData((prev) => ({
				...prev,
				sponsorTitle: prev.nokTitle,
				sponsorName: prev.nokName,
				sponsorEmail: prev.nokEmail,
				sponsorPhone: prev.nokPhone,
				sponsorAddress: prev.nokAddress,
			}))
		}
	}, [sameAsAbove, formData.programType, formData.guardianTitle, formData.guardianName, formData.guardianEmail, formData.guardianPhone, formData.guardianAddress, formData.nokTitle, formData.nokName, formData.nokEmail, formData.nokPhone, formData.nokAddress])

	const toggleSameAsAbove = (event) => {
		const checked = event.target.checked
		setSameAsAbove(checked)

		if (!checked) return

		setFormData((prev) => ({
			...prev,
			sponsorTitle: prev.programType === 'Academic Track' ? prev.guardianTitle : prev.nokTitle,
			sponsorName: prev.programType === 'Academic Track' ? prev.guardianName : prev.nokName,
			sponsorEmail: prev.programType === 'Academic Track' ? prev.guardianEmail : prev.nokEmail,
			sponsorPhone: prev.programType === 'Academic Track' ? prev.guardianPhone : prev.nokPhone,
			sponsorAddress: prev.programType === 'Academic Track' ? prev.guardianAddress : prev.nokAddress,
		}))
	}

	const handleApplyPromo = (event) => {
		event.preventDefault()
		if (promoCode.trim() === 'SCHOLAR100') {
			setDiscountAmount(baseFee)
			setPromoError('')
			return
		}

		setDiscountAmount(0)
		setPromoError('Invalid voucher code. Please check and try again.')
	}

	const updateCurrency = (newCurrency) => {
		setCurrency(newCurrency)
		setPaymentSuccess(false)

		if (promoCode.trim() === 'SCHOLAR100') {
			setDiscountAmount(newCurrency === 'NGN' ? baseFeeNGN : baseFeeUSD)
		}
	}

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
			if (isBlank(formData.gender)) stepErrors.gender = 'Please select your sex/gender.'
			if (isBlank(formData.email)) stepErrors.email = 'Please enter your email address.'
			if (!isPhoneValid(formData.phone, formData.phoneDialCode)) stepErrors.phone = 'Please enter a valid phone number.'
			if (isBlank(formData.streetAddress)) stepErrors.streetAddress = 'Please enter your street address.'
			if (isBlank(formData.city)) stepErrors.city = 'Please enter your city.'
			if (isBlank(formData.country)) stepErrors.country = 'Please select your country.'
			if (states.length > 0 && isBlank(formData.state)) stepErrors.state = 'Please select your state/province.'
		}

		if (step === 3) {
			if (formData.programType === 'Academic Track') {
				if (isBlank(formData.guardianTitle)) stepErrors.guardianTitle = 'Please select a title for the parent/guardian.'
				if (isBlank(formData.guardianName)) stepErrors.guardianName = 'Please enter the parent/guardian full name.'
				if (isBlank(formData.guardianEmail)) stepErrors.guardianEmail = 'Please enter the parent/guardian email.'
				if (isBlank(formData.guardianPhone)) stepErrors.guardianPhone = 'Please enter the parent/guardian phone number.'
				if (isBlank(formData.guardianAddress)) stepErrors.guardianAddress = 'Please enter the parent/guardian address.'
			}

			if (formData.programType === 'Tech Innovation Track') {
				if (isBlank(formData.nokTitle)) stepErrors.nokTitle = 'Please select a title for next of kin.'
				if (isBlank(formData.nokName)) stepErrors.nokName = 'Please enter the next of kin full name.'
				if (isBlank(formData.nokEmail)) stepErrors.nokEmail = 'Please enter the next of kin email.'
				if (isBlank(formData.nokPhone)) stepErrors.nokPhone = 'Please enter the next of kin phone number.'
				if (isBlank(formData.nokAddress)) stepErrors.nokAddress = 'Please enter the next of kin address.'
			}

			if (isBlank(formData.sponsorTitle)) stepErrors.sponsorTitle = 'Please select a sponsor title.'
			if (isBlank(formData.sponsorName)) stepErrors.sponsorName = 'Please enter the sponsor full name.'
			if (isBlank(formData.sponsorEmail)) stepErrors.sponsorEmail = 'Please enter the sponsor email.'
			if (isBlank(formData.sponsorPhone)) stepErrors.sponsorPhone = 'Please enter the sponsor phone number.'
			if (isBlank(formData.sponsorAddress)) stepErrors.sponsorAddress = 'Please enter the sponsor address.'
		}

		if (step === 4) {
			if (formData.programType === 'Academic Track' && isBlank(formData.secondarySchool)) {
				stepErrors.secondarySchool = 'Please enter the name of your secondary school.'
			}
			if (formData.programType === 'Tech Innovation Track' && isBlank(formData.highestEducation)) stepErrors.highestEducation = 'Please select your highest level of education.'
			if (formData.programType === 'Tech Innovation Track' && isBlank(formData.studyMode)) stepErrors.studyMode = 'Please select a study mode.'
			if (formData.programType === 'Tech Innovation Track' && isBlank(formData.hardwareAccess)) stepErrors.hardwareAccess = 'Please select your hardware access option.'
		}

		if (step === 5) {
			if (isBlank(formData.dateOfBirth)) stepErrors.dateOfBirth = 'Please select your date of birth.'
		}

		if (step === 6) {
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
		setStep((prev) => Math.min(prev + 1, 7))
	}
	const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))

	const resetForm = () => {
		setFormData(initialFormData)
		setErrors({})
		setFiles(initialFiles)
		setCurrency('NGN')
		setPromoCode('')
		setDiscountAmount(0)
		setIsProcessing(false)
		setPaymentSuccess(false)
		setPromoError('')
		setSameAsAbove(false)
		setStep(1)
		setReferenceNumber(generateReference())
	}

	const handleSubmit = (event) => {
		event?.preventDefault()

		if (finalAmount > 0 && !paymentSuccess) {
			setPromoError('Please complete payment to continue.')
			return
		}

		setSubmissionPaymentStatus(finalAmount === 0 ? 'Scholarship Waived' : 'Paid')
		setIsSubmitted(true)
	}

	const handleFlutterwavePayment = () => {
		setIsProcessing(true)

		setTimeout(() => {
			setIsProcessing(false)
			setPaymentSuccess(true)
			handleSubmit()
		}, 3000)
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
			{ label: 'Sex / Gender', value: formData.gender || '—' },
			{ label: 'Email', value: formData.email || '—' },
			{ label: 'Phone', value: formData.phone ? `+${formData.phone}` : '—' },
			{ label: 'Phone Country Code', value: formData.phoneDialCode || '—' },
			{ label: 'Street Address', value: formData.streetAddress || '—' },
			{ label: 'City', value: formData.city || '—' },
			{ label: 'State/Province', value: selectedState?.name || (states.length > 0 ? '—' : 'Not applicable') },
			{ label: 'Country', value: selectedCountry?.name || '—' },
			...(formData.programType === 'Academic Track'
				? [
					{ label: 'Parent/Guardian Title', value: formData.guardianTitle || '—' },
					{ label: 'Parent/Guardian Name', value: formData.guardianName || '—' },
					{ label: 'Parent/Guardian Email', value: formData.guardianEmail || '—' },
					{ label: 'Parent/Guardian Phone', value: formData.guardianPhone || '—' },
					{ label: 'Parent/Guardian Address', value: formData.guardianAddress || '—' },
				]
				: [
					{ label: 'Next of Kin Title', value: formData.nokTitle || '—' },
					{ label: 'Next of Kin Name', value: formData.nokName || '—' },
					{ label: 'Next of Kin Email', value: formData.nokEmail || '—' },
					{ label: 'Next of Kin Phone', value: formData.nokPhone || '—' },
					{ label: 'Next of Kin Address', value: formData.nokAddress || '—' },
				]),
			{ label: 'Sponsor Title', value: formData.sponsorTitle || '—' },
			{ label: 'Sponsor Name', value: formData.sponsorName || '—' },
			{ label: 'Sponsor Email', value: formData.sponsorEmail || '—' },
			{ label: 'Sponsor Phone', value: formData.sponsorPhone || '—' },
			{ label: 'Sponsor Address', value: formData.sponsorAddress || '—' },
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
			{isSubmitted ? (
				<div className="mx-auto max-w-3xl border border-gray-200 bg-white p-12 shadow-lg print:border-none print:shadow-none">
					<div className="mb-8 text-center">
						<p className="font-serif text-2xl font-bold text-debutron-navy">Debutron Lab</p>
						<FiCheckCircle className="mx-auto mt-4 text-6xl text-green-700" />
						<h2 className="mb-8 text-center font-serif text-3xl text-green-700">Application Successfully Submitted!</h2>
					</div>

					<div className="grid gap-4 border border-gray-200 p-6 md:grid-cols-2">
						<div>
							<p className="font-sans text-xs font-semibold uppercase tracking-wide text-gray-500">Applicant Name</p>
							<p className="font-sans text-sm text-gray-800">{`${formData.firstName} ${formData.lastName}`.trim() || '—'}</p>
						</div>
						<div>
							<p className="font-sans text-xs font-semibold uppercase tracking-wide text-gray-500">Sex / Gender</p>
							<p className="font-sans text-sm text-gray-800">{formData.gender || '—'}</p>
						</div>
						<div>
							<p className="font-sans text-xs font-semibold uppercase tracking-wide text-gray-500">Application Reference Number</p>
							<p className="font-mono text-lg font-bold text-debutron-navy">{referenceNumber}</p>
						</div>
						<div>
							<p className="font-sans text-xs font-semibold uppercase tracking-wide text-gray-500">Program Track</p>
							<p className="font-sans text-sm text-gray-800">{formData.programType || '—'}</p>
						</div>
						<div>
							<p className="font-sans text-xs font-semibold uppercase tracking-wide text-gray-500">{formData.programType === 'Tech Innovation Track' ? 'Assigned Cohort' : 'Academic Session'}</p>
							<p className="font-sans text-sm text-gray-800">{formData.programType === 'Tech Innovation Track' ? 'Batch A (Pending)' : '2026/2027'}</p>
						</div>
						<div>
							<p className="font-sans text-xs font-semibold uppercase tracking-wide text-gray-500">Payment Status</p>
							<p className="font-sans text-sm font-semibold text-green-700">{submissionPaymentStatus || 'Paid (or Scholarship Waived)'}</p>
						</div>
					</div>

					<p className="mt-6 text-center font-sans text-sm text-gray-600">
						An email with your login tracking link and receipt has been sent to your registered email address.
					</p>

					<div className="mt-8 text-center">
						<button onClick={() => window.print()} className="rounded-sm bg-debutron-navy px-8 py-3 text-white print:hidden">
							Print Application Slip
						</button>
					</div>
				</div>
			) : (
				<>
					<header className="mb-8 text-center">
						<h2 className="font-serif text-3xl font-bold text-debutron-navy md:text-4xl">Debutron Application Form</h2>
						<p className="mt-3 font-sans text-gray-600">Complete all steps to finalize your admission request.</p>
					</header>

					<div className="mb-8 flex flex-wrap justify-center gap-2 font-sans text-sm">
						{[1, 2, 3, 4, 5, 6, 7].map((index) => (
							<span
								key={index}
								className={`rounded-full px-3 py-1 ${step === index ? 'bg-debutron-navy text-white' : 'bg-gray-100 text-gray-600'}`}
							>
								Step {index}
							</span>
						))}
					</div>

					<form onSubmit={handleSubmit} className="rounded-sm border border-gray-200 bg-white p-6 shadow-sm md:p-10">
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
						<div className="grid gap-5 md:grid-cols-3">
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
							<div>
								<FieldLabel text="Sex / Gender" />
								<select name="gender" value={formData.gender} onChange={updateField} className={inputStyles} required>
									<option value="">Select gender</option>
									<option value="Male">Male</option>
									<option value="Female">Female</option>
									<option value="Prefer not to say">Prefer not to say</option>
								</select>
								<FieldError message={errors.gender} />
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
						<h3 className="mb-6 text-center font-serif text-3xl text-debutron-navy">Support &amp; Sponsorship Details</h3>

						{formData.programType === 'Academic Track' && (
							<div className="space-y-4">
								<h4 className="font-serif text-xl text-debutron-navy">Parent / Guardian Information</h4>
								<div className="grid gap-5 md:grid-cols-2">
									<div>
										<FieldLabel text="Title" />
										<select name="guardianTitle" value={formData.guardianTitle} onChange={updateField} className={inputStyles}>
											<option value="">Select title</option>
											<option value="Mr">Mr</option>
											<option value="Mrs">Mrs</option>
											<option value="Ms">Ms</option>
											<option value="Dr">Dr</option>
										</select>
										<FieldError message={errors.guardianTitle} />
									</div>
									<div>
										<FieldLabel text="Full Name" />
										<input name="guardianName" value={formData.guardianName} onChange={updateField} className={inputStyles} placeholder="Enter full name" />
										<FieldError message={errors.guardianName} />
									</div>
									<div>
										<FieldLabel text="Email" />
										<input type="email" name="guardianEmail" value={formData.guardianEmail} onChange={updateField} className={inputStyles} placeholder="guardian@example.com" />
										<FieldError message={errors.guardianEmail} />
									</div>
									<div>
										<FieldLabel text="Phone Number" />
										<input name="guardianPhone" value={formData.guardianPhone} onChange={updateField} className={inputStyles} placeholder="Enter phone number" />
										<FieldError message={errors.guardianPhone} />
									</div>
									<div className="md:col-span-2">
										<FieldLabel text="Full Residential Address" />
										<textarea name="guardianAddress" value={formData.guardianAddress} onChange={updateField} rows={3} className={inputStyles} placeholder="Enter full address" />
										<FieldError message={errors.guardianAddress} />
									</div>
								</div>
							</div>
						)}

						{formData.programType === 'Tech Innovation Track' && (
							<div className="space-y-4">
								<h4 className="font-serif text-xl text-debutron-navy">Next of Kin Information</h4>
								<div className="grid gap-5 md:grid-cols-2">
									<div>
										<FieldLabel text="Title" />
										<select name="nokTitle" value={formData.nokTitle} onChange={updateField} className={inputStyles}>
											<option value="">Select title</option>
											<option value="Mr">Mr</option>
											<option value="Mrs">Mrs</option>
											<option value="Ms">Ms</option>
											<option value="Dr">Dr</option>
										</select>
										<FieldError message={errors.nokTitle} />
									</div>
									<div>
										<FieldLabel text="Full Name" />
										<input name="nokName" value={formData.nokName} onChange={updateField} className={inputStyles} placeholder="Enter full name" />
										<FieldError message={errors.nokName} />
									</div>
									<div>
										<FieldLabel text="Email" />
										<input type="email" name="nokEmail" value={formData.nokEmail} onChange={updateField} className={inputStyles} placeholder="nok@example.com" />
										<FieldError message={errors.nokEmail} />
									</div>
									<div>
										<FieldLabel text="Phone Number" />
										<input name="nokPhone" value={formData.nokPhone} onChange={updateField} className={inputStyles} placeholder="Enter phone number" />
										<FieldError message={errors.nokPhone} />
									</div>
									<div className="md:col-span-2">
										<FieldLabel text="Full Residential Address" />
										<textarea name="nokAddress" value={formData.nokAddress} onChange={updateField} rows={3} className={inputStyles} placeholder="Enter full address" />
										<FieldError message={errors.nokAddress} />
									</div>
								</div>
							</div>
						)}

						<div className="mt-8 border-t border-gray-200 pt-6">
							<h4 className="font-serif text-xl text-debutron-navy">Financial Sponsor Details</h4>
							<label className="mt-3 flex items-center gap-2 font-sans text-sm text-gray-700">
								<input type="checkbox" checked={sameAsAbove} onChange={toggleSameAsAbove} />
								Same as above
							</label>

							<div className="mt-4 grid gap-5 md:grid-cols-2">
								<div>
									<FieldLabel text="Title" />
									<select name="sponsorTitle" value={formData.sponsorTitle} onChange={updateField} className={inputStyles} disabled={sameAsAbove}>
										<option value="">Select title</option>
										<option value="Mr">Mr</option>
										<option value="Mrs">Mrs</option>
										<option value="Ms">Ms</option>
										<option value="Dr">Dr</option>
									</select>
									<FieldError message={errors.sponsorTitle} />
								</div>
								<div>
									<FieldLabel text="Full Name" />
									<input name="sponsorName" value={formData.sponsorName} onChange={updateField} className={inputStyles} placeholder="Enter full name" disabled={sameAsAbove} />
									<FieldError message={errors.sponsorName} />
								</div>
								<div>
									<FieldLabel text="Email" />
									<input type="email" name="sponsorEmail" value={formData.sponsorEmail} onChange={updateField} className={inputStyles} placeholder="sponsor@example.com" disabled={sameAsAbove} />
									<FieldError message={errors.sponsorEmail} />
								</div>
								<div>
									<FieldLabel text="Phone Number" />
									<input name="sponsorPhone" value={formData.sponsorPhone} onChange={updateField} className={inputStyles} placeholder="Enter phone number" disabled={sameAsAbove} />
									<FieldError message={errors.sponsorPhone} />
								</div>
								<div className="md:col-span-2">
									<FieldLabel text="Address" />
									<textarea name="sponsorAddress" value={formData.sponsorAddress} onChange={updateField} rows={3} className={inputStyles} placeholder="Enter full sponsor address" disabled={sameAsAbove} />
									<FieldError message={errors.sponsorAddress} />
								</div>
							</div>
						</div>
					</div>
				)}

				{step === 4 && (
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

				{step === 5 && (
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

				{step === 6 && (
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

				{step === 7 && (
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
							<div className="mt-8 border-t-4 border-debutron-navy bg-gray-50 p-8">
								<div className="mb-6 flex items-center gap-3">
									<button
										type="button"
										onClick={() => updateCurrency('NGN')}
										className={`rounded-sm px-4 py-2 font-sans text-sm font-bold ${currency === 'NGN' ? 'bg-debutron-navy text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
									>
										NGN
									</button>
									<button
										type="button"
										onClick={() => updateCurrency('USD')}
										className={`rounded-sm px-4 py-2 font-sans text-sm font-bold ${currency === 'USD' ? 'bg-debutron-navy text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
									>
										USD
									</button>
								</div>

								<div className="mb-4">
									<FieldLabel text="Institutional Voucher / Scholarship Code" hint="If you are sponsored by an NGO or partner, enter your code here." />
									<div className="flex flex-col gap-2 md:flex-row">
										<input
											type="text"
											value={promoCode}
											onChange={(event) => {
												setPromoCode(event.target.value)
												setDiscountAmount(0)
												setPromoError('')
											}}
											className={inputStyles}
											placeholder="Enter voucher code"
										/>
										<button type="button" onClick={handleApplyPromo} className="bg-debutron-navy px-4 py-2 font-sans font-bold text-white">
											Apply
										</button>
									</div>
									{finalAmount === 0 && <p className="mt-2 font-sans text-sm font-semibold text-green-700">Voucher applied successfully! Fee waived.</p>}
									{finalAmount > 0 && promoError && <p className="mt-2 font-sans text-sm font-semibold text-red-600">{promoError}</p>}
								</div>

								<p className="font-sans text-sm text-gray-700">Application Ref: <span className="font-bold text-debutron-navy">{referenceNumber}</span></p>
								<p className="mt-4 font-sans text-3xl font-bold text-gray-900">Processing Fee: {currency === 'NGN' ? '₦' : '$'}{finalAmount}</p>

								{finalAmount === 0 && (
									<div className="mt-6 rounded-sm border border-green-200 bg-green-50 p-4">
										<p className="font-sans font-semibold text-green-700">100% Scholarship Applied. No payment required.</p>
										<button
											type="button"
											onClick={handleSubmit}
											className="mt-4 w-full rounded-sm bg-green-700 py-4 font-sans text-lg font-bold text-white"
										>
											Complete Enrollment
										</button>
									</div>
								)}

								{finalAmount > 0 && !isProcessing && (
									<div className="mt-6 rounded-sm border border-gray-200 bg-white p-8 text-center shadow-sm">
										<p className="mb-3 font-sans text-sm font-semibold text-gray-700">Visa • Mastercard • Verve • Amex</p>
										<button
											type="button"
											onClick={handleFlutterwavePayment}
											className="w-full rounded-sm bg-debutron-navy px-8 py-4 font-sans text-lg font-bold text-white transition-colors hover:bg-debutron-charcoal"
										>
											Pay {currency === 'NGN' ? '₦' : '$'}{finalAmount} Securely via Flutterwave
										</button>
									</div>
								)}

								{isProcessing && (
									<div className="mt-6 rounded-sm border border-gray-200 bg-white p-8 text-center shadow-sm">
										<div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-debutron-navy" />
										<p className="animate-pulse font-sans text-gray-600">Processing secure payment with Flutterwave... Please do not close this window.</p>
									</div>
								)}
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

					{step < 7 ? (
						<button
							type="button"
							onClick={nextStep}
							className="w-full rounded-sm bg-debutron-navy px-8 py-3 font-sans font-bold text-white transition-colors hover:bg-debutron-charcoal md:w-auto"
						>
							Continue
						</button>
					) : <span />}
				</div>
					</form>
				</>
			)}
		</section>
	)
}

export default ApplicationForm
