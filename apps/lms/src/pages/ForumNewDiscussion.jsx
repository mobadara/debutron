import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiX } from 'react-icons/fi'
import { currentForumUser, getStoredThreads, saveStoredThreads } from '../data/forumData'

function ForumNewDiscussion() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState([])
  const [tagInput, setTagInput] = useState('')
  const [content, setContent] = useState('')

  const handleTagKeyDown = (event) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault()
      const val = tagInput.trim().replace(/^#/, '').replace(/\s+/g, '')
      if (val && !tags.includes(val)) {
        setTags((prev) => [...prev, val])
      }
      setTagInput('')
    } else if (event.key === 'Backspace' && !tagInput && tags.length > 0) {
      setTags((prev) => prev.slice(0, -1))
    }
  }

  const removeTag = (tagToRemove) => setTags((prev) => prev.filter((t) => t !== tagToRemove))

  const handleSubmit = (event) => {
    event.preventDefault()

    // Flush any uncommitted tag text
    const pendingTag = tagInput.trim().replace(/^#/, '').replace(/\s+/g, '')
    const finalTags = pendingTag && !tags.includes(pendingTag) ? [...tags, pendingTag] : tags

    const newThread = {
      id: `th-${Date.now()}`,
      title: title.trim(),
      tags: finalTags,
      author: currentForumUser,
      stats: {
        likes: 0,
        replies: 0,
        views: 0,
      },
      timeAgo: 'just now',
      comments: [],
    }

    try {
      saveStoredThreads([newThread, ...getStoredThreads()])
    } catch {
      // no-op for environments where sessionStorage is unavailable
    }

    navigate('/forums/global', {
      state: {
        flashMessage: 'Discussion published successfully.',
        newThread,
      },
    })
  }

  return (
    <section className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-10">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8">
        <header className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Start New Discussion</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Share a question or idea with the global campus community.
          </p>
        </header>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="discussion-title" className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
              Title
            </label>
            <input
              id="discussion-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              placeholder="What would you like to discuss?"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
              Tags
              <span className="ml-2 text-xs font-normal text-slate-400">Press Space to add · Backspace to remove last</span>
            </label>
            <div
              className="flex flex-wrap items-center gap-2 min-h-[42px] w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 cursor-text transition"
              onClick={() => document.getElementById('page-tag-input')?.focus()}
            >
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100 text-xs font-semibold rounded-full pl-2.5 pr-1 py-1"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    aria-label={`Remove tag ${tag}`}
                    className="rounded-full hover:bg-slate-300 dark:hover:bg-slate-600 p-0.5 transition-colors"
                  >
                    <FiX size={11} />
                  </button>
                </span>
              ))}
              <input
                id="page-tag-input"
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder={tags.length === 0 ? 'e.g. AI, JAMB, Career — press Space to add' : ''}
                className="flex-1 min-w-[180px] bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="discussion-content" className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
              Content
            </label>
            <textarea
              id="discussion-content"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              required
              rows={8}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              placeholder="Write your post here..."
            />
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/forums/global')}
              className="px-5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 dark:focus-visible:ring-offset-slate-950"
            >
              Publish Discussion
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default ForumNewDiscussion
