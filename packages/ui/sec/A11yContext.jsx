/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'

export const A11yContext = createContext(null)

export const useA11y = () => {
	const context = useContext(A11yContext)
	if (!context) {
		throw new Error('useA11y must be used within an A11yProvider')
	}
	return context
}

export function A11yProvider({ children }) {
	const [isDarkMode, setIsDarkMode] = useState(() => {
		const savedDarkMode = localStorage.getItem('a11yDarkMode')
		return savedDarkMode ? JSON.parse(savedDarkMode) : false
	})
	const [textScale, setTextScale] = useState(() => {
		const savedTextScale = localStorage.getItem('a11yTextScale')
		return savedTextScale || 'normal'
	})

	useEffect(() => {
		if (isDarkMode) {
			document.documentElement.classList.add('dark')
		} else {
			document.documentElement.classList.remove('dark')
		}

		localStorage.setItem('a11yDarkMode', JSON.stringify(isDarkMode))
	}, [isDarkMode])

	useEffect(() => {
		if (textScale === 'normal') {
			document.documentElement.style.fontSize = '16px'
		}
		if (textScale === 'large') {
			document.documentElement.style.fontSize = '18px'
		}
		if (textScale === 'xl') {
			document.documentElement.style.fontSize = '20px'
		}

		localStorage.setItem('a11yTextScale', textScale)
	}, [textScale])

	return (
		<A11yContext.Provider value={{ isDarkMode, setIsDarkMode, textScale, setTextScale }}>
			{children}
		</A11yContext.Provider>
	)
}
