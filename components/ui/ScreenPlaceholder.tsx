export type ScreenKind = "desktop" | "square";

/**
 * Stand-in product shot until the real screenshot goes in, drawn in the page's own tones
 * (bg, bg-surface, hairline, ink). Cards take landscape or square shots only, so there are
 * two kinds: a 16:10 desktop app window, and a 1:1 panel (a list card, like a team or
 * inbox view). Each fits its container at its own ratio. Decorative, so hidden from
 * assistive tech.
 */
export function ScreenPlaceholder({ kind = "desktop" }: { kind?: ScreenKind }) {
  if (kind === "square") {
    return (
      <div className="lds-screen lds-screen--square" aria-hidden="true">
        <div className="lds-screen__head">
          <i className="lds-screen__title" />
          <i />
        </div>
        {[0, 1, 2, 3].map((n) => (
          <div className="lds-screen__row" key={n}>
            <b />
            <span>
              <i />
              <i />
            </span>
            <i />
          </div>
        ))}
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
