import { useState, useEffect, useRef } from "react";

export function useActiveSection(sectionIds) {
  const [activeId, setActiveId] = useState(sectionIds[0] || "");
  const ratiosRef = useRef({}); // persists across callback firings

  useEffect(() => {
    if (!sectionIds.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Update only the sections that actually fired in this batch
        entries.forEach((entry) => {
          ratiosRef.current[entry.target.id] = entry.isIntersecting
            ? entry.intersectionRatio
            : 0;
        });

        // Now compare across ALL sections' last-known ratios
        let maxRatio = 0;
        let mostVisibleId = null;

        Object.entries(ratiosRef.current).forEach(([id, ratio]) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            mostVisibleId = id;
          }
        });

        if (mostVisibleId) {
          setActiveId(mostVisibleId);
        }
      },
      {
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
        rootMargin: "-10% 0px -10% 0px",
      },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      ratiosRef.current = {};
    };
  }, [sectionIds]);

  return activeId;
}
