export default function Logo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        viewBox="0 0 40 40"
        className="h-8 w-8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background circle */}
        <circle cx="20" cy="20" r="18" fill="hsl(var(--primary))" fillOpacity="0.1" stroke="hsl(var(--primary))" strokeWidth="2" />

        {/* Leaf/plant icon */}
        <path
          d="M12 28c0-6 4-10 8-10s8 4 8 10M16 24c2-4 4-6 4-6s2 2 4 6"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Invoice/document lines */}
        <path
          d="M14 14h12M14 17h8M14 20h10"
          stroke="hsl(var(--primary))"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.7"
        />
      </svg>
      <span className="font-semibold text-lg">Market Invoice</span>
    </div>
  );
}
