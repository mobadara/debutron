import { Link } from 'react-router-dom'
import { FiAlertCircle, FiHome } from 'react-icons/fi'

import DebutronLogo from '../components/DebutronLogo'
import Footer from '../components/layout/Footer'

function MinimalHeader() {
	return (
		<header className="flex justify-between items-center p-6 border-b border-gray-100 bg-white">
			<DebutronLogo className="w-10 h-10" />
			<Link
				to="/"
				className="flex items-center gap-2 text-debutron-navy font-bold hover:underline"
			>
				<FiHome className="text-lg" />
				Back to Home
			</Link>
		</header>
	)
}

function NotFound() {
	return (
		<div className="flex flex-col min-h-screen">
			<MinimalHeader />
			<main className="flex-grow flex">
				<div className="flex-grow flex flex-col items-center justify-center text-center p-10 bg-gray-50 min-h-[60vh]">
					<FiAlertCircle className="w-24 h-24 text-blue-200 mb-6" />
					<h1 className="font-mono text-6xl text-slate-900 font-black mb-2">404</h1>
					<h2 className="font-serif text-3xl text-slate-800 mb-4">
						Page Out of Syllabus.
					</h2>
					<p className="text-slate-600 max-w-md mb-8">
						The digital campus route you are looking for has been moved,
						deleted, or does not exist in our current curriculum.
					</p>
					<Link
						to="/"
						className="bg-debutron-navy text-white px-8 py-3 rounded-sm font-bold shadow-md hover:bg-slate-800 transition-colors"
					>
						Return to Homepage
					</Link>
				</div>
			</main>
			<Footer />
		</div>
	)
}

export default NotFound
