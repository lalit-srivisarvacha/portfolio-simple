import type { Metadata } from "next";
import { CaseHero, CasePage, Figure, Outcomes, Section } from "@/components/case/Case";

/*
 * TEMPLATE — a hand-coded case study.
 * Copy this folder to app/work/<slug>/ for each project and write the story.
 * Keep the shape loose: add or drop Sections and Figures as the work needs.
 * Everything in [BRACKETS] is a placeholder.
 */

export const metadata: Metadata = {
  title: "Project 01 - Lalit",
  description: "[One line on what this work changed.]",
};

export default function Page() {
  return (
    <CasePage>
      <CaseHero
        title="Project 01"
        tags={["Product design", "iOS"]}
        meta={[
          { label: "Role", value: "Lead product designer" },
          { label: "Timeline", value: "2024 — 2025" },
          { label: "Company", value: "[COMPANY]" },
        ]}
      />

      <Figure caption="[Hero shot: the finished product in context.]" aspect="16 / 9" />

      <Section title="The problem">
        <p>
          [Two or three sentences on what was broken, for whom, and how you knew. Quote a real user or a
          real number if you have one.]
        </p>
      </Section>

      <Section title="What I did">
        <p>
          [How you approached it: the constraint you chose to design around, the options you explored, and
          the one you shipped. Mention the decision you&apos;d defend hardest.]
        </p>
        <ul>
          <li>[Audit / research step]</li>
          <li>[Exploration and the direction chosen]</li>
          <li>[Build-out and handoff]</li>
        </ul>
      </Section>

      <Figure caption="[Before / after, or the key flow.]" />

      <Section title="Outcome">
        <p>[What changed after launch, and what you&apos;d do differently.]</p>
      </Section>

      <Outcomes
        items={[
          { value: "[−66%]", label: "[steps to first value]" },
          { value: "[+18%]", label: "[activation]" },
          { value: "[4 wks]", label: "[concept to ship]" },
        ]}
      />
    </CasePage>
  );
}
