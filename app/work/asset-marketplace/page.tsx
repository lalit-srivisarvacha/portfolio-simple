import type { Metadata } from "next";
import { CaseHero, CasePage, Figure, Outcomes, Section } from "@/components/case/Case";

/*
 * SimpleClosure — Building an asset marketplace.
 * Everything in [BRACKETS] is a placeholder still to be written.
 * Images go in public/work/asset-marketplace/.
 */

export const metadata: Metadata = {
  title: "Building an asset marketplace - Lalit",
  description: "[One line on what this work changed.]",
};

export default function Page() {
  return (
    <CasePage>
      <CaseHero
        title="Building an asset marketplace"
        tags={["Product design", "[PLATFORM]"]}
        meta={[
          { label: "Role", value: "[ROLE]" },
          { label: "Timeline", value: "[YEAR]" },
          { label: "Company", value: "SimpleClosure" },
        ]}
      />

      <Figure caption="[Hero shot: the marketplace in context.]" aspect="16 / 9" />

      <Section title="The problem">
        <p>
          [Two or three sentences on what was broken, for whom, and how you knew. Quote a real founder or
          a real number if you have one.]
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
          { value: "[00%]", label: "[first metric]" },
          { value: "[00%]", label: "[second metric]" },
          { value: "[0 wks]", label: "[concept to ship]" },
        ]}
      />
    </CasePage>
  );
}
