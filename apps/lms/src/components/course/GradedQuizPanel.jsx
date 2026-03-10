import { useCallback, useState } from 'react'
import useProctor from '../../hooks/useProctor'

function GradedQuizPanel() {
  const [hasStarted, setHasStarted] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [violationReason, setViolationReason] = useState('')

  const handleViolation = useCallback((reason) => {
    if (!hasStarted || isSubmitted) {
      return
    }

    setViolationReason(reason)
    setIsSubmitted(true)
    setHasStarted(false)
  }, [hasStarted, isSubmitted])

  useProctor(handleViolation, hasStarted && !isSubmitted)

  const handleStart = () => {
    setViolationReason('')
    setIsSubmitted(false)
    setHasStarted(true)
  }

  const handleSubmit = () => {
    setIsSubmitted(true)
    setHasStarted(false)
  }

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-slate-900">Graded Quiz</h2>

      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
        Warning: This quiz is strictly proctored. Leaving this tab will result in automatic submission.
      </div>

      {!hasStarted && !isSubmitted ? (
        <button
          type="button"
          onClick={handleStart}
          className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
        >
          Start Graded Quiz
        </button>
      ) : null}

      {hasStarted ? (
        <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-sm font-medium text-slate-800">Quiz in progress (proctoring active)</p>
          <div className="space-y-3 text-sm text-slate-700">
            <p>1. Which option best describes ethical model governance?</p>
            <p>2. What is one mitigation for biased training data?</p>
            <p>3. Explain why human oversight is required in critical systems.</p>
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Submit Quiz
          </button>
        </div>
      ) : null}

      {isSubmitted ? (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
          {violationReason
            ? `Quiz was auto-submitted due to proctoring violation: ${violationReason}.`
            : 'Quiz submitted successfully.'}
        </div>
      ) : null}
    </section>
  )
}

export default GradedQuizPanel