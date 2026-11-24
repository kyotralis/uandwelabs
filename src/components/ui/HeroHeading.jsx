import React from 'react'

/**
 * Reusable Hero Heading with Kinetic Word-by-Word Reveal Animation.
 * Single source of truth for hero typography animations across all pages
 * (Homepage Hero, Ananda, Dara, and Aura).
 */
export default function HeroHeading({ text, className = '' }) {
  if (!text) return null

  const words = String(text).trim().split(/\s+/)

  return (
    <div className="relative inline-block py-1">
      <h1
        aria-label={text}
        className={`text-3xl sm:text-5xl lg:text-6xl xl:text-[64px] font-normal font-['Inter'] tracking-[0.03em] text-white uppercase leading-[1.08] select-text drop-shadow-[0_4px_30px_rgba(0,0,0,0.6)] ${className}`}
      >
        {words.map((word, wIdx) => (
          <span
            key={wIdx}
            className="inline-block overflow-hidden mr-[0.25em] align-top py-0.5"
          >
            <span
              className="inline-block animate-hero-word will-change-transform"
              style={{
                animationDelay: `${wIdx * 55}ms`,
              }}
            >
              {word}
            </span>
          </span>
        ))}
      </h1>
    </div>
  )
}
