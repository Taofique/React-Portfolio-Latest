import { useState } from "react";

const serviceOptions = [
  "Web Development",
  "Mobile App",
  "UI/UX Design",
  "Full-Stack Project",
  "Other",
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    timeline: "",
    details: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <section
      id="contact"
      className="w-full max-w-[1440px] mx-auto px-6 md:px-20 py-16 flex flex-col items-center gap-10"
    >
      <div className="text-center">
        <h2 className="font-lato font-bold text-3xl md:text-4xl text-white">
          Contact me
        </h2>
        <p className="font-lato text-brand-inactive mt-3 text-sm md:text-base px-4 md:px-0">
          Cultivating Connections: Reach Out And Connect With Me
        </p>
      </div>

      {/* Card: full width on mobile, capped at 1012px from lg breakpoint up */}
      <form
        onSubmit={handleSubmit}
        className="w-full lg:w-[1012px] bg-[#1A1A1A] border border-white/10 rounded-2xl p-6 md:p-10 flex flex-col gap-6"
      >
        {/* Single column on mobile, 2 columns from md breakpoint up */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="bg-brand-nav text-white placeholder-brand-inactive rounded-lg px-5 py-4 font-lato outline-none focus:ring-2 focus:ring-brand-active transition"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="bg-brand-nav text-white placeholder-brand-inactive rounded-lg px-5 py-4 font-lato outline-none focus:ring-2 focus:ring-brand-active transition"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="bg-brand-nav text-white placeholder-brand-inactive rounded-lg px-5 py-4 font-lato outline-none focus:ring-2 focus:ring-brand-active transition"
          />

          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="bg-brand-nav text-brand-inactive rounded-lg px-5 py-4 font-lato outline-none focus:ring-2 focus:ring-brand-active transition"
          >
            <option value="" disabled>
              Service Of Interest
            </option>
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="timeline"
            placeholder="Timeline"
            value={formData.timeline}
            onChange={handleChange}
            className="bg-brand-nav text-white placeholder-brand-inactive rounded-lg px-5 py-4 font-lato outline-none focus:ring-2 focus:ring-brand-active transition"
          />

          <textarea
            name="details"
            placeholder="Project Details..."
            value={formData.details}
            onChange={handleChange}
            rows={4}
            className="bg-brand-nav text-white placeholder-brand-inactive rounded-lg px-5 py-4 font-lato outline-none focus:ring-2 focus:ring-brand-active transition resize-none md:col-span-1"
          />
        </div>

        <button
          type="submit"
          className="self-center md:self-end w-full md:w-auto font-lato font-bold text-white border border-white/20 px-8 py-3 rounded-lg hover:bg-brand-active hover:border-brand-active transition-colors"
        >
          Send
        </button>
      </form>
    </section>
  );
}
