import { HiOutlineMail } from "react-icons/hi";
import { FiPhone } from "react-icons/fi";
import { navLinks } from "../../data/navLinks";
import { socialLinks } from "../../data/footerLinks";

export default function Footer() {
  return (
    <footer className="w-full px-20 pt-10 pb-6 flex flex-col items-center gap-[50px] bg-brand-nav">
      {/* Logo */}
      <a
        href="#home"
        className="font-k2d font-bold text-3xl tracking-wide bg-gradient-to-r from-[#FA6E00] to-[#E60026] bg-clip-text text-transparent"
      >
        TAOFIQUE
      </a>

      {/* Nav links reused from navbar data */}
      <ul className="flex items-center gap-10">
        {navLinks.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="font-lato font-bold text-lg text-brand-inactive hover:text-brand-active transition-colors"
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

      {/* Contact details */}
      <div className="flex items-center gap-10 font-lato font-bold text-lg text-brand-inactive">
        <span className="flex items-center gap-2">
          <HiOutlineMail /> taofique9014@gmail.com
        </span>
        <span className="flex items-center gap-2">
          <FiPhone /> +8801300415704
        </span>
      </div>

      {/* Divider + credit */}
      <div className="w-full border-t border-white/10 pt-4 text-center">
        <p className="font-lato text-sm text-brand-inactive">
          Designed by @taofique.islam Full Stack Developer
        </p>
      </div>
    </footer>
  );
}
