import { useEffect } from "react";

/**
 * Custom hook to observe a DOM element and invoke `onIntersect`
 * when it scrolls into the viewport.
 *
 * @param {React.RefObject} ref - Reference to the target sentinel DOM element
 * @param {Function} onIntersect - Callback to invoke upon intersection
 */
export function useIntersection(ref, onIntersect) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          onIntersect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "300px", // stretch: pre-fetches next page before hitting the exact bottom
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [ref, onIntersect]);
}
