import { navLinks } from "../../data/navLinks";
import { useNavbarVisibility } from "../../hooks/useNavBarVisibility";
import { useActiveSection } from "../../hooks/useActiveSection";

export default function Navbar() {
  const visible = useNavbarVisibility();

  // Derive section ids ("home", "services", etc.) from the same navLinks
  // data used for hrefs, so there's one source of truth for both.
  const sectionIds = navLinks.map((link) => link.href.replace("#", ""));
  const activeId = useActiveSection(sectionIds);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 bg-brand-nav
        transition-transform duration-300 ease-in-out
        ${visible ? "translate-y-0" : "-translate-y-full"}
      `}
    >
      <div className="flex items-center justify-between px-20 py-3">
        {/* Logo */}
        <a
          href="#home"
          className="font-k2d font-bold text-3xl tracking-wide
                     bg-gradient-to-r from-[#FA6E00] to-[#E60026]
                     bg-clip-text text-transparent"
        >
          TAOFIQUE ISLAM
        </a>

        {/* Nav links */}
        <ul className="flex items-center gap-10">
          {navLinks.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = id === activeId;

            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={`font-lato font-bold text-lg tracking-wide
                             transition-colors duration-200
                             ${
                               isActive
                                 ? "text-brand-active"
                                 : "text-brand-inactive hover:text-brand-active"
                             }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Hire me button */}
        <a
          href="#contact"
          className="font-lato font-bold text-white bg-brand-active
                     px-6 py-2 rounded-md hover:opacity-90 transition-opacity"
        >
          Hire Me
        </a>
      </div>
    </nav>
  );
}
