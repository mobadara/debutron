import React from 'react'
import { FiAlertTriangle } from 'react-icons/fi'

export default function QuizSubmitConfirmModal({
  isOpen,
  onCancel,
  onConfirm,
}) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 flex items-center justify-center">
            <FiAlertTriangle size={20} />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">Submit Assessment?</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">You are about to finalize this attempt. You cannot edit answers after submission.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:justify-end mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2.5 rounded-lg font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
          >
            Continue Editing
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2.5 rounded-lg font-bold text-white bg-rose-600 hover:bg-rose-700"
          >
            Yes, Submit
          </button>
        </div>
      </div>
    </div>
  )
}
