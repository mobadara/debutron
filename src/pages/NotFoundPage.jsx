import { Link } from 'react-router-dom'

function NotFoundPage() {
	return (
		<section className="route-page not-found">
			<div className="section-head">
				<h2>Page Not Found</h2>
				<p>The page you are looking for is unavailable.</p>
			</div>
			<Link className="primary-btn" to="/">
				Return Home
			</Link>
		</section>
	)
}

export default NotFoundPage
