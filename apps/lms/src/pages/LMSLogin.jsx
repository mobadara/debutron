import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const DebutronLogo = ({ className = 'w-10 h-10', textClassName = 'text-2xl font-black tracking-tight' }) => (
	<div className="flex items-center gap-3">
		<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
			<path d="M10 20C10 14.4772 14.4772 10 20 10H80C85.5228 10 90 14.4772 90 20V60C90 76.5685 76.5685 90 60 90H40C23.4315 90 10 76.5685 10 60V20Z" fill="none" />
			<path
				d="M30 30V70H50C61.0457 70 70 61.0457 70 50C70 38.9543 61.0457 30 50 30H30Z"
				stroke="currentColor"
				strokeWidth="12"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<circle cx="65" cy="35" r="8" fill="#3b82f6" />
			<path d="M45 55L65 35" stroke="#3b82f6" strokeWidth="6" strokeLinecap="round" />
		</svg>
		<div className={textClassName}>DEBUTRON LAB.</div>
	</div>
)

function LMSLogin() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()

	const handleLogoClick = () => {
		navigate('/login')
	}

	const handleLogin = (e) => {
		e.preventDefault()
		navigate('/dashboard')
	}

	return (
		<div className="min-h-screen flex w-full bg-white dark:bg-slate-950">
			<aside className="hidden lg:flex flex-col justify-between w-1/2 bg-gradient-to-br from-[#000080] via-[#1d4ed8] to-[#0D9488] p-12 text-white relative overflow-hidden">
				<div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.08)_0%,transparent_35%,rgba(255,255,255,0.06)_65%,transparent_100%)]" />
				<div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:64px_64px] opacity-30" />
				<div aria-hidden="true" className="absolute -top-24 -right-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
				<div aria-hidden="true" className="absolute -bottom-16 -left-16 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />
				<div aria-hidden="true" className="absolute top-1/3 -right-20 h-72 w-72 rounded-full bg-blue-200/20 blur-3xl" />
				<div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.16),transparent_36%)]" />

				<div className="relative z-10 text-white">
					<button
						type="button"
						onClick={handleLogoClick}
						className="inline-flex rounded-lg focus:outline-none focus:ring-2 focus:ring-white/80"
						aria-label="Go to Debutron login"
					>
						<DebutronLogo className="w-11 h-11" textClassName="text-3xl font-black tracking-tight" />
					</button>
				</div>

				<div className="relative z-10">
					<h1 className="text-5xl font-extrabold leading-tight max-w-xl">Welcome to your Digital Campus.</h1>
					<p className="mt-6 text-lg text-white/90 max-w-lg">
						Log in to access your Innovation Lab cohorts and Pre-University modules.
					</p>
				</div>

				<p className="relative z-10 text-sm text-white/90">© {new Date().getFullYear()} Debutron Lab.</p>
			</aside>

			<section className="flex flex-col justify-center w-full lg:w-1/2 p-8 sm:p-12 md:p-24">
				<div className="max-w-md w-full mx-auto">
					<div className="lg:hidden text-[#000080] dark:text-[#0D9488] mb-8">
						<button
							type="button"
							onClick={handleLogoClick}
							className="inline-flex rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
							aria-label="Go to Debutron login"
						>
							<DebutronLogo className="w-9 h-9" textClassName="text-2xl font-black tracking-tight" />
						</button>
					</div>

					<h2 className="text-3xl font-bold text-slate-900 dark:text-white">Sign in to your account</h2>

					<form onSubmit={handleLogin} className="mt-8 space-y-6">
						<div>
							<label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
								Email address
							</label>
							<input
								id="email"
								name="email"
								type="email"
								required
								autoComplete="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="mt-2 w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-600 outline-none transition-colors"
							/>
						</div>

						<div>
							<div className="flex items-center justify-between">
								<label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
									Password
								</label>
								<a href="#" className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
									Forgot password?
								</a>
							</div>
							<input
								id="password"
								name="password"
								type="password"
								required
								autoComplete="current-password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="mt-2 w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-600 outline-none transition-colors"
							/>
						</div>

						<button
							type="submit"
							className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
						>
							Sign In
						</button>
					</form>

					<p className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
						<a href="mailto:it-helpdesk@debutron.org" className="underline underline-offset-2 hover:text-blue-600 dark:hover:text-blue-400">
							Need technical support? Contact IT Helpdesk
						</a>
					</p>
				</div>
			</section>
		</div>
	)
}

export default LMSLogin
