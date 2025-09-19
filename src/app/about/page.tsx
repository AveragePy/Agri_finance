export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">About</h1>
        <p className="text-muted-foreground">How to reach us for partnerships, demos and support.</p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <a href="mailto:your@email.com" className="rounded-lg border p-5 hover:bg-muted/60">
          <div className="font-medium">Email</div>
          <div className="text-muted-foreground text-sm mt-1">your@email.com</div>
        </a>
        <a href="tel:+254700000000" className="rounded-lg border p-5 hover:bg-muted/60">
          <div className="font-medium">Phone</div>
          <div className="text-muted-foreground text-sm mt-1">+254 700 000 000</div>
        </a>
        <a href="https://wa.me/254700000000" target="_blank" className="rounded-lg border p-5 hover:bg-muted/60" rel="noreferrer">
          <div className="font-medium">WhatsApp</div>
          <div className="text-muted-foreground text-sm mt-1">Chat with us</div>
        </a>
        <a href="#" className="rounded-lg border p-5 hover:bg-muted/60">
          <div className="font-medium">Website</div>
          <div className="text-muted-foreground text-sm mt-1">www.yourwebsite.com</div>
        </a>
      </section>

      <section className="rounded-lg border p-6">
        <h2 className="font-medium mb-2">Our mission</h2>
        <p className="text-sm text-muted-foreground">We connect farmers, input suppliers, financiers and markets through a modular digital platform that unlocks inclusive growth across the value chain.</p>
      </section>
    </div>
  );
}
