import heroMan from "../../assets/hero_man.png";
import { socialLinks } from "../../data/footerLinks";
import { heroStats } from "../../data/heroStats";

export default function Hero() {
  return (
    <section id="home" className="w-full max-w-[1440px] mx-auto px-20 py-16">
      <div className="flex items-center justify-between gap-10">
        {/* Left content column */}
        <div className="flex flex-col gap-6 max-w-[618px]">
          <div>
            <p className="font-lato text-lg text-brand-inactive">Hi I am</p>
            <p className="font-lato text-2xl font-semibold text-gray-200">
              Taofique Islam
            </p>
          </div>

          <h1 className="font-lato font-extrabold text-5xl md:text-6xl text-brand-active leading-tight">
            Full-Stack Developer
          </h1>

          {/* Social icons, reused from footer data */}
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

          {/* CTA buttons */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="font-lato font-bold text-white bg-brand-active px-8 py-3 rounded-md hover:opacity-90 transition-opacity"
            >
              Hire Me
            </a>
            <a
              href="/cv.pdf"
              download
              className="font-lato font-bold text-brand-inactive border border-brand-inactive px-8 py-3 rounded-md hover:text-white hover:border-white transition-colors"
            >
              Download CV
            </a>
          </div>

          {/* Stats bar */}
          <div className="flex items-center bg-brand-nav rounded-lg mt-4">
            {heroStats.map((stat, index) => (
              <div
                key={stat.label}
                className={`flex flex-col px-8 py-5 ${index !== 0 ? "border-l border-white/10" : ""}`}
              >
                <span className="font-lato font-bold text-2xl text-brand-active">
                  {stat.value}
                </span>
                <span className="font-lato text-white">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right image column */}
        <div className="relative flex-shrink-0 w-[520px] h-[781px] flex items-center justify-center">
          {/* Soft glow circle behind the photo */}
          <div className="absolute w-[420px] h-[420px] bg-white/5 rounded-full blur-3xl z-0" />

          <img
            src={heroMan}
            alt="Mizanor Rahman - Full-Stack Developer"
            className="relative z-10 w-full h-full object-cover rounded-[244px] grayscale"
          />
        </div>
      </div>
    </section>
  );
}
