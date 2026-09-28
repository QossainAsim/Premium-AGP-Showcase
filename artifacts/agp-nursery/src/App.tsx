import { useEffect, useRef, useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Check,
  ChevronRight,
  Clock3,
  Flower2,
  Globe2,
  HeartHandshake,
  Instagram,
  Leaf,
  Menu,
  MessageCircle,
  Mic,
  PhoneCall,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  TreePine,
  Truck,
  X,
} from 'lucide-react';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();
const WHATSAPP = 'https://wa.me/923220721767';
const PHONE = 'tel:+923220721767';

const images = {
  hero: '/images/agp-hero.jpg',
  sunrise: '/images/agp-sunrise.jpg',
  landscape: '/images/agp-landscape.jpg',
  story: '/images/agp-story.jpg',
  feature: '/images/agp-feature.jpg',
  rose: '/images/agp-rose.jpg',
  peony: '/images/agp-peony.jpg',
  hydrangea: '/images/agp-hydrangea.jpg',
  bougainvillea: '/images/agp-bougainvillea.jpg',
  jasmine: '/images/agp-jasmine.jpg',
  marigold: '/images/agp-marigold.jpg',
  orchid: '/images/agp-orchid.jpg',
  hibiscus: '/images/agp-hibiscus.jpg',
  dahlia: '/images/agp-dahlia.jpg',
  gardenia: '/images/agp-gardenia.jpg',
  projectHotel: '/images/agp-project-hotel.jpg',
  projectCourtyard: '/images/agp-project-courtyard.jpg',
  projectRooftop: '/images/agp-project-rooftop.jpg',
};

type IconType = typeof Leaf;

const categories: { title: string; note: string; icon: IconType; image: string }[] = [
  { title: 'Landscaping trees', note: 'Shade, structure, instant character', icon: TreePine, image: images.sunrise },
  { title: 'Flowering trees & shrubs', note: 'Colour that returns every season', icon: Flower2, image: images.gardenia },
  { title: 'Roses', note: 'Fragrant classics, garden-ready', icon: Sparkles, image: images.rose },
  { title: 'Fruit plants', note: 'A harvest worth waiting for', icon: Leaf, image: images.feature },
  { title: 'Indoor plants', note: 'Green calm for considered interiors', icon: Leaf, image: images.orchid },
  { title: 'Climbers & vines', note: 'Vertical life, beautifully trained', icon: Flower2, image: images.bougainvillea },
];

const questions = [
  { prompt: 'Where will your new plant live?', caption: 'Let’s start with the light it will receive.', options: ['A sunny garden', 'A shaded courtyard', 'Inside my home', 'A balcony or terrace'] },
  { prompt: 'What kind of feeling are you growing?', caption: 'Every garden has a point of view.', options: ['A grand entrance', 'Flowers and fragrance', 'Food from my garden', 'A green, calm retreat'] },
  { prompt: 'How quickly should it make an impact?', caption: 'We’ll match you with the right stage of growth.', options: ['I want it mature now', 'A little patience is fine', 'I love watching it grow'] },
];

const recommendations = [
  { name: 'Mature Ficus Benjamina', detail: 'A sculptural shade-maker with a naturally full canopy.', image: images.landscape, tag: 'Best for instant structure' },
  { name: 'Bougainvillea “Pattoki Pink”', detail: 'A generous cascade of colour for walls, gates and terraces.', image: images.feature, tag: 'Best for flowering colour' },
  { name: 'Meyer Lemon Tree', detail: 'Glossy foliage, fragrant blossom and a harvest to look forward to.', image: images.story, tag: 'Best for a fruitful garden' },
];

const offers = [
  { name: 'Mature Ficus', from: 'PKR 18,500', sale: 'PKR 14,900', note: 'Limited mature stock', image: images.landscape },
  { name: 'Bougainvillea Arch', from: 'PKR 12,000', sale: 'PKR 9,500', note: 'Ready to train', image: images.bougainvillea },
  { name: 'Citrus Collection', from: 'PKR 9,800', sale: 'PKR 7,900', note: 'Three fruiting varieties', image: images.story },
];

const flowers = [
  { name: 'David Austin Rose', type: 'Collector bloom', note: 'Layered petals and a deep, old-garden perfume.', price: 'From PKR 4,500', image: images.rose, featured: 'Most requested' },
  { name: 'White Peony', type: 'Rare seasonal', note: 'Soft ivory petals for a quiet, expensive-looking border.', price: 'From PKR 6,800', image: images.peony, featured: 'Collector pick' },
  { name: 'Blue Hydrangea', type: 'Statement shrub', note: 'Full cloud-like heads that bring cool colour to shade.', price: 'From PKR 5,200', image: images.hydrangea, featured: 'Shade lover' },
  { name: 'Pattoki Bougainvillea', type: 'Signature climber', note: 'A generous cascade of colour for walls, gates and terraces.', price: 'From PKR 3,900', image: images.bougainvillea, featured: 'AGP signature' },
  { name: 'Jasmine Grandiflora', type: 'Fragrant classic', note: 'Starry white flowers and a scent that carries at dusk.', price: 'From PKR 2,900', image: images.jasmine, featured: 'Evening bloom' },
  { name: 'Golden Marigold', type: 'Sun garden annual', note: 'Bright, generous colour that keeps the garden feeling alive.', price: 'From PKR 1,800', image: images.marigold, featured: 'Sunny pick' },
  { name: 'White Orchid', type: 'Collector indoor', note: 'Clean sculptural blooms for a calm room or shaded veranda.', price: 'From PKR 5,900', image: images.orchid, featured: 'Rare indoor' },
  { name: 'Scarlet Hibiscus', type: 'Tropical classic', note: 'Large red flowers with the easy confidence of a summer garden.', price: 'From PKR 2,700', image: images.hibiscus, featured: 'Heat lover' },
  { name: 'Peach Dahlia', type: 'Layered bloom', note: 'A full, warm flower that gives borders a soft focal point.', price: 'From PKR 4,900', image: images.dahlia, featured: 'New arrival' },
  { name: 'Gardenia Veil', type: 'Fragrant shrub', note: 'Cream flowers, glossy leaves and a perfume made for evenings.', price: 'From PKR 3,600', image: images.gardenia, featured: 'Scented pick' },
];

