function PortalFooter() {
	return (
		<footer className="border-t border-gray-200 bg-white px-6 py-4 text-center md:flex md:items-center md:justify-between">
			<p className="font-sans text-xs text-gray-500">© 2026 Debutron Lab. Secure Digital Campus.</p>

			<div className="mt-2 flex items-center justify-center gap-4 md:mt-0">
				<a href="#" className="text-xs text-blue-600 hover:underline">
					IT Helpdesk
				</a>
				<a href="#" className="text-xs text-gray-500 transition-colors hover:text-gray-800">
					Portal Privacy Policy
				</a>
			</div>
		</footer>
	)
}

export default PortalFooter
