import type { Metadata } from "next";
import { CaseHero, CasePage, Figure, FigureRow, Outcomes, Section, Video } from "@/components/case/Case";

const media = (name: string) => ({
  src: `/work/returning-funds/${name}.mp4`,
  poster: `/work/returning-funds/${name}-poster.jpg`,
});

export const metadata: Metadata = {
  title: "Returning funds to investors - Lalit",
  description:
    "Automated how founders return leftover funds to investors: 1,041 investors and $1.5M through the new flow in its first five months.",
};

export default function Page() {
  return (
    <CasePage>
      <CaseHero
        title="Returning funds to investors"
        tags={["Product design", "Workflow automation"]}
        meta={[
          { label: "Role", value: "[ROLE]" },
          { label: "Timeline", value: "Q4 2025" },
          { label: "Company", value: "SimpleClosure" },
        ]}
      />

      <Figure aspect="1280 / 900" caption="The investor distribution hub: amount, status and the two tasks left to claim it.">
        <Video
          {...media("investor-final-f")}
          label="Investor distribution hub: opens how the amount was calculated, provides bank details after comparing ACH, wire and crypto, signs the release in a full-screen signing view, then the status moves to awaiting transfer and distribution sent"
        />
      </Figure>

      <Section title="Background">
        <p>
          SimpleClosure helps founders shut down their companies. We built a platform to streamline a fragmented,
          stressful process for founders at a difficult point in their entrepreneurial journey.
        </p>
        <p>
          If a company has funds left at the end of a shutdown, it has to return them to its investors. Doing that was
          a manual, time-intensive process for our operations team, and it had become a bottleneck on how many
          customers we could take on.
        </p>
      </Section>

      <Section title="The existing process" nav="Existing process">
        <p>
          Every return of funds was handled by hand. Operations spent at least 10 minutes per investor preparing
          releases and relaying bank details, which added up to more than 16 hours for a company with 100 investors.
        </p>
        <ol>
          <li>
            <strong>Calculate distribution amounts.</strong> Our team reviews cap tables and ledgers to run the
            waterfall calculation that sets how much each investor gets.
          </li>
          <li>
            <strong>Prepare and send releases.</strong> Ops prepares a release agreement for each investor, one at a
            time, to sign before they receive their distribution.
          </li>
          <li>
            <strong>Collect investor bank details.</strong> After a release is signed, ops copies the payment details
            from it into a spreadsheet for the founder.
          </li>
          <li>
            <strong>Founder distributes funds.</strong> The founder sends each payment by hand and marks its status in
            the spreadsheet.
          </li>
        </ol>
      </Section>

      <Section title="The goal" nav="Goal">
        <p>
          Automate the operational process of returning funds to investors. It laddered up to a company goal of
          removing operational bottlenecks so we could scale.
        </p>
        <p>
          I focused on steps 2 and 3, the work ops repeated by hand for every investor. Calculating amounts still
          needs legal and finance judgment, and founders pay from their own bank accounts, so those stayed as they
          were.
        </p>
        <ul>
          <li>
            <strong>Prepare and send releases</strong> became releases generated and sent automatically.
          </li>
          <li>
            <strong>Collect payment details</strong> became bank details relayed straight to the founder.
          </li>
        </ul>
      </Section>

      <Section title="What we built">
        <p>
          We automated everything on the operations side after the distribution amounts are calculated, and built a
          self-service experience for founders and investors that needs very little from ops.
        </p>
      </Section>

      <Section title="Operations uploads the investor table" nav="Operations">
        <p>
          Once the waterfall is done, ops exports it as a CSV and drops it into the admin. Every investor and amount
          loads in, and that is the last manual step on our side.
        </p>
      </Section>

      <Figure aspect="1440 / 900" caption="Ops uploads the waterfall as a CSV and the investor table fills in.">
        <Video
          {...media("investor-table-v6")}
          label="Operations downloads the waterfall Google Sheet as a CSV, switches to the SimpleClosure admin tab, and drags the file into the empty investor table; rows load in and a CSV upload successful toast appears"
        />
      </Figure>

      <Section title="Founders set up and sign once" nav="Founder setup">
        <p>
          The founder chooses which payment methods investors can pick from: ACH, wire or crypto. Then they review the
          generated release agreements, certify them, sign once and send every release to their investors together.
        </p>
      </Section>

      <FigureRow>
        <Figure aspect="640 / 900" caption="Choosing the payment methods investors can use.">
          <Video
            {...media("payment-methods-v4")}
            label="Founder selects the payment methods investors can choose from: ACH, crypto with BTC and other tickers, then confirms and the task completes"
          />
        </Figure>
        <Figure aspect="640 / 900" caption="Reviewing the releases, then signing and sending them all at once.">
          <Video
            {...media("review-release-v6")}
            label="Founder opens Sequoia Capital's release agreement, scrolls through it and closes it, then certifies the agreements, signs once and sends every release to investors"
          />
        </Figure>
      </FigureRow>

      <Section title="Founders track every distribution" nav="Founder tracking">
        <p>
          As investors sign, each one moves from signed release to distribution sent. The founder opens an
          investor&apos;s payment instructions, copies their bank details, uploads a transfer confirmation and marks the
          distribution as paid.
        </p>
      </Section>

      <FigureRow>
        <Figure aspect="740 / 863" caption="Each investor moves from signed release to distribution sent.">
          <Video
            {...media("tracker")}
            label="Founder view of the recipient tracker: each investor moves from signed release to distribution sent, and the status bar fills in"
          />
        </Figure>
        <Figure aspect="740 / 863" caption="Paying an investor from their payment instructions.">
          <Video
            {...media("tracking-v5")}
            label="An investor signs their release; the founder opens Lilly Allen's payment instructions, copies the bank details, uploads a transfer confirmation, and marks the distribution as paid"
          />
        </Figure>
      </FigureRow>

      <Section title="Investors claim their distribution" nav="Investor">
        <p>
          The first version was one linear flow: review and sign the release, then enter bank details for ACH. In the
          final version, shown at the top of this page, investors land on a hub with their amount and how it was
          calculated. They provide bank details after comparing ACH, wire and crypto, and sign the release in a
          full-screen view. The status then moves to awaiting transfer, then distribution sent.
        </p>
      </Section>

      <Figure aspect="1280 / 832" caption="The first version: sign the release, then enter bank details.">
        <Video
          {...media("investor-v1d")}
          label="Investor opens their return of funds, reviews and signs the release of claims, then enters bank details for ACH and submits"
        />
      </Figure>

      <Section title="Impact after five months" nav="Impact">
        <p>
          We launched on April 13, 2026. By September 26, 61 companies and 1,041 investors had gone through the new
          flow. The ops time below assumes about 10 minutes per investor to prepare and send releases and compile
          payment details: 10 minutes × 1,041 investors is 173.5 hours.
        </p>
      </Section>

      <Outcomes
        items={[
          { value: "1,041", label: "investors across 61 companies" },
          { value: "$1.5M", label: "returned to investors" },
          { value: "173 hrs", label: "of ops time saved, over four weeks full-time" },
        ]}
      />

      <Section title="What I heard next" nav="Feedback">
        <p>Since launch, feedback from clients and our ops team has shaped what comes next.</p>
        <ul>
          <li>
            <strong>Sending payments one by one takes too long.</strong> Banks don&apos;t support bulk wire payments, so
            clients with 50 to 100 or more investors send each payment by hand. They would pay a premium for
            SimpleClosure to handle it.
          </li>
          <li>
            <strong>Clients need custom release agreements.</strong> Ops gets requests for unique or custom releases
            and wants to choose which agreement each company uses.
          </li>
          <li>
            <strong>Some investors won&apos;t sign a release.</strong> Investors aren&apos;t legally required to sign one
            to receive a distribution, and some refuse. Paying them out needs engineering today, so ops wants to mark
            them as declined to sign, let founders pay them anyway, and flag it on the dashboard.
          </li>
        </ul>
      </Section>
    </CasePage>
  );
}
