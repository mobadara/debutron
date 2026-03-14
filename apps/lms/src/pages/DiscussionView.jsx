import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { 
  FiChevronLeft, FiShare2, FiCheck, FiMessageSquare, 
  FiPlayCircle, FiPauseCircle, FiStopCircle, FiCopy, FiFlag, FiPrinter 
} from 'react-icons/fi';
import 'katex/dist/katex.min.css';

function AudioControls({ id, text, readingId, isReadingPaused, onPlay, onPause, onStop }) {
  const isPlayingThis = readingId === id && !isReadingPaused;
  const isPausedOnThis = readingId === id && isReadingPaused;

  return (
    <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-full px-2 py-1 shadow-inner">
      {isPlayingThis ? (
        <button onClick={onPause} className="p-1.5 text-[#000080] dark:text-[#0D9488] hover:text-blue-800 transition-colors" title="Pause Reading">
          <FiPauseCircle size={18} />
        </button>
      ) : (
        <button onClick={() => onPlay(id, text)} className="p-1.5 text-slate-500 hover:text-[#000080] dark:hover:text-[#0D9488] transition-colors" title={isPausedOnThis ? "Resume Reading" : "Read Aloud"}>
          <FiPlayCircle size={18} />
        </button>
      )}
      {(isPlayingThis || isPausedOnThis) && (
        <button onClick={onStop} className="p-1.5 text-rose-500 hover:text-rose-700 transition-colors animate-in fade-in zoom-in duration-200" title="Stop Reading">
          <FiStopCircle size={18} />
        </button>
      )}
    </div>
  );
}

