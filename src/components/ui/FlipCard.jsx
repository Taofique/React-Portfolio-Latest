import { useState } from "react";

export default function FlipCard({ icon: Icon, title, description, details }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      onClick={() => setIsFlipped(!isFlipped)}
      className="cursor-pointer [perspective:1000px] h-[240px] md:h-[300px]"
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* FRONT face */}
        <div className="absolute inset-0 [backface-visibility:hidden] bg-brand-nav rounded-2xl md:rounded-3xl p-5 md:p-[34px] flex flex-col items-center justify-center text-center gap-3 md:gap-[18px]">
          {/* Icon - Using Tailwind classes instead of size prop */}
          <div className="text-brand-active">
            <Icon className="w-9 h-9 md:w-10 md:h-10" />
          </div>

          <h3 className="font-lato font-bold text-base md:text-xl text-brand-active">
            {title}
          </h3>
          <p className="font-lato text-brand-inactive leading-relaxed text-xs md:text-base">
            {description}
          </p>
          <span className="font-lato text-[10px] md:text-xs text-white/40 mt-auto">
            Tap to see more
          </span>
        </div>

        {/* BACK face */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-brand-active rounded-2xl md:rounded-3xl p-5 md:p-[34px] flex flex-col items-center justify-center text-center gap-3">
          <h3 className="font-lato font-bold text-base md:text-lg text-white">
            {title}
          </h3>
          <p className="font-lato text-white/90 leading-relaxed text-xs md:text-sm">
            {details}
          </p>
        </div>
      </div>
    </div>
  );
}