const fieldProjects = [
  { title: 'A courtyard with a pulse', city: 'Lahore · DHA', image: images.feature, comment: 'The planting made the courtyard feel finished. Every view now has a little colour and a lot more life.', name: 'Ayesha M.' },
  { title: 'The hotel arrival', city: 'Islamabad · F-6', image: images.projectHotel, comment: 'AGP gave the entrance the scale it needed. The palms arrived mature, healthy and ready to make an impression.', name: 'Hotel project team' },
  { title: 'A private garden in layers', city: 'Lahore · Gulberg', image: images.projectCourtyard, comment: 'The team understood how to create privacy without closing the garden in. It feels generous from every room.', name: 'Hassan R.' },
  { title: 'The terrace that finally breathes', city: 'Karachi · Clifton', image: images.projectRooftop, comment: 'Our rooftop now feels like a real place to live. The plant choices survived the coastal heat and still look considered.', name: 'Bilal R.' },
  { title: 'A garden made for arrival', city: 'Dubai · UAE', image: images.landscape, comment: 'The export team handled every detail with calm expertise. The planting arrived beautifully prepared and changed the whole approach.', name: 'Noura A.' },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className={`focus-ring flex items-center gap-2.5 ${light ? 'text-[hsl(var(--background))]' : 'text-[hsl(var(--primary))]'}`} data-testid="link-brand">
      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-current/30">
        <Leaf size={19} strokeWidth={1.5} />
      </span>
      <span className="leading-none">
        <span className="block font-serif text-[1.45rem] tracking-[-.03em]">AGP</span>
        <span className="mt-0.5 block font-mono text-[.47rem] font-bold uppercase tracking-[.17em] opacity-70">Nursery Farm</span>
      </span>
    </a>
  );
}

