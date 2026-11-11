import type { CSSProperties } from "react";

type BrandSpec = {
  name: string;
  /** Well fill, as on the company's LinkedIn avatar. A CSS color or gradient. */
  bg: string;
  /** Mark color on that fill. */
  ink: string;
  /** Mark size as a fraction of the well, so each brand sits at a similar optical weight. */
  scale: number;
  viewBox?: string;
  path?: string;
  evenOdd?: boolean;
  /** Raster mark in /public, for a company with no SVG. Its own background must match `bg`. */
  src?: string;
  /** Hairline ring, for a well too close to the chip's color to read as a circle. */
  ring?: boolean;
  /** Optical nudge, as a fraction of the well (positive moves down), for marks whose weight sits off their box. */
  offsetY?: number;
};

/**
 * The companies whose work is on the site. Brand colors live here and nowhere else.
 * Paths are the companies' own marks; never redraw one. A company with no SVG uses its supplied image (`src`); with neither,
 * its initial shows.
 */
export const BRANDS = {
  simpleclosure: {
    name: "SimpleClosure",
    bg: "#ABFC96",
    ink: "#171717",
    scale: 0.5,
    viewBox: "0 0 20 22",
    path: "M19.3867 9.59732V21.1146H16.4784V11.037C16.4784 6.53582 12.7851 2.87932 8.23865 2.87932C3.69216 2.87932 0 6.53582 0 11.037V9.59732C0 4.29986 4.34312 0 9.69392 0C15.0447 0 19.3878 4.29986 19.3878 9.59732H19.3867ZM6.95036 5.75863H6.62091C2.96623 5.75863 0 8.69528 0 12.3135V13.8781C0 10.9886 2.36526 8.63793 5.29286 8.63793H5.37011C8.28749 8.63793 10.663 10.9796 10.663 13.8781V21.1146H13.5713V12.3135C13.5713 8.69528 10.605 5.75863 6.95036 5.75863ZM3.87735 11.5172C1.73475 11.5172 0 13.2347 0 15.356V21.1146H7.75468V15.356C7.75468 13.2347 6.01994 11.5172 3.87735 11.5172Z",
  },
  rev: {
    name: "Rev",
    bg: "linear-gradient(180deg, #7D32E6 0%, #5D39C5 100%)",
    ink: "#FFFFFF",
    scale: 0.58,
    viewBox: "0 0 123 124",
    path: "M69.5097 61.8372H83.9994C83.9187 55.9589 81.5425 50.3488 77.3854 46.221C73.2284 42.0929 67.6249 39.7789 61.7863 39.7795C55.889 39.7886 50.2354 42.1515 46.0653 46.351C41.8952 50.5501 39.5483 56.2426 39.5392 62.1812C39.5483 68.1198 41.8952 73.8123 46.0653 78.0118C50.2354 82.2109 55.889 84.5741 61.7863 84.5831H118.447C117.322 87.4331 115.985 90.1941 114.448 92.8419H61.7863C57.7873 92.8452 53.827 92.0537 50.1323 90.5123C46.4377 88.9713 43.082 86.7106 40.2569 83.8606C37.4264 81.016 35.1813 77.6366 33.6507 73.9161C32.1201 70.196 31.334 66.2081 31.3375 62.1812C31.3375 54.0496 34.5455 46.251 40.2557 40.501C45.9659 34.7511 53.7109 31.5207 61.7863 31.5207C69.8621 31.5207 77.6067 34.7511 83.3169 40.501C89.0272 46.251 92.2353 54.0496 92.2353 62.1812H106.725C106.725 50.1798 101.99 38.6702 93.5627 30.184C85.1353 21.6978 73.7051 16.9304 61.7863 16.9304C49.8679 16.9304 38.4375 21.6978 30.0099 30.184C21.5823 38.6702 16.8478 50.1798 16.8478 62.1812C16.8478 74.1826 21.5823 85.6924 30.0099 94.1787C38.4375 102.665 49.8679 107.432 61.7863 107.432H102.761C91.4693 117.86 76.6977 123.633 61.3764 123.605C45.0985 123.605 29.4871 117.094 17.9768 105.504C6.46652 93.9138 0 78.1939 0 61.8027C0 45.4116 6.46652 29.6918 17.9768 18.1016C29.4871 6.51132 45.0985 0 61.3764 0C77.6544 0 93.2657 6.51132 104.776 18.1016C116.286 29.6918 122.752 45.4116 122.752 61.8027C122.76 64.5309 122.577 67.2558 122.206 69.9581H61.7863C59.7381 69.9581 57.7734 69.1388 56.325 67.6806C54.877 66.222 54.0629 64.2439 54.0629 62.1812C54.0629 60.1186 54.877 58.1404 56.325 56.6822C57.7734 55.2236 59.7381 54.4043 61.7863 54.4043C63.777 54.4023 65.6912 55.1744 67.1302 56.5592C68.5693 57.944 69.4217 59.8348 69.5097 61.8372Z",
  },
  oscar: {
    name: "Oscar Health",
    bg: "#4F50FF",
    ink: "#F3F3EC",
    scale: 0.46,
    viewBox: "0 0 106 106",
    evenOdd: true,
    path: "M52.6707 0C22.3925 0 0 24.6972 0 52.2907C0 77.8599 19.8574 105.89 52.6707 105.89C85.7643 105.89 105.341 77.4239 105.341 52.7268C105.267 23.8251 82.245 0 52.6707 0ZM52.6707 88.4614C32.3897 88.4614 18.5182 70.8837 18.5182 52.8762C18.5182 35.0806 32.2527 17.4344 52.6707 17.4344C73.0887 17.4344 86.8232 35.0058 86.8232 52.6582C86.7484 71.6125 72.1731 88.4614 52.6707 88.4614Z",
  },
  sleepreset: {
    name: "Sleep Reset",
    bg: "#F7F7F7",
    ink: "#2A2B31",
    scale: 0.6,
    ring: true,
    // The heavy arc sits at the top of the box, so the centered mark reads high.
    offsetY: 0.05,
    viewBox: "0 0 37 23",
    evenOdd: true,
    path: "M0.801347 1.89365C4.2594 8.12655 10.8915 11.9983 18.116 11.9983C25.3531 11.9983 31.9938 8.11615 35.4466 1.86577C35.786 1.25182 35.5549 0.486812 34.9295 0.153582C34.304 -0.179648 33.5247 0.0472623 33.1852 0.661212C30.1829 6.096 24.4093 9.47305 18.116 9.47305C11.8359 9.47305 6.06768 6.10637 3.06004 0.686492C2.72058 0.0751423 1.94126 -0.151768 1.31583 0.181462C0.691054 0.514692 0.461882 1.2797 0.801347 1.89365ZM3.06533 11.0589C3.4398 11.3286 3.78388 11.573 4.12071 11.8122C4.45225 12.0475 4.77718 12.2783 5.11797 12.524C5.14901 12.5467 5.15891 12.5895 5.1358 12.6226C5.00833 12.795 4.86304 12.9915 4.70717 13.2035L4.70585 13.2048L4.70387 13.2074C3.9338 14.2499 2.89559 15.6554 2.41942 16.2972C2.22129 16.565 1.9307 16.7465 1.5985 16.8126C0.831727 16.9617 0.101284 16.4385 0.00882228 15.6787V15.6761C-0.0294831 15.3481 0.0576946 15.0194 0.255826 14.7516C0.827104 13.9815 2.216 12.1046 2.97815 11.0718C2.99862 11.0433 3.03759 11.0407 3.06533 11.0589ZM10.8605 15.1296C11.2422 15.2502 11.6167 15.3688 12.011 15.4966C12.0493 15.5089 12.0704 15.5471 12.0572 15.5847C11.6609 16.7841 10.9305 18.9942 10.6293 19.9038C10.5263 20.2169 10.305 20.4821 10.0118 20.6435C9.33024 21.0169 8.46837 20.742 8.14409 20.0477V20.0451C8.0054 19.7443 7.98427 19.4059 8.08729 19.0901C8.38845 18.1838 9.1189 15.9789 9.5178 14.764C9.52771 14.7309 9.56139 14.716 9.59507 14.7264C10.0455 14.8709 10.4569 15.0012 10.8605 15.1296ZM24.4351 15.4278C24.8816 15.2878 25.2884 15.1568 25.6873 15.0285C26.0717 14.9046 26.4494 14.7828 26.8483 14.6576C26.8866 14.6453 26.9283 14.6654 26.9382 14.7004C27.2611 15.6709 27.8027 17.3066 28.1567 18.3757C28.2392 18.6253 28.3119 18.8444 28.3687 19.0162C28.4717 19.3294 28.4512 19.6704 28.3119 19.9712C27.985 20.6681 27.1231 20.9411 26.4442 20.567L26.4415 20.5644C26.1483 20.403 25.9297 20.1404 25.824 19.8247C25.5255 18.9183 24.795 16.7134 24.3909 15.4985C24.3836 15.4706 24.4041 15.4382 24.4351 15.4278ZM32.4284 11.5885C32.0671 11.8472 31.7006 12.1104 31.2937 12.3976C31.268 12.4177 31.2601 12.4534 31.2786 12.4832C32.0453 13.516 33.4322 15.3902 34.0029 16.163C34.1983 16.4308 34.4916 16.6123 34.8211 16.6784H34.8238C35.5879 16.8275 36.321 16.3043 36.4135 15.5445C36.4518 15.2158 36.3646 14.8878 36.1665 14.62C35.5952 13.8472 34.2036 11.9659 33.4468 10.948C33.4237 10.9149 33.3801 10.9104 33.3464 10.9331C33.0307 11.1561 32.7315 11.3714 32.4284 11.5885ZM18.2613 16.2311C17.8459 16.2324 17.4219 16.2337 16.9583 16.2311C16.9246 16.2311 16.8962 16.2564 16.8962 16.2914C16.8982 17.2049 16.8975 18.648 16.8969 19.7456C16.8969 20.1838 16.8962 20.5676 16.8962 20.8399C16.8936 21.1686 17.0224 21.4863 17.2489 21.7288L17.2515 21.7314C17.7819 22.2947 18.6873 22.2947 19.217 21.7314C19.4462 21.4889 19.5723 21.1732 19.5723 20.8425C19.5723 19.8856 19.5723 17.5621 19.5697 16.3018C19.5697 16.2616 19.536 16.2311 19.4977 16.2311C19.0737 16.2285 18.6715 16.2298 18.2613 16.2311Z",
  },
  gojilabs: {
    name: "Goji Labs",
    bg: "#ED0044",
    ink: "#FFFFFF",
    // The supplied 447px image: mark spans 75% of it, so 0.8 sets the mark near 0.6 like the others.
    scale: 0.8,
    src: "/brandmarks/gojilabs.jpg",
  },
} satisfies Record<string, BrandSpec>;

