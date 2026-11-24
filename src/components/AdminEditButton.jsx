import { useState, useEffect } from 'react'
import { Pencil } from 'lucide-react'
import { fetchCmsFromServer } from '../services/contentStore'

// Detects if the page is in admin mode (iframe from admin studio, URL ?admin=true, or sessionStorage)
function useAdminMode() {
  const [isAdmin, setIsAdmin] = useState(() => {
    if (typeof window === 'undefined') return false
    const params = new URLSearchParams(window.location.search)
    return params.get('admin') === 'true' || sessionStorage.getItem('uandwe_admin_auth') === 'true'
  })

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('admin') === 'true' || sessionStorage.getItem('uandwe_admin_auth') === 'true') {
      setIsAdmin(true)
    }

    const handleMessage = (e) => {
      if (e.data?.type === 'ADMIN_ACTIVATE') setIsAdmin(true)
      if (e.data?.type === 'ADMIN_DEACTIVATE') setIsAdmin(false)
      if (e.data?.type === 'CMS_REFRESH') {
        fetchCmsFromServer()
      }
    }

    window.addEventListener('message', handleMessage)

    // Notify parent admin that iframe is ready and query admin mode
    if (window.parent !== window) {
      try {
        window.parent.postMessage({ type: 'ADMIN_CHECK' }, '*')
      } catch {}
    }

    return () => window.removeEventListener('message', handleMessage)
  }, [])

  return isAdmin
}

// The floating Edit button that appears on the right side of each section
export default function AdminEditButton({
  section,
  field,
  label,
  variant = 'light',
  position = 'default',
  inline = false,
  className = '',
  buttonText,
}) {
  const isAdmin = useAdminMode()
  if (!isAdmin) return null

  const handleClick = (e) => {
    e.stopPropagation()
    e.preventDefault()
    if (window.parent !== window) {
      window.parent.postMessage({ type: 'EDIT_SECTION', section, field, label }, '*')
    } else {
      // Standalone browser tab: open admin studio with target section, field, and current port
      const currentPort = window.location.port || '5174'
      const pagePath = window.location.pathname || `/${section}`
      window.open(
        `http://localhost:5175?section=${encodeURIComponent(section)}&field=${encodeURIComponent(field)}&label=${encodeURIComponent(label || '')}&page=${encodeURIComponent(pagePath)}&port=${currentPort}`,
        '_blank'
      )
    }
  }

  // Positioning classes: inline inside flex container or absolute
  let positionClasses = inline ? 'relative' : 'absolute z-40 top-4 sm:top-6 right-6 sm:right-12'
  if (!inline && position === 'hero') {
    // Clear the floating main header navbar (navbar sits at top-4/6, ~72px height)
    positionClasses = 'absolute z-40 top-24 sm:top-28 right-6 sm:right-10'
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      title={`Edit: ${label || 'Section'}`}
      className={`
        ${positionClasses}
        group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
        text-[12px] font-medium font-['Inter'] normal-case tracking-normal
        shadow-sm cursor-pointer select-none
        transition-all duration-200
        hover:scale-105 active:scale-95
        bg-neutral-900/90 hover:bg-black text-white border border-neutral-700/80 hover:border-neutral-500 backdrop-blur-md
        ${className}
      `}
    >
      <Pencil size={12} className="text-amber-400 group-hover:rotate-12 transition-transform duration-200 shrink-0" />
      <span>{buttonText || 'Edit Section'}</span>
    </button>
  )
}

export { useAdminMode }
