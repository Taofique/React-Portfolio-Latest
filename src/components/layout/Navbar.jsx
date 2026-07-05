import { useState } from "react";
import { navLinks } from "../../data/navLinks";
import { useNavbarVisibility } from "../../hooks/useNavbarVisibility";
import { useActiveSection } from "../../hooks/useActiveSection";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const visible = useNavbarVisibility();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sectionIds = navLinks.map((link) => link.href.replace("#", ""));
  const activeId = useActiveSection(sectionIds);

  const handleLinkClick = () => setIsMenuOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 bg-brand-nav 
        transition-transform duration-300 ease-in-out 
        ${visible ? "translate-y-0" : "-translate-y-full"}`}
    >
      {/* ===== MOBILE ===== */}
      <div className="md:hidden">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white text-2xl"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <HiX /> : <HiMenu />}
          </button>

          <a
            href="#home"
            onClick={handleLinkClick}
            className="font-k2d font-bold text-xl tracking-wide 
              bg-gradient-to-r from-[#FA6E00] to-[#E60026] 
              bg-clip-text text-transparent"
          >
            TAOFIQUE
          </a>

          <a
            href="#contact"
            onClick={handleLinkClick}
            className="font-lato font-bold text-white bg-brand-active 
              px-4 py-1.5 rounded-md text-sm
              hover:bg-opacity-80 transition-all"
          >
            Hire Me
          </a>
        </div>

        {/* Dropdown Menu */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out
            ${isMenuOpen ? "max-h-[500px]" : "max-h-0"}`}
        >
          <div className="border-t border-white/10 py-6">
            <ul className="flex flex-col items-center gap-5">
              {navLinks.map((link) => {
                const id = link.href.replace("#", "");
                const isActive = id === activeId;

                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={handleLinkClick}
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
          </div>
        </div>
      </div>

      {/* ===== DESKTOP ===== */}
      <div className="hidden md:flex items-center justify-between px-20 py-3">
        <a
          href="#home"
          onClick={handleLinkClick}
          className="font-k2d font-bold text-3xl tracking-wide 
            bg-gradient-to-r from-[#FA6E00] to-[#E60026] 
            bg-clip-text text-transparent"
        >
          TAOFIQUE ISLAM
        </a>

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
                        : "text-brand-inactive hover:text-brand-active-white"
                    }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

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
