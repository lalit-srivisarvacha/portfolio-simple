import { ProjectCard } from "@/components/ui";
import { Sidebar } from "@/components/site/Sidebar";
import { projects } from "@/content/site";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.home}>
      <Sidebar />
      <main className={styles.work} id="work" aria-label="Selected work">
        {projects.map((p, i) => (
          <ProjectCard
            key={p.slug}
            title={p.title}
            href={`/work/${p.slug}`}
            image={p.image}
            imageAlt={p.imageAlt}
            iconSrc={p.iconSrc}
            padded={p.padded}
            seed={p.seed}
            priority={i < 2}
          />
        ))}
      </main>
    </div>
  );
}
