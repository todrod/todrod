"use client";

import { useState } from "react";

export function CopyBlock({ title, value }: { title: string; value: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-card/60 p-4">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-semibold">{title}</h3>
        <button
          type="button"
          onClick={copy}
          className="rounded-md border border-white/15 px-2 py-1 text-xs hover:border-cyan-300/60"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="max-h-64 overflow-auto rounded-lg bg-black/40 p-3 text-xs text-zinc-200">{value}</pre>
    </div>
  );
}
