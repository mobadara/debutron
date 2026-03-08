import { Link } from 'react-router-dom'
import { BookOpen, Laptop } from 'lucide-react'
import { programsMainPageData } from '../../data/public/programsData'

const iconMap = {
	book: BookOpen,
	laptop: Laptop,
}

function ProgramsMainPage() {
	return (
		<section className="route-page">
			<div className="section-head">
				<h2>{programsMainPageData.title}</h2>
				<p>
					{programsMainPageData.subtitle}
				</p>
			</div>

			<div className="program-cards-grid">
				{programsMainPageData.pathwayCards.map((card) => {
					const Icon = iconMap[card.icon]

					return (
						<article className="program-card" key={card.id}>
							<img src={card.image} alt={card.imageAlt} className="program-card-image" />
							<h3>
								{Icon ? <Icon className="icon-title" aria-hidden="true" /> : null}
								{card.title}
							</h3>
							<p>{card.description}</p>
							<ul>
								{card.bullets.map((bullet) => (
									<li key={bullet}>{bullet}</li>
								))}
							</ul>
							<Link to={card.link} className="primary-btn">
								{card.cta}
							</Link>
						</article>
					)
				})}
			</div>
		</section>
	)
}

export default ProgramsMainPage
