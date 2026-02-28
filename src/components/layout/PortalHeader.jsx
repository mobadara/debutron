import { FiBell, FiUser } from 'react-icons/fi'
import DebutronLogo from '../DebutronLogo'

function PortalHeader() {
	return (
		<header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
			<div className="flex items-center">
				<DebutronLogo className="h-8 w-8" />
				<div className="mx-4 h-6 w-px bg-gray-300" />
				<p className="font-serif text-lg font-bold text-debutron-navy">Student Portal</p>
			</div>

			<div className="flex items-center gap-6">
				<button
					type="button"
					aria-label="View notifications"
					className="relative text-gray-700 transition-colors hover:text-debutron-navy"
				>
					<FiBell className="h-5 w-5" />
					<span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500" />
				</button>

				<div className="flex items-center gap-2">
					<div className="rounded-full bg-gray-100 p-2 text-gray-600">
						<FiUser className="h-4 w-4" aria-hidden="true" />
					</div>
					<span className="font-sans text-sm font-bold text-gray-700">Muyiwa O.</span>
				</div>
			</div>
		</header>
	)
}

export default PortalHeader
