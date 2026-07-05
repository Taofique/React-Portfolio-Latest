import { useState, useRef } from "react";
import { categories, projects } from "../../data/projects";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const scrollContainerRef = useRef(null);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  // Scroll functions for carousel
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="portfolio"
      className="w-full max-w-[1440px] mx-auto px-4 md:px-20 py-10 md:py-16 flex flex-col gap-8 md:gap-10"
    >
      <div className="text-center flex flex-col gap-4 md:gap-6">
        <h2 className="font-lato font-bold text-3xl md:text-4xl text-white">
          Portfolio
        </h2>

        {/* Category nav - horizontal scroll on mobile */}
        <nav className="flex items-center justify-start md:justify-center gap-3 md:gap-4 flex-nowrap overflow-x-auto pb-4 md:pb-0 px-2 md:px-0 scrollbar-hide">
          {categories.map((category) => {
            const isActive = category === activeCategory;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`font-lato font-bold px-4 md:px-6 py-2 md:py-3 rounded-lg transition-colors duration-200 whitespace-nowrap text-sm md:text-base ${
                  isActive
                    ? "bg-brand-active text-white"
                    : "bg-brand-nav text-brand-inactive hover:text-white"
                }`}
              >
                {category}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Project Grid / Carousel */}
      <div className="relative">
        {/* Mobile Carousel Controls */}
        <div className="md:hidden flex justify-between items-center mb-4">
          <button
            onClick={scrollLeft}
            className="w-10 h-10 rounded-full bg-brand-nav text-white flex items-center justify-center hover:bg-brand-active transition-colors"
            aria-label="Scroll left"
          >
            <HiChevronLeft size={24} />
          </button>
          <span className="text-brand-inactive text-sm font-lato">
            {filteredProjects.length} projects
          </span>
          <button
            onClick={scrollRight}
            className="w-10 h-10 rounded-full bg-brand-nav text-white flex items-center justify-center hover:bg-brand-active transition-colors"
            aria-label="Scroll right"
          >
            <HiChevronRight size={24} />
          </button>
        </div>

        {/* Projects Container */}
        <div
          ref={scrollContainerRef}
          className={`
            flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8
            overflow-x-auto md:overflow-visible snap-x snap-mandatory
            pb-4 md:pb-0 scroll-smooth
            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
          `}
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="min-w-[280px] md:min-w-0 snap-start flex-shrink-0 md:flex-shrink"
            >
              <div className="rounded-2xl overflow-hidden bg-brand-nav flex flex-col h-full">
                {/* Image */}
                <div className="w-full aspect-square overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4">
                  <span className="font-lato font-bold text-white text-sm md:text-base">
                    {project.name}
                  </span>
                  <span className="font-lato text-brand-inactive text-xs md:text-sm">
                    {project.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gradient overlays for mobile carousel (optional) */}
        <div className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-brand-dark to-transparent pointer-events-none md:hidden"></div>
        <div className="absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-brand-dark to-transparent pointer-events-none md:hidden"></div>
      </div>

      {/* View All Projects Button */}
      <div className="text-center mt-4">
        <a
          href="#contact"
          className="font-lato font-bold text-white bg-brand-active px-8 py-3 rounded-md hover:opacity-90 transition-opacity inline-block"
        >
          View All Projects
        </a>
      </div>
    </section>
  );
}
