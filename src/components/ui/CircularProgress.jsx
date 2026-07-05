import { motion } from "framer-motion";

export default function CircularProgress({
  percentage,
  icon: Icon,
  label,
  size = 110,
}) {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  // Progress ring starts fully "empty" (offset = full circumference)
  // and animates to its real offset once the card scrolls into view.
  const circleVariants = {
    hidden: { strokeDashoffset: circumference },
    visible: {
      strokeDashoffset: offset,
      transition: { duration: 1.2, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="flex flex-col items-center gap-3"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.5 }}
    >
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#3A3A3A"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Filled progress - animates in when scrolled into view */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#FD6F00"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeLinecap="round"
            variants={circleVariants}
          />
        </svg>
        {/* Icon centered on top of the ring */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon size={28} className="text-brand-active" />
        </div>
      </div>
      <span className="font-lato font-bold text-xl text-brand-active">
        {percentage}%
      </span>
      <span className="font-lato text-brand-inactive">{label}</span>
    </motion.div>
  );
}
