import { motion } from "framer-motion";
import heroMan from "../../assets/hero_man.png";
import { socialLinks } from "../../data/footerLinks";
import { heroStats } from "../../data/heroStats";

// Parent container: staggers each character's entrance, one after another
const letterContainer = {
  hidden: {},
  visible: (delayChildren = 0) => ({
    transition: {
      staggerChildren: 0.03,
      delayChildren,
    },
  }),
};

// Each character fades up into place
const letterItem = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

// Reusable component: splits text into words, then characters within each word,
// and animates them in left to right. Words are wrapped so a word can only
// break to a new line as a whole unit — never mid-word.
function AnimatedText({ text, className, delayChildren = 0, as: Tag = "p" }) {
  const MotionTag = motion[Tag];
  const words = text.split(" ");

  return (
    <MotionTag
      className={className}
      style={{ display: "flex", flexWrap: "wrap" }}
      variants={letterContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.6 }}
      custom={delayChildren}
    >
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          style={{ display: "inline-flex", whiteSpace: "nowrap" }}
        >
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={charIndex}
              variants={letterItem}
              style={{ display: "inline-block" }}
            >
              {char}
            </motion.span>
          ))}
          {/* Space after each word (except the last) so wrapping happens between words */}
          {wordIndex !== words.length - 1 && (
            <motion.span
              variants={letterItem}
              style={{ display: "inline-block" }}
            >
              &nbsp;
            </motion.span>
          )}
        </span>
      ))}
    </MotionTag>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="w-full max-w-[1440px] mx-auto px-6 md:px-20 py-10 md:py-16"
    >
      <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between gap-10">
        {/* Left content column */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6 w-full lg:max-w-[618px]">
          <div className="flex flex-col items-center lg:items-start">
            <AnimatedText
              text="Hi I am"
              className="font-lato text-base md:text-lg text-brand-inactive justify-center lg:justify-start"
              delayChildren={0}
            />
            <AnimatedText
              text="Taofique Islam"
              className="font-lato text-xl md:text-2xl font-semibold text-gray-200 justify-center lg:justify-start"
              delayChildren={0.25}
            />
          </div>

          <AnimatedText
            as="h1"
            text="Full-Stack Developer"
            className="font-lato font-extrabold text-4xl md:text-5xl lg:text-6xl text-brand-active leading-tight justify-center lg:justify-start"
            delayChildren={0.7}
          />

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map(({ icon: Icon, href }, index) => (
              <a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center rounded-full 
                  bg-white/5 text-white 
                  hover:bg-brand-active hover:text-white hover:scale-110 
                  active:bg-brand-active active:scale-95
                  focus:bg-brand-active focus:scale-105 focus:outline-none focus:ring-2 focus:ring-brand-active/50
                  transition-all duration-300"
                aria-label={`Visit social link ${index + 1}`}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <a
              href="#contact"
              className="font-lato font-bold text-white bg-brand-active px-6 md:px-8 py-3 rounded-md 
                hover:opacity-90 hover:scale-105 
                active:opacity-90 active:scale-95
                transition-all duration-300"
            >
              Hire Me
            </a>
            <a
              href="/cv.pdf"
              download
              className="font-lato font-bold text-brand-inactive border border-brand-inactive px-6 md:px-8 py-3 rounded-md 
                hover:text-white hover:border-white hover:scale-105 
                active:text-white active:border-white active:scale-95
                transition-all duration-300"
            >
              Download CV
            </a>
          </div>

          {/* Stats bar */}
          <div className="flex items-center bg-brand-nav rounded-lg mt-4 w-full lg:w-auto justify-center lg:justify-start overflow-hidden">
            {heroStats.map((stat, index) => (
              <div
                key={stat.label}
                className={`flex flex-col px-4 md:px-8 py-4 md:py-5 
                  ${index !== 0 ? "border-l border-white/10" : ""}
                  ${index === heroStats.length - 1 ? "pr-4 md:pr-8" : ""}`}
              >
                <span className="font-lato font-bold text-xl md:text-2xl text-brand-active">
                  {stat.value}
                </span>
                <span className="font-lato text-sm md:text-base text-white whitespace-nowrap">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right image column */}
        <div className="relative flex-shrink-0 w-full max-w-[320px] lg:max-w-[420px] xl:max-w-[520px]">
          {/* Glow effect */}
          <div
            className="absolute w-[260px] h-[260px] lg:w-[350px] lg:h-[350px] 
            bg-gradient-to-r from-brand-active/20 to-brand-active/5 
            rounded-full blur-3xl -z-10 
            top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />

          <img
            src={heroMan}
            alt="Taofique Islam - Full-Stack Developer"
            className="relative z-10 w-full h-auto max-h-[400px] sm:max-h-[500px] lg:max-h-[650px] xl:max-h-[781px] 
              object-contain object-bottom rounded-t-[244px] grayscale
              hover:grayscale-0 transition-all duration-700"
          />
        </div>
      </div>
    </section>
  );
}
