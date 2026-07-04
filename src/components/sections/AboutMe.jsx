import aboutMan from "../../assets/hero_man.png"; // reuse same photo, or swap for a different shot
import { skills } from "../../data/skills";
import CircularProgress from "../ui/CircularProgress";

export default function AboutMe() {
  return (
    <section
      id="about"
      className="w-full max-w-[1440px] mx-auto px-20 py-16 flex flex-col gap-10"
    >
      <div className="text-center">
        <h2 className="font-lato font-bold text-4xl text-white">About Me</h2>
        <p className="font-lato text-brand-inactive mt-3">
          User Interface And User Experience And Also Video Editing
        </p>
      </div>

      <div className="flex items-start gap-16">
        <img
          src={aboutMan}
          alt="Mizanor Rahman"
          className="w-[420px] h-auto rounded-2xl grayscale object-cover"
        />

        <div className="flex flex-col gap-8">
          <p className="font-lato text-brand-inactive leading-relaxed text-lg">
            A software engineer, the modern-day architect of digital realms,
            navigates the ethereal landscapes of code, sculpting intangible
            structures that shape our technological world. With fingers poised
            over keyboards like virtuoso pianists, they compose symphonies of
            logic, their minds a labyrinth of algorithms and solutions. Their
            canvas is a screen, a vast expanse where lines of code dance in
            intricate patterns, weaving the fabric of programs and applications.
          </p>

          <a
            href="/cv.pdf"
            download
            className="w-fit font-lato font-bold text-white bg-brand-active px-8 py-3 rounded-md hover:opacity-90 transition-opacity"
          >
            Download CV
          </a>
        </div>
      </div>

      {/* Skills row */}
      <div className="flex items-center justify-between mt-6 flex-wrap gap-6">
        {skills.map((skill) => (
          <CircularProgress key={skill.label} {...skill} />
        ))}
      </div>
    </section>
  );
}
