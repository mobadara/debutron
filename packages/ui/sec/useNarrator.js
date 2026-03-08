import { useEffect, useRef, useState } from 'react'

export const useNarrator = () => {
	const [isSpeaking, setIsSpeaking] = useState(false)
	const [isPaused, setIsPaused] = useState(false)
	const utteranceRef = useRef(null)
	const voicesRef = useRef([])

	const readContent = () => {
		if (typeof window === 'undefined' || !window.speechSynthesis) {
			return
		}

		if (window.speechSynthesis.speaking && window.speechSynthesis.paused) {
			window.speechSynthesis.resume()
			setIsSpeaking(true)
			setIsPaused(false)
			return
		}

		if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
			return
		}

		if (!window.speechSynthesis.speaking) {
			const text = document.getElementById('main-content')?.innerText || 'No content found to read.'
			const normalizedText = text.trim()
			if (!normalizedText) {
				return
			}

			window.speechSynthesis.cancel()

			const utterance = new SpeechSynthesisUtterance(normalizedText)
			utterance.lang = document.documentElement.lang || 'en-US'
			utterance.rate = 1
			utterance.pitch = 1

			const availableVoices = voicesRef.current.length > 0
				? voicesRef.current
				: window.speechSynthesis.getVoices()

			if (availableVoices.length > 0) {
				utterance.voice =
					availableVoices.find((voice) => voice.lang?.toLowerCase().startsWith('en')) ||
					availableVoices[0]
			}

			utterance.onstart = () => {
				setIsSpeaking(true)
				setIsPaused(false)
			}

			utterance.onpause = () => {
				setIsPaused(true)
			}

			utterance.onresume = () => {
				setIsPaused(false)
			}

			utterance.onend = () => {
				setIsSpeaking(false)
				setIsPaused(false)
				utteranceRef.current = null
			}

			utterance.onerror = () => {
				setIsSpeaking(false)
				setIsPaused(false)
				utteranceRef.current = null
			}

			utteranceRef.current = utterance
			window.speechSynthesis.speak(utterance)
			setIsSpeaking(true)
			setIsPaused(false)
		}
	}

	const pauseNarrator = () => {
		if (typeof window === 'undefined' || !window.speechSynthesis) {
			return
		}

		if (!window.speechSynthesis.speaking || window.speechSynthesis.paused) {
			return
		}

		window.speechSynthesis.pause()
		setIsSpeaking(true)
		setIsPaused(true)
	}

	const stopNarrator = () => {
		if (typeof window === 'undefined' || !window.speechSynthesis) {
			return
		}

		window.speechSynthesis.cancel()
		utteranceRef.current = null
		setIsSpeaking(false)
		setIsPaused(false)
	}

	useEffect(() => {
		if (typeof window === 'undefined' || !window.speechSynthesis) {
			return undefined
		}

		const updateVoices = () => {
			voicesRef.current = window.speechSynthesis.getVoices()
		}

		updateVoices()
		window.speechSynthesis.onvoiceschanged = updateVoices

		return () => {
			window.speechSynthesis.cancel()
			window.speechSynthesis.onvoiceschanged = null
			utteranceRef.current = null
			setIsSpeaking(false)
			setIsPaused(false)
		}
	}, [])

	return { isSpeaking, isPaused, readContent, pauseNarrator, stopNarrator }
}