function WhatsAppButton({ children = 'Order on WhatsApp', className = '', compact = false }: { children?: ReactNode; className?: string; compact?: boolean }) {
  return (
    <a
      href={WHATSAPP}
      target="_blank"
      rel="noreferrer"
      className={`focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-[hsl(var(--accent))] px-5 py-3 text-xs font-bold uppercase tracking-[.08em] text-[hsl(var(--primary-foreground))] transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg ${compact ? 'px-3.5 py-2 text-[.65rem]' : ''} ${className}`}
      data-testid="link-whatsapp-order"
      aria-label={`${typeof children === 'string' ? children : 'Order'} via WhatsApp`}
    >
      <MessageCircle size={compact ? 14 : 16} />
      {children}
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const links = [['Our plants', 'categories'], ['Flowers', 'flowers'], ['Find your plant', 'match'], ['Our story', 'story'], ['Journal', 'journal']];
  return (
    <header className="absolute inset-x-0 top-0 z-30 text-[hsl(var(--background))]">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-5 lg:px-10">
        <BrandMark light />
        <nav className="hidden items-center gap-8 md:flex">
          {links.map(([label, id]) => (
            <a key={id} href={`#${id}`} className="focus-ring text-[.72rem] font-bold uppercase tracking-[.14em] text-white/75 transition-colors hover:text-white" data-testid={`link-nav-${id}`}>{label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href={PHONE} className="hidden items-center gap-2 text-xs font-semibold text-white/85 lg:flex" data-testid="link-header-phone"><PhoneCall size={14} />0322-0721767</a>
          <WhatsAppButton compact>Chat to Order</WhatsAppButton>
          <button className="focus-ring rounded-full border border-white/25 p-2 text-white md:hidden" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} data-testid="button-mobile-menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="mx-4 rounded-2xl border border-white/15 bg-[hsl(var(--primary))]/95 p-5 shadow-xl backdrop-blur-md md:hidden" data-testid="nav-mobile">
          {links.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="focus-ring block border-b border-white/10 py-3 text-sm font-semibold text-white/85 last:border-0" data-testid={`link-mobile-${id}`}>{label}</a>)}
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative isolate flex min-h-[740px] items-end overflow-hidden bg-[hsl(var(--primary))] pb-16 pt-36 text-white lg:min-h-[840px] lg:pb-24">
      <img src={images.hero} alt="Sunlit path through mature plants at AGP Nursery Farm" className="hero-image absolute inset-0 -z-20 h-full w-full object-cover object-center" />
      <img src={images.sunrise} alt="" aria-hidden="true" className="hero-sunrise absolute inset-0 -z-[19] h-full w-full object-cover object-center" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(17,45,31,.9)_0%,rgba(17,45,31,.63)_42%,rgba(17,45,31,.15)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[hsl(var(--primary))]/65 via-transparent to-transparent" />
      <div className="sunrise-glow pointer-events-none absolute left-[58%] top-[22%] -z-10 h-36 w-36 rounded-full bg-[hsl(var(--accent))]/30 blur-3xl sm:h-56 sm:w-56" />
      <div className="sunrise-caption pointer-events-none absolute right-6 top-32 -z-10 hidden items-center gap-3 font-mono text-[.58rem] uppercase tracking-[.18em] text-white/60 lg:flex"><span className="h-px w-8 bg-[hsl(var(--accent))]" /> First light at the nursery</div>
      <div className="hero-sweep pointer-events-none absolute inset-0 -z-10" />
      <div className="hero-orbit hero-orbit-one pointer-events-none absolute right-[12%] top-[28%] hidden h-28 w-28 rounded-full border border-white/20 lg:block"><span className="hero-orbit-dot absolute -right-1 top-1/2 h-2 w-2 rounded-full bg-[hsl(var(--accent))]" /></div>
      <div className="hero-orbit hero-orbit-two pointer-events-none absolute right-[18%] top-[23%] hidden h-44 w-44 rounded-full border border-white/10 lg:block" />
      <div className="hero-leaf hero-leaf-one pointer-events-none absolute right-[24%] top-[37%] hidden text-[hsl(var(--accent))]/75 lg:block"><Leaf size={30} strokeWidth={1} /></div>
      <div className="hero-leaf hero-leaf-two pointer-events-none absolute right-[8%] top-[62%] hidden text-white/55 lg:block"><Leaf size={44} strokeWidth={1} /></div>
      <div className="hero-spark hero-spark-one pointer-events-none absolute left-[47%] top-[32%] hidden h-2 w-2 rounded-full bg-[hsl(var(--accent))] lg:block" />
      <div className="hero-spark hero-spark-two pointer-events-none absolute right-[32%] top-[76%] hidden h-1.5 w-1.5 rounded-full bg-white/80 lg:block" />
      <div className="mx-auto w-full max-w-[1400px] px-5 lg:px-10">
        <div className="max-w-3xl">
          <div className="reveal mb-7 flex items-center gap-3 font-mono text-[.65rem] font-bold uppercase tracking-[.2em] text-[hsl(var(--accent))]">
            <span className="hero-rule h-px w-10 bg-[hsl(var(--accent))]" /> Grown in Pattoki · Delivered with care
          </div>
          <h1 className="reveal reveal-delay-1 max-w-2xl font-serif text-[clamp(3.8rem,9vw,8rem)] leading-[.83] tracking-[-.055em] text-white">Your garden<br /><em className="text-[hsl(var(--accent))]">is missing</em><br />something.</h1>
          <p className="reveal reveal-delay-2 mt-8 max-w-md text-lg leading-relaxed text-white/78">Pattoki’s finest plants, delivered to your door.</p>
          <div className="reveal reveal-delay-3 mt-9 flex flex-wrap items-center gap-3">
            <WhatsAppButton>Chat to Order on WhatsApp</WhatsAppButton>
            <button onClick={() => scrollToId('match')} className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-xs font-bold uppercase tracking-[.08em] text-white transition-colors hover:border-white hover:bg-white/10" data-testid="button-find-plant">Find my plant <ArrowRight size={16} /></button>
          </div>
          <div className="reveal reveal-delay-3 mt-12 flex items-center gap-6 text-white/75">
            <div><strong className="font-serif text-3xl text-white">220k+</strong><span className="ml-2 text-xs uppercase tracking-[.12em]">on Instagram</span></div>
            <span className="h-10 w-px bg-white/20" />
            <div className="flex items-center gap-2 text-xs"><BadgeCheck size={16} className="text-[hsl(var(--accent))]" /> Registered nursery</div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-7 right-8 hidden items-center gap-3 font-mono text-[.6rem] uppercase tracking-[.2em] text-white/60 lg:flex"><span className="h-px w-12 bg-white/40" /> Scroll to grow</div>
    </section>
  );
}

function TrustMarquee() {
  const items = [
    [Truck, 'Nationwide delivery'],
    [Globe2, 'Pakistan + Middle East'],
    [HeartHandshake, 'Trusted by landscapers'],
    [Instagram, '@plants_paragon_pattoki'],
    [ShieldCheck, 'Registered nursery'],
    [MessageCircle, 'WhatsApp support'],
  ] as const;
  return <div className="trust-marquee mx-auto max-w-[1400px] overflow-hidden rounded-full border border-[hsl(var(--border))] bg-white py-3 shadow-[0_12px_35px_rgba(32,57,42,.08)]" aria-label="AGP Nursery Farm trust highlights"><div className="marquee-track flex w-max items-center">{[...items, ...items].map(([Icon, title], index) => <span key={`${title}-${index}`} className="flex items-center gap-2 px-5 font-mono text-[.58rem] font-bold uppercase tracking-[.16em] text-[hsl(var(--primary))] sm:px-8"><Icon size={14} strokeWidth={1.6} className="text-[hsl(var(--accent))]" />{title}<span className="ml-5 text-[hsl(var(--accent))]/70">✦</span></span>)}</div></div>;
}

function SectionHeading({ eyebrow, title, text, light = false }: { eyebrow: string; title: ReactNode; text?: string; light?: boolean }) {
  return <div className={`max-w-2xl ${light ? 'text-[hsl(var(--background))]' : ''}`}><div className="mb-5 flex items-center gap-3 font-mono text-[.65rem] font-bold uppercase tracking-[.19em] text-[hsl(var(--accent))]"><span className="h-px w-8 bg-[hsl(var(--accent))]" />{eyebrow}</div><h2 className="font-serif text-5xl leading-[.92] tracking-[-.04em] sm:text-6xl">{title}</h2>{text && <p className={`mt-6 max-w-lg text-base leading-relaxed ${light ? 'text-white/68' : 'text-[hsl(var(--muted-foreground))]'}`}>{text}</p>}</div>;
}

function PlantMatch() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [finding, setFinding] = useState(false);
  const [findingStage, setFindingStage] = useState(0);
  const [complete, setComplete] = useState(false);
  const timeoutRef = useRef<number | undefined>(undefined);
  const findingRef = useRef<number | undefined>(undefined);
  const thinkingSteps = ['Thinking about your space', 'Designing your shortlist', 'Growing the right suggestion'];
  const choose = (answer: string) => {
    const next = [...answers.slice(0, step), answer];
    setAnswers(next);
    if (step < questions.length - 1) {
      timeoutRef.current = window.setTimeout(() => setStep(step + 1), 340);
    } else {
      setFinding(true);
      setFindingStage(0);
      findingRef.current = window.setInterval(() => setFindingStage(current => (current + 1) % thinkingSteps.length), 520);
      timeoutRef.current = window.setTimeout(() => {
        if (findingRef.current) window.clearInterval(findingRef.current);
        setFinding(false);
        setComplete(true);
      }, 1650);
    }
  };
  useEffect(() => () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    if (findingRef.current) window.clearInterval(findingRef.current);
  }, []);
  const reset = () => { setStep(0); setAnswers([]); setFinding(false); setComplete(false); setFindingStage(0); };
  const resultContext = answers[1] ? `Since you chose ${answers[1].toLowerCase()}, here is a considered place to begin.` : 'Based on your answers, here is a considered place to begin.';
  return (
    <section id="match" className="relative overflow-hidden bg-[hsl(var(--primary))] py-24 text-white lg:py-32">
      <div className="pointer-events-none absolute -right-20 top-20 h-72 w-72 rounded-full border border-white/10 lg:h-[30rem] lg:w-[30rem]" />
      <div className="pointer-events-none absolute -right-10 top-32 h-56 w-56 rounded-full border border-white/10 lg:h-[24rem] lg:w-[24rem]" />
      <div className="mx-auto grid max-w-[1400px] gap-14 px-5 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:px-10">
         <SectionHeading eyebrow="The plant match" title={<>The right plant<br /><em className="text-[hsl(var(--accent))]">changes everything.</em></>} text="Tell us a little about your space. In three quick questions, we’ll point you toward plants that will thrive there, not just look good in a photograph." light />
        <div className="relative min-h-[480px] overflow-hidden rounded-[1.5rem] border border-white/15 bg-white/[.07] p-6 backdrop-blur-sm sm:p-10" data-testid="section-plant-match">
          {!complete && !finding && <div className="flex items-center justify-between"><span className="font-mono text-[.65rem] uppercase tracking-[.15em] text-white/55">Question {step + 1} of {questions.length}</span><div className="flex gap-1.5">{questions.map((_, index) => <span key={index} className={`h-1 w-12 rounded-full transition-colors ${index <= step ? 'bg-[hsl(var(--accent))]' : 'bg-white/20'}`} />)}</div></div>}
           {finding ? <div className="thinking-state flex min-h-[410px] flex-col items-center justify-center text-center"><div className="thinking-orbit mb-8 flex h-28 w-28 items-center justify-center rounded-full border border-[hsl(var(--accent))]/60 text-[hsl(var(--accent))]"><span className="thinking-ring" /><span className="thinking-ring thinking-ring-two" /><Leaf className="botanical-drift" size={38} strokeWidth={1.2} /></div><div className="thinking-label font-mono text-[.65rem] font-bold uppercase tracking-[.16em] text-[hsl(var(--accent))]" aria-live="polite">{thinkingSteps[findingStage]}</div><h3 className="mt-4 font-serif text-4xl sm:text-5xl">A little garden thinking</h3><div className="thinking-dots mt-5 flex gap-2" aria-hidden="true"><span /><span /><span /></div><p className="mt-4 text-sm text-white/60">Matching light, feeling and the right stage of growth.</p></div> : complete ? <div className="animate-[reveal-up_.6s_ease_both]"><div className="flex items-center gap-2 font-mono text-[.65rem] uppercase tracking-[.15em] text-[hsl(var(--accent))]"><Check size={15} /> Your garden, considered</div><p className="mt-4 max-w-lg text-sm text-white/60">{resultContext}</p><h3 className="mt-3 font-serif text-4xl sm:text-5xl">Three beautiful places to begin.</h3><div className="mt-7 grid gap-3 sm:grid-cols-3">{recommendations.map((item, index) => <div key={item.name} className="group overflow-hidden rounded-xl border border-white/15 bg-white/[.06]"><div className="h-36 overflow-hidden"><img src={item.image} alt={item.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" /></div><div className="p-3"><span className="text-[.61rem] font-bold uppercase tracking-[.08em] text-[hsl(var(--accent))]">{item.tag}</span><h4 className="mt-1 font-serif text-xl leading-none">{item.name}</h4><p className="mt-2 text-[.7rem] leading-snug text-white/55">{item.detail}</p><a href={WHATSAPP} target="_blank" rel="noreferrer" className="focus-ring mt-4 inline-flex items-center gap-1 text-[.64rem] font-bold uppercase tracking-[.08em] text-white" data-testid={`link-match-order-${index}`}>Order on WhatsApp <ArrowUpRight size={13} /></a></div></div>)}</div><button onClick={reset} className="focus-ring mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.1em] text-white/65 hover:text-white" data-testid="button-match-again">Start again <ArrowRight size={14} /></button></div> : <div key={step} className="animate-[reveal-up_.45s_ease_both] pt-14"><span className="text-sm text-white/50">{questions[step].caption}</span><h3 className="mt-3 max-w-lg font-serif text-4xl leading-[.95] sm:text-5xl">{questions[step].prompt}</h3><div className="mt-9 grid gap-3 sm:grid-cols-2">{questions[step].options.map((option, index) => <button key={option} onClick={() => choose(option)} className="focus-ring group flex min-h-16 items-center justify-between rounded-xl border border-white/17 bg-white/[.05] px-5 text-left text-sm text-white/85 transition-all duration-300 hover:-translate-y-1 hover:border-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))]/15 active:scale-[.97]" data-testid={`button-match-option-${step}-${index}`}><span>{option}</span><ChevronRight size={17} className="text-white/35 transition-transform group-hover:translate-x-1 group-hover:text-[hsl(var(--accent))]" /></button>)}</div></div>}
        </div>
      </div>
    </section>
  );
}

function Categories() {
  return <section id="categories" className="bg-[hsl(var(--background))] py-24 lg:py-32"><div className="mx-auto max-w-[1400px] px-5 lg:px-10"><div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><SectionHeading eyebrow="Explore the nursery" title={<>Plants with<br /><em>presence.</em></>} text="We grow for the moment your garden stops being an idea and starts becoming a place." /><a href={WHATSAPP} target="_blank" rel="noreferrer" className="focus-ring mb-1 inline-flex items-center gap-2 self-start border-b border-[hsl(var(--primary))] pb-2 text-xs font-bold uppercase tracking-[.12em] text-[hsl(var(--primary))] md:self-end" data-testid="link-browse-plants">Chat to Order on WhatsApp <ArrowUpRight size={16} /></a></div><div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{categories.map(({ title, note, icon: Icon, image }, index) => <a href={WHATSAPP} target="_blank" rel="noreferrer" key={title} className={`group relative min-h-[290px] overflow-hidden rounded-2xl bg-[hsl(var(--primary))] ${index === 0 ? 'lg:row-span-2 lg:min-h-[600px]' : ''}`} data-testid={`card-category-${index}`}><img src={image} alt={`${title} at AGP Nursery Farm`} className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-110 group-hover:opacity-100" /><div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary))] via-[hsl(var(--primary))]/20 to-transparent" /><div className="absolute inset-x-0 bottom-0 p-6"><Icon size={22} strokeWidth={1.3} className="mb-10 text-[hsl(var(--accent))]" /><div className="flex items-end justify-between gap-3"><div><h3 className="font-serif text-3xl leading-none text-white">{title}</h3><p className="mt-2 text-xs text-white/65">{note}</p><span className="mt-4 inline-flex items-center gap-1 text-[.61rem] font-bold uppercase tracking-[.1em] text-[hsl(var(--accent))]">Order on WhatsApp <ArrowUpRight size={13} /></span></div><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/30 text-white transition-all group-hover:border-[hsl(var(--accent))] group-hover:bg-[hsl(var(--accent))]"><ArrowUpRight size={17} /></span></div></div></a>)}</div></div></section>;
}

function TrustBanner() {
  return <section className="mx-auto max-w-[1400px] px-5 lg:px-10"><div className="relative min-h-[470px] overflow-hidden rounded-[1.5rem] bg-[hsl(var(--primary))]"><img src={images.landscape} alt="Mature garden landscaping by AGP Nursery Farm" className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-1000 hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--primary))]/65 to-transparent" /><div className="relative flex min-h-[470px] max-w-xl flex-col justify-center p-8 sm:p-14"><span className="mb-5 font-mono text-[.65rem] font-bold uppercase tracking-[.18em] text-[hsl(var(--accent))]">For the people who shape places</span><h2 className="font-serif text-5xl leading-[.92] tracking-[-.04em] text-white sm:text-6xl">Not just plants.<br /><em>Planting, with intent.</em></h2><p className="mt-6 text-sm leading-relaxed text-white/68">From a single statement tree to a complete hotel landscape, AGP is trusted by people who know that the right plant changes the architecture around it.</p><a href={WHATSAPP} target="_blank" rel="noreferrer" className="focus-ring mt-8 inline-flex w-fit items-center gap-2 border-b border-[hsl(var(--accent))] pb-2 text-xs font-bold uppercase tracking-[.1em] text-white" data-testid="link-landscaping-consultation">Start a landscaping conversation <ArrowRight size={16} /></a></div></div></section>;
}

