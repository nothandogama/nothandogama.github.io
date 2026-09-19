import { useState } from "react";
import { Dna, Menu, X } from "lucide-react";
import { nav } from "@/data/content";
import { useActiveSection } from "./hooks";

const ids = nav.map((n) => n.id);

export default function Nav() {
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-[1100px] items-center justify-between px-5 py-3">
        <a href="#hero" className="flex items-center gap-2 font-mono text-sm tracking-widest">
          <Dna className="h-4 w-4 text-primary" />
          <span>NG</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`rounded-md px-2.5 py-1.5 font-mono text-xs transition-colors ${
                  active === item.id
                    ? "text-primary"
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
          className="rounded-md border border-border p-2 text-foreground md:hidden"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {open && (
        <ul className="border-t border-border px-5 pb-4 md:hidden">
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
