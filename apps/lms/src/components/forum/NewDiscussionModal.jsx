import { Component, useCallback, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'
import {
  FiBold,
  FiCode,
  FiItalic,
  FiLink,
  FiMessageSquare,
  FiX,
} from 'react-icons/fi'
import { getStoredThreads, saveStoredThreads, currentForumUser } from '../../data/forumData'

// ID generation at module scope keeps the React compiler happy.
function nextThreadId() {
  return `th-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

// Static toolbar definitions — no closures, no refs — safe at module scope.
// `insertMarkdown` is passed dynamically in JSX via inline onClick.
const TOOLBAR_DEFS = [
  { label: 'Bold',                  before: '**',      after: '**',        placeholder: 'bold text',      Icon: FiBold },
  { label: 'Italic',                before: '_',       after: '_',         placeholder: 'italic text',    Icon: FiItalic },
  { label: 'Hyperlink',             before: '[',       after: '](https://)',placeholder: 'link text',      Icon: FiLink },
  { label: 'Block Quote',           before: '\n> ',    after: '',          placeholder: 'quoted text',    Icon: FiMessageSquare },
  { label: 'Inline Code',           before: '`',       after: '`',         placeholder: 'code',           Icon: FiCode },
  { label: 'Code Block',            before: '\n```\n', after: '\n```\n',   placeholder: 'code here',      Icon: null, text: '```' },
  { label: 'Inline Math ($…$)',     before: '$',       after: '$',         placeholder: 'x^2',            Icon: null, text: '$∑$' },
  { label: 'Display Math ($$…$$)',  before: '\n$$\n',  after: '\n$$\n',    placeholder: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}', Icon: null, text: '$$' },
]

const MARKDOWN_COMPONENTS = {
  h1: ({ children, ...props }) => <h1 {...props} className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4 mt-2">{children}</h1>,
  h2: ({ children, ...props }) => <h2 {...props} className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3 mt-6">{children}</h2>,
  h3: ({ children, ...props }) => <h3 {...props} className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3 mt-5">{children}</h3>,
  p: ({ children, ...props }) => <p {...props} className="text-slate-700 dark:text-slate-300 leading-7 mb-4">{children}</p>,
  strong: ({ children, ...props }) => <strong {...props} className="font-bold text-slate-950 dark:text-white">{children}</strong>,
  em: ({ children, ...props }) => <em {...props} className="italic">{children}</em>,
  a: ({ children, href, ...props }) => (
    <a
      {...props}
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-blue-600 dark:text-blue-400 font-medium underline underline-offset-2 hover:text-blue-700 dark:hover:text-blue-300"
    >
      {children}
    </a>
  ),
  ul: ({ children, ...props }) => <ul {...props} className="list-disc pl-6 mb-4 space-y-2 text-slate-700 dark:text-slate-300">{children}</ul>,
  ol: ({ children, ...props }) => <ol {...props} className="list-decimal pl-6 mb-4 space-y-2 text-slate-700 dark:text-slate-300">{children}</ol>,
  li: ({ children, ...props }) => <li {...props} className="leading-7">{children}</li>,
  blockquote: ({ children, ...props }) => (
    <blockquote {...props} className="border-l-4 border-blue-500 bg-blue-50/60 dark:bg-blue-950/30 text-slate-700 dark:text-slate-300 italic px-4 py-3 rounded-r-lg mb-4">
      {children}
    </blockquote>
  ),
  pre: ({ children, ...props }) => (
    <pre {...props} className="bg-slate-900 text-slate-50 rounded-xl p-4 overflow-x-auto mb-4 text-sm leading-6">{children}</pre>
  ),
  code: ({ children, className, ...props }) => {
    const isBlockCode = typeof className === 'string' && className.includes('language-')

    return isBlockCode ? (
      <code {...props} className={className}>{children}</code>
    ) : (
      <code {...props} className="rounded bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 text-[0.95em] text-blue-700 dark:text-blue-300 font-mono">
        {children}
      </code>
    )
  },
  hr: () => <hr className="my-6 border-slate-200 dark:border-slate-800" />,
  table: ({ children, ...props }) => <table {...props} className="min-w-full border border-slate-200 dark:border-slate-800 rounded-lg mb-4">{children}</table>,
  thead: ({ children, ...props }) => <thead {...props} className="bg-slate-100 dark:bg-slate-800">{children}</thead>,
  th: ({ children, ...props }) => <th {...props} className="border border-slate-200 dark:border-slate-700 px-3 py-2 text-left font-semibold text-slate-900 dark:text-slate-100">{children}</th>,
  td: ({ children, ...props }) => <td {...props} className="border border-slate-200 dark:border-slate-700 px-3 py-2 text-slate-700 dark:text-slate-300">{children}</td>,
}

class MarkdownPreviewBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.hasError) {
      this.setState({ hasError: false })
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="space-y-3">
          <p className="text-sm font-medium text-amber-700 dark:text-amber-400">
            Preview could not be rendered for the current content.
          </p>
          <pre className="whitespace-pre-wrap break-words text-sm text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-800">
            {this.props.rawContent}
          </pre>
        </div>
      )
    }

    return this.props.children
  }
}