function Offers() {
  return <section className="bg-[hsl(var(--secondary))] py-24 lg:py-32"><div className="mx-auto max-w-[1400px] px-5 lg:px-10"><div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><SectionHeading eyebrow="The nursery, this week" title={<>A good time to<br /><em>take one home.</em></>} text="Our offers move with the nursery. Message us for current plant size, availability and delivery to your city." /><span className="flex items-center gap-2 pb-1 font-mono text-[.63rem] font-bold uppercase tracking-[.12em] text-[hsl(var(--muted-foreground))]"><Clock3 size={15} className="text-[hsl(var(--accent))]" /> Updated every Monday</span></div><div className="mt-14 grid gap-3 lg:grid-cols-3">{offers.map((offer, index) => <div key={offer.name} className="offer-card group flex flex-col justify-between overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] transition-transform duration-300 hover:-translate-y-2 lg:min-h-[390px]" data-testid={`card-offer-${index}`}><div className="offer-image-wrap relative h-52 overflow-hidden"><img src={offer.image} alt={`${offer.name} offer at AGP Nursery Farm`} className="offer-image h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary))]/65 to-transparent" /><span className="absolute left-5 top-5 rounded-full bg-[hsl(var(--accent))] px-3 py-1 font-mono text-[.6rem] font-bold uppercase tracking-[.12em] text-[hsl(var(--primary-foreground))]">This week</span><ArrowUpRight size={18} className="absolute right-5 top-5 text-white transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></div><div className="flex flex-1 flex-col justify-between p-6"><div><h3 className="font-serif text-3xl text-[hsl(var(--primary))]">{offer.name}</h3><p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">{offer.note}</p><div className="mt-4 flex items-end gap-3"><span className="text-sm text-[hsl(var(--muted-foreground))] line-through">{offer.from}</span><strong className="font-serif text-2xl text-[hsl(var(--accent))]">{offer.sale}</strong></div></div><WhatsAppButton compact className="mt-5 w-fit">Order on WhatsApp</WhatsAppButton></div></div>)}</div><div className="offers-ribbon mt-14 overflow-hidden border-y border-[hsl(var(--border))] py-4"><div className="offers-ribbon-track flex w-max items-center">{['Fresh from Pattoki', 'Limited mature stock', 'Delivery across Pakistan', 'Export-ready plants', 'Fresh from Pattoki', 'Limited mature stock', 'Delivery across Pakistan', 'Export-ready plants'].map((item, index) => <span key={`${item}-${index}`} className="flex items-center gap-5 px-7 font-mono text-[.62rem] font-bold uppercase tracking-[.18em] text-[hsl(var(--primary))]"><Flower2 size={14} className="text-[hsl(var(--accent))]" />{item}</span>)}</div></div></div></section>;
}

