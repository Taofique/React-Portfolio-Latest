import { HiOutlineMail } from "react-icons/hi";
import { FiPhone } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { navLinks } from "../../data/navLinks";
import { socialLinks } from "../../data/footerLinks";

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  // Same smooth-scroll + router-aware navigation logic used in Navbar,
  // so footer links behave identically regardless of which page you're on.
  const handleNavigation = (href, label) => {
    // Blog link
    if (label === "Blog") {
      navigate("/blog");
      return;
    }

    // Section links (start with #)
    if (href.startsWith("#")) {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
      return;
    }

    // Home link ("/")
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.querySelector("#home");
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const element = document.querySelector("#home");
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full px-6 md:px-20 pt-10 pb-6 flex flex-col items-center gap-8 md:gap-[50px] bg-brand-nav">
      {/* Logo */}
      <a
        href="#home"
        onClick={handleLogoClick}
        className="font-k2d font-bold text-2xl md:text-3xl tracking-wide bg-gradient-to-r from-[#FA6E00] to-[#E60026] bg-clip-text text-transparent"
      >
        TAOFIQUE
      </a>

      {/* Nav links reused from navbar data - wraps to multiple centered rows on small screens */}
      <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 md:gap-10">
        {navLinks.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavigation(link.href, link.label);
              }}
              className="font-lato font-bold text-base md:text-lg text-brand-inactive hover:text-brand-active transition-colors"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Social icons */}
      <div className="flex items-center gap-4">
        {socialLinks.map(({ icon: Icon, href }, index) => (
          <a
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 flex items-center justify-center rounded-full bg-white/5 text-white hover:bg-brand-active transition-colors"
          >
            <Icon size={20} />
          </a>
        ))}
      </div>

      {/* Contact details - stacked on mobile, side-by-side from md up */}
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10 font-lato font-bold text-base md:text-lg text-brand-inactive text-center">
        <span className="flex items-center gap-2">
          <HiOutlineMail /> taofique9014@gmail.com
        </span>
        <span className="flex items-center gap-2">
          <FiPhone /> +8801300415704
        </span>
      </div>

      {/* Divider + credit */}
      <div className="w-full border-t border-white/10 pt-4 text-center">
        <p className="font-lato text-sm text-brand-inactive px-4">
          Designed by @taofique.islam <br></br> Full-Stack Developer
        </p>
      </div>
    </footer>
  );
}
