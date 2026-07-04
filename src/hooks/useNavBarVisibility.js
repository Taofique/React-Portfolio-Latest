import { useState, useEffect } from "react";

export function useNavbarVisibility() {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    // "Half the page" per your spec = half the viewport height.
    // Below this, always show the navbar (top of page context).
    const threshold = window.innerHeight / 2;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < threshold) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setVisible(false); // scrolling down -> hide
      } else {
        setVisible(true); // scrolling up -> show
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return visible;
}
