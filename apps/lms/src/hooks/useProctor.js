import { useEffect, useRef } from 'react';

/**
 * A strict proctoring hook that monitors tab visibility and window focus.
 * * @param {boolean} isActive - Whether the quiz is currently running.
 * @param {function} onViolation - Callback triggered when cheating is detected.
 */
export const useProctor = (isActive, onViolation) => {
  // Use a ref to ensure we always call the latest version of the callback
  const violationCallback = useRef(onViolation);

  useEffect(() => {
    violationCallback.current = onViolation;
  }, [onViolation]);

  useEffect(() => {
    // If proctoring is not active (e.g., they haven't started the quiz yet), do nothing.
    if (!isActive) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        violationCallback.current('tab_switched');
      }
    };

    const handleWindowBlur = () => {
      violationCallback.current('window_blurred');
    };

    // Attach the event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);

    // Cleanup function: remove listeners when the component unmounts or proctoring stops
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [isActive]);
};