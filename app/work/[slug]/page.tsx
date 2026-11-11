import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseHero, CasePage, Figure, Section } from "@/components/case/Case";
import { projects } from "@/content/site";

/*
 * Fallback for projects listed in content/site.ts that don't yet have a
 * hand-coded page. A static folder (app/work/<slug>/page.tsx) always wins
 * over this route, so adding one replaces this stub for that project.
 */

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: `${p.title} - Lalit`, description: p.summary } : {};
}

export default async function Page({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();

  return (
    <CasePage>
      <CaseHero
        title={p.title}
        meta={[
          { label: "Role", value: "[ROLE]" },
          { label: "Timeline", value: "[YEAR]" },
        ]}
      />
      <Figure aspect="16 / 9" />
      <Section title="Case study coming soon">
        <p>
          This project is listed but not written up yet. Copy <strong>app/work/project-01</strong> to{" "}
          <strong>app/work/{p.slug}</strong> to replace this page.
        </p>
      </Section>
    </CasePage>
  );
}