export type BrandId = keyof typeof BRANDS;

export type BrandmarkProps = {
  brand: BrandId;
  /** Diameter in px. 24 in the ProjectCard chip. */
  size?: number;
  /** Give the mark an accessible name. Leave off when the company name is already said nearby. */
  labelled?: boolean;
  /**
   * Drop the brand colors: the mark in ink-muted on bg-surface, to sit beside neutral icon circles.
   * A company with only a raster mark shows its initial instead, since an image can't be recolored.
   */
  neutral?: boolean;
  className?: string;
};

/** A company's mark on its brand color in a round well, applied like its LinkedIn avatar. */
export function Brandmark({ brand, size = 24, labelled, neutral, className }: BrandmarkProps) {
  const spec: BrandSpec = BRANDS[brand];
  const style = {
    "--bm-size": `${size}px`,
    "--bm-bg": neutral ? "var(--bg-surface)" : spec.bg,
    "--bm-ink": neutral ? "var(--ink-muted)" : spec.ink,
    "--bm-scale": spec.scale,
    "--bm-y": spec.offsetY ?? 0,
  } as CSSProperties;

  return (
    <span
      className={["lds-brandmark", spec.ring && !neutral && "lds-brandmark--ring", className].filter(Boolean).join(" ")}
      style={style}
      role={labelled ? "img" : undefined}
      aria-label={labelled ? spec.name : undefined}
      aria-hidden={labelled ? undefined : true}
    >
      {spec.path ? (
        <svg viewBox={spec.viewBox} focusable="false">
          <path d={spec.path} fillRule={spec.evenOdd ? "evenodd" : undefined} clipRule={spec.evenOdd ? "evenodd" : undefined} />
        </svg>
      ) : spec.src && !neutral ? (
        // eslint-disable-next-line @next/next/no-img-element -- 24–96px mark, no optimization needed
        <img src={spec.src} alt="" width={size} height={size} />
      ) : (
        <span className="lds-brandmark__initial">{spec.name.charAt(0)}</span>
      )}
    </span>
  );
}
