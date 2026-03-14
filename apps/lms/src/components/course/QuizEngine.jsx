import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  FiClock,
  FiChevronRight,
  FiChevronLeft,
  FiAward,
  FiShield,
  FiCameraOff,
  FiZoomIn,
  FiZoomOut
} from 'react-icons/fi';

export default function QuizEngine({ quizData, onComplete, onStart, onTerminate }) {
  const [status, setStatus] = useState('start'); 
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(quizData.durationInSeconds);
  const [warnings, setWarnings] = useState(0);

  // Accessibility State: Independent Text Scaling
  const [textScale, setTextScale] = useState(1); // 1 = 100%, 1.2 = 120%, etc.

  // Modal State
  const [showWarningModal, setShowWarningModal] = useState(false);
  
  // Camera & Audio State
  const videoRef = useRef(null);
  const [cameraError, setCameraError] = useState(false);
  const streamRef = useRef(null);

  const MAX_WARNINGS = 3;

  const playWarningSound = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(400, ctx.currentTime); 
      oscillator.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.5);
      
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.start();
      oscillator.stop(ctx.currentTime + 0.5);
    } catch {
      console.log("Audio API not supported.");
    }
  };

  const submitQuiz = useCallback(() => {
    if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
    let calculatedScore = 0;
    quizData.questions.forEach(q => {
      if (q.type === 'mcq' && answers[q.id] === q.correctAnswer) {
        calculatedScore += q.points;
      }
    });
    setStatus('completed');
    if (onComplete) onComplete(calculatedScore);
  }, [answers, onComplete, quizData.questions]);

  // --- Audio & Webcam Initialization Hook ---
  useEffect(() => {
    if (status === 'in-progress' && quizData.isProctored) {
      // We now request BOTH video and audio for the post-exam AI evaluation
      navigator.mediaDevices.getUserMedia({ 
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: "user" },
        audio: true 
      })
      .then((stream) => {
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          // Note: We mute the video element so the student doesn't hear themselves echoing,
          // but the underlying stream STILL contains the audio track for recording.
        }
      })
      .catch((err) => {
        console.error("Camera/Mic access denied:", err);
        setCameraError(true);
      });
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [status, quizData.isProctored, onTerminate]);

  // --- Anti-Cheat Tab Proctoring Hook ---
  useEffect(() => {
    if (status !== 'in-progress' || !quizData.isProctored) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setWarnings(prev => {
          const newWarnings = prev + 1;
          if (newWarnings >= MAX_WARNINGS) {
            setStatus('terminated');
            if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
            if (onTerminate) onTerminate();
          } else {
            playWarningSound();
            setShowWarningModal(true);
          }
          return newWarnings;
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [status, quizData.isProctored, onTerminate]);

  // --- Timer Hook ---
  useEffect(() => {
    if (status !== 'in-progress') return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          submitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [status, submitQuiz]);

  // --- Handlers ---
  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const currentQuestion = quizData.questions[currentQuestionIndex];
  const isQuestionAttempted = (question) => {
    const response = answers[question.id];

    if (question.type === 'short-answer') {
      return typeof response === 'string' && response.trim().length > 0;
    }

    return response !== undefined && response !== null && response !== '';
  };

  // --- Render States ---

  if (status === 'start') {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in duration-300">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${quizData.isProctored ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-500' : 'bg-blue-100 text-[#000080] dark:bg-blue-900/30 dark:text-blue-400'}`}>
          {quizData.isProctored ? <FiShield size={40} /> : <FiAward size={40} />}
        </div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{quizData.title}</h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-lg mb-8 leading-relaxed">
          {quizData.description}
        </p>
        <button 
          type="button"
          onClick={() => {
            if (onStart) onStart();
            setStatus('in-progress');
          }}
          className="px-8 py-3 bg-[#000080] hover:bg-blue-800 dark:bg-[#0D9488] dark:hover:bg-teal-500 text-white font-bold rounded-lg transition-colors shadow-lg"
        >
          Begin Assessment
        </button>
      </div>
    );
  }

  if (status === 'terminated') return ( /* Existing Terminated UI */ <div className="p-20 text-center"><h2 className="text-3xl font-bold text-rose-500 mb-4">Exam Terminated</h2><p className="text-slate-500">You violated the tab policy.</p></div> );
  if (status === 'completed') return ( /* Existing Completed UI */ <div className="p-20 text-center"><h2 className="text-3xl font-bold text-emerald-500 mb-4">Exam Submitted</h2><p className="text-slate-500">Your video is being processed.</p></div> );

  // --- In Progress Render (Side-by-Side Layout) ---
  return (
    <div className="relative flex flex-col md:flex-row h-[82vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden animate-in fade-in duration-300">
      
      {showWarningModal && ( /* Modal logic remains same */
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white border-2 border-rose-500 rounded-xl p-8 max-w-md w-full text-center">
             <h3 className="text-2xl font-black mb-2">Integrity Warning</h3>
             <button type="button" onClick={() => setShowWarningModal(false)} className="w-full py-3 bg-rose-600 text-white font-bold rounded-lg">Return to Exam</button>
          </div>
        </div>
      )}

      {/* --- Left Column: Fixed Proctoring Area --- */}
      {quizData.isProctored && (
        <div className="w-full md:w-[28rem] lg:w-[34rem] flex-shrink-0 bg-slate-100 dark:bg-slate-950 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 flex flex-col">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-200/50 dark:bg-slate-900">
            <span className="font-bold text-slate-700 dark:text-slate-300 text-sm uppercase tracking-wider">Proctoring Active</span>
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-500 animate-pulse">
              <div className="w-2 h-2 rounded-full bg-rose-500"></div> REC
            </div>
          </div>
          
          <div className="p-4 flex-1 flex flex-col">
            <div className="w-full aspect-video bg-black rounded-lg overflow-hidden border-2 border-slate-300 dark:border-slate-700 shadow-inner relative">
              {cameraError ? (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                  <FiCameraOff size={24} className="mb-2" />
                  <span className="text-xs font-bold text-center px-2">Camera access denied.</span>
                </div>
              ) : (
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover transform -scale-x-100" />
              )}
            </div>

            <div className="mt-6 bg-blue-50 dark:bg-teal-900/20 border border-blue-200 dark:border-teal-900/50 rounded-lg p-4">
              <h4 className="flex items-center gap-2 font-bold text-[#000080] dark:text-[#0D9488] mb-2 text-sm">
                <FiShield /> Session Secured
              </h4>
              <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-2">
                Warnings: {warnings}/{MAX_WARNINGS}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Your video and audio feed are actively being recorded. Upon submission, this footage will be reviewed by our AI integrity model to ensure academic fairness.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* --- Right Column: Scalable Quiz Content --- */}
      <div className="flex-1 flex flex-col relative z-10 bg-white dark:bg-slate-900 h-full">
        
        {/* Header Bar with Text Scaling Controls */}
        <div className="flex flex-wrap justify-between items-center p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
          <div className="flex items-center gap-4">
            <span className="font-bold text-slate-700 dark:text-slate-300">
              Q{currentQuestionIndex + 1} of {quizData.questions.length}
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Text Zoom Toolbar */}
            <div className="flex items-center bg-slate-200 dark:bg-slate-800 rounded-lg p-1">
              <button 
                onClick={() => setTextScale(prev => Math.max(1, prev - 0.2))} 
                className="p-1.5 text-slate-600 dark:text-slate-400 hover:text-[#000080] dark:hover:text-white transition-colors disabled:opacity-30"
                disabled={textScale <= 1} title="Decrease Text Size"
              >
                <FiZoomOut size={16} />
              </button>
              <span className="text-xs font-bold px-2 text-slate-500 select-none">{Math.round(textScale * 100)}%</span>
              <button 
                onClick={() => setTextScale(prev => Math.min(2.5, prev + 0.2))} 
                className="p-1.5 text-slate-600 dark:text-slate-400 hover:text-[#000080] dark:hover:text-white transition-colors disabled:opacity-30"
                disabled={textScale >= 2.5} title="Increase Text Size"
              >
                <FiZoomIn size={16} />
              </button>
            </div>

            <div className={`flex items-center gap-2 font-mono font-bold px-3 py-1.5 rounded-lg ${timeLeft < 60 ? 'bg-rose-100 text-rose-700 animate-pulse' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>
              <FiClock /> {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        {/* Question Body (Text size bound to state) */}
        <div className="flex-1 p-8 overflow-y-auto pb-24" style={{ fontSize: `${textScale}rem` }}>
          <div className="max-w-4xl mx-auto">
            <span className="text-[0.7em] font-bold uppercase tracking-wider text-slate-400 mb-2 block">
              {currentQuestion.type === 'mcq' ? `Multiple Choice (${currentQuestion.points} pts)` : `Short Answer (${currentQuestion.points} pts)`}
            </span>
            <h3 className="font-bold text-slate-900 dark:text-white mb-8 leading-relaxed" style={{ fontSize: '1.25em' }}>
              {currentQuestion.text}
            </h3>

            {currentQuestion.type === 'mcq' && (
              <div className="space-y-4">
                {currentQuestion.options.map((option, idx) => (
                  <label 
                    key={idx} 
                    className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      answers[currentQuestion.id] === option 
                        ? 'border-[#000080] bg-blue-50 dark:border-[#0D9488] dark:bg-teal-900/20 shadow-md' 
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <input 
                      type="radio" name={`q-${currentQuestion.id}`} value={option} checked={answers[currentQuestion.id] === option}
                      onChange={() => handleAnswer(currentQuestion.id, option)}
                      className="mt-1 w-5 h-5 flex-shrink-0 text-[#000080] dark:text-[#0D9488] focus:ring-[#000080]"
                    />
                    <span className="text-slate-700 dark:text-slate-300 font-medium leading-tight">{option}</span>
                  </label>
                ))}
              </div>
            )}

            {currentQuestion.type === 'short-answer' && (
              <textarea
                value={answers[currentQuestion.id] || ''}
                onChange={(event) => handleAnswer(currentQuestion.id, event.target.value)}
                onKeyDown={(event) => {
                  event.stopPropagation();
                }}
                placeholder="Type your answer here..."
                className="w-full min-h-56 bg-slate-50 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-700 rounded-xl p-4 text-slate-900 dark:text-slate-100 focus:border-[#000080] dark:focus:border-[#0D9488] outline-none resize-y transition-colors"
              />
            )}
          </div>
        </div>

        {/* Footer Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between gap-4 z-30">
          <button type="button" onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))} disabled={currentQuestionIndex === 0} className="flex-shrink-0 flex items-center gap-2 px-4 py-2 text-slate-600 font-bold hover:bg-slate-100 rounded-lg disabled:opacity-50">
            <FiChevronLeft /> Previous
          </button>

          <div className="hidden md:flex flex-1 items-center justify-start gap-2 overflow-x-auto px-2 py-1 min-w-0">
            {quizData.questions.map((question, index) => {
              const attempted = isQuestionAttempted(question);
              const isActiveQuestion = index === currentQuestionIndex;

              return (
                <button
                  type="button"
                  key={question.id}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`relative w-9 h-9 rounded-lg text-xs font-bold border transition-colors ${
                    isActiveQuestion
                      ? 'bg-[#000080] text-white border-[#000080] dark:bg-[#0D9488] dark:border-[#0D9488]'
                      : attempted
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800'
                        : 'bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
                  }`}
                  title={attempted ? `Question ${index + 1} attempted` : `Question ${index + 1} not attempted`}
                >
                  {index + 1}
                  <span className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full ${attempted ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                </button>
              );
            })}
          </div>

          {currentQuestionIndex === quizData.questions.length - 1 ? (
            <button type="button" onClick={submitQuiz} className="flex-shrink-0 px-8 py-2 bg-[#000080] dark:bg-[#0D9488] text-white font-bold rounded-lg shadow-md">Submit Assessment</button>
          ) : (
            <button type="button" onClick={() => setCurrentQuestionIndex(prev => Math.min(quizData.questions.length - 1, prev + 1))} className="flex-shrink-0 flex items-center gap-2 px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-lg shadow-md">
              Next <FiChevronRight />
            </button>
          )}
        </div>
      </div>

    </div>
  );
}