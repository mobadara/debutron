import AuthLayout from '../components/auth/AuthLayout'

const FieldLabel = ({ text }) => (
	<label className="mb-1 block font-sans text-sm font-bold text-debutron-navy">{text}</label>
)

function StudentLogin() {
	return (
		<AuthLayout>
			<h1 className="mb-2 text-center font-serif text-2xl font-bold text-debutron-navy">Student Portal</h1>
			<p className="mb-8 text-center font-sans text-sm text-gray-500">
				Sign in to access your digital campus, AI analytics, and coursework.
			</p>

			<form>
				<div className="mb-4">
					<FieldLabel text="Student ID" />
					<input
						type="text"
						placeholder="DEB-26-001"
						className="w-full rounded-sm border border-gray-300 p-3 font-sans outline-none focus:border-debutron-navy focus:ring-1 focus:ring-debutron-navy"
					/>
				</div>

				<div>
					<FieldLabel text="Password" />
					<input
						type="password"
						className="w-full rounded-sm border border-gray-300 p-3 font-sans outline-none focus:border-debutron-navy focus:ring-1 focus:ring-debutron-navy"
					/>
				</div>

				<button
					type="submit"
					className="mt-6 w-full rounded-sm bg-debutron-navy py-3 font-sans font-bold text-white"
				>
					Login to Portal
				</button>
			</form>

			<a href="#" className="mt-4 block text-center text-sm text-blue-600 hover:underline">
				Forgot Student ID or Password?
			</a>
		</AuthLayout>
	)
}

export default StudentLogin
