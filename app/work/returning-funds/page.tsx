import type { Metadata } from "next";
import {
  CaseHero,
  CasePage,
  Cards,
  Chapter,
  Compare,
  CountUp,
  FeatureTabs,
  Figure,
  Section,
  Video,
  VolumeArc,
  WorkCalendar,
} from "@/components/case/Case";

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
    <CasePage brand="simpleclosure">
      <CaseHero
        title="Returning funds to investors"
        tags={["Product design", "Workflow automation"]}
        meta={[
          { label: "Role", value: "Sole product designer" },
          { label: "Timeline", value: "Q4 2025" },
          { label: "Company", value: "SimpleClosure" },
        ]}
      />

      <Figure caption="Founders watch each investor move from signed release to distribution sent.">
        <Video
          {...media("tracker")}
          size={[740, 863]}
          label="Founder view of the recipient tracker: each investor moves from signed release to distribution sent, and the status bar fills in"
        />
      </Figure>

      <Chapter title="Background">
        <Section title="Returning funds held back growth">
          <p>
            SimpleClosure helps founders shut down their companies. Money left at the end goes back to investors, and
            our ops team did that by hand: at least 10 minutes per investor, over 16 hours for a company with 100.
          </p>
        </Section>

        <Cards
          numbered
          columns={4}
          items={[
            {
              title: "Calculate amounts",
              body: "Our team runs a waterfall over the cap table to set what each investor gets.",
            },
            {
              title: "Prepare releases",
              body: "Ops writes a release agreement for each investor, one at a time.",
            },
            {
              title: "Collect bank details",
              body: "Ops copies payment details from each signed release into a spreadsheet.",
            },
            {
              title: "Send funds",
              body: "The founder wires each payment by hand and marks it in the spreadsheet.",
            },
          ]}
        />

        <Section title="The goal">
          <p>
            Automate steps 2 and 3, the work repeated for every investor. Amounts still need legal and finance
            judgment, and founders pay from their own bank.
          </p>
        </Section>

        <Compare
          items={[
            {
              label: "Prepare releases",
              before: "Ops wrote and sent each release by hand.",
              after: "Releases are generated and sent automatically.",
            },
            {
              label: "Collect bank details",
              before: "Ops copied bank details into a spreadsheet.",
              after: "Bank details go straight to the founder.",
            },
          ]}
        />
      </Chapter>

      <Chapter title="What we built">
        <Section title="Self-service for founders and investors">
          <p>Everything after the waterfall runs without ops. Pick a step to see it.</p>
        </Section>

        <FeatureTabs
          items={[
            {
              who: "Operations",
              title: "Upload the investor table",
              body: "Ops exports the waterfall as a CSV and drops it in. Every investor and amount loads, and that is the last manual step on our side.",
              video: {
                ...media("investor-table-v6"),
                size: [1440, 900],
                label:
                  "Operations downloads the waterfall Google Sheet as a CSV, switches to the SimpleClosure admin tab, and drags the file into the empty investor table; rows load in and a CSV upload successful toast appears",
              },
            },
            {
              who: "Founder",
              title: "Choose payment methods",
              body: "The founder picks what investors can be paid by: wire, ACH or crypto.",
              video: {
                ...media("payment-methods-v4"),
                size: [640, 900],
                label:
                  "Founder selects the payment methods investors can choose from: ACH, crypto with BTC and other tickers, then confirms and the task completes",
              },
            },
            {
              who: "Founder",
              title: "Sign every release at once",
              body: "Releases are generated for every investor. The founder reviews them, signs once and sends them all.",
              video: {
                ...media("review-release-v6"),
                size: [640, 900],
                label:
                  "Founder opens Sequoia Capital's release agreement, scrolls through it and closes it, then certifies the agreements, signs once and sends every release to investors",
              },
            },
            {
              who: "Founder",
              title: "Pay and track each investor",
              body: "As investors sign, their payment instructions appear. The founder sends the transfer, uploads the confirmation and marks it paid.",
              video: {
                ...media("tracking-v5"),
                size: [740, 863],
                label:
                  "An investor signs their release; the founder opens Lilly Allen's payment instructions, copies the bank details, uploads a transfer confirmation, and marks the distribution as paid",
              },
            },
            {
              who: "Investor",
              title: "Claim a distribution",
              body: "Investors see their amount and how it was calculated, choose how to be paid and sign in one place. This hub replaced a first version that was one linear flow.",
              video: {
                ...media("investor-final-f"),
                size: [1280, 900],
                label:
                  "Investor distribution hub: opens how the amount was calculated, provides bank details after comparing ACH, wire and crypto, signs the release in a full-screen signing view, then the status moves to awaiting transfer and distribution sent",
              },
            },
          ]}
        />
      </Chapter>

      <Chapter title="Results">
        <Section title="Impact after five months">
          <p>Launched April 13, 2026. Numbers as of September 26.</p>
        </Section>

        <FeatureTabs
          items={[
            {
              who: "Volume",
              title: "61 companies and 1,041 investors",
              body: "Every one of them went through the new flow instead of an ops spreadsheet. Hover the chart to see each company.",
              media: <VolumeArc companies={61} investors={1041} />,
            },
            {
              who: "Capital returned",
              title: "$1.5M back to investors",
              body: "Returned through the automated flow, from release to payment confirmation.",
              media: <CountUp value={1500000} prefix="$" caption="returned to investors" />,
            },
            {
              who: "Operational productivity",
              title: "Over four weeks of full-time work saved",
              body: "At about 10 minutes per investor to prepare releases and compile payment details: 10 minutes × 1,041 investors is 173.5 hours.",
              media: <WorkCalendar hours={173.5} />,
            },
          ]}
        />

        <Section title="What I heard next" />

        <Cards
          items={[
            {
              title: "Bulk payments",
              body: "Banks don't support bulk wires, so clients with 50 to 100 or more investors send each one by hand. They would pay for us to handle it.",
            },
            {
              title: "Custom release agreements",
              body: "Some clients need their own release. Ops wants to choose which agreement each company uses.",
            },
            {
              title: "Investors who won't sign",
              body: "Signing isn't legally required and some refuse. Ops wants to mark them declined, let founders pay anyway and flag it.",
            },
          ]}
        />
      </Chapter>
    </CasePage>
  );
}
