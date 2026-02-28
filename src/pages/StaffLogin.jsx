import React from 'react'
import { Link } from 'react-router-dom'
import { FiHome } from 'react-icons/fi'

const FieldLabel = ({ text }) => (
	<label className="mb-1 block font-sans text-sm font-bold text-debutron-navy">{text}</label>
)

function StaffLogin() {
	return (
		<main className="min-h-screen bg-gray-50 relative flex items-center justify-center">
			<Link
				to="/"
				className="absolute top-8 left-8 flex items-center gap-2 text-gray-500 hover:text-debutron-navy transition-colors font-sans font-bold text-lg"
			>
				<FiHome className="w-6 h-6" /> Return to Homepage
			</Link>

			<div className="w-full max-w-md mx-auto px-6">
				<div className="bg-white shadow-md rounded-lg overflow-hidden border-t-4 border-debutron-navy">
					<div className="px-6 py-8">
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
					</div>
				</div>
			</div>
		</main>
	)
}

export default StaffLogin
