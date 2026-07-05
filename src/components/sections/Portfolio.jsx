import { useState } from "react";
import { categories, projects } from "../../data/projects";

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <section
      id="portfolio"
      className="w-full max-w-[1440px] mx-auto px-20 py-16 flex flex-col gap-10"
    >
      <div className="text-center flex flex-col gap-6">
        <h2 className="font-lato font-bold text-4xl text-white">Portfolio</h2>

        {/* Category nav, styled like the navbar's active/inactive pattern */}
        <nav className="flex items-center justify-center gap-4 flex-wrap">
          {categories.map((category) => {
            const isActive = category === activeCategory;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`font-lato font-bold px-6 py-3 rounded-lg transition-colors duration-200 ${
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

      {/* Project grid */}
      <div className="grid grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="rounded-2xl overflow-hidden bg-brand-nav flex flex-col"
          >
            {/* Top part: image, fixed square area matching the 415x415 spec */}
            <div className="w-full aspect-square overflow-hidden">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Bottom part: name + category footer */}
            <div className="flex items-center justify-between px-6 py-4">
              <span className="font-lato font-bold text-white">
                {project.name}
              </span>
              <span className="font-lato text-brand-inactive">
                {project.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
