import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { navLinks } from "../../data/navLinks";
import { useNavbarVisibility } from "../../hooks/useNavBarVisibility";
import { useActiveSection } from "../../hooks/useActiveSection";
import { HiMenu, HiX } from "react-icons/hi";
import { useAuth } from "../../context/AuthContext";
import LogoutButton from "../ui/LogoutButton";

export default function Navbar() {
  const visible = useNavbarVisibility();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Check if we're on the blog page
  const isBlogPage = location.pathname.startsWith("/blog");

  // ✅ Include "home" so the Hero section is actually observed,
  // then add all the "#..." section links after it.
  const sectionIds = [
    "home",
    ...navLinks
      .filter((link) => link.href.startsWith("#"))
      .map((link) => link.href.replace("#", "")),
  ];

  const activeId = useActiveSection(sectionIds);

  const handleLinkClick = () => setIsMenuOpen(false);

  // Handle navigation to sections
  const handleNavigation = (href, label) => {
    setIsMenuOpen(false);

    // If it's the Blog link
    if (label === "Blog") {
      navigate("/blog");
      return;
    }

    // If it's a section link (starts with #)
    if (href.startsWith("#")) {
      // If we're not on home page, navigate to home first
      if (location.pathname !== "/") {
        navigate("/");
        // Wait for navigation then scroll
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        // Already on home page, just scroll
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
      return;
    }

    // Home link
    navigate("/");
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  // ✅ FIXED: Single source of truth (activeId) — no more scrollY special-casing
  const isActiveLink = (link) => {
    // Blog link
    if (link.label === "Blog") {
      return isBlogPage;
    }

    // Home link - active when on home page, not on blog, and activeId is "home"
    if (link.href === "/") {
      return location.pathname === "/" && !isBlogPage && activeId === "home";
    }

    // Section links (with #)
    if (link.href.startsWith("#")) {
      const id = link.href.replace("#", "");
      return id === activeId && location.pathname === "/" && !isBlogPage;
    }

    return false;
  };

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

          <button
            onClick={() => {
              setIsMenuOpen(false);
              navigate("/");
              setTimeout(() => {
                const element = document.querySelector("#home");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }, 100);
            }}
            className="font-k2d font-bold text-xl tracking-wide 
              bg-gradient-to-r from-[#FA6E00] to-[#E60026] 
              bg-clip-text text-transparent"
          >
            TAOFIQUE
          </button>

          <button
            onClick={() => {
              setIsMenuOpen(false);
              if (location.pathname !== "/") {
                navigate("/");
                setTimeout(() => {
                  const element = document.querySelector("#contact");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }, 100);
              } else {
                const element = document.querySelector("#contact");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="font-lato font-bold text-white bg-brand-active 
              px-4 py-1.5 rounded-md text-sm
              hover:bg-opacity-80 transition-all"
          >
            Hire Me
          </button>
        </div>

        {/* Dropdown Menu */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out
            ${isMenuOpen ? "max-h-[500px]" : "max-h-0"}`}
        >
          <div className="border-t border-white/10 py-6">
            <ul className="flex flex-col items-center gap-5">
              {navLinks.map((link) => {
                const isActive = isActiveLink(link);

                return (
                  <li key={link.label}>
                    <button
                      onClick={() => handleNavigation(link.href, link.label)}
                      className={`font-lato font-bold text-lg tracking-wide 
                        transition-colors duration-200 
                        ${
                          isActive
                            ? "text-brand-active"
                            : "text-brand-inactive hover:text-brand-active-white"
                        }`}
                    >
                      {link.label}
                    </button>
                  </li>
                );
              })}
              {/* Logout button in mobile menu */}
              {isAuthenticated && (
                <li className="pt-4 border-t border-white/10 w-full flex justify-center">
                  <LogoutButton />
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* ===== DESKTOP ===== */}
      <div className="hidden md:flex items-center justify-between px-20 py-3">
        <button
          onClick={() => {
            navigate("/");
            setTimeout(() => {
              const element = document.querySelector("#home");
              if (element) element.scrollIntoView({ behavior: "smooth" });
            }, 100);
          }}
          className="font-k2d font-bold text-3xl tracking-wide 
            bg-gradient-to-r from-[#FA6E00] to-[#E60026] 
            bg-clip-text text-transparent"
        >
          TAOFIQUE ISLAM
        </button>

        <ul className="flex items-center gap-10">
          {navLinks.map((link) => {
            const isActive = isActiveLink(link);

            return (
              <li key={link.label}>
                <button
                  onClick={() => handleNavigation(link.href, link.label)}
                  className={`font-lato font-bold text-lg tracking-wide 
                    transition-colors duration-200 
                    ${
                      isActive
                        ? "text-brand-active"
                        : "text-brand-inactive hover:text-brand-active-white"
                    }`}
                >
                  {link.label}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              if (location.pathname !== "/") {
                navigate("/");
                setTimeout(() => {
                  const element = document.querySelector("#contact");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }, 100);
              } else {
                const element = document.querySelector("#contact");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="font-lato font-bold text-white bg-brand-active 
              px-6 py-2 rounded-md hover:opacity-90 transition-opacity"
          >
            Hire Me
          </button>

          {/* Logout button in desktop nav */}
          {isAuthenticated && <LogoutButton />}
        </div>
      </div>
    </nav>
  );
}
