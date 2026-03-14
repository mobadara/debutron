import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { 
  FiClock,
  FiChevronRight,
  FiChevronLeft,
  FiAward,
  FiShield,
  FiCameraOff,
  FiZoomIn,
  FiZoomOut,
  FiSmartphone,
  FiWifi,
  FiCheckCircle,
  FiAlertTriangle
} from 'react-icons/fi';
import QuizInstructionModal from './QuizInstructionModal';
import QuizSubmitConfirmModal from './QuizSubmitConfirmModal';

export default function QuizEngine({ quizData, onComplete, onStart, onTerminate }) {
  const [status, setStatus] = useState('start'); 
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(quizData.durationInSeconds);
  const [warnings, setWarnings] = useState(0);

  // Accessibility State: Independent Text Scaling
  const [textScale, setTextScale] = useState(1); 

  // Modal State
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showInstructionModal, setShowInstructionModal] = useState(false);
  const [showSubmitConfirmModal, setShowSubmitConfirmModal] = useState(false);
  
  // Camera & Audio State
  const videoRef = useRef(null);
  const mobileVideoRef = useRef(null); // Ref for the second paired desk camera
  const [cameraError, setCameraError] = useState(false);
  const streamRef = useRef(null);
  const mobileStreamRef = useRef(null);

  // Mobile Pairing State
  const [isMobilePaired, setIsMobilePaired] = useState(false);
  const [releaseStatus, setReleaseStatus] = useState({ released: false, reason: '' });

  const isMobileDevice = useMemo(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    const userAgent = navigator.userAgent || navigator.vendor || window.opera || '';
    const mobileUaDetected = /android|iphone|ipad|ipod|mobile|iemobile|blackberry|opera mini/i.test(userAgent);
    const coarsePointerDetected = window.matchMedia?.('(pointer: coarse)')?.matches;
    const smallViewport = window.innerWidth < 1024;

    return Boolean(mobileUaDetected || (coarsePointerDetected && smallViewport));
  }, []);

  const qrPattern = useMemo(
    () => [
      1, 1, 1, 0,
      1, 0, 1, 1,
      1, 1, 0, 1,
      0, 1, 1, 1,
    ],
    []
  );

  const MAX_WARNINGS = 3;

  const releaseMediaStreams = useCallback((options = {}) => {
    const { announce = false, reason = '' } = options;
    let hadActiveStream = false;

    if (streamRef.current) {
      hadActiveStream = true;
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (mobileStreamRef.current) {
      hadActiveStream = true;
      mobileStreamRef.current.getTracks().forEach((track) => track.stop());
      mobileStreamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    if (mobileVideoRef.current) {
      mobileVideoRef.current.srcObject = null;
    }

    setIsMobilePaired(false);
    if (announce && hadActiveStream) {
      setReleaseStatus({ released: true, reason });
    }
  }, []);

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
    releaseMediaStreams({ announce: true, reason: 'submitted' });
    let calculatedScore = 0;
    quizData.questions.forEach(q => {
      if (q.type === 'mcq' && answers[q.id] === q.correctAnswer) {
        calculatedScore += q.points;
      }
    });
    setStatus('completed');
    if (onComplete) onComplete(calculatedScore);
  }, [answers, onComplete, quizData.questions, releaseMediaStreams]);

  // --- Audio & Webcam Initialization Hook ---
  useEffect(() => {
    if (status === 'in-progress' && quizData.isProctored) {
      navigator.mediaDevices.getUserMedia({ 
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: "user" },
        audio: true 
      })
      .then((stream) => {
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        // If mobile is already paired (e.g. simulated), feed the stream there too
        if (isMobilePaired && mobileVideoRef.current) {
          mobileVideoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("Camera/Mic access denied:", err);
        setCameraError(true);
      });
    }

    return () => releaseMediaStreams();
  }, [status, quizData.isProctored, isMobilePaired, releaseMediaStreams]);

  // --- Anti-Cheat Tab Proctoring Hook ---
  useEffect(() => {
    if (status !== 'in-progress' || !quizData.isProctored) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setWarnings(prev => {
          const newWarnings = prev + 1;
          if (newWarnings >= MAX_WARNINGS) {
            setStatus('terminated');
            releaseMediaStreams({ announce: true, reason: 'terminated' });
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
  }, [status, quizData.isProctored, onTerminate, releaseMediaStreams]);

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

  const handleMobilePairing = async () => {
    setIsMobilePaired(true);

    try {
      const mobileStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: { ideal: 'environment' },
        },
        audio: false,
      });

      mobileStreamRef.current = mobileStream;

      if (mobileVideoRef.current) {
        mobileVideoRef.current.srcObject = mobileStream;
      }

      return;
    } catch {
      // Fallback to cloning primary stream for simulation on single-camera devices.
    }

    if (streamRef.current && mobileVideoRef.current) {
      const fallbackStream = streamRef.current.clone();
      mobileStreamRef.current = fallbackStream;
      mobileVideoRef.current.srcObject = fallbackStream;
    }
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
        <QuizInstructionModal
          isOpen={showInstructionModal}
          isProctored={quizData.isProctored}
          onCancel={() => setShowInstructionModal(false)}
          onConfirm={() => {
            setShowInstructionModal(false);
            setReleaseStatus({ released: false, reason: '' });
            if (onStart) onStart();
            setStatus('in-progress');
          }}
        />

        <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${quizData.isProctored ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-500' : 'bg-blue-100 text-[#000080] dark:bg-blue-900/30 dark:text-blue-400'}`}>
          {quizData.isProctored ? <FiShield size={40} /> : <FiAward size={40} />}
        </div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{quizData.title}</h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-lg mb-8 leading-relaxed">
          {quizData.description}
        </p>

        {quizData.isProctored && isMobileDevice && (
          <div className="mb-6 max-w-lg rounded-xl border border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-900/40 p-4 text-left">
            <p className="text-sm font-bold text-amber-800 dark:text-amber-300 flex items-center gap-2">
              <FiAlertTriangle /> Device Not Allowed
            </p>
            <p className="text-sm text-amber-700 dark:text-amber-200 mt-1">
              Proctored assessments require a laptop or desktop browser. Please switch device to continue.
            </p>
          </div>
        )}

        <button 
          type="button"
          onClick={() => {
            if (quizData.isProctored && isMobileDevice) {
              return;
            }

            setShowInstructionModal(true);
          }}
          disabled={quizData.isProctored && isMobileDevice}
          className={`px-8 py-3 text-white font-bold rounded-lg transition-colors shadow-lg ${quizData.isProctored && isMobileDevice ? 'bg-slate-400 dark:bg-slate-600 cursor-not-allowed opacity-80' : 'bg-[#000080] hover:bg-blue-800 dark:bg-[#0D9488] dark:hover:bg-teal-500'}`}
        >
          Begin Assessment
        </button>
      </div>
    );
  }

  if (status === 'terminated') return (
    <div className="p-20 text-center">
      <h2 className="text-3xl font-bold text-rose-500 mb-4">Exam Terminated</h2>
      <p className="text-slate-500">You violated the tab policy.</p>
      {releaseStatus.released && (
        <div className="mt-6 inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-900/40 dark:text-emerald-300">
          <FiCheckCircle /> Camera and microphone have been released for other applications.
        </div>
      )}
    </div>
  );

  if (status === 'completed') return (
    <div className="p-20 text-center">
      <h2 className="text-3xl font-bold text-emerald-500 mb-4">Exam Submitted</h2>
      <p className="text-slate-500">Your video is being processed.</p>
      {releaseStatus.released && (
        <div className="mt-6 inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-900/40 dark:text-emerald-300">
          <FiCheckCircle /> Camera and microphone have been released for other applications.
        </div>
      )}
    </div>
  );

  // --- In Progress Render (Side-by-Side Layout) ---
  return (
    <div className="relative flex flex-col md:flex-row h-[82vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden animate-in fade-in duration-300">
      
      {showWarningModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white border-2 border-rose-500 rounded-xl p-8 max-w-md w-full text-center shadow-2xl">
             <h3 className="text-2xl font-black mb-2 text-slate-900">Integrity Warning</h3>
             <p className="text-slate-600 mb-6">You left the exam environment. This is warning <strong>{warnings} of {MAX_WARNINGS}</strong>.</p>
             <button type="button" onClick={() => setShowWarningModal(false)} className="w-full py-3 bg-rose-600 text-white font-bold rounded-lg">Return to Exam</button>
          </div>
        </div>
      )}

      <QuizSubmitConfirmModal
        isOpen={showSubmitConfirmModal}
        onCancel={() => setShowSubmitConfirmModal(false)}
        onConfirm={() => {
          setShowSubmitConfirmModal(false);
          submitQuiz();
        }}
      />

      {/* --- Left Column: Dual Camera Proctoring Area --- */}
      {quizData.isProctored && (
        <div className="w-full md:w-[28rem] lg:w-[34rem] flex-shrink-0 bg-slate-100 dark:bg-slate-950 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 flex flex-col overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
          
          <div className="sticky top-0 z-20 p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-200/90 dark:bg-slate-900/90 backdrop-blur-sm">
            <span className="font-bold text-slate-700 dark:text-slate-300 text-sm uppercase tracking-wider">360° Proctoring Active</span>
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-500 animate-pulse">
              <div className="w-2 h-2 rounded-full bg-rose-500"></div> REC
            </div>
          </div>
          
          <div className="p-4 flex-1 flex flex-col gap-6 pb-10">
            
            {/* Feed 1: Laptop Front Camera */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Face View (Laptop Webcam)</span>
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
            </div>

            {/* Feed 2: Mobile Paired World Camera */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Desk View (Mobile Pairing)</span>
              
              {!isMobilePaired ? (
                // State 1: Awaiting Mobile Connection (QR Code Simulation)
                <div className="w-full aspect-video bg-white dark:bg-slate-900 border-2 border-dashed border-[#000080]/30 dark:border-[#0D9488]/30 rounded-lg flex flex-col items-center justify-center p-6 text-center shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <FiSmartphone size={100} />
                  </div>
                  <div className="w-24 h-24 bg-white border border-slate-200 rounded shadow-sm mb-4 p-2 flex flex-wrap gap-1 content-start relative z-10">
                    {/* Mock QR Pattern */}
                    {qrPattern.map((cell, i) => (
                      <div key={i} className={`w-[20%] h-[20%] ${cell ? 'bg-slate-900' : 'bg-transparent'}`}></div>
                    ))}
                  </div>
                  <h4 className="font-bold text-[#000080] dark:text-[#0D9488] mb-1 relative z-10">Awaiting World Camera</h4>
                  <p className="text-xs text-slate-500 mb-4 max-w-[200px] relative z-10">Scan this QR code with your smartphone and prop it up to capture your desk.</p>
                  
                  {/* Development Override Button to mock successful pairing */}
                  <button 
                    type="button"
                    onClick={handleMobilePairing}
                    className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 px-3 py-1 rounded-full font-bold uppercase tracking-wider hover:bg-slate-200 transition-colors relative z-10"
                  >
                    Simulate Connection
                  </button>
                </div>
              ) : (
                // State 2: Mobile Connected!
                <div className="w-full aspect-video bg-black rounded-lg overflow-hidden border-2 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)] relative group">
                  <video ref={mobileVideoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-emerald-500 text-white px-2 py-1 rounded text-[10px] font-bold tracking-wider uppercase shadow-md">
                    <FiWifi size={12} /> Paired
                  </div>
                </div>
              )}
            </div>

            {/* Status Information Panel */}
            <div className="bg-blue-50 dark:bg-teal-900/20 border border-blue-200 dark:border-teal-900/50 rounded-lg p-4">
              <h4 className="flex items-center gap-2 font-bold text-[#000080] dark:text-[#0D9488] mb-2 text-sm">
                <FiShield /> Session Secured
              </h4>
              <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-2">
                Warnings: {warnings}/{MAX_WARNINGS}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Your primary webcam and mobile desk view are streaming securely. Ensure both your face and your hands remain visible within the frames.
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

        {/* Question Body */}
        <div className="flex-1 p-8 overflow-y-auto pb-24" style={{ fontSize: `${textScale}rem` }}>
          <div className="max-w-4xl mx-auto">
            <span className="text-[0.7em] font-bold uppercase tracking-wider text-slate-400 mb-2 block">
              {currentQuestion.type === 'mcq' ? `Multiple Choice (${currentQuestion.points} pts)` : `Written Response (${currentQuestion.points} pts)`}
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
                onKeyDown={(event) => event.stopPropagation()}
                placeholder="Type your answer here..."
                className="w-full min-h-[200px] bg-slate-50 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-700 rounded-xl p-4 text-slate-900 dark:text-slate-100 focus:border-[#000080] dark:focus:border-[#0D9488] outline-none resize-y transition-colors"
                style={{ fontSize: '1em' }}
              />
            )}
          </div>
        </div>

        {/* Footer Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between gap-4 z-30 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)]">
          <button type="button" onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))} disabled={currentQuestionIndex === 0} className="flex-shrink-0 flex items-center gap-2 px-4 py-2 text-slate-600 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg disabled:opacity-50 transition-colors">
            <FiChevronLeft /> Previous
          </button>

          {/* Nav Grid */}
          <div className="hidden md:flex flex-1 items-center justify-start gap-2 overflow-x-auto px-2 py-1 min-w-0" style={{ scrollbarWidth: 'none' }}>
            {quizData.questions.map((question, index) => {
              const attempted = isQuestionAttempted(question);
              const isActiveQuestion = index === currentQuestionIndex;

              return (
                <button
                  type="button"
                  key={question.id}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`flex-shrink-0 relative w-10 h-10 rounded-lg text-sm font-bold border transition-colors ${
                    isActiveQuestion
                      ? 'bg-[#000080] text-white border-[#000080] dark:bg-[#0D9488] dark:border-[#0D9488] shadow-md'
                      : attempted
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800'
                        : 'bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
                  }`}
                  title={attempted ? `Question ${index + 1} attempted` : `Question ${index + 1} not attempted`}
                >
                  {index + 1}
                  {attempted && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900"></span>}
                </button>
              );
            })}
          </div>

          {currentQuestionIndex === quizData.questions.length - 1 ? (
            <button type="button" onClick={() => setShowSubmitConfirmModal(true)} className="flex-shrink-0 px-8 py-2.5 bg-[#000080] dark:bg-[#0D9488] hover:bg-blue-800 text-white font-bold rounded-lg shadow-md transition-colors">Submit Assessment</button>
          ) : (
            <button type="button" onClick={() => setCurrentQuestionIndex(prev => Math.min(quizData.questions.length - 1, prev + 1))} className="flex-shrink-0 flex items-center gap-2 px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-lg shadow-md transition-colors hover:opacity-90">
              Next <FiChevronRight />
            </button>
          )}
        </div>
      </div>

    </div>
  );
}