// -------------------------------------------------------------------------

function ToolbarButton({ label, icon, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      className="p-1.5 rounded text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      {icon}
    </button>
  )
}

function TabButton({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault()
        onClick()
      }}
      aria-selected={active}
      role="tab"
      className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors ${
        active
          ? 'bg-white dark:bg-slate-950 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200 dark:border-slate-700'
          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
      }`}
    >
      {label}
    </button>
  )
}

export default function NewDiscussionModal({ isOpen, onClose, onSuccess }) {
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState([])
  const [tagInput, setTagInput] = useState('')
  const [content, setContent] = useState('')
  const [activeTab, setActiveTab] = useState('write')
  const textareaRef = useRef(null)

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

  // Defined before the early return so hooks always run in the same order.
  const insertMarkdown = useCallback((before, after = '', placeholder = '') => {
    const textarea = textareaRef.current
    if (!textarea) return
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selected = content.slice(start, end) || placeholder
    setContent(content.slice(0, start) + before + selected + after + content.slice(end))
    requestAnimationFrame(() => {
      textarea.focus()
      const cursor = start + before.length + selected.length + after.length
      textarea.setSelectionRange(cursor, cursor)
    })
  }, [content])

  if (!isOpen) return null

  const handlePost = () => {
    if (!title.trim() || !content.trim()) return

    // Flush any uncommitted tag text as a final tag before posting
    const pendingTag = tagInput.trim().replace(/^#/, '').replace(/\s+/g, '')
    const finalTags = pendingTag && !tags.includes(pendingTag) ? [...tags, pendingTag] : tags

    const newThread = {
      id: nextThreadId(),
      title: title.trim(),
      tags: finalTags,
      author: currentForumUser,
      stats: { likes: 0, replies: 0, views: 0 },
      timeAgo: 'just now',
      body: content.trim(),
      comments: [],
    }

    saveStoredThreads([newThread, ...getStoredThreads()])
    onSuccess?.(newThread)
    handleClose()
  }

  const handleClose = () => {
    setTitle('')
    setTags([])
    setTagInput('')
    setContent('')
    setActiveTab('write')
    onClose()
  }

  const isPostable = title.trim().length > 0 && content.trim().length > 0

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 overflow-y-auto flex items-start sm:items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="discussion-modal-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) handleClose()
      }}
    >
      {/* Card */}
      <div className="bg-white dark:bg-slate-950 w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col my-8">

        {/* ── Header ───────────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <h2 id="discussion-modal-title" className="text-lg font-bold text-slate-900 dark:text-white">
            Start a New Discussion
          </h2>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close modal"
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* ── Meta inputs ──────────────────────────────────────────── */}
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 space-y-4">
          <div>
            <label
              htmlFor="modal-discussion-title"
              className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
            >
              Discussion Title <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <input
              id="modal-discussion-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="State your question or topic clearly"
              required
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-600 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Tags
              <span className="ml-2 text-xs font-normal text-slate-400">Press Space to add · Backspace to remove last</span>
            </label>
            <div
              className="flex flex-wrap items-center gap-2 w-full min-h-[42px] bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-600 transition cursor-text"
              onClick={() => document.getElementById('modal-tag-input')?.focus()}
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
                id="modal-tag-input"
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder={tags.length === 0 ? 'e.g. AI, JAMB, Career — press Space to add' : ''}
                className="flex-1 min-w-[140px] bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none"
              />
            </div>
          </div>
        </div>

        {/* ── Editor Toolbar & Tabs ────────────────────────────────── */}
        <div className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-2 flex items-center justify-between gap-2 flex-wrap">
          {/* Tabs */}
          <div className="flex items-center gap-1" role="tablist" aria-label="Editor mode">
            <TabButton
              label="Write"
              active={activeTab === 'write'}
              onClick={() => setActiveTab('write')}
            />
            <TabButton
              label="Preview"
              active={activeTab === 'preview'}
              onClick={() => setActiveTab('preview')}
            />
          </div>

          {/* Toolbar (write mode only) */}
          {activeTab === 'write' && (
            <div className="flex items-center gap-0.5" aria-label="Formatting tools">
              {TOOLBAR_DEFS.map((def) => (
                <ToolbarButton
                  key={def.label}
                  label={def.label}
                  icon={
                    def.Icon
                      ? <def.Icon size={15} />
                      : <span className="font-mono text-[11px] leading-none font-bold select-none">{def.text}</span>
                  }
                  onClick={() => insertMarkdown(def.before, def.after, def.placeholder)}
                />
              ))}
            </div>
          )}
        </div>

        {/* ── Editor / Preview Canvas ──────────────────────────────── */}
        <div
          className="px-6 py-4 min-h-[300px] max-h-[500px] overflow-y-auto"
          role="tabpanel"
          aria-label={activeTab === 'write' ? 'Write tab content' : 'Preview tab content'}
        >
          {activeTab === 'write' ? (
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder={`Write your discussion here. Markdown is supported:\n\n• **bold**, _italic_, \`inline code\`\n• \`\`\`code blocks\`\`\`\n• > block quotes\n• $x^2 + y^2 = z^2$ for inline LaTeX\n• $$\\int_0^\\infty f(x)\\,dx$$ for display math`}
              aria-label="Discussion content"
              className="w-full h-[400px] bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-4 rounded-lg border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-600 outline-none font-mono text-sm resize-y"
            />
          ) : null}

          {/* The Preview Tab */}
          {activeTab === 'preview' && (
            <div className="w-full h-[400px] overflow-y-auto bg-white dark:bg-slate-950 p-6 rounded-lg border border-slate-200 dark:border-slate-800">
              {/* We strictly enforce that content exists and is a string before rendering */}
              {content && typeof content === 'string' && content.trim().length > 0 ? (
                <MarkdownPreviewBoundary resetKey={content} rawContent={content}>
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm, remarkMath]} 
                    rehypePlugins={[[rehypeKatex, { throwOnError: false, strict: 'ignore' }]]}
                    components={MARKDOWN_COMPONENTS}
                    className="prose prose-slate dark:prose-invert max-w-none prose-pre:bg-slate-900 prose-pre:text-slate-50 prose-code:text-blue-600"
                  >
                    {content}
                  </ReactMarkdown>
                </MarkdownPreviewBoundary>
              ) : (
                <p className="text-slate-500 italic mt-4 text-center">
                  Nothing to preview. Start typing in the Write tab!
                </p>
              )}
            </div>
          )}
        </div>

        {/* ── Footer ──────────────────────────────────────────────── */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 bg-slate-50 dark:bg-slate-900/50 rounded-b-2xl">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Supports <span className="font-semibold">Markdown</span>,{' '}
            <span className="font-semibold">GFM tables &amp; checklists</span>, and{' '}
            <span className="font-semibold">LaTeX math</span> via KaTeX.
          </p>
          <div className="flex items-center gap-3 justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="px-5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handlePost}
              disabled={!isPostable}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold px-6 py-2 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 dark:focus-visible:ring-offset-slate-950"
            >
              Post Discussion
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
