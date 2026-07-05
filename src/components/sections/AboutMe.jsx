import { HiOutlineDownload } from "react-icons/hi";
import aboutMan from "../../assets/hero_man.png";
import { skills } from "../../data/skills";
import CircularProgress from "../ui/CircularProgress";

export default function AboutMe() {
  return (
    <section
      id="about"
      className="w-full max-w-[1440px] mx-auto px-6 md:px-20 py-16 flex flex-col gap-10"
    >
      <div className="text-center">
        <h2 className="font-lato font-bold text-3xl md:text-4xl text-white">
          About Me
        </h2>
        <p className="font-lato text-brand-inactive mt-3 text-sm md:text-base px-4 md:px-0">
          User Interface And User Experience And Also Video Editing
        </p>
      </div>

      {/* Stacks vertically on mobile, side-by-side from lg breakpoint up */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-[100px]">
        <img
          src={aboutMan}
          alt="Mizanor Rahman"
          className="w-full max-w-[320px] lg:w-[420px] lg:max-w-none h-auto rounded-2xl grayscale object-cover"
        />

        <div className="w-full lg:w-[631px] flex flex-col gap-6">
          <p className="font-lato text-brand-inactive leading-relaxed text-base md:text-lg text-justify">
            A software engineer, the modern-day architect of digital realms,
            navigates the ethereal landscapes of code, sculpting intangible
            structures that shape our technological world. With fingers poised
            over keyboards like virtuoso pianists, they compose symphonies of
            logic, their minds a labyrinth of algorithms and solutions. Their
            canvas is a screen, a vast expanse where lines of code dance in
            intricate patterns, weaving the fabric of programs and applications.
            Each keystroke is a brushstroke, crafting intricate architectures
            and breathing life into innovative designs. In this digital atelier,
            they don the mantle of problem solvers, confronting bugs and
            glitches like valiant knights in an ever-evolving quest for
            perfection. Debugging becomes a noble pursuit, unraveling the
            mysteries hidden within the tangled webs of code.
          </p>

          <a
            href="/cv/Taofique_Final_Resume.pdf"
            download
            className="w-fit flex items-center gap-2 font-lato font-bold text-white bg-brand-active px-6 md:px-8 py-3 rounded-md hover:opacity-90 transition-opacity"
          >
            <HiOutlineDownload size={20} />
            Download CV
          </a>
        </div>
      </div>

      {/* Skills: 2-column grid on mobile (matches screenshot), even row from lg up */}
      <div className="grid grid-cols-2 lg:flex lg:items-center lg:justify-between gap-x-6 gap-y-10 mt-6 justify-items-center">
        {skills.map((skill) => (
          <CircularProgress key={skill.label} {...skill} />
        ))}
      </div>
    </section>
  );
}
