import { useNavigate } from 'react-router-dom'
import DebutronLogoInverted from '../components/DebutronLogoInverted'

function StudentLogin() {
	const navigate = useNavigate()

	const handleSubmit = (event) => {
		event.preventDefault()
		navigate('/dashboard')
	}

	return (
		<div className="min-h-screen flex bg-white dark:bg-slate-950">
			<aside className="hidden lg:flex w-1/2 bg-slate-900 text-white p-12 flex-col justify-between relative overflow-hidden">
				<div
					className="absolute inset-0 opacity-30"
					aria-hidden="true"
					style={{
						backgroundImage:
							'radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.22), transparent 40%), radial-gradient(circle at 80% 80%, rgba(148, 163, 184, 0.18), transparent 45%), linear-gradient(rgba(148, 163, 184, 0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.14) 1px, transparent 1px)',
						backgroundSize: '100% 100%, 100% 100%, 36px 36px, 36px 36px',
					}}
				/>

				<div className="relative z-10">
					<DebutronLogoInverted />
				</div>

				<div className="relative z-10 max-w-md space-y-4">
					<h1 className="text-4xl xl:text-5xl font-bold leading-tight">Welcome to your digital campus.</h1>
					<p className="text-lg text-slate-300">
						Access your workspace, track your progress, and continue your journey.
					</p>
				</div>

				<div className="relative z-10" />
			</aside>

			<main className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
				<div className="max-w-md w-full">
					<h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Sign in to Portal</h2>
					<p className="text-slate-500 mb-8">Enter your Student ID and password to continue.</p>

					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<label
								htmlFor="student-identifier"
								className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
							>
								Student ID or Email
							</label>
							<input
								id="student-identifier"
								type="text"
								autoComplete="username"
								required
								className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 outline-none"
								placeholder="e.g. STU-4021 or student@debutron.org"
							/>
						</div>

						<div>
							<div className="mb-2 flex items-center justify-between">
								<label htmlFor="password" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
									Password
								</label>
								<a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700">
									Forgot password?
								</a>
							</div>
							<input
								id="password"
								type="password"
								autoComplete="current-password"
								required
								className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 outline-none"
								placeholder="Enter your password"
							/>
						</div>

						<button
							type="submit"
							className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md transition-colors mt-6"
						>
							Sign In
						</button>
					</form>

					<div className="mt-8 text-center">
						<a href="#" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600">
							Need help? Contact Admissions.
						</a>
					</div>
				</div>
			</main>
		</div>
	)
}

export default StudentLogin