function Flowers() {
  return <section id="flowers" className="flowers-section overflow-hidden bg-[hsl(var(--background))] py-24 lg:py-32"><div className="mx-auto max-w-[1400px] px-5 lg:px-10"><div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><SectionHeading eyebrow="The flower room" title={<>For the blooms<br /><em>worth making space for.</em></>} text="Our most beautiful flowering plants, from generous everyday colour to collector pieces that make a garden feel rare." /><span className="flex items-center gap-2 pb-1 font-mono text-[.63rem] font-bold uppercase tracking-[.12em] text-[hsl(var(--muted-foreground))]"><Sparkles size={15} className="text-[hsl(var(--accent))]" /> 10 cultivated picks</span></div><div className="flowers-grid mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{flowers.map((flower, index) => <a href={WHATSAPP} target="_blank" rel="noreferrer" key={flower.name} className="flower-card group relative overflow-hidden rounded-2xl bg-[hsl(var(--primary))]" data-testid={`card-flower-${index}`}><div className="flower-image-wrap aspect-[.92] overflow-hidden"><img src={flower.image} alt={`${flower.name} flowering plant at AGP Nursery Farm`} className="flower-image h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary))] via-transparent to-transparent opacity-90" /></div><div className="absolute inset-x-0 bottom-0 p-6 text-white"><span className="flower-tag inline-flex rounded-full border border-[hsl(var(--accent))]/70 bg-[hsl(var(--primary))]/40 px-3 py-1 font-mono text-[.58rem] font-bold uppercase tracking-[.13em] text-[hsl(var(--accent))]">{flower.featured}</span><div className="mt-4 flex items-end justify-between gap-3"><div><span className="font-mono text-[.6rem] uppercase tracking-[.15em] text-white/60">{flower.type}</span><h3 className="mt-1 font-serif text-3xl leading-none">{flower.name}</h3><p className="mt-2 max-w-xs text-xs leading-relaxed text-white/65">{flower.note}</p><span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.08em] text-[hsl(var(--accent))]">{flower.price} <ArrowUpRight size={14} /></span></div><span className="flower-arrow flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/30"><ArrowUpRight size={17} /></span></div></div></a>)}</div></div></section>;
}

