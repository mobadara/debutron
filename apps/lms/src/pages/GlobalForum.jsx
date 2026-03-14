import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiEye, FiFileText, FiHeart, FiMessageSquare } from 'react-icons/fi'
import { currentForumUser, mergeForumThreads, mockLeaderboard, saveStoredThreads } from '../data/forumData'
import NewDiscussionModal from '../components/forum/NewDiscussionModal'

const countResponses = (comments = []) => comments.reduce((total, comment) => total + 1 + countResponses(comment.replies ?? []), 0)

const appendReplyToTree = (comments, parentCommentId, reply) =>
	comments.map((comment) => {
		if (comment.id === parentCommentId) {
			return {
				...comment,
				replies: [...(comment.replies ?? []), reply],
			}
		}

		if (!Array.isArray(comment.replies) || comment.replies.length === 0) {
			return comment
		}

		return {
			...comment,
			replies: appendReplyToTree(comment.replies, parentCommentId, reply),
		}
	})

const roleBadge = (role) => {
	if (role === 'Instructor') {
		return (
			<span className="bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 px-2 py-0.5 text-xs rounded uppercase tracking-wider font-bold">
				Instructor
			</span>
		)
	}

	if (role === 'TA') {
		return (
			<span className="bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200 px-2 py-0.5 text-xs rounded uppercase tracking-wider font-bold">
				TA
			</span>
		)
	}

	return null
	}

