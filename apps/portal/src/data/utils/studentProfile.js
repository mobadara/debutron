const DEFAULT_STUDENT_PROFILE = {
	id: '000001',
	firstName: 'Muyiwa',
	lastName: 'Obadara',
	name: 'Muyiwa',
	enrolled_tracks: ['A'],
}

const PROFILE_STORAGE_KEYS = ['studentProfile', 'studentData', 'student', 'portalStudent']

const normalizeEnrolledTracks = (profile) => {
	if (Array.isArray(profile?.enrolled_tracks) && profile.enrolled_tracks.length > 0) {
		return profile.enrolled_tracks
	}

	if (profile?.track === 'A' || profile?.track === 'Academic Track') return ['A']
	if (profile?.track === 'T' || profile?.track === 'Tech Innovation Track') return ['T']

	return DEFAULT_STUDENT_PROFILE.enrolled_tracks
}

export const resolveStudentProfile = () => {
	try {
		const rawProfile = PROFILE_STORAGE_KEYS
			.map((key) => localStorage.getItem(key))
			.find(Boolean)

		if (!rawProfile) return DEFAULT_STUDENT_PROFILE

		const parsedProfile = JSON.parse(rawProfile)
		const firstName = parsedProfile?.firstName || parsedProfile?.first_name || ''
		const lastName = parsedProfile?.lastName || parsedProfile?.last_name || ''
		const combinedName = `${firstName} ${lastName}`.trim()
		const resolvedName = parsedProfile?.name || combinedName || DEFAULT_STUDENT_PROFILE.name
		const [fallbackFirstName = DEFAULT_STUDENT_PROFILE.firstName, ...fallbackRest] = resolvedName.split(' ')
		const fallbackLastName = fallbackRest.join(' ').trim() || DEFAULT_STUDENT_PROFILE.lastName

		return {
			id: parsedProfile?.id || parsedProfile?.studentId || parsedProfile?.student_id || DEFAULT_STUDENT_PROFILE.id,
			firstName: firstName || fallbackFirstName,
			lastName: lastName || fallbackLastName,
			name: resolvedName,
			enrolled_tracks: normalizeEnrolledTracks(parsedProfile),
		}
	} catch {
		return DEFAULT_STUDENT_PROFILE
	}
}

export const resolveStudentTrack = () => {
	const profile = resolveStudentProfile()

	if (profile.enrolled_tracks.includes('A')) return 'Academic Track'
	if (profile.enrolled_tracks.includes('T')) return 'Tech Innovation Track'

	return 'Tech Innovation Track'
}
