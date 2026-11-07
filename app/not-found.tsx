import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        gap: "var(--space-5)",
        padding: "var(--space-7)",
        maxWidth: 560,
      }}
    >
      <p className="mono-sm subtle">404</p>
      <h1 className="title">Nothing here.</h1>
      <p className="body-lg muted">The page moved, or never existed. The work is back on the home page.</p>
      <Button href="/" variant="secondary">
        Back home
      </Button>
    </main>
  );
}
