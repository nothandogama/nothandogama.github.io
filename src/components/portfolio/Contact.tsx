import { ArrowUp, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { contact, hero, links } from "@/data/content";
import { LinkButton, Reveal, Section } from "./ui";

const icon = "h-4 w-4";

export default function Contact() {
  return (
    <Section id="contact" index="09" slug="contact" title={contact.heading}>
      <Reveal className="max-w-xl">
        <p className="text-[15px] leading-relaxed text-muted-foreground sm:text-base">
          {contact.line}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <LinkButton
            href={`mailto:${links.email}`}
            variant="primary"
            icon={<Mail className={icon} strokeWidth={1.5} />}
          >
            {links.email}
          </LinkButton>
          <LinkButton href={links.github} icon={<Github className={icon} strokeWidth={1.5} />}>
            GitHub
          </LinkButton>
          <LinkButton href={links.linkedin} icon={<Linkedin className={icon} strokeWidth={1.5} />}>
            LinkedIn
          </LinkButton>
        </div>

        <dl className="mt-8 space-y-2 font-mono text-xs text-faint">
          <div className="flex items-center gap-2">
            <dt className="sr-only">Location</dt>
            <MapPin className="h-4 w-4" strokeWidth={1.5} />
            <dd>{contact.location}</dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="sr-only">Phone</dt>
            <Phone className="h-4 w-4" strokeWidth={1.5} />
            <dd>
              {contact.phoneMasked}
              <span className="opacity-70"> · {contact.phoneNote}</span>
            </dd>
          </div>
        </dl>
      </Reveal>
    </Section>
  );
}

const footerLink =
  "inline-flex items-center gap-2 rounded-md text-sm text-faint transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

/**
 * Transparent full-width footer, rendered outside <main> so its rule spans the page.
 * Both rows share one vertical padding.
 */
export function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto grid max-w-[1100px] gap-6 px-5 py-8 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="text-base font-medium">Nothando Gama</p>
          <p className="mt-1 text-sm text-faint">
            {hero.role} · {contact.location}
          </p>
        </div>

        <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <li>
            <a href={`mailto:${links.email}`} className={footerLink}>
              <Mail className="h-4 w-4" strokeWidth={1.5} />
              Email
            </a>
          </li>
          {links.github && (
            <li>
              <a href={links.github} target="_blank" rel="noreferrer" className={footerLink}>
                <Github className="h-4 w-4" strokeWidth={1.5} />
                GitHub
              </a>
            </li>
          )}
          {links.linkedin && (
            <li>
              <a href={links.linkedin} target="_blank" rel="noreferrer" className={footerLink}>
                <Linkedin className="h-4 w-4" strokeWidth={1.5} />
                LinkedIn
              </a>
            </li>
          )}
          <li>
            <a href="#hero" className={footerLink}>
              <ArrowUp className="h-4 w-4" strokeWidth={1.5} />
              Back to top
            </a>
          </li>
        </ul>
      </div>

      <div className="border-t border-hairline">
        <div className="mx-auto flex max-w-[1100px] flex-col gap-1 px-5 py-8 font-mono text-xs text-faint sm:flex-row sm:justify-between">
          <p>{contact.footer}</p>
          <p className="opacity-80">{contact.footerNote}</p>
        </div>
      </div>
    </footer>
  );
}
