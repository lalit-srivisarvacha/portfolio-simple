import { Avatar, Button, ThemeToggle } from "@/components/ui";
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
          <Avatar src={site.avatar} alt={site.fullName} initials={site.name[0]} />
        </div>

        <div className={styles.intro}>
          <h1 className="title">{site.fullName}</h1>
          <p className={`body-lg muted ${styles.bio}`}>
            {site.bio.lead} Currently at{" "}
            <a className="link" href={site.bio.currentlyAt.href} target="_blank" rel="noreferrer">
              {site.bio.currentlyAt.name}
            </a>{" "}
            {site.bio.rest}
          </p>
        </div>

        <div className={styles.actions}>
          <Button href={`mailto:${site.email}`}>Email me</Button>
          <Button href={site.linkedin} target="_blank" rel="noreferrer" className={styles.linkedin}>
            LinkedIn
          </Button>
        </div>
      </div>

      <div className={styles.bottom}>
        <ThemeToggle />
      </div>
    </aside>
  );
}