function GlobalForum() {
	const location = useLocation()
	const incomingThread = location.state?.newThread
	const incomingFlash = location.state?.flashMessage
	const [searchQuery, setSearchQuery] = useState('')
	const [sortBy, setSortBy] = useState('Recent')
	const [threads, setThreads] = useState(() => mergeForumThreads(incomingThread))
	const [flashMessage, setFlashMessage] = useState(incomingFlash || '')
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [expandedThreadId, setExpandedThreadId] = useState(null)
	const [replyDrafts, setReplyDrafts] = useState({})
	const [replyTargets, setReplyTargets] = useState({})
	const academicLeaderboard = mockLeaderboard.map((user, index) => ({
		...user,
		contributions: user.contributions ?? [142, 131, 124, 116, 109][index] ?? Math.max(88, 104 - index * 4),
	}))
	const toggleThread = (id) => setExpandedThreadId((prev) => (prev === id ? null : id))

	useEffect(() => {
		saveStoredThreads(threads)
	}, [threads])

	const handleNewThread = (newThread) => {
		setThreads((previous) => [
			{
				...newThread,
				author: newThread.author ?? currentForumUser,
				comments: Array.isArray(newThread.comments) ? newThread.comments : [],
				stats: {
					...newThread.stats,
					replies: countResponses(newThread.comments ?? []),
				},
			},
			...previous,
		])
		setFlashMessage('Your discussion has been posted successfully.')
	}

	const handleDraftChange = (threadId, value) => {
		setReplyDrafts((previous) => ({
			...previous,
			[threadId]: value,
		}))
	}

	const handleReplyIntent = (threadId, comment) => {
		setExpandedThreadId(threadId)
		setReplyTargets((previous) => ({
			...previous,
			[threadId]: {
				commentId: comment.id,
				authorName: comment.author.name,
			},
		}))
		setReplyDrafts((previous) => ({
			...previous,
			[threadId]: previous[threadId]?.trim() ? previous[threadId] : `@${comment.author.name} `,
		}))
	}

	const clearReplyTarget = (threadId) => {
		setReplyTargets((previous) => {
			const nextTargets = { ...previous }
			delete nextTargets[threadId]
			return nextTargets
		})
	}

	const handlePostContribution = (threadId) => {
		const draft = replyDrafts[threadId]?.trim()

		if (!draft) {
			return
		}

		const replyTarget = replyTargets[threadId]

		setThreads((previousThreads) =>
			previousThreads.map((thread) => {
				if (thread.id !== threadId) {
					return thread
				}

				const nextEntry = {
					id: `${replyTarget ? 'rp' : 'cm'}-${Date.now()}`,
					author: currentForumUser,
					content: draft,
					timeAgo: 'Just now',
					replies: [],
				}

				const nextComments = replyTarget
					? appendReplyToTree(thread.comments ?? [], replyTarget.commentId, nextEntry)
					: [...(thread.comments ?? []), nextEntry]

				return {
					...thread,
					comments: nextComments,
					stats: {
						...thread.stats,
						replies: countResponses(nextComments),
					},
				}
			})
		)

		setReplyDrafts((previous) => ({
			...previous,
			[threadId]: '',
		}))
		clearReplyTarget(threadId)
		setFlashMessage(replyTarget ? 'Your reply has been added to the discussion.' : 'Your comment has been added to the discussion.')
	}

	const filteredThreads = useMemo(() => {
		const normalizedQuery = searchQuery.trim().toLowerCase()

		let visibleThreads = threads.filter((thread) => {
			if (normalizedQuery.length === 0) return true
			return (
				thread.title.toLowerCase().includes(normalizedQuery) ||
				thread.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery)) ||
				thread.author.name.toLowerCase().includes(normalizedQuery)
			)
		})

		if (sortBy === 'Top Voted') {
			visibleThreads = [...visibleThreads].sort((a, b) => b.stats.likes - a.stats.likes)
		}

		if (sortBy === 'Unanswered') {
			visibleThreads = [...visibleThreads].sort((a, b) => countResponses(a.comments ?? []) - countResponses(b.comments ?? []))
		}

		return visibleThreads
	}, [searchQuery, sortBy, threads])

	return (
		<div className="flex-1 w-full flex flex-col bg-slate-50 dark:bg-slate-950">
			<div className="max-w-[1600px] mx-auto w-full flex-1 p-6 lg:p-10 flex flex-col lg:flex-row gap-8">
				<aside className="w-full lg:w-1/4 flex flex-col gap-6" aria-label="Forum sidebar">
				<section
					className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5"
					aria-labelledby="forum-leaderboard-heading"
				>
					<h2 id="forum-leaderboard-heading" className="text-base font-semibold text-slate-900 dark:text-white mb-4">
						Eminent Scholars
					</h2>
					<ul className="space-y-3">
						{academicLeaderboard.map((user) => (
							<li key={user.name} className="flex items-center justify-between gap-3">
								<div className="flex items-center gap-3 min-w-0">
									<img src={user.avatar} alt={`${user.name} avatar`} className="h-10 w-10 rounded-full object-cover" />
									<div className="min-w-0">
										<span className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate block">{user.name}</span>
										{user.role && user.role !== 'Student' && roleBadge(user.role)}
									</div>
								</div>
								<div className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-300 text-xs font-semibold whitespace-nowrap">
									<FiFileText aria-hidden="true" />
									<span>{user.contributions}</span>
								</div>
							</li>
						))}
					</ul>
				</section>
			</aside>

				<main className="w-full lg:w-3/4 flex flex-col gap-4" aria-label="Thread feed">
					<header className="w-full mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Global Campus Forum</h1>
						<button
							type="button"
							onClick={() => setIsModalOpen(true)}
							className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 dark:focus-visible:ring-offset-slate-950"
						>
							Start New Discussion
						</button>
					</header>

					{flashMessage && (
						<div
							className="w-full rounded-lg border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-900/20 p-3 sm:p-4 flex items-start justify-between gap-3"
							role="status"
						>
							<p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">{flashMessage}</p>
							<button
								type="button"
								onClick={() => setFlashMessage('')}
								className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 hover:underline"
							>
								Dismiss
							</button>
						</div>
					)}

					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
						<div className="w-full sm:w-96">
							<label htmlFor="forum-search" className="sr-only">
								Search discussions
							</label>
							<input
								id="forum-search"
								type="search"
								value={searchQuery}
								onChange={(event) => setSearchQuery(event.target.value)}
								placeholder="Search discussions, tags, or author"
								className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
							/>
						</div>
						<div className="w-full sm:w-auto">
							<label htmlFor="forum-sort" className="sr-only">
								Sort discussions
							</label>
							<select
								id="forum-sort"
								value={sortBy}
								onChange={(event) => setSortBy(event.target.value)}
								className="w-full sm:w-auto px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
							>
								<option>Recent</option>
								<option>Top Voted</option>
								<option>Unanswered</option>
							</select>
						</div>
					</div>

					<div className="space-y-4">
						{filteredThreads.map((thread) => (
							<Link
								key={thread.id}
								to={`/forums/discussion/${thread.id}`}
								aria-label={`Open discussion: ${thread.title}`}
								className="block bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6 flex flex-col gap-3 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
							>
								<div className="flex items-start justify-between gap-3">
									<div className="flex items-center gap-3 min-w-0">
										<img src={thread.author.avatar} alt={`${thread.author.name} avatar`} className="h-10 w-10 rounded-full object-cover" />
										<div className="min-w-0">
											<p className="font-semibold text-slate-900 dark:text-white truncate">{thread.author.name}</p>
											<div className="mt-1 flex items-center gap-2 flex-wrap">
												{roleBadge(thread.author.role)}
											</div>
										</div>
									</div>
									<p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">{thread.timeAgo}</p>
								</div>

								<h2 className="text-xl font-bold text-[#000080] dark:text-[#0D9488] leading-snug break-words">{thread.title}</h2>

								{(thread.content || thread.body) && (
									<p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
										{(thread.content || thread.body).replace(/[#*`$>_~[\]]/g, '').trim()}
									</p>
								)}

								<div className="mt-1 flex flex-wrap gap-2">
									{thread.tags.map((tag) => (
										<span
											key={tag}
											className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
										>
											#{tag}
										</span>
									))}
								</div>

								<div className="mt-4 grid grid-cols-3 sm:flex sm:flex-wrap items-center gap-3 sm:gap-5 text-sm">
									<button
										type="button"
										onClick={(event) => {
											event.preventDefault()
											event.stopPropagation()
										}}
										className="group flex items-center gap-1.5 text-slate-500 hover:text-rose-600 transition-all px-2 py-1 rounded-md hover:bg-rose-50 dark:hover:bg-rose-900/20"
										aria-label={`${thread.stats.likes} likes`}
									>
										<FiHeart className="group-hover:fill-rose-600 transition-colors" />
										<span>{thread.stats.likes}</span>
									</button>
									<button
										type="button"
										onClick={(event) => {
											event.preventDefault()
											event.stopPropagation()
											toggleThread(thread.id)
										}}
										className="group flex items-center gap-1.5 text-slate-500 hover:text-blue-600 transition-all px-2 py-1 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20"
										aria-label={`${countResponses(thread.comments ?? [])} replies`}
									>
										<FiMessageSquare />
										<span>{countResponses(thread.comments ?? [])}</span>
									</button>
									<div className="flex items-center gap-1.5 text-slate-400 px-2 py-1" aria-label={`${thread.stats.views} views`}>
										<FiEye />
										<span>{thread.stats.views}</span>
									</div>
								</div>

								{expandedThreadId === thread.id && (
									<div
										className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-4 animate-in slide-in-from-top-2 duration-200"
										onClick={(event) => {
											event.preventDefault()
											event.stopPropagation()
										}}
									>
										{thread.comments.map((comment) => (
											<div key={`${thread.id}-${comment.id}`} className="flex gap-3 items-start">
												<img
													src={comment.author.avatar}
													alt={`${comment.author.name} avatar`}
													className="h-8 w-8 rounded-full object-cover"
												/>
												<div className="min-w-0 flex-1">
													<div className="flex items-center gap-2 flex-wrap">
														<span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{comment.author.name}</span>
														{roleBadge(comment.author.role)}
														<span className="text-xs text-slate-500 dark:text-slate-400">{comment.timeAgo}</span>
													</div>
													<span className="text-sm text-slate-700 dark:text-slate-300 block mt-1">{comment.content}</span>
													<div className="mt-2 flex items-center gap-3">
														<button
															type="button"
															onClick={(event) => {
																event.preventDefault()
																event.stopPropagation()
																handleReplyIntent(thread.id, comment)
															}}
															className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-[#000080] dark:hover:text-[#0D9488] transition-colors"
														>
															Reply
														</button>
													</div>
													{Array.isArray(comment.replies) && comment.replies.length > 0 && (
														<div className="mt-4 space-y-3 border-l border-slate-200 dark:border-slate-700 pl-4">
															{comment.replies.map((reply) => (
																<div key={`${thread.id}-${comment.id}-${reply.id}`} className="flex gap-3 items-start">
																	<img
																		src={reply.author.avatar}
																		alt={`${reply.author.name} avatar`}
																		className="h-7 w-7 rounded-full object-cover"
																	/>
																	<div className="min-w-0">
																		<div className="flex items-center gap-2 flex-wrap">
																			<span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{reply.author.name}</span>
																			{roleBadge(reply.author.role)}
																			<span className="text-xs text-slate-500 dark:text-slate-400">{reply.timeAgo}</span>
																		</div>
																		<p className="text-sm text-slate-700 dark:text-slate-300 mt-1">{reply.content}</p>
																	</div>
																</div>
															))}
														</div>
													)}
												</div>
											</div>
										))}

										<div className="mt-2 flex gap-3 items-start">
											<img
												src={currentForumUser.avatar}
												alt="Current user avatar"
												className="h-8 w-8 rounded-full object-cover"
											/>
											<form
												className="w-full"
												onSubmit={(event) => {
													event.preventDefault()
													event.stopPropagation()
													handlePostContribution(thread.id)
												}}
											>
												{replyTargets[thread.id] && (
													<div className="mb-2 flex items-center justify-between gap-3 rounded-lg bg-slate-100 dark:bg-slate-800 px-3 py-2 text-xs text-slate-600 dark:text-slate-300">
														<span>Replying to {replyTargets[thread.id].authorName}</span>
														<button
															type="button"
															onClick={(event) => {
																event.preventDefault()
																event.stopPropagation()
																clearReplyTarget(thread.id)
															}}
															className="font-semibold hover:text-[#000080] dark:hover:text-[#0D9488] transition-colors"
														>
															Cancel
														</button>
													</div>
												)}
												<textarea
													value={replyDrafts[thread.id] ?? ''}
													onChange={(event) => handleDraftChange(thread.id, event.target.value)}
													onClick={(event) => {
														event.preventDefault()
														event.stopPropagation()
													}}
													className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#0D9488] outline-none resize-y min-h-[80px]"
													placeholder="Contribute a formal response to this discussion..."
												/>
												<div className="text-right">
													<button
														type="submit"
														onClick={(event) => event.stopPropagation()}
														className="bg-[#000080] dark:bg-[#0D9488] hover:bg-blue-800 dark:hover:bg-teal-500 text-white px-4 py-1.5 rounded-md text-sm font-bold transition-colors mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
														disabled={!replyDrafts[thread.id]?.trim()}
													>
														Post Reply
													</button>
												</div>
											</form>
										</div>
									</div>
								)}
							</Link>
						))}

						{filteredThreads.length === 0 && (
							<div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 text-sm text-slate-600 dark:text-slate-400">
								No discussions match your current filters.
							</div>
						)}
					</div>
				</main>
			</div>

			<NewDiscussionModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSuccess={handleNewThread}
			/>
		</div>
	)
}
export default GlobalForum
