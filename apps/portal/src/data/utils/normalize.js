export const toSlug = (value = '') =>
	String(value)
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')

export const normalizeLinkItems = (items, group) =>
	items.map((item, index) => {
		const to = item.to || item.href || '#'
		const href = item.href || item.to || '#'
		const id = item.id || `${group}-${index + 1}`
		const slug = item.slug || toSlug(item.label || id)

		return {
			...item,
			id,
			slug,
			to,
			href,
			group,
			type: item.type || 'link',
		}
	})

export const withContentFields = (item, fallback = {}) => {
	const id = item.id || fallback.id || toSlug(item.title || item.name || 'record')
	const slug = item.slug || toSlug(item.title || item.name || id)
	const title = item.title || item.name || fallback.title || ''
	const summary = item.summary || item.description || item.excerpt || item.body || item.bio || ''
	const description = item.description || item.excerpt || item.body || item.bio || summary

	return {
		...item,
		id,
		slug,
		title,
		summary,
		description,
	}
}
