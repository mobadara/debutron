import DebutronLogo from '../DebutronLogo'

function AuthLayout({ children, cardClassName = '' }) {
	return (
		<section className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6">
			<DebutronLogo className="mb-8 h-16 w-16" />
			<div className={`w-full max-w-md rounded-sm border border-gray-200 bg-white p-10 shadow-xl ${cardClassName}`}>
				{children}
			</div>
		</section>
	)
}

export default AuthLayout
