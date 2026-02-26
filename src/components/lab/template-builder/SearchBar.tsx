"use client";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function SearchBar({ value, onChange, placeholder = "Search..." }: SearchBarProps) {
  return (
    <label className="block">
      <span className="sr-only">Search cards</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-10 w-full rounded-lg border border-white/15 bg-card/70 px-3 text-sm outline-none ring-0 focus:border-cyan-300/60"
      />
    </label>
  );
}
