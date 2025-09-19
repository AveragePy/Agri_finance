export default function Footer() {
  return (
    <footer className="mt-16 border-t">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-8 grid gap-4 md:grid-cols-3">
        <div className="text-sm text-muted-foreground">© {new Date().getFullYear()} Market Voice. All rights reserved.</div>
        <div className="text-sm">
          <a href="/about" className="footer-link">Contact</a>
        </div>
        <div className="text-sm text-muted-foreground">Built with Next.js & shadcn/ui</div>
      </div>
    </footer>
  );
}
