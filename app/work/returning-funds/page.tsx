import type { Metadata } from "next";
import { CaseHero, CasePage, Figure, Outcomes, Section } from "@/components/case/Case";

/*
 * SimpleClosure — returning funds back to investors.
 * Structure is set; everything in [BRACKETS] still needs the real story.
 */

const summary = "[One line on what this work changed for founders returning money to their investors.]";

export const metadata: Metadata = {
  title: "Returning funds back to investors - Lalit",
  description: summary,
};

export default function Page() {
  return (
    <CasePage>
      <CaseHero
        title="Returning funds back to investors"
        tags={["Product design", "Web app", "Fintech"]}
        meta={[
          { label: "Role", value: "[Lead product designer]" },
          { label: "Timeline", value: "[YEAR]" },
          { label: "Company", value: "SimpleClosure" },
        ]}
      />

      <Figure caption="[Hero shot: the distribution flow a founder sees.]" aspect="16 / 9" />

      <Section title="The problem">
        <p>
          When a company winds down, whatever cash is left has to go back to the people who funded it, in the
          order and amounts the cap table and investor agreements say. [How this worked before: who did the
          math, how investors were contacted, how money actually moved, and where it broke down.]
        </p>
        <p>[A real number or a founder quote that shows the cost of the old way.]</p>
      </Section>

      <Section title="Who it was for">
        <ul>
          <li>[Founders: what they needed to feel confident signing off]</li>
          <li>[Investors: what they needed to receive their funds]</li>
          <li>[SimpleClosure ops / legal: what they needed to review and send]</li>
        </ul>
      </Section>

      <Section title="What I did">
        <p>
          [The constraint you designed around, the options you explored, and the one you shipped. Name the
          decision you&apos;d defend hardest.]
        </p>
        <ul>
          <li>[Research or audit step]</li>
          <li>[Exploration and the direction chosen]</li>
          <li>[Build-out and handoff]</li>
        </ul>
      </Section>

      <Figure caption="[Key screen: how a founder reviews who gets what.]" />

      <Section title="Making the numbers trustworthy">
        <p>
          [How the design showed the payout math so founders could check it before money moved: preview,
          review step, confirmations, edge cases like missing bank details or unreachable investors.]
        </p>
      </Section>

      <Figure caption="[The investor side: collecting payment details and confirming receipt.]" />

      <Section title="Outcome">
        <p>[What changed after launch, and what you&apos;d do differently.]</p>
      </Section>

      <Outcomes
        items={[
          { value: "[$X]", label: "[returned to investors]" },
          { value: "[N]", label: "[companies used it]" },
          { value: "[−X days]", label: "[time to complete a distribution]" },
        ]}
      />
    </CasePage>
  );
}
