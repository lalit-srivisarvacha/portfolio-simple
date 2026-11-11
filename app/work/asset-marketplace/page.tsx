import type { Metadata } from "next";
import { CaseHero, CasePage, Figure, Outcomes, Section, SplitSection } from "@/components/case/Case";
import { AssetFan, TrainingFlow } from "./figures";

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
        description="We help founders recover hidden value in company assets as part of their wind down process. Creating a marketplace for founders to list codebases and workspace data for AI labs to buy for AI training."
        meta={[
          { label: "Role", value: "Sole product designer", icon: "user" },
          { label: "Timeline", value: "2026", icon: "calendar" },
          { label: "Company", value: "SimpleClosure", brand: "simpleclosure" },
        ]}
      />

      {/* Hero shot: the marketplace in context */}
      <Figure aspect="16 / 9" />

      <SplitSection
        label="Opportunity"
        title="We were in a unique position to serve a new market"
        items={[
          {
            title: "AssetHub",
            body: (
              <p>
                We launched AssetHub to help founders who are shutting down liquidate their company&apos;s
                assets, from patents, domains and hardware to codebases and workspace data.
              </p>
            ),
            media: <AssetFan />,
          },
          {
            title: "AI opportunity",
            body: (
              <p>
                AI labs wanted codebases and workspace data to train their models, and were signing $1M+
                deals for batches of codebases. The market was growing quickly.
              </p>
            ),
            media: <TrainingFlow />,
          },
        ]}
      >
        <p>
          SimpleClosure helps companies shut down, and part of that process is helping founders liquidate
          what the company still owns. When AI labs began buying codebases and workspace data to train
          their language models, we already worked with the founders who had them to sell.
        </p>
      </SplitSection>

      <Section label="Approach" title="[Subheader: the direction you took.]">
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

      {/* Before / after, or the key flow */}
      <Figure />

      <Section label="Outcome" title="[Subheader: what changed.]">
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
