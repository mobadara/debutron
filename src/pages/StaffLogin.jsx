import AuthLayout from '../components/auth/AuthLayout'

const FieldLabel = ({ text }) => (
	<label className="mb-1 block font-sans text-sm font-bold text-debutron-navy">{text}</label>
)

function StaffLogin() {
	return (
		<AuthLayout cardClassName="border-t-4 border-debutron-navy">
			<h1 className="mb-8 text-center font-serif text-2xl font-bold text-debutron-navy">Faculty &amp; Admin Portal</h1>

			<form>
				<div className="mb-4">
					<FieldLabel text="Staff ID" />
					<input
						type="text"
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
					Authenticate Securely
				</button>
			</form>
		</AuthLayout>
	)
}

export default StaffLogin
