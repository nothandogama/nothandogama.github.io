import { ArrowUp, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { contact, links } from "@/data/content";
import { LinkButton, Reveal, Section } from "./ui";

export default function Contact() {
  return (
    <Section id="contact" index="09" slug="contact" title={contact.heading}>
      <Reveal className="mx-auto max-w-xl text-center">
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
          {contact.line}
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <LinkButton
            href={`mailto:${links.email}`}
            variant="primary"
            icon={<Mail className="h-4 w-4" />}
          >
            {links.email}
          </LinkButton>
          <LinkButton href={links.github} icon={<Github className="h-4 w-4" />}>
            GitHub
          </LinkButton>
          <LinkButton href={links.linkedin} icon={<Linkedin className="h-4 w-4" />}>
            LinkedIn
          </LinkButton>
        </div>

        <div className="mt-7 flex flex-col items-center gap-2 font-mono text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            {contact.location}
          </span>
          <span className="inline-flex items-center gap-2">
            <Phone className="h-3.5 w-3.5 text-primary" />
            {contact.phoneMasked}
            <span className="opacity-70">· {contact.phoneNote}</span>
          </span>
        </div>
      </Reveal>
    </Section>
  );
}

/** Transparent full-width footer, rendered outside <main> so its rule spans the page. */
export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-2 px-5 text-center">
        <p className="font-mono text-xs text-muted-foreground">{contact.footer}</p>
        <p className="font-mono text-[11px] text-muted-foreground opacity-70">
          {contact.footerNote}
        </p>
        <a
          href="#hero"
          className="mt-1 inline-flex items-center gap-1 font-mono text-[11px] text-primary hover:underline"
        >
          <ArrowUp className="h-3 w-3" />
          back to top
        </a>
      </div>
    </footer>
  );
}