function Story() {
  return <section id="story" className="overflow-hidden bg-[hsl(var(--background))] py-24 lg:py-32"><div className="mx-auto grid max-w-[1400px] gap-14 px-5 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-24 lg:px-10"><div className="relative mx-auto w-full max-w-lg lg:order-2"><div className="absolute -bottom-5 -left-5 z-10 rounded-xl bg-[hsl(var(--accent))] p-5 text-[hsl(var(--primary-foreground))] shadow-lg"><strong className="block font-serif text-4xl leading-none">Est.</strong><span className="font-mono text-[.63rem] font-bold uppercase tracking-[.16em]">Pattoki · Pakistan</span></div><img src={images.story} alt="Hands caring for a mature plant at AGP Nursery Farm" className="aspect-[4/5] w-full rounded-[1.5rem] object-cover shadow-xl" /><div className="absolute -right-7 top-10 hidden rounded-full border border-[hsl(var(--accent))]/60 bg-[hsl(var(--background))] p-5 text-[hsl(var(--accent))] sm:block"><Leaf size={30} strokeWidth={1.2} /></div></div><div className="lg:order-1"><SectionHeading eyebrow="The AGP difference" title={<>A nursery<br /><em>with roots.</em></>} text="There’s a world of difference between selling a plant and standing behind it. AGP Nursery Farm is a registered, licensed nursery in Pattoki, cultivated with the same care we bring to every recommendation." /><div className="mt-10 grid gap-5 border-t border-[hsl(var(--border))] pt-7 sm:grid-cols-2"><div><BadgeCheck size={20} className="text-[hsl(var(--accent))]" /><h3 className="mt-3 text-sm font-bold uppercase tracking-[.08em] text-[hsl(var(--primary))]">Licensed & accountable</h3><p className="mt-2 text-xs leading-relaxed text-[hsl(var(--muted-foreground))]">A real registered business with a real nursery, team and standard of care.</p></div><div><HeartHandshake size={20} className="text-[hsl(var(--accent))]" /><h3 className="mt-3 text-sm font-bold uppercase tracking-[.08em] text-[hsl(var(--primary))]">Guidance after delivery</h3><p className="mt-2 text-xs leading-relaxed text-[hsl(var(--muted-foreground))]">We want your plant to thrive long after it leaves Pattoki.</p></div></div><a href={WHATSAPP} target="_blank" rel="noreferrer" className="focus-ring mt-9 inline-flex items-center gap-2 border-b border-[hsl(var(--primary))] pb-2 text-xs font-bold uppercase tracking-[.1em] text-[hsl(var(--primary))]" data-testid="link-story-whatsapp">Chat to Order on WhatsApp <ArrowRight size={16} /></a></div></div></section>;
}

