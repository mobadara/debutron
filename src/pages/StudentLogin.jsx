import React from 'react'
import { Link } from 'react-router-dom'
import { FiHome } from 'react-icons/fi'

const FieldLabel = ({ text }) => (
	<label className="mb-1 block font-sans text-sm font-bold text-debutron-navy">{text}</label>
)

function StudentLogin() {
	return (
		<main className="min-h-screen bg-gray-50 relative flex items-center justify-center">
			<Link
				to="/"
				className="absolute top-8 left-8 flex items-center gap-2 text-gray-500 hover:text-debutron-navy transition-colors font-sans font-bold text-lg"
			>
				<FiHome className="w-6 h-6" /> Return to Homepage
			</Link>

			<div className="w-full max-w-md mx-auto px-6">
				<div className="bg-white shadow-md rounded-lg overflow-hidden">
					<div className="px-6 py-8">
						<h1 className="mb-2 text-center font-serif text-2xl font-bold text-debutron-navy">Student Portal</h1>
						<p className="mb-8 text-center font-sans text-sm text-gray-500">
							Sign in to access your digital campus, AI analytics, and coursework.
						</p>

						<form>
							<div className="mb-4">
								<FieldLabel text="Student ID" />
								<input
									type="text"
									placeholder="000001"
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
					</div>
				</div>
			</div>
		</main>
	)
}

export default StudentLogin
