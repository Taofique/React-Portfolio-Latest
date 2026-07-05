import { expertise } from "../../data/expertise";
import FlipCard from "../ui/FlipCard";

export default function Expertise() {
  return (
    <section
      id="expertise"
      className="w-full max-w-[1440px] mx-auto px-6 md:px-20 py-16 flex flex-col gap-10 md:gap-20"
    >
      <div className="text-center">
        <h2 className="font-lato font-bold text-3xl md:text-4xl text-white">
          Expertise
        </h2>
        <p className="font-lato text-brand-inactive mt-3 text-sm md:text-base px-4 md:px-0">
          What I can build and support for you, end to end
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
        {expertise.map((item) => (
          <FlipCard key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
}
