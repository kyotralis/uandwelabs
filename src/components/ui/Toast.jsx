import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react'

/**
 * Global Toast Dispatcher
 * Can be called from any component or utility without prop drilling!
 *
 * @example
 * showToast('Meeting link copied!', 'success')
 * showToast('Please check your input', 'error')
 */
export function showToast(message, type = 'success', duration = 3200) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('uandwe:toast', {
        detail: {
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          message,
          type,
          duration,
        },
      })
    )
  }
}

/**
 * Toast Container (Mount once in App.jsx)
 * Renders sleek, modern glass pill notifications at bottom-center of the viewport.
 */
export default function ToastContainer() {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    const handleAddToast = (e) => {
      const toast = e.detail
      if (!toast || !toast.message) return

      setToasts((prev) => [...prev.slice(-2), toast]) // Keep maximum 3 toasts at once

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id))
      }, toast.duration || 3200)
    }

    window.addEventListener('uandwe:toast', handleAddToast)
    return () => window.removeEventListener('uandwe:toast', handleAddToast)
  }, [])

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <aside
      aria-label="Notification center"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none flex flex-col items-center gap-2 max-w-[90vw] sm:max-w-md w-full"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => {
          const isSuccess = toast.type === 'success'
          const isError = toast.type === 'error'

          return (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 24, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.94 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto flex items-center justify-between gap-3 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-neutral-950/90 text-white backdrop-blur-2xl border border-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.5),0_0_1px_rgba(255,255,255,0.4)] text-xs sm:text-sm font-sans"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {isSuccess && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                )}
                {isError && (
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                )}
                {!isSuccess && !isError && (
                  <Info className="w-4 h-4 text-neutral-300 shrink-0" />
                )}
                <span className="font-normal text-neutral-100 truncate">
                  {toast.message}
                </span>
              </div>

              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="w-5 h-5 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors shrink-0 ml-1 cursor-pointer"
                aria-label="Dismiss notification"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </aside>
  )
}
