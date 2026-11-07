import { Avatar, Button, IconButton, Pill, ThemeToggle } from "@/components/ui";
import { site } from "@/content/site";
import styles from "./Sidebar.module.css";

/**
 * The home page's left column. On desktop it is sticky, full viewport height,
 * and never scrolls; below 960px it becomes a normal block above the work.
 */
export function Sidebar() {
  return (
    <aside className={styles.side} aria-label={`About ${site.name}`}>
      <div className={styles.top}>
        <div className={styles.row}>
          <Avatar src={site.avatar} alt={site.name} initials={site.name[0]} />
          {site.available && (
            <Pill variant="flat" dot>
              Available for work
            </Pill>
          )}
        </div>

        <div className={styles.intro}>
          <h1 className="title">{site.name}</h1>
          <p className={`body-lg muted ${styles.bio}`}>
            {site.bio.lead} {site.bio.rest} Currently at{" "}
            <a className="link" href={site.bio.currentlyAt.href}>
              {site.bio.currentlyAt.name}
            </a>
            .
          </p>
        </div>

        <div className={styles.actions}>
          <Button href="#work">View work</Button>
          <Button href={`mailto:${site.email}`} variant="secondary">
            Let&apos;s talk
          </Button>
        </div>
      </div>

      <div className={styles.bottom}>
        <p className="body-sm subtle">Previously at {site.previously.join(" · ")}</p>
        <div className={styles.row}>
          <div className={styles.socials}>
            {site.socials.map((s) => (
              <IconButton key={s.label} icon={s.icon} label={s.label} href={s.href} target="_blank" rel="noreferrer" />
            ))}
            <IconButton icon="mail" label="Email" href={`mailto:${site.email}`} filled />
          </div>
          <ThemeToggle />
        </div>
        <p className="mono-sm subtle">© {site.year} — {site.location.toUpperCase()}</p>
      </div>
    </aside>
  );
}
