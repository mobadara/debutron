import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { carouselSlides } from '../../data/siteContent'

const carouselData = carouselSlides.map((slide, index) => ({
	id: slide.id || `hero-${index + 1}`,
	image: slide.image,
	title: slide.title || slide.headline,
	subtitle: slide.summary || slide.description || slide.body,
	primaryBtnText: slide.cta?.primary?.label || slide.ctaPrimary,
	primaryBtnLink: slide.cta?.primary?.to || slide.ctaPrimaryLink,
	secondaryBtnText: slide.cta?.secondary?.label || slide.ctaSecondary,
	secondaryBtnLink: slide.cta?.secondary?.to || slide.ctaSecondaryLink,
}))

const requiredSlideKeys = [
	'id',
	'image',
	'title',
	'subtitle',
	'primaryBtnText',
	'primaryBtnLink',
	'secondaryBtnText',
	'secondaryBtnLink',
]

function HeroCarousel() {
	const validSlides = carouselData.filter((slide, index) => {
		const missingKeys = requiredSlideKeys.filter((key) => !slide[key])

		if (missingKeys.length > 0) {
			if (import.meta.env.DEV) {
				console.warn(`HeroCarousel: slide at index ${index} is missing required keys: ${missingKeys.join(', ')}`)
			}
			return false
		}

		return true
	})

	const [currentSlide, setCurrentSlide] = useState(0)
	const activeSlideIndex = validSlides.length > 0 ? currentSlide % validSlides.length : 0

	const renderCta = (text, link, className) => {
		if (link.startsWith('mailto:')) {
			return (
				<a href={link} className={className}>
					{text}
				</a>
			)
		}

		return (
			<Link to={link} className={className}>
				{text}
			</Link>
		)
	}

	useEffect(() => {
		if (validSlides.length === 0) {
			return undefined
		}

		const timer = window.setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % validSlides.length)
		}, 6000)

		return () => {
			window.clearInterval(timer)
		}
	}, [validSlides.length])

	return (
		<section className="relative h-[85vh] w-full overflow-hidden md:h-[90vh]" aria-label="Debutron hero carousel">
			{validSlides.map((slide, index) => (
				<div
					key={slide.id}
					className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
						activeSlideIndex === index ? 'z-10 opacity-100' : 'pointer-events-none z-0 opacity-0'
					}`}
				>
					<img
						src={slide.image}
						alt={slide.title}
						className="h-full w-full object-cover"
					/>
					<div className="absolute inset-0 bg-gradient-to-r from-debutron-navy/90 to-transparent" aria-hidden="true" />

					<div className="absolute inset-0 flex items-center">
						<div className="mx-auto w-full max-w-7xl px-6">
							<h2 className="mb-6 max-w-3xl font-serif text-5xl font-bold leading-tight text-white drop-shadow-lg md:text-7xl">
								{slide.title}
							</h2>
							<p className="mb-10 max-w-2xl font-sans text-xl text-gray-200 drop-shadow-md md:text-2xl">
								{slide.subtitle}
							</p>
							<div className="flex flex-wrap items-center gap-4">
								{renderCta(
									slide.primaryBtnText,
									slide.primaryBtnLink,
									'inline-block rounded-sm bg-white px-8 py-4 mr-4 font-sans text-lg font-bold text-debutron-navy shadow-lg transition-colors hover:bg-gray-200'
								)}
								{renderCta(
									slide.secondaryBtnText,
									slide.secondaryBtnLink,
									'inline-block rounded-sm border-2 border-white px-8 py-4 font-sans text-lg font-bold text-white shadow-lg transition-colors hover:bg-white/20'
								)}
							</div>
						</div>
					</div>
				</div>
			))}

			<div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2" role="tablist" aria-label="Hero slide indicators">
				{validSlides.map((slide, index) => (
					<button
						key={slide.id}
						type="button"
						onClick={() => setCurrentSlide(index)}
						className={`h-2.5 w-2.5 rounded-full transition-colors ${
							activeSlideIndex === index ? 'bg-white' : 'bg-white/50 hover:bg-white/80'
						}`}
						aria-label={`Go to slide ${index + 1}`}
					/>
				))}
			</div>
		</section>
	)
}

export default HeroCarousel
