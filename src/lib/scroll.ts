/**
 * Smoothly scrolls the window to the top of the page.
 * Respects user preferences for reduced motion and ensures
 * any lazy-mounted elements are properly notified.
 */
export function scrollToTop(): void {
  if (typeof window === 'undefined') return;

  // Notify any lazy-mounted sections to prepare layout
  window.dispatchEvent(
    new CustomEvent('lazy-mount-trigger', { detail: 'all' })
  );

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  window.scrollTo({
    top: 0,
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
  });

  if (window.location.hash) {
    window.history.replaceState(null, '', window.location.pathname);
  }
}
