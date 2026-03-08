import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { SiOrcid } from 'react-icons/si'
import { leadershipDirectory, staffDirectory } from '../data/siteContent'

function LeadershipTeam() {
	const leadershipMembers = leadershipDirectory
	const teachingMembers = staffDirectory

	const getSocialHref = (member, network) => member.socials?.[network] || member[network]

	return (
		<section className="route-page bg-gray-100">
			<div className="mx-auto max-w-7xl px-6 pb-16 md:px-12">
				<h1 className="mt-12 mb-4 text-center font-serif text-4xl font-bold text-debutron-navy">Leadership &amp; Teaching Team</h1>
				<p className="mx-auto mb-16 max-w-2xl text-center font-sans text-lg text-debutron-charcoal">
					Meet the visionary educators, AI engineers, and industry experts guiding the next generation of digital leaders.
				</p>

				<h2 className="mx-auto mb-8 max-w-6xl border-b-2 border-gray-200 pb-2 font-serif text-3xl font-bold text-debutron-navy">Leadership</h2>

				{leadershipMembers.map((member) => (
					<article key={member.name} className="mx-auto mb-8 flex max-w-6xl flex-col items-start gap-8 rounded-sm border border-gray-100 bg-white p-8 shadow-sm md:flex-row">
						<img
							src={member.image}
							alt={member.name}
							className="h-48 w-48 flex-shrink-0 border-2 border-gray-200 object-cover shadow-sm md:h-56 md:w-56"
						/>
						<div>
							<h3 className="font-serif text-2xl font-bold text-debutron-navy">{member.name}</h3>
							<p className="mb-1 font-sans text-sm italic text-gray-500">{member.qualifications}</p>
							<p className="mb-4 font-sans text-sm font-semibold uppercase tracking-widest text-debutron-charcoal">{member.title || member.role}</p>
							<p className="mb-6 font-sans text-base leading-relaxed text-gray-700">{member.bio}</p>
							<div className="flex items-center gap-4 text-xl text-gray-400">
								{getSocialHref(member, 'linkedin') && <a href={getSocialHref(member, 'linkedin')} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} LinkedIn`} className="inline-flex transition-colors hover:text-[#0A66C2]"><FaLinkedin /></a>}
								{getSocialHref(member, 'github') && <a href={getSocialHref(member, 'github')} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} GitHub`} className="inline-flex transition-colors hover:text-black"><FaGithub /></a>}
								{getSocialHref(member, 'twitter') && <a href={getSocialHref(member, 'twitter')} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} Twitter`} className="inline-flex transition-colors hover:text-black"><FaTwitter /></a>}
								{getSocialHref(member, 'orcid') && <a href={getSocialHref(member, 'orcid')} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} ORCID`} className="inline-flex transition-colors hover:text-[#A6CE39]"><SiOrcid /></a>}
							</div>
						</div>
					</article>
				))}

				<h2 className="mx-auto mt-16 mb-8 max-w-6xl border-b-2 border-gray-200 pb-2 font-serif text-3xl font-bold text-debutron-navy">Teaching Team</h2>

				<section className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
					{teachingMembers.map((member) => (
						<article key={member.name} className="flex flex-col rounded-sm border border-gray-200 bg-gray-50 p-6 text-left shadow-sm">
							<img src={member.image} alt={member.name} className="mb-4 h-24 w-24 rounded-full border-2 border-gray-200 object-cover" />
							<h3 className="font-serif text-xl font-bold text-debutron-navy">{member.name}</h3>
							<p className="mb-1 font-sans text-sm italic text-gray-500">{member.qualifications}</p>
							<p className="mb-3 font-sans text-xs font-semibold uppercase tracking-wider text-debutron-charcoal">{member.title || member.role}</p>
							<p className="mb-6 flex-grow font-sans text-sm leading-relaxed text-gray-700">{member.bio}</p>
							<div className="flex items-center gap-3 text-lg text-gray-400">
								{getSocialHref(member, 'linkedin') && <a href={getSocialHref(member, 'linkedin')} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} LinkedIn`} className="inline-flex transition-colors hover:text-[#0A66C2]"><FaLinkedin /></a>}
								{getSocialHref(member, 'twitter') && <a href={getSocialHref(member, 'twitter')} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} Twitter`} className="inline-flex transition-colors hover:text-black"><FaTwitter /></a>}
								{getSocialHref(member, 'github') && <a href={getSocialHref(member, 'github')} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} GitHub`} className="inline-flex transition-colors hover:text-black"><FaGithub /></a>}
								{getSocialHref(member, 'orcid') && <a href={getSocialHref(member, 'orcid')} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} ORCID`} className="inline-flex transition-colors hover:text-[#A6CE39]"><SiOrcid /></a>}
							</div>
						</article>
					))}
				</section>
			</div>
		</section>
	)
}

export default LeadershipTeam
