import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaEnvelope, FaFacebookF, FaInstagram, FaLinkedinIn, FaLocationDot, FaPhone, FaXTwitter, FaYoutube } from 'react-icons/fa6'
import DebutronLogoInverted from '../DebutronLogoInverted'

function Footer() {
	const [isNewsletterOpen, setIsNewsletterOpen] = useState(false)

	return (
		<footer className="bg-debutron-navy py-12 font-sans text-white">
			<div className="mx-auto max-w-7xl px-6">
				<div className="grid gap-10 md:grid-cols-4">
					<div>
						<div className="mb-4">
							<DebutronLogoInverted className="w-12 h-12" />
						</div>
						<p className="text-sm text-gray-300">
							Academic excellence and advanced technology training for future-ready learners.
						</p>
					</div>

					<div>
						<h4 className="font-serif text-lg mb-4">Academic &amp; Tech Tracks</h4>
						<ul className="space-y-2">
							<li><Link className="text-sm text-gray-300 transition-colors hover:text-white" to="/o-level-mastery">O-Level Mastery</Link></li>
							<li><Link className="text-sm text-gray-300 transition-colors hover:text-white" to="/utme-accelerator">UTME Accelerator</Link></li>
							<li><Link className="text-sm text-gray-300 transition-colors hover:text-white" to="/applied-data-science">Applied Data Science</Link></li>
							<li><Link className="text-sm text-gray-300 transition-colors hover:text-white" to="/full-stack-software-engineering">Full-Stack Software Engineering</Link></li>
						</ul>
					</div>

					<div>
						<h4 className="font-serif text-lg mb-4">Assessment &amp; Innovations</h4>
						<ul className="space-y-2">
							<li>
								<Link className="text-sm text-gray-300 transition-colors hover:text-white" to="/pearson-vue">
									<span className="inline-flex items-center gap-2">
										Pearson VUE Testing Center
										<span className="rounded-sm bg-yellow-400 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-debutron-navy">Coming Soon</span>
									</span>
								</Link>
							</li>
							<li><Link className="text-sm text-gray-300 transition-colors hover:text-white" to="/enterprise-consulting">Enterprise Consulting</Link></li>
							<li><Link className="text-sm text-gray-300 transition-colors hover:text-white" to="/educational-consulting">Educational Consulting</Link></li>
							<li><Link className="text-sm text-gray-300 transition-colors hover:text-white" to="/exam-registration">Exam Registration (WASSCE / NECO / UTME)</Link></li>
							<li><Link className="text-sm text-gray-300 transition-colors hover:text-white" to="/ai-data-models">AI &amp; Data Models</Link></li>
							<li><Link className="text-sm text-gray-300 transition-colors hover:text-white" to="/student-showcase">Student App Showcase</Link></li>
						</ul>
					</div>

					<div>
						<h4 className="font-serif text-lg mb-4">Contact Us</h4>
						<div className="space-y-3 text-sm text-gray-300">
							<p className="flex items-start gap-2">
								<FaLocationDot className="mt-0.5 text-gray-300" aria-hidden="true" />
								<span>A6, Jerusalem Crescent, Arulogun Road, Ibadan, OY, Nigeria</span>
							</p>
							<p className="flex items-start gap-2">
								<FaPhone className="mt-0.5 text-gray-300" aria-hidden="true" />
								<a className="transition-colors hover:text-white" href="tel:+2348060111429">+234 (806) 011 1429</a>
							</p>
							<p className="flex items-start gap-2">
								<FaEnvelope className="mt-0.5 text-gray-300" aria-hidden="true" />
								<a className="transition-colors hover:text-white" href="mailto:debutronlab@gmail.com">debutronlab@gmail.com</a>
							</p>
							<p className="flex items-start gap-2">
								<span className="mt-0.5 text-gray-300" aria-hidden="true">🌐</span>
								<a className="transition-colors hover:text-white" href="https://debutron.org" target="_blank" rel="noopener noreferrer">https://debutron.org</a>
							</p>
						</div>

						<div className="mt-4 md:hidden">
							<button
								type="button"
								aria-label="Toggle join mailing list form"
								onClick={() => setIsNewsletterOpen((prev) => !prev)}
								className="inline-flex items-center justify-center gap-2 rounded border border-white/40 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-debutron-navy"
							>
								<FaEnvelope aria-hidden="true" />
								<span>Join our mailing list</span>
							</button>
						</div>

						<form className={`${isNewsletterOpen ? 'flex' : 'hidden'} mt-4 flex-col gap-2 md:flex`}>
							<input
								type="email"
								placeholder="Enter your email"
								aria-label="Email for mailing list"
								className="rounded border border-white/30 bg-white/95 px-3 py-2 text-sm text-debutron-charcoal outline-none"
							/>
							<button
								type="submit"
								className="rounded border border-white px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-debutron-navy"
							>
								Join mailing list
							</button>
						</form>

						<div className="mt-5 flex items-center gap-3 text-base">
							<a className="text-gray-300 transition-colors hover:text-white" href="#" aria-label="Debutron Lab on LinkedIn"><FaLinkedinIn /></a>
							<a className="text-gray-300 transition-colors hover:text-white" href="#" aria-label="Debutron Lab on X"><FaXTwitter /></a>
							<a className="text-gray-300 transition-colors hover:text-white" href="#" aria-label="Debutron Lab on Facebook"><FaFacebookF /></a>
							<a className="text-gray-300 transition-colors hover:text-white" href="#" aria-label="Debutron Lab on Instagram"><FaInstagram /></a>
							<a className="text-gray-300 transition-colors hover:text-white" href="#" aria-label="Debutron Lab on YouTube"><FaYoutube /></a>
						</div>
					</div>
				</div>

				<div className="mt-10 border-t border-white/20 pt-5 text-xs text-gray-300">
					© {new Date().getFullYear()} Debutron Lab. All rights reserved.
				</div>
			</div>
		</footer>
	)
}

export default Footer