export default function DiscussionView() {
  const { postId } = useParams();
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [replyText, setReplyText] = useState('');

  // TTS State
  const [readingId, setReadingId] = useState(null);
  const [isReadingPaused, setIsReadingPaused] = useState(false);
  const [availableVoices, setAvailableVoices] = useState([]);

  const [post, setPost] = useState({
    id: postId,
    title: "Understanding the Multi-Head Attention Mechanism in Transformers",
    category: "Tech & Innovation",
    author: { name: "Dr. Sarah Lin", role: "Instructor", contributions: 342 },
    date: "March 12, 2026",
    content: `The multi-head attention mechanism is the core of modern LLMs. It allows the model to jointly attend to information from different representation subspaces at different positions.\n\nHere is the foundational mathematical definition:\n\n$$ \\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V $$\n\nNotice how the scaling factor $\\sqrt{d_k}$ prevents the dot products from growing too large in magnitude, which would push the softmax function into regions where it has extremely small gradients.`,
    tags: ["Deep Learning", "NLP", "Mathematics"],
    comments: [
      { id: 1, author: { name: "Alex Chen", role: "Student" }, content: "This makes so much sense now. Is $d_k$ always strictly the dimension of the key vectors?", date: "2 hours ago" }
    ]
  });

  useEffect(() => {
    const fetchVoices = () => {
      setAvailableVoices(window.speechSynthesis.getVoices());
    };
    
    fetchVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = fetchVoices;
    }

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  // --- Utility Functions ---

  const handleShareLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (err) {
      console.error('Failed to copy link: ', err);
    }
  };

  const handleCopyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleReport = (type) => {
    alert(`Flagged ${type} for review by campus moderation.`);
  };

  const handlePostComment = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newComment = {
      id: Date.now(),
      author: { name: "Muyiwa", role: "Student" },
      content: replyText,
      date: "Just now"
    };

    setPost(prev => ({ ...prev, comments: [...prev.comments, newComment] }));
    setReplyText('');
  };

  const formatMentions = (text) => text.replace(/(@\w+)/g, '**$1**');
  
  const commentMarkdownRules = { h1: 'p', h2: 'p', h3: 'p', h4: 'p', h5: 'p', h6: 'p' };

  const accessibleImageRenderer = {
    img: ({alt, src, title}) => (
      <img 
        src={src} 
        alt={alt || "User uploaded image without description"} 
        title={title} 
        className="rounded-lg max-w-full h-auto border border-slate-200 dark:border-slate-700 shadow-sm my-4"
        loading="lazy"
      />
    )
  };

  // --- Text-to-Speech Engine ---

  const cleanTextForSpeech = (text) => {
    return text
      .replace(/[#*_~`>]/g, '') 
      .replace(/\$\$(.*?)\$\$/g, ' math equation ') 
      .replace(/\$(.*?)\$/g, ' math variable '); 
  };

  const playTTS = (id, rawText) => {
    if (readingId === id && isReadingPaused) {
      window.speechSynthesis.resume();
      setIsReadingPaused(false);
      return;
    }

    window.speechSynthesis.cancel(); 
    const textToRead = cleanTextForSpeech(rawText);
    const utterance = new SpeechSynthesisUtterance(textToRead);
    
    utterance.rate = 0.85; 
    utterance.volume = 1.0; 
    utterance.pitch = 1.0; 

    const preferredVoices = [
      'Google UK English Female', 
      'Google US English', 
      'Microsoft Zira', 
      'Samantha',       
      'Karen',          
      'Victoria'        
    ];

    let selectedVoice = null;
    for (const name of preferredVoices) {
      selectedVoice = availableVoices.find(v => v.name.includes(name));
      if (selectedVoice) break;
    }

    if (!selectedVoice) {
      selectedVoice = availableVoices.find(v => 
        v.name.toLowerCase().includes('female') || 
        v.voiceURI.toLowerCase().includes('female')
      );
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onend = () => {
      setReadingId(null);
      setIsReadingPaused(false);
    };

    setReadingId(id);
    setIsReadingPaused(false);
    window.speechSynthesis.speak(utterance);
  };

  const pauseTTS = () => {
    window.speechSynthesis.pause();
    setIsReadingPaused(true);
  };

  const stopTTS = () => {
    window.speechSynthesis.cancel();
    setReadingId(null);
    setIsReadingPaused(false);
  };

  return (
    <div className="flex-1 w-full flex flex-col bg-slate-50 dark:bg-slate-950">
      
      {/* Dynamic Print Stylesheet to enforce Black/White printing regardless of Dark Mode */}
      <style>{`
        @media print {
          body, html, .dark { background-color: white !important; color: black !important; }
          .print-hide { display: none !important; }
          .prose, .prose * { color: black !important; }
          .prose pre { background-color: #f1f5f9 !important; border: 1px solid #cbd5e1 !important; }
          .prose code { color: #0f172a !important; }
          article, section { box-shadow: none !important; border: none !important; padding: 0 !important; margin-bottom: 2rem !important; }
        }
      `}</style>

      <div className="max-w-4xl mx-auto w-full p-6 lg:p-10 flex flex-col gap-8">
        
        <Link to="/forums/global" className="print-hide flex items-center gap-2 text-slate-500 hover:text-[#000080] dark:hover:text-[#0D9488] transition-colors font-medium w-fit">
          <FiChevronLeft size={20} />
          Back to Global Forum
        </Link>

        <article className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 lg:p-12 shadow-sm">
          
          <header className="pb-6 mb-6">
            <h1 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white leading-tight mb-6">
              {post.title}
            </h1>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                <div className="w-10 h-10 rounded-full bg-[#000080] dark:bg-[#0D9488] text-white flex items-center justify-center font-bold text-lg shadow-sm print-hide">
                  {post.author.name.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white">{post.author.name}</span>
                    {post.author.role === 'Instructor' && (
                      <span className="bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 px-2 py-0.5 text-[10px] rounded uppercase tracking-wider font-bold shadow-sm">Instructor</span>
                    )}
                  </div>
                  <span>Published {post.date} &middot; {post.category}</span>
                </div>
              </div>

              {/* Action Bar (Hidden on Print) */}
              <div className="print-hide flex items-center gap-1 sm:gap-2 border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-100 dark:border-slate-800">
                <AudioControls
                  id="post"
                  text={post.content}
                  readingId={readingId}
                  isReadingPaused={isReadingPaused}
                  onPlay={playTTS}
                  onPause={pauseTTS}
                  onStop={stopTTS}
                />
                <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
                
                <button onClick={() => window.print()} className="p-2 text-slate-500 hover:text-[#000080] dark:hover:text-[#0D9488] transition-colors" title="Print Academic Document">
                  <FiPrinter size={18} />
                </button>
                <button onClick={() => handleCopyText(post.content)} className="p-2 text-slate-500 hover:text-[#000080] dark:hover:text-[#0D9488] transition-colors" title="Copy Content">
                  {copiedText ? <FiCheck className="text-emerald-600" /> : <FiCopy size={18} />}
                </button>
                <button onClick={handleShareLink} className="p-2 text-slate-500 hover:text-[#000080] dark:hover:text-[#0D9488] transition-colors" title="Copy Permalink">
                  {copiedLink ? <FiCheck className="text-emerald-600" /> : <FiShare2 size={18} />}
                </button>
                <button onClick={() => handleReport('Post')} className="p-2 text-slate-400 hover:text-rose-500 transition-colors" title="Report Post">
                  <FiFlag size={18} />
                </button>
              </div>
            </div>
          </header>

          <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-pre:bg-slate-900 prose-pre:text-slate-50 prose-code:text-[#0D9488] marker:text-[#0D9488] leading-relaxed">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm, remarkMath]} 
              rehypePlugins={[rehypeKatex]}
              components={accessibleImageRenderer}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>

        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-2">
            <FiMessageSquare className="print-hide" />
            Academic Discourse ({post.comments.length})
          </h2>

          <div className="space-y-8 mb-10">
            {post.comments.map(comment => (
              <div key={comment.id} className="flex gap-4 border-b border-slate-100 dark:border-slate-800/50 pb-6 last:border-0 last:pb-0">
                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex-shrink-0 flex items-center justify-center font-bold text-slate-500 shadow-inner print-hide">
                  {comment.author.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-baseline gap-2">
                      <span className="font-bold text-slate-900 dark:text-white">{comment.author.name}</span>
                      {comment.author.role === 'Instructor' && (
                        <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-0.5 text-[10px] rounded uppercase tracking-wider font-bold">Instructor</span>
                      )}
                      <span className="text-xs text-slate-500">{comment.date}</span>
                    </div>
                    
                    <div className="flex items-center gap-1 print-hide">
                      <AudioControls
                        id={`comment-${comment.id}`}
                        text={comment.content}
                        readingId={readingId}
                        isReadingPaused={isReadingPaused}
                        onPlay={playTTS}
                        onPause={pauseTTS}
                        onStop={stopTTS}
                      />
                      <button onClick={() => handleReport('Comment')} className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors ml-1" title="Report Comment">
                        <FiFlag size={14} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="prose prose-sm prose-slate dark:prose-invert max-w-none prose-pre:bg-slate-900 prose-pre:text-slate-50 prose-code:text-[#0D9488] marker:text-[#0D9488]">
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm, remarkMath]} 
                      rehypePlugins={[rehypeKatex]}
                      components={{...commentMarkdownRules, ...accessibleImageRenderer}}
                    >
                      {formatMentions(comment.content)}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Hidden entirely when printing */}
          <div className="border-t border-slate-200 dark:border-slate-800 pt-8 print-hide">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
              Contribute to the discussion
            </label>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write your response... Supports markdown, code blocks, and $$ LaTeX $$. Use @username to notify a scholar."
              className="w-full font-mono text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg p-4 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-[#0D9488] outline-none min-h-[120px] resize-y"
            ></textarea>
            <div className="flex justify-end mt-4">
              <button 
                type="button"
                onClick={handlePostComment}
                disabled={replyText.trim().length === 0}
                className={`px-6 py-2 font-bold rounded-lg transition-colors ${
                  replyText.trim().length === 0 
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed dark:bg-slate-800 dark:text-slate-600' 
                    : 'bg-[#000080] hover:bg-blue-800 dark:bg-[#0D9488] dark:hover:bg-teal-500 text-white'
                }`}
              >
                Post Contribution
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}