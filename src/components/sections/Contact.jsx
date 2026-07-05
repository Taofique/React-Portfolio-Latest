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

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send message");
      }

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        timeline: "",
        details: "",
      });
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
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

      <form
        onSubmit={handleSubmit}
        className="w-full lg:w-[1012px] bg-[#1A1A1A] border border-white/10 rounded-2xl p-6 md:p-10 flex flex-col gap-6"
      >
        {success && (
          <div className="bg-green-500/10 border border-green-500 text-green-500 rounded-lg p-3 text-center text-sm">
            ✅ Message sent successfully! I'll get back to you soon.
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 rounded-lg p-3 text-center text-sm">
            ❌ {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <input
            type="text"
            name="name"
            placeholder="Name *"
            value={formData.name}
            onChange={handleChange}
            required
            className="bg-brand-nav text-white placeholder-brand-inactive rounded-lg px-5 py-4 font-lato outline-none focus:ring-2 focus:ring-brand-active transition"
          />
          <input
            type="email"
            name="email"
            placeholder="Email *"
            value={formData.email}
            onChange={handleChange}
            required
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
            required
            className="bg-brand-nav text-brand-inactive rounded-lg px-5 py-4 font-lato outline-none focus:ring-2 focus:ring-brand-active transition"
          >
            <option value="" disabled>
              Service Of Interest *
            </option>
            {serviceOptions.map((option) => (
              <option
                key={option}
                value={option}
                className="bg-brand-nav text-white"
              >
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
            className="bg-brand-nav text-white placeholder-brand-inactive rounded-lg px-5 py-4 font-lato outline-none focus:ring-2 focus:ring-brand-active transition resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="self-center md:self-end w-full md:w-auto font-lato font-bold text-white border border-white/20 px-8 py-3 rounded-lg hover:bg-brand-active hover:border-brand-active transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </section>
  );
}
