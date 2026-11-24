import React from 'react'

/**
 * OptimizedImage Component
 *
 * Provides intelligent, high-performance image rendering:
 * - priority = true (Above-the-fold / Hero):
 *     loading="eager" + fetchPriority="high" + decoding="async"
 *     -> Downloaded at highest network priority, painted immediately on frame 1 without delay.
 * - priority = false (Below-the-fold):
 *     loading="lazy" + fetchPriority="auto" + decoding="async"
 *     -> Defers download until the user scrolls close to the image, saving bandwidth and speed.
 */
export default function OptimizedImage({
  src,
  alt = '',
  className = '',
  priority = false,
  style = {},
  onLoad,
  onError,
  ...props
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      style={style}
      onLoad={onLoad}
      onError={onError}
      {...props}
    />
  )
}
