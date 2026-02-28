function AuthLayout({ children, cardClassName = '' }) {
	return (
		<div className={`w-full max-w-md rounded-sm border border-gray-200 bg-white p-10 shadow-xl ${cardClassName}`}>
			{children}
		</div>
	)
}

export default AuthLayout
