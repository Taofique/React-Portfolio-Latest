import { services } from "../../data/services";

export default function Services() {
  return (
    <section
      id="services"
      className="w-full max-w-[1440px] mx-auto px-6 md:px-20 py-16 flex flex-col gap-10 md:gap-20"
    >
      <div className="text-center">
        <h2 className="font-lato font-bold text-3xl md:text-4xl text-white">
          Services
        </h2>
        <p className="font-lato text-brand-inactive mt-3 text-sm md:text-base px-4 md:px-0">
          What I can build and support for you, end to end
        </p>
      </div>

      {/* 2 columns on mobile (matches screenshot), 3 columns from md breakpoint up */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
        {services.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="bg-brand-nav rounded-2xl md:rounded-3xl p-5 md:p-[34px] flex flex-col items-center text-center gap-3 md:gap-[18px]"
          >
            <Icon size={32} className="text-brand-active md:hidden" />
            <Icon size={40} className="text-brand-active hidden md:block" />
            <h3 className="font-lato font-bold text-base md:text-xl text-brand-active">
              {title}
            </h3>
            <p className="font-lato text-brand-inactive leading-relaxed text-xs md:text-base">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
