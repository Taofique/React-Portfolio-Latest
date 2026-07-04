import { services } from "../../data/services";

export default function Services() {
  return (
    <section
      id="services"
      className="w-full max-w-[1440px] mx-auto px-20 py-16 flex flex-col gap-20"
    >
      <div className="text-center">
        <h2 className="font-lato font-bold text-4xl text-white">Services</h2>
        <p className="font-lato text-brand-inactive mt-3">
          What I can build and support for you, end to end
        </p>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {services.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="bg-brand-nav rounded-3xl p-[34px] flex flex-col items-center text-center gap-[18px]"
          >
            <Icon size={40} className="text-brand-active" />
            <h3 className="font-lato font-bold text-xl text-brand-active">
              {title}
            </h3>
            <p className="font-lato text-brand-inactive leading-relaxed">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
