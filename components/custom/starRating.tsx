import { Star } from "lucide-react";

export default function StarRating({
  value,
  outOf = 5,
  color = "text-yellow-500",
}: {
  value: number;
  outOf?: number;
  color?: string;
}) {
  return (
    <div className={`flex items-center gap-0.5 ${color}`}>
      {Array.from({ length: value }).map((_, i) => (
        <Star
          key={`filled-${i}`}
          size={18}
          fill="currentColor"
          stroke="currentColor"
          strokeWidth={1}
        />
      ))}
      {Array.from({ length: outOf - value }).map((_, i) => (
        <Star
          key={`empty-${i}`}
          size={18}
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
        />
      ))}
    </div>
  );
}
