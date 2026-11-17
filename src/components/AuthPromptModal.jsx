import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, ArrowRight, X, ShieldCheck } from 'lucide-react'

export default function AuthPromptModal({
  open,
  onClose,
  onConfirm,
  title = 'Sign In Required',
  message = 'Please sign in or create an account to proceed.',
  productKey = 'dara',
  actionText = 'Sign In / Register',
}) {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && open) {
        onClose?.()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  // Resolve Product Badge & Tag
  const getProductMeta = (key) => {
    switch (key) {
      case 'dara':
        return {
          name: 'Dara Healthcare',
          tag: 'GERIATRIC HARDWARE',
          color: 'text-amber-700 bg-amber-50 border-amber-200/80',
          dot: 'bg-amber-500',
        }
      case 'aura':
        return {
          name: 'Aura Physical AI',
          tag: 'EDGE SILICON',
          color: 'text-sky-700 bg-sky-50 border-sky-200/80',
          dot: 'bg-sky-500',
        }
      case 'ananda-residential':
        return {
          name: 'Ananda Living',
          tag: 'RESIDENTIAL PHYSICS',
          color: 'text-emerald-700 bg-emerald-50 border-emerald-200/80',
          dot: 'bg-emerald-500',
        }
      case 'ananda':
      default:
        return {
          name: 'Ananda GeoSpatial',
          tag: 'COMMERCIAL URBAN PHYSICS',
          color: 'text-neutral-700 bg-neutral-100 border-neutral-200/80',
          dot: 'bg-neutral-500',
        }
    }
  }

  const meta = getProductMeta(productKey)

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 select-none">
          {/* Backdrop with Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            onClick={onClose}
            className="fixed inset-0 bg-black/65 backdrop-blur-md cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-modal-title"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: 'spring', damping: 28, stiffness: 350, mass: 0.8 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-white rounded-2xl sm:rounded-3xl border border-black/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] overflow-hidden z-10 text-left font-sans"
          >
            {/* Top Bar Header */}
            <div className="px-6 py-4 bg-neutral-950 text-white flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <span className={`w-2 h-2 rounded-full ${meta.dot} animate-pulse`} />
                <span className="text-[10.5px] font-mono uppercase tracking-[0.2em] text-neutral-300">
                  {meta.tag}
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer group flex items-center justify-center"
                aria-label="Close dialog"
              >
                <X size={16} className="transition-transform duration-300 group-hover:rotate-90" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-7">
              {/* Product Chip */}
              <div className="flex items-center gap-2 mb-4">
                <span className={`px-2.5 py-1 text-[11px] font-mono tracking-wide rounded-md border ${meta.color}`}>
                  {meta.name}
                </span>
              </div>

              {/* Icon & Title */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-neutral-100 border border-neutral-200/80 flex items-center justify-center text-neutral-900 flex-shrink-0 shadow-inner">
                  <Lock size={20} strokeWidth={2} />
                </div>
                <div>
                  <h3
                    id="auth-modal-title"
                    className="text-xl sm:text-2xl font-normal text-neutral-950 tracking-tight font-['Inter'] uppercase leading-snug"
                  >
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-600 leading-relaxed font-sans">
                    {message}
                  </p>
                </div>
              </div>

              {/* Informative Security Notice */}
              <div className="mt-5 p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/70 flex items-center gap-2.5 text-xs text-neutral-600 font-sans">
                <ShieldCheck size={16} className="text-emerald-600 flex-shrink-0" />
                <span>
                  Your active product selection will be preserved automatically upon sign in.
                </span>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-col-reverse sm:flex-row items-center gap-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl border border-neutral-200 hover:bg-neutral-100 text-neutral-700 hover:text-black text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer text-center"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={onConfirm}
                  className="w-full sm:flex-1 px-5 py-3 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-mono uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 group cursor-pointer shadow-sm active:scale-[0.98]"
                >
                  <span>{actionText}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
