import { useState } from 'react'
import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi'

const inputStyles = 'w-full rounded-sm border border-gray-300 p-3 font-sans outline-none focus:border-debutron-navy focus:ring-1 focus:ring-debutron-navy'

const FieldLabel = ({ text, hint }) => (
	<label className="mb-1 block font-sans text-sm font-bold text-debutron-navy">
		<span>{text}</span>
		{hint && <span className="mt-1 block text-xs font-normal text-gray-500">{hint}</span>}
	</label>
)

function StudentProfile() {
	const [formData, setFormData] = useState({
		firstName: 'Muyiwa',
		middleName: '',
		lastName: 'Adebayo',
		bio: '',
		github: '',
		linkedin: '',
		twitter: '',
		isPublicToCohort: true,
	})

	const handleInputChange = (event) => {
		const { name, value } = event.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	const handleToggleChange = (event) => {
		setFormData((prev) => ({ ...prev, isPublicToCohort: event.target.checked }))
	}

	const handleSubmit = (event) => {
		event.preventDefault()
	}

	return (
		<section className="bg-gray-50 p-6 font-sans md:p-8">
			<header className="mb-6">
				<h2 className="mb-2 font-serif text-3xl text-debutron-navy">My Digital Identity</h2>
				<p className="text-gray-600">Manage your public profile for cohort networking.</p>
			</header>

			<form onSubmit={handleSubmit} className="max-w-4xl border border-gray-200 bg-white p-8 shadow-sm">
				<div className="grid gap-4 md:grid-cols-2">
					<div>
						<FieldLabel text="First Name" />
						<input type="text" name="firstName" value={formData.firstName} readOnly className={`${inputStyles} bg-gray-100 text-gray-600`} />
					</div>

					<div>
						<FieldLabel text="Middle Name (Optional)" />
						<input
							type="text"
							name="middleName"
							value={formData.middleName}
							onChange={handleInputChange}
							placeholder="Enter middle name"
							className={inputStyles}
						/>
					</div>

					<div className="md:col-span-2">
						<FieldLabel text="Last Name" />
						<input type="text" name="lastName" value={formData.lastName} readOnly className={`${inputStyles} bg-gray-100 text-gray-600`} />
					</div>
				</div>

				<div className="mt-6">
					<FieldLabel text="Professional Bio" hint="Introduce yourself to your cohort. What are you building?" />
					<textarea
						name="bio"
						value={formData.bio}
						onChange={handleInputChange}
						rows={4}
						placeholder="Share your interests, current projects, and what you hope to collaborate on."
						className={inputStyles}
					/>
				</div>

				<div className="mt-6 grid gap-4 md:grid-cols-3">
					<div>
						<FieldLabel text="GitHub Username" />
						<div className="relative">
							<FiGithub className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
							<input
								type="text"
								name="github"
								value={formData.github}
								onChange={handleInputChange}
								placeholder="octocat"
								className={`${inputStyles} pl-10`}
							/>
						</div>
					</div>

					<div>
						<FieldLabel text="LinkedIn Profile URL" />
						<div className="relative">
							<FiLinkedin className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
							<input
								type="url"
								name="linkedin"
								value={formData.linkedin}
								onChange={handleInputChange}
								placeholder="https://linkedin.com/in/your-profile"
								className={`${inputStyles} pl-10`}
							/>
						</div>
					</div>

					<div>
						<FieldLabel text="Twitter/X Handle" />
						<div className="relative">
							<FiTwitter className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
							<input
								type="text"
								name="twitter"
								value={formData.twitter}
								onChange={handleInputChange}
								placeholder="@yourhandle"
								className={`${inputStyles} pl-10`}
							/>
						</div>
					</div>
				</div>

				<div className="mt-8 rounded-sm border border-gray-200 bg-gray-50 p-4">
					<label className="flex cursor-pointer items-start gap-3">
						<input
							type="checkbox"
							checked={formData.isPublicToCohort}
							onChange={handleToggleChange}
							className="mt-1 h-5 w-5 accent-debutron-navy"
						/>
						<div>
							<p className="font-semibold text-debutron-navy">Make my profile public to other students in my cohort.</p>
							<p className="mt-1 text-sm text-gray-600">
								Enabling this allows peers to find your GitHub and connect with you for study groups and hackathons.
							</p>
						</div>
					</label>
				</div>

				<div className="mt-8">
					<button type="submit" className="bg-debutron-navy px-8 py-3 font-semibold text-white">
						Save Changes
					</button>
				</div>
			</form>
		</section>
	)
}

export default StudentProfile
