import React from 'react'
import { FiAlertTriangle, FiShield } from 'react-icons/fi'

export default function QuizInstructionModal({
  isOpen,
  isProctored,
  onCancel,
  onConfirm,
}) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl p-6 lg:p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isProctored ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'}`}>
            {isProctored ? <FiShield size={22} /> : <FiAlertTriangle size={22} />}
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">Assessment Instructions</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Review these rules before starting the test session.</p>
          </div>
        </div>

        <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300 mb-8 list-disc pl-5">
          <li>Ensure you have a stable internet connection and enough battery power.</li>
          <li>Do not refresh or close the browser tab during the assessment.</li>
          <li>Answers are saved in-session, but submission ends the active attempt.</li>
          {isProctored && (
            <>
              <li>Camera and microphone access are required throughout this proctored test.</li>
              <li>Leaving the tab repeatedly can automatically terminate the assessment.</li>
            </>
          )}
        </ul>

        <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 rounded-lg font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-5 py-2.5 rounded-lg font-bold text-white bg-[#000080] hover:bg-blue-800 dark:bg-[#0D9488] dark:hover:bg-teal-500"
          >
            Start Test
          </button>
        </div>
      </div>
    </div>
  )
}
