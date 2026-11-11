export type ScreenKind = "desktop" | "phone";

/**
 * Stand-in product shot until the real screenshot goes in: a blank app screen drawn in
 * the page's own tones (bg, bg-surface, hairline, ink), sized to fit its container at
 * 16:10 (desktop) or 9:19.5 (phone). Purely decorative, so it is hidden from assistive tech.
 */
export function ScreenPlaceholder({ kind = "desktop" }: { kind?: ScreenKind }) {
  if (kind === "phone") {
    return (
      <div className="lds-screen lds-screen--phone" aria-hidden="true">
        <i className="lds-screen__title" />
        <i />
        <b className="lds-screen__hero" />
        <b />
        <b />
        <b className="lds-screen__cta" />
      </div>
    );
  }
  return (
    <div className="lds-screen lds-screen--desktop" aria-hidden="true">
      <div className="lds-screen__side">
        <i className="lds-screen__title" />
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="lds-screen__main">
        <i className="lds-screen__title" />
        <div className="lds-screen__stats">
          <b />
          <b />
          <b />
        </div>
        <b className="lds-screen__table" />
      </div>
    </div>
  );
}