function Journal() {
  return <section id="journal" className="bg-[hsl(var(--secondary))] py-24 lg:py-32"><div className="mx-auto max-w-[1400px] px-5 lg:px-10"><div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><SectionHeading eyebrow="From the field" title={<>A few places<br /><em>we’ve changed.</em></>} text="A plant is never only a plant. It’s the welcome at the door, the shade at 4pm, the view you choose to keep." /><a href="https://www.instagram.com/plants_paragon_pattoki/" target="_blank" rel="noreferrer" className="focus-ring mb-1 inline-flex items-center gap-2 self-start text-xs font-bold uppercase tracking-[.1em] text-[hsl(var(--primary))] md:self-end" data-testid="link-instagram-journal"><Instagram size={17} /> See more on Instagram <ArrowUpRight size={15} /></a></div><div className="field-project-grid mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-12">{fieldProjects.map((project, index) => <article key={project.title} className={`field-project-card group relative min-h-[360px] overflow-hidden rounded-2xl bg-[hsl(var(--primary))] ${index === 0 ? 'lg:col-span-7 lg:row-span-2 lg:min-h-[620px]' : 'lg:col-span-5'}`} data-testid={`field-project-${index}`}><img src={project.image} alt={`${project.title} landscape design by AGP Nursery Farm`} className="field-project-image absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary))] via-[hsl(var(--primary))]/35 to-transparent" /><div className="relative flex h-full flex-col justify-end p-6 text-white sm:p-7"><div className="flex gap-1 text-[hsl(var(--accent))]">{[0, 1, 2, 3, 4].map(star => <Star key={star} size={13} fill="currentColor" />)}</div><span className="mt-4 font-mono text-[.61rem] font-bold uppercase tracking-[.16em] text-[hsl(var(--accent))]">{project.city}</span><h3 className="mt-2 font-serif text-3xl leading-none sm:text-4xl">{project.title}</h3><blockquote className="mt-3 max-w-xl text-sm leading-relaxed text-white/72">“{project.comment}”</blockquote><span className="mt-4 font-mono text-[.6rem] font-bold uppercase tracking-[.13em] text-white/55">{project.name} · Field note</span></div></article>)}</div></div></section>;
}

function Assistant() {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState(false);
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  useEffect(() => { const timer = window.setTimeout(() => setPrompt(true), 4300); return () => window.clearTimeout(timer); }, []);
  const send = () => { if (!message.trim()) return; setSent(true); setMessage(''); };
  return <div className="fixed bottom-5 right-5 z-40 sm:bottom-7 sm:right-7">{open && <div className="mb-3 w-[calc(100vw-2.5rem)] max-w-[360px] overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-2xl" data-testid="panel-assistant"><div className="flex items-center justify-between bg-[hsl(var(--primary))] p-4 text-white"><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(var(--accent))]"><Leaf size={18} /></span><div><strong className="block text-sm">AGP Plant Guide</strong><span className="text-[.65rem] text-white/55">Usually replies in a few minutes</span></div></div><button onClick={() => setOpen(false)} className="focus-ring text-white/60 hover:text-white" aria-label="Close plant guide" data-testid="button-close-assistant"><X size={18} /></button></div><div className="space-y-3 p-4"><div className="max-w-[270px] rounded-xl rounded-tl-none bg-[hsl(var(--secondary))] p-3 text-xs leading-relaxed text-[hsl(var(--foreground))]">Hello. Tell me what you’re looking for, and I’ll point you in the right direction.</div>{sent && <><div className="ml-auto max-w-[250px] rounded-xl rounded-tr-none bg-[hsl(var(--accent))]/15 p-3 text-xs text-[hsl(var(--foreground))]">Thanks. I’m looking for something specific.</div><div className="max-w-[270px] rounded-xl rounded-tl-none bg-[hsl(var(--secondary))] p-3 text-xs leading-relaxed">Lovely. Send us a photo of your space on WhatsApp and our nursery team will make a considered recommendation.</div></>}<div className="flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] p-2"><input value={message} onChange={event => setMessage(event.target.value)} onKeyDown={event => event.key === 'Enter' && send()} placeholder="Write a message..." className="focus-ring min-w-0 flex-1 bg-transparent px-2 text-xs outline-none" aria-label="Message plant guide" data-testid="input-assistant-message" /><button onClick={send} className="focus-ring flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-white" aria-label="Send message" data-testid="button-send-assistant"><Send size={14} /></button><button className="focus-ring flex h-8 w-8 items-center justify-center rounded-full border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))]" aria-label="Voice message" data-testid="button-voice-assistant"><Mic size={14} /></button></div></div></div>}{!open && prompt && <div className="mb-3 animate-[reveal-up_.4s_ease_both] rounded-xl bg-[hsl(var(--card))] px-4 py-3 text-xs font-semibold text-[hsl(var(--primary))] shadow-lg">Looking for something specific? I can help</div>}<button onClick={() => { setOpen(!open); setPrompt(false); }} className="assistant-pulse focus-ring ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-[hsl(var(--accent))] text-[hsl(var(--primary-foreground))] shadow-xl transition-transform hover:scale-105" aria-label={open ? 'Close plant guide' : 'Open plant guide'} data-testid="button-assistant"><MessageCircle size={24} /></button></div>;
}

