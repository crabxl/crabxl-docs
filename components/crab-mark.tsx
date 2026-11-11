/** The CrabXL crab. Its shell is a block of 3 x 2 cells. Uses the text color. */
export function CrabMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" className={className}>
      <mask id="crab-cells" maskUnits="userSpaceOnUse" x="0" y="0" width="120" height="120">
      <rect width="120" height="120" fill="#fff"/>
      <path fill="#000" d="M47 50h3v50h-3zM70 50h3v50h-3zM20 73.5h80v3H20z"/>
      </mask>
      <g fill="currentColor" stroke="currentColor" strokeLinecap="round">
      <path stroke="none" d="M38.00 21.62A15 15 0 1 1 22.69 12.06L24.63 25.98Z"/>
      <path stroke="none" d="M97.31 12.06A15 15 0 1 1 82.00 21.62L95.37 25.98Z"/>
      <path fill="none" strokeWidth="8" d="M29 40 37 56M91 40 83 56"/>
      <path fill="none" strokeWidth="5" d="M55 54 52 43M65 54 68 43"/>
      <circle stroke="none" cx="51" cy="39" r="5.5"/><circle stroke="none" cx="69" cy="39" r="5.5"/>
      <path fill="none" strokeWidth="6" d="M28 66 12 60M28 82 10 84M32 92 16 100M92 66 108 60M92 82 110 84M88 92 104 100"/>
      </g>
      <rect mask="url(#crab-cells)" fill="currentColor" x="24" y="52" width="72" height="46" rx="16"/>
    </svg>
  );
}
