import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Braces, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";

const nav = [
  ["/", "Home"], ["/about", "About"], ["/cybersecurity", "Cybersecurity"],
  ["/projects", "Projects"], ["/research", "Research"], ["/writing", "Writing"],
  ["/education", "Education"], ["/contact", "Contact"],
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return <div className="min-h-screen bg-background text-foreground">
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link to="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid size-8 place-items-center border border-primary/40 font-mono text-xs text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">MS</span>
          <span className="hidden text-sm font-semibold sm:block">Muhammad Shammas N</span>
        </Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-5 xl:flex">
          {nav.map(([to,label]) => <Link key={to} to={to} className={`relative py-5 text-[0.73rem] font-medium transition-colors ${pathname === to ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
            {label}<span className={`absolute inset-x-0 bottom-0 h-px bg-primary transition-transform ${pathname === to ? "scale-x-100" : "scale-x-0"}`} />
          </Link>)}
        </nav>
        <button type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen(!open)} className="grid size-10 place-items-center text-foreground xl:hidden">
          {open ? <X size={20}/> : <Menu size={20}/>} 
        </button>
      </div>
      {open && <nav aria-label="Mobile navigation" className="grid border-t border-border bg-background px-5 py-4 xl:hidden">
        {nav.map(([to,label]) => <Link key={to} to={to} onClick={() => setOpen(false)} className={`border-b border-border/60 py-3 text-sm ${pathname === to ? "text-primary" : "text-muted-foreground"}`}>{label}</Link>)}
      </nav>}
    </header>
    <main>{children}</main>
    <Footer />
  </div>
}

function Footer() {
  return <footer className="border-t border-border">
    <div className="mx-auto grid max-w-7xl gap-9 px-5 py-12 md:grid-cols-[1fr_auto] lg:px-8">
      <div><p className="font-serif text-xl">Muhammad Shammas N</p><p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">Cybersecurity Researcher × Sociology Researcher × Islamic Jurisprudence</p></div>
      <div className="flex flex-wrap items-start gap-5 text-sm text-muted-foreground"><span>GitHub <small>(placeholder)</small></span><span>LinkedIn <small>(placeholder)</small></span><span>Email <small>(placeholder)</small></span></div>
    </div>
    <div className="border-t border-border px-5 py-5 text-center font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">© 2026 Muhammad Shammas N · Built with care and restraint</div>
  </footer>
}

export function PageIntro({ eyebrow, title, children }: { eyebrow:string; title:string; children:ReactNode }) {
  return <section className="relative overflow-hidden border-b border-border"><div className="absolute inset-0 grid-texture opacity-50"/><div className="relative mx-auto max-w-7xl px-5 py-20 sm:py-24 lg:px-8"><p className="reveal font-mono text-[0.68rem] uppercase tracking-[0.2em] text-primary">{eyebrow}</p><h1 className="reveal delay-1 mt-5 max-w-4xl font-serif text-4xl leading-[1.08] sm:text-6xl">{title}</h1><div className="reveal delay-2 mt-6 max-w-2xl text-base leading-8 text-muted-foreground">{children}</div></div></section>
}

export function Section({ title, eyebrow, children, className="" }: {title:string; eyebrow?:string; children:ReactNode; className?:string}) {
 return <section className={`mx-auto max-w-7xl px-5 py-16 sm:py-20 lg:px-8 ${className}`}><div className="mb-9 flex items-end justify-between gap-5 border-b border-border pb-5"><div>{eyebrow && <p className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-primary">{eyebrow}</p>}<h2 className="font-serif text-3xl sm:text-4xl">{title}</h2></div><span className="hidden font-mono text-xs text-muted-foreground sm:block">§</span></div>{children}</section>
}

export function Status({ children }: {children:ReactNode}) { return <span className="inline-flex border border-primary/35 bg-primary/5 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.13em] text-primary">{children}</span> }
export function DetailGrid({ items }: {items: {label:string; value:ReactNode}[]}) { return <dl className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2"><>{items.map((x,i)=><div key={x.label} className="bg-panel p-5"><dt className="font-mono text-[0.63rem] uppercase tracking-[0.16em] text-primary">{String(i+1).padStart(2,"0")} / {x.label}</dt><dd className="mt-3 text-sm leading-6 text-muted-foreground">{x.value}</dd></div>)}</></dl> }
export function TopicGrid({items}:{items:string[]}) { return <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">{items.map((x,i)=><div key={x} className="card-lift bg-panel p-5"><span className="font-mono text-[0.65rem] text-primary">{String(i+1).padStart(2,"0")}</span><p className="mt-4 text-sm font-medium">{x}</p></div>)}</div> }
export function TextLink({to, children}:{to:string; children:ReactNode}) { return <Link to={to} className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all hover:gap-3">{children}<ArrowRight size={15}/></Link> }
export function DisciplineIcon({type}:{type:"tech"|"academic"}) { return type === "tech" ? <Braces size={20}/> : <BookOpen size={20}/> }