function Footer() {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);
  return <footer className="bg-[hsl(var(--primary))] text-white"><div className="mx-auto max-w-[1400px] px-5 py-16 lg:px-10 lg:py-20"><div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.3fr]"><div><BrandMark light /><p className="mt-7 max-w-xs text-sm leading-relaxed text-white/55">Mature plants, considered guidance, and a nursery you can trust, from Pattoki to wherever your garden is waiting.</p><div className="mt-7 flex gap-3"><a href="https://www.instagram.com/plants_paragon_pattoki/" target="_blank" rel="noreferrer" className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]" aria-label="AGP Nursery Farm on Instagram" data-testid="link-footer-instagram"><Instagram size={17} /></a><a href={WHATSAPP} target="_blank" rel="noreferrer" className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]" aria-label="AGP Nursery Farm on WhatsApp" data-testid="link-footer-whatsapp"><MessageCircle size={17} /></a></div></div><div><h3 className="font-mono text-[.63rem] font-bold uppercase tracking-[.16em] text-[hsl(var(--accent))]">Explore</h3><div className="mt-5 space-y-3 text-sm text-white/65"><a href="#categories" className="focus-ring block hover:text-white" data-testid="link-footer-plants">Our plants</a><a href="#flowers" className="focus-ring block hover:text-white" data-testid="link-footer-flowers">Flowers</a><a href="#match" className="focus-ring block hover:text-white" data-testid="link-footer-match">Find your plant</a><a href="#story" className="focus-ring block hover:text-white" data-testid="link-footer-story">Our story</a><a href="#journal" className="focus-ring block hover:text-white" data-testid="link-footer-journal">Garden journal</a></div></div><div><h3 className="font-mono text-[.63rem] font-bold uppercase tracking-[.16em] text-[hsl(var(--accent))]">Support</h3><div className="mt-5 space-y-3 text-sm text-white/65"><a href={WHATSAPP} target="_blank" rel="noreferrer" className="focus-ring block hover:text-white" data-testid="link-footer-order">Order on WhatsApp</a><a href={PHONE} className="focus-ring block hover:text-white" data-testid="link-footer-phone">0322-0721767</a><span className="block">Pattoki, Punjab, Pakistan</span><span className="block">Pakistan + Middle East delivery</span></div></div><div><h3 className="font-mono text-[.63rem] font-bold uppercase tracking-[.16em] text-[hsl(var(--accent))]">A little green in your inbox</h3><p className="mt-5 text-sm leading-relaxed text-white/55">Seasonal stock, garden notes and the occasional plant worth making space for.</p>{joined ? <div className="mt-5 flex items-center gap-2 text-sm text-[hsl(var(--accent))]"><Check size={16} /> You’re on the list.</div> : <form onSubmit={event => { event.preventDefault(); if (email) setJoined(true); }} className="mt-5 flex border-b border-white/25 pb-2"><input value={email} onChange={event => setEmail(event.target.value)} type="email" required placeholder="Your email address" className="focus-ring min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/35" aria-label="Email address for newsletter" data-testid="input-newsletter-email" /><button type="submit" className="focus-ring text-[hsl(var(--accent))]" aria-label="Subscribe to newsletter" data-testid="button-newsletter-submit"><ArrowRight size={18} /></button></form>}</div></div><div className="mt-16 flex flex-col justify-between gap-5 border-t border-white/12 pt-7 text-[.65rem] text-white/45 sm:flex-row sm:items-center"><div className="flex flex-wrap gap-x-6 gap-y-3"><span className="flex items-center gap-2"><Truck size={14} /> Tracked delivery</span><span className="flex items-center gap-2"><ShieldCheck size={14} /> Secure ordering</span><span className="flex items-center gap-2"><HeartHandshake size={14} /> Human support</span></div><span>© {new Date().getFullYear()} AGP Nursery Farm · @plants_paragon_pattoki</span></div></div></footer>;
}

function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.08 });
    document.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return <div className="noise min-h-[100dvh] overflow-x-hidden"><Header /><main><Hero /><div className="trust-band px-5 py-6 lg:px-10 lg:py-8"><TrustMarquee /></div><div data-reveal className="reveal-on-scroll"><PlantMatch /></div><div data-reveal className="reveal-on-scroll"><Categories /></div><div data-reveal className="reveal-on-scroll"><TrustBanner /></div><div data-reveal className="reveal-on-scroll"><Offers /></div><div data-reveal className="reveal-on-scroll"><Flowers /></div><div data-reveal className="reveal-on-scroll"><Story /></div><div data-reveal className="reveal-on-scroll"><Journal /></div></main><Footer /><Assistant /></div>;
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function NotFound() {
  return <div className="flex min-h-[100dvh] items-center justify-center bg-[hsl(var(--background))] p-6 text-center"><div><Leaf className="mx-auto text-[hsl(var(--accent))]" /><h1 className="mt-5 font-serif text-5xl text-[hsl(var(--primary))]">A path not found.</h1><a href="/" className="focus-ring mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.1em] text-[hsl(var(--primary))]" data-testid="link-not-found-home">Return to the nursery <ArrowRight size={15} /></a></div></div>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;