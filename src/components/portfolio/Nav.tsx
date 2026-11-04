import { useState } from "react";
import { Dna, Menu, X } from "lucide-react";
import { nav } from "@/data/content";
import { useActiveSection } from "./hooks";

const ids = nav.map((n) => n.id);

/** Floating glass pill, fixed to the top so it stays visible while scrolling. */
export default function Nav() {
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-3 z-50 px-3">
      <div className="glass-pill mx-auto flex w-full max-w-max items-center justify-between gap-2 rounded-full py-1.5 pl-4 pr-1.5 max-md:max-w-none md:gap-4">
        <a href="#hero" className="flex items-center gap-2 font-mono text-sm tracking-widest">
          <Dna className="h-4 w-4 text-primary" />
          <span>NG</span>
        </a>

        <ul className="hidden items-center gap-0.5 md:flex">
          {nav.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block rounded-full px-3 py-1.5 font-mono text-xs transition-colors ${
                  active === item.id
                    ? "bg-primary/30 text-foreground shadow-[inset_0_1px_0_rgb(255_255_255/0.35)]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="rounded-full border border-border p-2 text-foreground md:hidden"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {open && (
        <ul className="glass-pill mt-2 rounded-2xl px-5 py-2 md:hidden">
          {nav.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className={`block py-2 font-mono text-sm ${
                  active === item.id ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
