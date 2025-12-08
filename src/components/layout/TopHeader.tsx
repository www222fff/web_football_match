export function TopHeader({ title, children }: { title: string, children?: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between h-14 px-4 border-b bg-card/80 backdrop-blur-sm">
      <h1 className="text-lg font-bold font-headline text-foreground">{title}</h1>
      <div>{children}</div>
    </header>
  );
}
