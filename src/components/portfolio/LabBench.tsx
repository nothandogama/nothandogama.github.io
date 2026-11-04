import { useMemo, useState } from "react";
import { Dice5, Terminal } from "lucide-react";
import { labBench } from "@/data/content";
import { Reveal, Section } from "./ui";

/** Standard genetic code (mRNA codons -> 3-letter amino acid codes). */
const CODONS: Record<string, string> = {
  UUU: "Phe", UUC: "Phe", UUA: "Leu", UUG: "Leu",
  CUU: "Leu", CUC: "Leu", CUA: "Leu", CUG: "Leu",
  AUU: "Ile", AUC: "Ile", AUA: "Ile", AUG: "Met",
  GUU: "Val", GUC: "Val", GUA: "Val", GUG: "Val",
  UCU: "Ser", UCC: "Ser", UCA: "Ser", UCG: "Ser",
  CCU: "Pro", CCC: "Pro", CCA: "Pro", CCG: "Pro",
  ACU: "Thr", ACC: "Thr", ACA: "Thr", ACG: "Thr",
  GCU: "Ala", GCC: "Ala", GCA: "Ala", GCG: "Ala",
  UAU: "Tyr", UAC: "Tyr", UAA: "Stop", UAG: "Stop",
  CAU: "His", CAC: "His", CAA: "Gln", CAG: "Gln",
  AAU: "Asn", AAC: "Asn", AAA: "Lys", AAG: "Lys",
  GAU: "Asp", GAC: "Asp", GAA: "Glu", GAG: "Glu",
  UGU: "Cys", UGC: "Cys", UGA: "Stop", UGG: "Trp",
  CGU: "Arg", CGC: "Arg", CGA: "Arg", CGG: "Arg",
  AGU: "Ser", AGC: "Ser", AGA: "Arg", AGG: "Arg",
  GGU: "Gly", GGC: "Gly", GGA: "Gly", GGG: "Gly",
};

const MAX = 120;

function randomSeq() {
  const bases = "ATGC";
  let seq = "ATG";
  const extra = 12 + Math.floor(Math.random() * 12);
  for (let i = 0; i < extra * 3; i++) seq += bases[Math.floor(Math.random() * 4)];
  return (seq + "TGA").slice(0, MAX);
}

export default function LabBench() {
  const [raw, setRaw] = useState(labBench.examples[1]?.seq ?? "ATGGCCATTGTAATGGGCCGCTGA");

  const dna = useMemo(
    () => raw.replace(/\s/g, "").toUpperCase().replace(/[^ATGC]/g, "").slice(0, MAX),
    [raw],
  );
  const hasInvalid = /[^atgcATGC\s]/.test(raw);
  const mrna = dna.replace(/T/g, "U");

  /** Codon chips from the first AUG up to the first stop codon. */
  const chips = useMemo(() => {
    const start = mrna.indexOf("AUG");
    if (start === -1) return [];
    const out: { codon: string; aa: string; kind: "start" | "stop" | "normal" }[] = [];
    for (let i = start; i + 3 <= mrna.length; i += 3) {
      const codon = mrna.slice(i, i + 3);
      const aa = CODONS[codon] ?? "—";
      if (aa === "Stop") {
        out.push({ codon, aa, kind: "stop" });
        break;
      }
      out.push({ codon, aa, kind: out.length === 0 ? "start" : "normal" });
    }
    return out;
  }, [mrna]);

  return (
    <Section id="lab-bench" index="06" slug="lab_bench" title={labBench.title}>
      <Reveal>
        <div className="surface p-6">
          <label className="block">
            <span className="sr-only">DNA sequence</span>
            <span className="flex items-center gap-2 rounded-lg border border-border bg-black/25 px-3 py-2 focus-within:border-primary/60">
              <Terminal className="h-4 w-4 shrink-0 text-primary" />
              <input
                value={raw}
                maxLength={MAX + 20}
                onChange={(e) => setRaw(e.target.value)}
                placeholder={labBench.placeholder}
                spellCheck={false}
                className="w-full bg-transparent font-mono text-xs tracking-wider text-foreground outline-none placeholder:text-muted-foreground sm:text-sm"
              />
            </span>
          </label>
          {hasInvalid && (
            <p className="mt-2 font-mono text-[11px] text-violet">
              Only A, T, G and C are used — other characters are ignored.
            </p>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            {labBench.examples.map((ex) => (
              <button
                key={ex.label}
                type="button"
                onClick={() => setRaw(ex.seq)}
                className="rounded-md border border-border px-3 py-1.5 font-mono text-[11px] text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
              >
                {ex.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setRaw(randomSeq())}
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 font-mono text-[11px] text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
            >
              <Dice5 className="h-3.5 w-3.5" />
              Random
            </button>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <p className="font-mono text-[11px] tracking-widest text-primary">DNA</p>
              <p className="mt-1 overflow-x-auto whitespace-nowrap font-mono text-xs tracking-[0.2em] text-foreground">
                {dna || "—"}
              </p>
            </div>
            <div>
              <p className="font-mono text-[11px] tracking-widest text-primary">mRNA</p>
              <p className="mt-1 overflow-x-auto whitespace-nowrap font-mono text-xs tracking-[0.2em] text-violet">
                {mrna || "—"}
              </p>
            </div>
            <div>
              <p className="font-mono text-[11px] tracking-widest text-primary">Protein</p>
              <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
                {chips.length === 0 && (
                  <p className="font-mono text-xs text-muted-foreground">
                    No AUG start codon found yet.
                  </p>
                )}
                {chips.map((c, i) => (
                  <div
                    key={`${c.codon}-${i}`}
                    className={`shrink-0 rounded-md border px-2.5 py-1.5 text-center ${
                      c.kind === "start"
                        ? "border-primary/60 bg-primary/15"
                        : c.kind === "stop"
                          ? "border-violet/60 bg-violet/15"
                          : "border-border bg-muted/40"
                    }`}
                  >
                    <p className="font-mono text-xs text-foreground">{c.codon}</p>
                    <p className="font-mono text-[10px] text-muted-foreground">{c.aa}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-5 font-mono text-[11px] text-muted-foreground">{labBench.caption}</p>
        </div>
      </Reveal>
    </Section>
  );
}
