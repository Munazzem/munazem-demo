'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import {
    Zap, ArrowLeft, MessageCircle, CheckCircle2, Users,
    QrCode, Wallet, Smartphone, Shield, Clock, ChevronDown,
    Star, Sparkles, GraduationCap, CalendarCheck, X, Check,
    WifiOff, Lock, RefreshCw, Globe, Send, BarChart3
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScreensShowcase } from '@/components/demo/ScreensShowcase';

const WHATSAPP = '201288494803';
const DEMO_URL = '/demo/dashboard';

/* ═══════════════════════════════════════════════════════ */
/*  HOOKS                                                 */
/* ═══════════════════════════════════════════════════════ */

function useReveal(delay = 0) {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        el.style.transitionDelay = `${delay}ms`;
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { el.classList.add('revealed'); obs.unobserve(el); } },
            { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [delay]);
    return ref;
}

/* ═══════════════════════════════════════════════════════ */
/*  SUB-COMPONENTS                                         */
/* ═══════════════════════════════════════════════════════ */

function AnimatedCounter({
    target,
    prefix = '',
    suffix = '',
    suffixClassName = '',
}: {
    target: number;
    prefix?: string;
    suffix?: string;
    suffixClassName?: string;
}) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const done = useRef(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting && !done.current) {
                done.current = true;
                let v = 0;
                const inc = Math.max(1, target / 45);
                const t = setInterval(() => {
                    v += inc;
                    if (v >= target) { setCount(target); clearInterval(t); }
                    else setCount(Math.floor(v));
                }, 30);
            }
        }, { threshold: 0.2 });
        obs.observe(el);
        return () => obs.disconnect();
    }, [target]);
    return (
        <span ref={ref} dir="ltr" className="inline-flex items-baseline justify-center gap-0.5 tracking-tight font-black select-none">
            {prefix && <span className={suffixClassName}>{prefix}</span>}
            <span>{count.toLocaleString()}</span>
            {suffix && <span className={cn("text-2xl sm:text-3xl lg:text-4xl font-extrabold", suffixClassName)}>{suffix}</span>}
        </span>
    );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border border-blue-500/20 rounded-2xl bg-[#0a203f]/80 backdrop-blur-md shadow-sm overflow-hidden transition-all duration-300 hover:border-sky-400/40">
            <button onClick={() => setOpen(!open)} className="w-full px-6 py-4 flex items-center justify-between text-right text-white font-bold hover:bg-white/5 transition-colors">
                {question}
                <ChevronDown className={cn("h-5 w-5 text-sky-400 transition-transform duration-300 shrink-0 mr-2", open && "rotate-180")} />
            </button>
            <div className={cn("px-6 overflow-hidden transition-all duration-300", open ? "py-4 max-h-96 opacity-100 border-t border-blue-500/15" : "max-h-0 opacity-0")}>
                <p className="text-blue-100/80 leading-relaxed text-sm">{answer}</p>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════ */
/*  HERO VISUAL COMPONENTS                                */
/* ═══════════════════════════════════════════════════════ */

/**
 * Laptop & Phone Device Mockup with real screens & scan laser
 */
function HeroDeviceMockup() {
    return (
        <div className="relative w-full max-w-lg lg:max-w-xl mx-auto pt-4 pb-8 sm:pb-12">
            {/* Ambient Backlight Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/25 via-blue-600/20 to-transparent blur-3xl rounded-full -z-10" />

            {/* Floating Glass Badge 1 - Top Left */}
            <div className="absolute -top-3 -left-2 sm:-left-4 z-30 bg-[#071d3d]/90 border border-sky-400/40 backdrop-blur-md px-3.5 py-2 sm:py-2.5 rounded-2xl shadow-2xl flex items-center gap-2.5 animate-float-gentle">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 font-black text-sm">
                    ✓
                </div>
                <div className="text-right">
                    <div className="text-xs font-bold text-white">تسجيل حضور بالباركود</div>
                    <div className="text-[10px] text-sky-300 font-medium">عمر أحمد • 04:15 م (حاضر)</div>
                </div>
            </div>

            {/* LAPTOP FRAME (MacBook Style) */}
            <div className="relative z-10 w-full transition-transform duration-500 hover:scale-[1.01]">
                {/* Screen Enclosure */}
                <div className="bg-[#0b1b34] p-2 sm:p-2.5 rounded-t-2xl border border-sky-400/30 shadow-2xl shadow-black/80">
                    {/* Webcam Bar */}
                    <div className="flex items-center justify-center mb-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center">
                            <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                        </div>
                    </div>
                    {/* Screen Image */}
                    <div className="relative rounded-lg overflow-hidden border border-sky-500/20 bg-slate-950 aspect-[16/10]">
                        <img 
                            src={`/screens/screens/${encodeURIComponent('داشبورد لابتوب.png')}`} 
                            alt="لوحة تحكم مُنظِّم" 
                            className="w-full h-full object-cover object-top" 
                        />
                        {/* Realistic Glass Reflection */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
                    </div>
                </div>
                {/* Laptop Base / Deck */}
                <div className="relative bg-gradient-to-b from-[#182c4a] via-[#0e1f39] to-[#071528] h-3.5 sm:h-4 rounded-b-xl border-t border-sky-400/30 shadow-2xl flex items-start justify-center">
                    <div className="w-16 sm:w-20 h-1 bg-slate-400/35 rounded-full mt-0.5" />
                </div>
            </div>

            {/* SMARTPHONE FRAME (Angled Foreground) */}
            <div className="absolute -bottom-6 -right-2 sm:-bottom-8 sm:-right-4 w-40 sm:w-48 md:w-52 z-20 transition-transform duration-500 hover:-translate-y-2">
                <div className="bg-[#081830] p-1.5 sm:p-2 rounded-[2rem] sm:rounded-[2.2rem] border-2 border-sky-400/50 shadow-2xl shadow-black/90 rotate-[-3deg] hover:rotate-0 transition-transform duration-500">
                    {/* Phone Screen Display */}
                    <div className="relative rounded-[1.6rem] overflow-hidden border border-blue-900/60 aspect-[9/18.5] bg-slate-950">
                        <img 
                            src={`/screens/screens/${encodeURIComponent('داشبورد موبايل.png')}`} 
                            alt="تسجيل الحضور بالباركود" 
                            className="w-full h-full object-cover object-top" 
                        />
                        {/* Animated Laser Scanning Beam */}
                        <div className="absolute left-0 right-0 h-0.5 bg-sky-400 shadow-[0_0_12px_#38bdf8] animate-scan-laser pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Floating Glass Badge 2 - Bottom Left */}
            <div className="absolute -bottom-7 left-1 sm:left-4 z-30 bg-[#071d3d]/95 border border-sky-400/40 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-2xl flex items-center gap-2.5 animate-float-delayed">
                <MessageCircle size={17} className="text-emerald-400 fill-emerald-400/20 shrink-0" />
                <div className="text-right">
                    <div className="text-[11px] font-bold text-white">إشعار واتساب تلقائي</div>
                    <div className="text-[9px] text-emerald-300 font-semibold">تم إرسال التقرير لولي الأمر 🚀</div>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════ */
/*  MAIN PAGE                                              */
/* ═══════════════════════════════════════════════════════ */

export default function LandingPage() {
    const [waVisible, setWaVisible] = useState(false);

    useEffect(() => {
        const handler = () => setWaVisible(window.scrollY > 500);
        window.addEventListener('scroll', handler, { passive: true });
        return () => window.removeEventListener('scroll', handler);
    }, []);

    /* Reveal refs */
    const rStats = useReveal();
    const rStat1 = useReveal(0);
    const rStat2 = useReveal(120);
    const rStat3 = useReveal(240);
    const rStat4 = useReveal(360);
    const rBefore = useReveal();
    const rAfter = useReveal(150);
    const rSecurity = useReveal();
    const rHow = useReveal();
    const rStep1 = useReveal(0);
    const rStep2 = useReveal(180);
    const rStep3 = useReveal(360);
    const rPricing = useReveal();
    const rTestimonial = useReveal();
    const rFaq = useReveal();
    const rCta = useReveal();

    return (
        <div className="min-h-screen bg-[#07162c] text-white overflow-x-hidden selection:bg-sky-500/30 selection:text-white relative" dir="rtl" style={{ fontFamily: 'var(--font-cairo), sans-serif' }}>

            {/* ─── Global Styles & Ambient Mesh ─── */}
            <style>{`
                .text-gradient { 
                    background: linear-gradient(135deg, #ffffff 0%, #bae6fd 40%, #38bdf8 80%, #60a5fa 100%); 
                    -webkit-background-clip: text; 
                    -webkit-text-fill-color: transparent; 
                    background-clip: text; 
                }
                .glow-bg { 
                    background: radial-gradient(circle at 50% 10%, rgba(15, 76, 129, 0.4) 0%, rgba(7, 22, 44, 0.8) 60%, transparent 80%); 
                }
                .glass-card { 
                    background: rgba(12, 33, 64, 0.65); 
                    backdrop-filter: blur(16px); 
                    border: 1px solid rgba(56, 189, 248, 0.18); 
                    box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08); 
                }
                .glass-nav { 
                    background: rgba(7, 22, 44, 0.85); 
                    backdrop-filter: blur(20px); 
                    border-bottom: 1px solid rgba(56, 189, 248, 0.15); 
                }

                /* Scroll Reveal — Scale + Blur Entrance */
                .reveal-item {
                    opacity: 0;
                    transform: translateY(48px) scale(0.96);
                    filter: blur(8px);
                    transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1),
                                transform 0.9s cubic-bezier(0.16, 1, 0.3, 1),
                                filter 0.9s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .reveal-item.revealed {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                    filter: blur(0);
                }

                /* Trust Bar Marquee */
                @keyframes marquee-scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .marquee-track {
                    animation: marquee-scroll 35s linear infinite;
                }
                .marquee-track:hover { animation-play-state: paused; }

                /* WhatsApp Pulse Ring */
                @keyframes wa-pulse {
                    0% { box-shadow: 0 0 0 0 rgba(37,211,102,0.5); }
                    70% { box-shadow: 0 0 0 14px rgba(37,211,102,0); }
                    100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); }
                }

                /* Stat Card Shimmer */
                @keyframes stat-shimmer {
                    0%, 100% { opacity: 0.4; }
                    50% { opacity: 0.8; }
                }

                /* Gradient connector pulse */
                .gradient-connector {
                    background: linear-gradient(180deg, rgba(56,189,248,0.4), rgba(15,76,129,0.5), rgba(56,189,248,0.4));
                    animation: stat-shimmer 3s ease-in-out infinite;
                }
            `}</style>

            {/* Ambient Background Glows */}
            <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(15,76,129,0.35)_0%,transparent_70%)] blur-[100px]" />
                <div className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.12)_0%,transparent_70%)] blur-[120px]" />
                <div className="absolute top-[65%] left-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(15,76,129,0.25)_0%,transparent_70%)] blur-[120px]" />
            </div>


            {/* ══════════════════════════════════════════════════════ */}
            {/*  MODERN FLOATING COMPACT NAVBAR                        */}
            {/* ══════════════════════════════════════════════════════ */}
            <nav className="fixed top-4 inset-x-0 z-50 px-4 sm:px-6 pointer-events-none">
                <div className="max-w-4xl mx-auto h-14 sm:h-16 px-3 sm:px-5 rounded-full bg-[#081d3a]/80 backdrop-blur-2xl border border-sky-400/25 shadow-2xl shadow-black/40 flex items-center justify-between pointer-events-auto transition-all duration-300 hover:border-sky-400/40">
                    
                    {/* Brand & Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden flex items-center justify-center p-0.5 bg-gradient-to-tr from-[#0f4c81] to-sky-400 shadow-sm transition-transform duration-300 group-hover:scale-105">
                            <img src="/icons/logo-munazzem-brand.png" alt="شعار مُنظِّم" className="w-full h-full object-contain" />
                        </div>
                        <span className="text-lg sm:text-xl font-black text-white tracking-tight">مُنظِّم</span>
                    </Link>

                    {/* Quick Nav Links (Desktop) */}
                    <div className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-semibold text-blue-200/80">
                        <a href="#screens-showcase" className="hover:text-white transition-colors">معرض الشاشات</a>
                        <a href="#pricing" className="hover:text-white transition-colors">الباقات</a>
                        <a href="#faq" className="hover:text-white transition-colors">الأسئلة</a>
                        <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" className="hover:text-sky-300 transition-colors flex items-center gap-1.5">
                            <MessageCircle size={14} className="text-sky-400" />
                            تواصل معنا
                        </a>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" className="md:hidden p-2 rounded-full text-sky-400 hover:bg-white/10 transition-colors" title="تواصل معنا">
                            <MessageCircle size={18} />
                        </a>
                        <Link 
                            href={DEMO_URL} 
                            target="_blank" 
                            className="flex items-center gap-1.5 bg-white hover:bg-blue-50 text-[#071d3d] text-xs sm:text-sm font-black px-4 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all shadow-md hover:scale-105 hover:shadow-sky-500/20 shrink-0"
                        >
                            <span>جرب النظام</span>
                            <ArrowLeft size={14} />
                        </Link>
                    </div>
                </div>
            </nav>


            {/* ══════════════════════════════════════════════════════ */}
            {/*  HERO SECTION (SPLIT 2-COLUMN LAYOUT)                  */}
            {/* ══════════════════════════════════════════════════════ */}
            <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 glow-bg overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                        
                        {/* ─── RIGHT COLUMN: Powerful Headline, Value Prop & CTAs ─── */}
                        <div className="lg:col-span-7 text-right">
                            {/* Trust Badge */}
                            <div className="inline-flex items-center gap-2.5 border border-sky-400/30 bg-sky-500/10 backdrop-blur-md text-sky-200 text-xs sm:text-sm font-bold px-4 py-2 rounded-full mb-6 shadow-[0_0_25px_rgba(56,189,248,0.2)]">
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-500/25 text-sky-300">
                                    <Sparkles size={13} className="text-sky-300 animate-pulse" />
                                </span>
                                <span>المنصة السحابية الأولى لإدارة السناتر والمدرسين</span>
                            </div>

                            {/* Main Punchy Headline */}
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.6rem] font-black tracking-tight leading-[1.25] pb-3">
                                <span className="block text-white drop-shadow-xl mb-1 sm:mb-2">
                                    المنظومة الأذكى لإدارة
                                </span>
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-blue-100 to-white drop-shadow-md pb-2">
                                    سنترك وطلابك باحترافية
                                </span>
                            </h1>

                            {/* Subtitle / Punchline */}
                            <p className="text-sky-300 font-bold text-base sm:text-lg mb-4 flex items-center gap-2">
                                <Zap size={18} className="text-sky-400 shrink-0 fill-current" />
                                <span>وداعاً لفوضى الدفاتر.. كل تفاصيل سنترك تحت سيطرتك بلمسة واحدة</span>
                            </p>

                            {/* Description */}
                            <p className="text-blue-100/80 text-base sm:text-lg leading-relaxed mb-8 max-w-xl font-normal">
                                سجّل حضور وغياب آلاف الطلاب في ثوانٍ بالباركود، اضبط اشتراكاتك وإيراداتك بدقة متناهية، وأرسل تقارير المتابعة لأولياء الأمور تلقائياً عبر الواتساب بدون أي مجهود.
                            </p>

                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
                                <Link 
                                    href={DEMO_URL} 
                                    target="_blank" 
                                    className="flex items-center justify-center gap-3 bg-white hover:bg-blue-50 text-[#071d3d] font-black text-base sm:text-lg px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-xl shadow-black/40 group"
                                >
                                    <span>تصفح النسخة التجريبية</span>
                                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                                </Link>
                                <a 
                                    href={`https://wa.me/${WHATSAPP}?text=مرحبا، أريد الاشتراك في نظام مُنظِّم`} 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="flex items-center justify-center gap-2.5 bg-sky-500/15 hover:bg-sky-500/25 text-white font-bold text-base sm:text-lg px-7 py-4 rounded-full border border-sky-400/30 backdrop-blur-md transition-all hover:border-sky-400/60"
                                >
                                    <MessageCircle size={19} className="text-sky-400 fill-sky-400/20" /> 
                                    <span>تواصل للاشتراك الفوري</span>
                                </a>
                            </div>

                            {/* Quick Trust / Feature Chips */}
                            <div className="grid grid-cols-2 gap-3 pt-6 border-t border-sky-500/20 max-w-lg">
                                <div className="flex items-center gap-2 text-xs sm:text-sm text-blue-200/90 font-semibold">
                                    <CheckCircle2 size={16} className="text-sky-400 shrink-0" />
                                    <span>حضور فوري بمسح الباركود</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs sm:text-sm text-blue-200/90 font-semibold">
                                    <CheckCircle2 size={16} className="text-sky-400 shrink-0" />
                                    <span>تقارير واتساب تلقائية</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs sm:text-sm text-blue-200/90 font-semibold">
                                    <CheckCircle2 size={16} className="text-sky-400 shrink-0" />
                                    <span>إدارة المصاريف والماليات</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs sm:text-sm text-blue-200/90 font-semibold">
                                    <CheckCircle2 size={16} className="text-sky-400 shrink-0" />
                                    <span>يعمل بدون أجهزة خاصة أو نت دائم</span>
                                </div>
                            </div>
                        </div>

                        {/* ─── LEFT COLUMN: Visual Presentation (Laptop & Smartphone Mockups) ─── */}
                        <div className="lg:col-span-5 relative mt-6 lg:mt-0">
                            <HeroDeviceMockup />
                        </div>

                    </div>
                </div>
            </section>


            {/* ══════════════════════════════════════════════════════ */}
            {/*  TRUST BAR — Scrolling Tech Badges                     */}
            {/* ══════════════════════════════════════════════════════ */}
            <section className="py-6 border-y border-blue-500/15 bg-[#051428]/90 overflow-hidden">
                <div className="relative" dir="ltr">
                    <div className="flex marquee-track" style={{ width: '200%' }}>
                        {[0, 1].map((setIdx) => (
                            <div key={setIdx} className="flex items-center shrink-0" style={{ width: '50%', justifyContent: 'space-around' }}>
                                {[
                                    { icon: <MessageCircle size={15} />, label: 'WhatsApp API' },
                                    { icon: <Lock size={15} />, label: 'SSL Encryption' },
                                    { icon: <Globe size={15} />, label: 'Cloud Hosting' },
                                    { icon: <Smartphone size={15} />, label: 'PWA Ready' },
                                    { icon: <WifiOff size={15} />, label: 'Offline Mode' },
                                    { icon: <RefreshCw size={15} />, label: 'Real-time Sync' },
                                    { icon: <Shield size={15} />, label: 'Data Protected' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-2 text-blue-200/75 text-xs sm:text-sm font-semibold whitespace-nowrap px-4 sm:px-6">
                                        <span className="text-sky-400">{item.icon}</span>
                                        {item.label}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* ══════════════════════════════════════════════════════ */}
            {/*  STATS — Animated Premium Counters                     */}
            {/* ══════════════════════════════════════════════════════ */}
            <section className="py-20 sm:py-28 px-6 relative overflow-hidden bg-[#061833]/60 border-b border-blue-500/15">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-sky-500/10 blur-[120px] pointer-events-none rounded-full" />

                <div ref={rStats} className="reveal-item max-w-6xl mx-auto relative z-10">
                    {/* Header */}
                    <div className="text-center mb-14 sm:mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-sky-500/15 text-sky-200 border border-sky-400/30 mb-4 shadow-[0_0_20px_rgba(56,189,248,0.15)]">
                            <Sparkles size={14} className="text-sky-400 animate-pulse" />
                            <span>إحصائيات المنصة الموثوقة</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight">
                            أرقام <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-blue-100 to-white">بنفتخر بيها</span>
                        </h2>
                        <p className="text-blue-100/75 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
                            نتائج حقيقية ونمو متسارع يعكس ثقة المدرسين والسناتر التعليمية في مختلف المراحل
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {[
                            {
                                ref: rStat1,
                                icon: <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-sky-300" />,
                                iconBg: 'bg-sky-500/15 border-sky-400/30 shadow-sky-500/10',
                                badge: 'نمو مستمر',
                                badgeColor: 'text-sky-200 bg-sky-500/15 border-sky-400/30',
                                value: 10000,
                                suffix: '+',
                                suffixColor: 'text-sky-400',
                                label: 'طالب مسجل',
                                desc: 'في مختلف المراحل التعليمية',
                                cardBorder: 'hover:border-sky-400/60',
                                topGlow: 'from-transparent via-sky-400 to-transparent',
                            },
                            {
                                ref: rStat2,
                                icon: <CalendarCheck className="w-6 h-6 sm:w-7 sm:h-7 text-blue-300" />,
                                iconBg: 'bg-blue-500/15 border-blue-400/30 shadow-blue-500/10',
                                badge: 'حضور دقيق',
                                badgeColor: 'text-blue-200 bg-blue-500/15 border-blue-400/30',
                                value: 800,
                                suffix: '+',
                                suffixColor: 'text-blue-300',
                                label: 'حصة مكتملة',
                                desc: 'تسجيل فوري عبر كروت الباركود',
                                cardBorder: 'hover:border-blue-400/60',
                                topGlow: 'from-transparent via-blue-400 to-transparent',
                            },
                            {
                                ref: rStat3,
                                icon: <Users className="w-6 h-6 sm:w-7 sm:h-7 text-indigo-300" />,
                                iconBg: 'bg-indigo-500/15 border-indigo-400/30 shadow-indigo-500/10',
                                badge: 'شركاء النجاح',
                                badgeColor: 'text-indigo-200 bg-indigo-500/15 border-indigo-400/30',
                                value: 20,
                                suffix: '+',
                                suffixColor: 'text-indigo-300',
                                label: 'مدرس يثق بنا',
                                desc: 'يديرون مجموعاتهم وسناترهم يومياً',
                                cardBorder: 'hover:border-indigo-400/60',
                                topGlow: 'from-transparent via-indigo-400 to-transparent',
                            },
                            {
                                ref: rStat4,
                                icon: <Star className="w-6 h-6 sm:w-7 sm:h-7 text-amber-400 fill-amber-400/20" />,
                                iconBg: 'bg-amber-500/15 border-amber-400/30 shadow-amber-500/10',
                                badge: 'أعلى تقييم',
                                badgeColor: 'text-amber-200 bg-amber-500/15 border-amber-400/30',
                                value: 99,
                                suffix: '%',
                                suffixColor: 'text-amber-400',
                                label: 'نسبة رضا العملاء',
                                desc: 'تقييم ممتاز لتجربة الاستخدام والدعم',
                                cardBorder: 'hover:border-amber-400/60',
                                topGlow: 'from-transparent via-amber-400 to-transparent',
                            },
                        ].map((stat, i) => (
                            <div
                                key={i}
                                ref={stat.ref}
                                className={cn(
                                    "reveal-item group relative rounded-2xl sm:rounded-3xl p-5 sm:p-7 flex flex-col items-center text-center cursor-default transition-all duration-300 overflow-hidden",
                                    "bg-gradient-to-b from-[#0e2c56]/85 via-[#0a1e3a]/80 to-[#07162b]/90 backdrop-blur-xl",
                                    "border border-blue-500/20 shadow-xl shadow-black/40",
                                    "hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-sky-500/10",
                                    stat.cardBorder
                                )}
                            >
                                {/* Top Accent Glow Line */}
                                <div className={cn("absolute top-0 left-1/2 -translate-x-1/2 w-28 h-[2px] rounded-full bg-gradient-to-r opacity-60 group-hover:opacity-100 group-hover:w-36 transition-all duration-500", stat.topGlow)} />

                                {/* Card Header Micro-badge */}
                                <div className="w-full flex items-center justify-between mb-4 relative z-10">
                                    <span className={cn("text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full border", stat.badgeColor)}>
                                        {stat.badge}
                                    </span>
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400/40 group-hover:bg-sky-400 transition-colors" />
                                </div>

                                {/* Icon Container */}
                                <div className={cn(
                                    "w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center border shadow-md mb-4 relative z-10 transition-transform duration-300 group-hover:scale-110",
                                    stat.iconBg
                                )}>
                                    {stat.icon}
                                </div>

                                {/* Number Counter */}
                                <div className="relative z-10 text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-2 tracking-tight">
                                    <AnimatedCounter target={stat.value} suffix={stat.suffix} suffixClassName={stat.suffixColor} />
                                </div>

                                {/* Label */}
                                <h3 className="relative z-10 text-sm sm:text-base lg:text-lg font-bold text-white mb-1">
                                    {stat.label}
                                </h3>

                                {/* Micro Description */}
                                <p className="relative z-10 text-[11px] sm:text-xs text-blue-200/70 leading-relaxed font-normal">
                                    {stat.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Trust Indicators sub-strip */}
                    <div className="mt-8 sm:mt-12 p-4 sm:p-5 rounded-2xl bg-[#0c2242]/70 border border-blue-500/20 backdrop-blur-md flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-blue-200 font-medium shadow-sm">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                            <span>تسجيل حضور ذكي وفوري بالباركود</span>
                        </div>
                        <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-blue-400/40" />
                        <div className="flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-sky-400 shrink-0" />
                            <span>بيانات آمنة ومشفرة سحابياً 100%</span>
                        </div>
                        <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-blue-400/40" />
                        <div className="flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-blue-300 shrink-0" />
                            <span>تحديثات مستمرة ودعم فني متواصل</span>
                        </div>
                    </div>
                </div>
            </section>


            {/* ══════════════════════════════════════════════════════ */}
            {/*  SCREENS SHOWCASE — Interactive Dual Device Tour       */}
            {/* ══════════════════════════════════════════════════════ */}
            <ScreensShowcase />


            {/* ══════════════════════════════════════════════════════ */}
            {/*  BEFORE & AFTER — Comparison Cards                     */}
            {/* ══════════════════════════════════════════════════════ */}
            <section className="py-24 px-6 bg-[#061426]/90 border-y border-blue-500/15 relative overflow-hidden">
                <div className="max-w-5xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">الفرق اللي هتحس بيه</h2>
                        <p className="text-blue-200/70 text-lg">قارن بين الطريقة القديمة وبين مُنظِّم</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 relative">
                        {/* Arrow connector (desktop only) */}
                        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-16 h-16 rounded-full bg-[#0a2347] border-2 border-sky-400 items-center justify-center shadow-[0_0_30px_rgba(56,189,248,0.3)] text-sky-300">
                            <Sparkles size={24} />
                        </div>

                        {/* BEFORE Card */}
                        <div ref={rBefore} className="reveal-item bg-[#131b28]/85 rounded-3xl p-6 sm:p-8 border border-red-500/20 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-l from-red-500 via-red-400 to-transparent" />
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                                    <X size={20} className="text-red-400" />
                                </div>
                                <h3 className="text-xl font-bold text-red-300">بدون مُنظِّم</h3>
                            </div>
                            <ul className="space-y-5">
                                {[
                                    'كشف حضور ورقي وأخطاء يومية',
                                    'حسابات مالية يدوية ودفاتر',
                                    'ضياع بيانات الطلاب والتقارير',
                                    'تواصل عشوائي مع أولياء الأمور',
                                    'وقت ضايع في التنظيم بدل التدريس',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-300 font-medium">
                                        <div className="w-6 h-6 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                            <X size={12} className="text-red-400" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* AFTER Card */}
                        <div ref={rAfter} className="reveal-item bg-gradient-to-b from-[#0e2e58]/95 to-[#091e3a]/95 rounded-3xl p-6 sm:p-8 border-2 border-sky-400/60 shadow-[0_0_40px_rgba(56,189,248,0.15)] relative overflow-hidden">
                            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-l from-sky-400 via-blue-500 to-transparent" />
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-400/30 flex items-center justify-center">
                                    <Check size={20} className="text-sky-300" />
                                </div>
                                <h3 className="text-xl font-bold text-white">مع مُنظِّم</h3>
                            </div>
                            <ul className="space-y-5">
                                {[
                                    'حضور ذكي بالباركود في ثانية واحدة',
                                    'نظام مالي أوتوماتيك ودقيق ١٠٠٪',
                                    'ملفات إلكترونية آمنة ومنظمة',
                                    'إشعارات واتساب فورية وتلقائية',
                                    'إدارة كاملة بلمسة زر من موبايلك',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-white font-semibold">
                                        <div className="w-6 h-6 rounded-full bg-sky-500/20 border border-sky-400/40 flex items-center justify-center shrink-0 mt-0.5">
                                            <Check size={12} className="text-sky-300" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>


            {/* ══════════════════════════════════════════════════════ */}
            {/*  SECURITY & PRIVACY                                    */}
            {/* ══════════════════════════════════════════════════════ */}
            <section className="py-24 px-6 relative bg-[#07162c] border-b border-blue-500/15">
                <div ref={rSecurity} className="reveal-item max-w-5xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <div className="w-16 h-16 mx-auto bg-sky-500/15 border border-sky-400/30 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(56,189,248,0.2)] text-sky-300">
                            <Shield size={32} />
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">بيانات طلابك في أمان تام</h2>
                        <p className="text-blue-100/75 text-lg max-w-2xl mx-auto">
                            عارفين إن بيانات طلابك وحساباتك هي رأس مالك. عشان كده بنينا "مُنظِّم" بأعلى معايير الأمان والسرية، ومستحيل أي حد يطلع عليها غيرك.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: <Lock size={24} className="text-sky-300" />,
                                title: 'تشفير كامل للبيانات',
                                desc: 'كل البيانات الخاصة بالطلاب والماليات مشفرة بالكامل على خوادمنا السحابية لحمايتها من أي اختراق.'
                            },
                            {
                                icon: <RefreshCw size={24} className="text-blue-300" />,
                                title: 'نسخ احتياطي يومي',
                                desc: 'بنعمل نسخة احتياطية (Backup) تلقائية لبياناتك كل يوم. حتى لو حصل أي طارئ، بياناتك مستحيل تضيع وتقدر تسترجعها.'
                            },
                            {
                                icon: <Shield size={24} className="text-indigo-300" />,
                                title: 'خصوصية ملكك لوحدك',
                                desc: 'لا توجد أي جهة أخرى تقدر تشوف داتا طلابك، ولا حتى فريق الدعم الفني إلا بإذن صريح منك. أنت المالك الوحيد.'
                            }
                        ].map((item, i) => (
                            <div key={i} className="glass-card rounded-3xl p-8 hover:border-sky-400/40 hover:-translate-y-2 transition-all duration-300">
                                <div className="w-12 h-12 rounded-xl bg-[#081b35] border border-blue-500/30 flex items-center justify-center mb-6 shadow-sm">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-blue-100/75 leading-relaxed text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* ══════════════════════════════════════════════════════ */}
            {/*  HOW IT WORKS — 3 Steps                                */}
            {/* ══════════════════════════════════════════════════════ */}
            <section className="py-24 px-6 relative bg-[#061833]/60">
                <div className="max-w-4xl mx-auto relative z-10">
                    <div ref={rHow} className="reveal-item text-center mb-16">
                        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">ابدأ في ٣ خطوات بس</h2>
                        <p className="text-blue-200/70 text-lg">من أول ما تتواصل معنا لحد ما تبدأ تشتغل</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        {/* Connecting line (desktop) */}
                        <div className="hidden md:block absolute top-14 left-[16%] right-[16%] h-[2px] bg-sky-500/25 z-0" />

                        {[
                            { ref: rStep1, num: '١', icon: <Send size={28} />, title: 'تواصل معنا', desc: 'ابعتلنا رسالة على الواتساب وقولنا محتاج إيه وعدد طلابك.', color: 'text-sky-300' },
                            { ref: rStep2, num: '٢', icon: <Zap size={28} />, title: 'نفعّلك حسابك', desc: 'في أقل من ٢٤ ساعة هيبقى حسابك جاهز ومفعّل بالكامل.', color: 'text-blue-300' },
                            { ref: rStep3, num: '٣', icon: <Sparkles size={28} />, title: 'ابدأ شغلك', desc: 'ابدأ أضف طلابك وسجّل الحضور والاشتراكات من موبايلك.', color: 'text-sky-200' },
                        ].map((step, i) => (
                            <div key={i} ref={step.ref} className="reveal-item relative z-10 text-center glass-card rounded-3xl p-6 shadow-sm hover:border-sky-400/40 transition-all">
                                <div className={cn("w-16 h-16 rounded-2xl bg-sky-500/15 border border-sky-400/30 flex items-center justify-center mx-auto mb-6 shadow-sm", step.color)}>
                                    {step.icon}
                                </div>
                                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-200 text-sm font-black mb-4">
                                    {step.num}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                                <p className="text-blue-100/75 leading-relaxed text-sm sm:text-base max-w-xs mx-auto">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* ══════════════════════════════════════════════════════ */}
            {/* ══════════════════════════════════════════════════════ */}
            {/*  PRICING                                               */}
            {/* ══════════════════════════════════════════════════════ */}
            <section id="pricing" className="py-20 px-4 sm:px-6 bg-[#06152a]/90 border-y border-blue-500/15 relative overflow-hidden">
                {/* Ambient glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-sky-500/10 blur-[130px] pointer-events-none" />

                <div ref={rPricing} className="reveal-item max-w-6xl mx-auto text-center relative z-10">
                    {/* Header pill */}
                    <div className="inline-flex items-center gap-2 border border-sky-400/30 bg-sky-500/10 text-sky-200 text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow-sm">
                        <Sparkles size={13} className="text-sky-300" />
                        <span>أسعار واضحة وعادلة • بدون مصاريف خفية</span>
                    </div>

                    <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-3">
                        استثمار بسيط لنمو مستمر
                    </h2>
                    <p className="text-blue-200/70 text-sm sm:text-base max-w-xl mx-auto mb-12">
                        اختر الباقة المناسبة لعدد طلابك، وتقدر ترقّي أو تعدّل اشتراكك في أي وقت بسهولة.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7 items-stretch max-w-5xl mx-auto">
                        
                        {/* ─── 1. MINI PACKAGE ─── */}
                        <div className="bg-[#091f3c]/75 hover:bg-[#0c2445] border border-teal-500/25 hover:border-teal-400/50 rounded-2xl p-6 flex flex-col justify-between shadow-xl backdrop-blur-md transition-all duration-300">
                            <div>
                                <div className="inline-block bg-teal-500/15 text-teal-300 text-xs font-bold px-3.5 py-1 rounded-full border border-teal-500/30 mb-4">
                                    باقة ميني (Mini)
                                </div>

                                <div className="mb-3">
                                    <div className="flex items-baseline justify-center gap-1.5">
                                        <span className="text-3xl sm:text-4xl font-black text-white">499</span>
                                        <span className="text-xs sm:text-sm text-blue-200/70 font-semibold">ج.م / شهرياً</span>
                                    </div>
                                    <div className="text-[11px] text-slate-400 line-through mt-0.5">بدلاً من 699 جنيه</div>
                                </div>

                                <div className="bg-teal-500/10 border border-teal-500/20 rounded-xl py-1.5 px-3 mb-5 text-center">
                                    <div className="text-xs font-bold text-teal-200">👥 حتى 250 طالب</div>
                                    <div className="text-[10px] text-blue-200/60 mt-0.5">+250 ج لكل 100 طالب إضافي</div>
                                </div>

                                <ul className="space-y-2.5 text-right mb-6">
                                    <li className="flex items-center gap-2.5 text-blue-100 text-xs sm:text-[13px] font-medium">
                                        <Check size={15} className="text-teal-400 shrink-0" />
                                        <span>إدارة متكاملة للماليات والحضور</span>
                                    </li>
                                    <li className="flex items-center gap-2.5 text-blue-100 text-xs sm:text-[13px] font-medium">
                                        <Check size={15} className="text-teal-400 shrink-0" />
                                        <span>عدد مجموعات غير محدود</span>
                                    </li>
                                    <li className="flex items-center gap-2.5 text-blue-100 text-xs sm:text-[13px] font-medium">
                                        <Check size={15} className="text-teal-400 shrink-0" />
                                        <span>حتى 3 حسابات للمساعدين</span>
                                    </li>
                                    <li className="flex items-center gap-2.5 text-blue-100 text-xs sm:text-[13px] font-medium">
                                        <Check size={15} className="text-teal-400 shrink-0" />
                                        <span>تطبيق حضور أوفلاين (PWA)</span>
                                    </li>
                                    <li className="flex items-center gap-2.5 text-blue-100 text-xs sm:text-[13px] font-medium">
                                        <Check size={15} className="text-teal-400 shrink-0" />
                                        <span>دعم فني وتحديثات مستمرة</span>
                                    </li>
                                </ul>
                            </div>

                            <a 
                                href={`https://wa.me/${WHATSAPP}?text=مرحبا، أريد الاشتراك في باقة ميني لنظام مُنظِّم`} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="w-full bg-teal-500/15 hover:bg-teal-500/25 border border-teal-400/30 hover:border-teal-400/60 text-teal-200 hover:text-white font-bold text-xs sm:text-sm py-2.5 rounded-xl transition-all flex items-center justify-center gap-2"
                            >
                                <span>اشترك في ميني</span>
                                <ArrowLeft size={14} />
                            </a>
                        </div>

                        {/* ─── 2. BASIC PACKAGE ─── */}
                        <div className="bg-[#091f3c]/75 hover:bg-[#0c2445] border border-blue-500/25 hover:border-sky-400/50 rounded-2xl p-6 flex flex-col justify-between shadow-xl backdrop-blur-md transition-all duration-300">
                            <div>
                                <div className="inline-block bg-blue-500/15 text-blue-200 text-xs font-bold px-3.5 py-1 rounded-full border border-blue-500/30 mb-4">
                                    الباقة الأساسية
                                </div>

                                <div className="mb-3">
                                    <div className="flex items-baseline justify-center gap-1.5">
                                        <span className="text-3xl sm:text-4xl font-black text-white">899</span>
                                        <span className="text-xs sm:text-sm text-blue-200/70 font-semibold">ج.م / شهرياً</span>
                                    </div>
                                    <div className="text-[11px] text-slate-400 line-through mt-0.5">بدلاً من 1199 جنيه</div>
                                </div>

                                <div className="bg-sky-500/10 border border-sky-500/20 rounded-xl py-1.5 px-3 mb-5 text-center">
                                    <div className="text-xs font-bold text-sky-200">👥 حتى 500 طالب</div>
                                    <div className="text-[10px] text-blue-200/60 mt-0.5">+200 ج لكل 100 طالب إضافي</div>
                                </div>

                                <ul className="space-y-2.5 text-right mb-6">
                                    <li className="flex items-center gap-2.5 text-blue-100 text-xs sm:text-[13px] font-medium">
                                        <Check size={15} className="text-sky-400 shrink-0" />
                                        <span>كل مميزات باقة ميني</span>
                                    </li>
                                    <li className="flex items-center gap-2.5 text-blue-100 text-xs sm:text-[13px] font-medium">
                                        <Check size={15} className="text-sky-400 shrink-0" />
                                        <span>حسابات غير محدودة للمساعدين</span>
                                    </li>
                                    <li className="flex items-center gap-2.5 text-blue-100 text-xs sm:text-[13px] font-medium">
                                        <Check size={15} className="text-sky-400 shrink-0" />
                                        <span>تقارير تفصيلية ورسوم بيانية</span>
                                    </li>
                                    <li className="flex items-center gap-2.5 text-blue-100 text-xs sm:text-[13px] font-medium">
                                        <Check size={15} className="text-sky-400 shrink-0" />
                                        <span>تطبيق حضور أوفلاين (PWA)</span>
                                    </li>
                                    <li className="flex items-center gap-2.5 text-blue-100 text-xs sm:text-[13px] font-medium">
                                        <Check size={15} className="text-sky-400 shrink-0" />
                                        <span>دعم فني وتحديثات مستمرة</span>
                                    </li>
                                </ul>
                            </div>

                            <a 
                                href={`https://wa.me/${WHATSAPP}?text=مرحبا، أريد الاشتراك في الباقة الأساسية لنظام مُنظِّم`} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="w-full bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/40 hover:border-blue-400/70 text-sky-200 hover:text-white font-bold text-xs sm:text-sm py-2.5 rounded-xl transition-all flex items-center justify-center gap-2"
                            >
                                <span>اشترك في الأساسية</span>
                                <ArrowLeft size={14} />
                            </a>
                        </div>

                        {/* ─── 3. PREMIUM PACKAGE (VIP / FEATURED) ─── */}
                        <div className="relative bg-gradient-to-b from-[#113866] via-[#0d2a4f] to-[#071d38] border-2 border-sky-400 shadow-[0_0_45px_rgba(56,189,248,0.22)] ring-2 ring-sky-400/30 rounded-2xl p-6 flex flex-col justify-between md:-translate-y-2 hover:-translate-y-3 transition-all duration-300">
                            {/* Top Badge */}
                            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-sky-400 via-blue-400 to-sky-400 text-[#07162b] text-[10.5px] font-black px-3.5 py-1 rounded-full shadow-lg flex items-center gap-1.5 whitespace-nowrap">
                                <Sparkles size={12} className="fill-current text-[#07162b]" />
                                <span>الأكثر طلباً واكتمالاً</span>
                            </div>

                            <div>
                                <div className="inline-block bg-sky-400 text-[#07162b] text-xs font-black px-3.5 py-1 rounded-full mb-4 shadow-sm">
                                    باقة بريميوم (VIP)
                                </div>

                                <div className="mb-3">
                                    <div className="flex items-baseline justify-center gap-1.5">
                                        <span className="text-3xl sm:text-4xl font-black text-white">1199</span>
                                        <span className="text-xs sm:text-sm text-sky-200 font-semibold">ج.م / شهرياً</span>
                                    </div>
                                    <div className="text-[11px] text-blue-300/70 line-through mt-0.5">بدلاً من 1499 جنيه</div>
                                </div>

                                <div className="bg-sky-400/15 border border-sky-400/30 rounded-xl py-1.5 px-3 mb-4 text-center">
                                    <div className="text-xs font-bold text-sky-100">👥 حتى 500 طالب</div>
                                    <div className="text-[10px] text-sky-200/70 mt-0.5">+200 ج لكل 100 طالب إضافي</div>
                                </div>

                                <ul className="space-y-2 text-right mb-6">
                                    {/* 🌟 Parent App with glowing NEW Badge — Exclusive to Premium */}
                                    <li className="flex items-center justify-between bg-sky-400/15 border border-sky-400/40 rounded-xl px-2.5 py-1.5 shadow-sm">
                                        <div className="flex items-center gap-2">
                                            <Smartphone size={15} className="text-sky-300 shrink-0" />
                                            <span className="text-white font-extrabold text-xs sm:text-[13px]">ابليكيشن ولي الأمر</span>
                                        </div>
                                        <span className="bg-gradient-to-r from-amber-400 to-rose-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-[0_0_8px_rgba(244,63,94,0.5)] animate-pulse tracking-wider">
                                            NEW
                                        </span>
                                    </li>

                                    <li className="flex items-center gap-2.5 text-white text-xs sm:text-[13px] font-medium">
                                        <Check size={15} className="text-sky-300 shrink-0" />
                                        <span>كل مميزات الباقة الأساسية</span>
                                    </li>
                                    <li className="flex items-center gap-2.5 text-white text-xs sm:text-[13px] font-bold">
                                        <Sparkles size={15} className="text-amber-400 shrink-0" />
                                        <span>رسائل واتساب أوتوماتيكية لأولياء الأمور</span>
                                    </li>
                                    <li className="flex items-center gap-2.5 text-white text-xs sm:text-[13px] font-bold">
                                        <Sparkles size={15} className="text-amber-400 shrink-0" />
                                        <span>امتحانات وتصحيح ذكي بالذكاء الاصطناعي (AI)</span>
                                    </li>
                                    <li className="flex items-center gap-2.5 text-white text-xs sm:text-[13px] font-medium">
                                        <Check size={15} className="text-sky-300 shrink-0" />
                                        <span>دعم فني ذو أولوية فائقة (VIP) وتدريب شخصي</span>
                                    </li>
                                </ul>
                            </div>

                            <a 
                                href={`https://wa.me/${WHATSAPP}?text=مرحبا، أريد الاشتراك في باقة بريميوم لنظام مُنظِّم`} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="w-full bg-white hover:bg-sky-50 text-[#071d3d] font-black text-xs sm:text-sm py-2.5 rounded-xl transition-all shadow-[0_4px_20px_rgba(255,255,255,0.2)] hover:scale-[1.02] flex items-center justify-center gap-2"
                            >
                                <span>اشترك في بريميوم</span>
                                <ArrowLeft size={14} />
                            </a>
                        </div>

                    </div>

                    {/* Bottom Trust Guarantee Note */}
                    <div className="mt-10 inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-blue-200/80 bg-blue-500/10 border border-blue-400/20 px-5 py-2.5 rounded-xl backdrop-blur-md">
                        <span className="flex items-center gap-1.5 font-bold text-white">
                            <Shield size={14} className="text-sky-400" />
                            تجربة مجانية 7 أيام بدون أي التزامات
                        </span>
                        <span className="hidden sm:inline text-blue-400/40">•</span>
                        <span>تفعيل فوري خلال ٢٤ ساعة</span>
                        <span className="hidden sm:inline text-blue-400/40">•</span>
                        <span>يعمل على جميع الموبايلات واللابتوبات</span>
                    </div>
                </div>
            </section>


            {/* ══════════════════════════════════════════════════════ */}
            {/*  GUARANTEE — Trust Badges                              */}
            {/* ══════════════════════════════════════════════════════ */}
            <section className="py-24 px-6 relative bg-[#07162c] border-b border-blue-500/15">
                <div ref={rTestimonial} className="reveal-item max-w-5xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-400/30 text-amber-200 text-sm font-semibold px-4 py-2 rounded-full mb-6 shadow-sm">
                            <Star size={14} className="fill-amber-400 text-amber-400" />
                            ضمان الرضا التام
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">نضمنلك إنك هتحب النظام</h2>
                        <p className="text-blue-100/75 text-lg max-w-xl mx-auto">
                            بنؤمن بجودة منتجنا. عشان كده بنوفرلك كل الضمانات اللي تحتاجها عشان تبدأ بثقة تامة.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Guarantee 1 */}
                        <div className="glass-card rounded-3xl p-8 hover:border-sky-400/40 transition-all text-center">
                            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center">
                                <span className="text-3xl">🛡️</span>
                            </div>
                            <h3 className="text-xl font-extrabold text-white mb-3">جرّب 7 يوم مجاناً</h3>
                            <p className="text-blue-100/70 text-sm leading-relaxed">
                                استخدم النظام كامل لمدة 7 أيام. لو مش عاجبك لأي سبب، نوقف الاشتراك فوراً بدون أي التزامات أو أسئلة.
                            </p>
                        </div>

                        {/* Guarantee 2 */}
                        <div className="glass-card rounded-3xl p-8 border-2 border-sky-400/40 shadow-lg shadow-sky-500/10 hover:border-sky-400 transition-all text-center">
                            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-sky-500/15 border border-sky-400/30 flex items-center justify-center text-sky-300">
                                <span className="text-3xl">🚀</span>
                            </div>
                            <h3 className="text-xl font-extrabold text-white mb-3">إعداد وتدريب مجاني</h3>
                            <p className="text-blue-100/70 text-sm leading-relaxed">
                                فريقنا هيساعدك تضيف طلابك، تحدد مجموعاتك، وتبدأ تشتغل من أول يوم بدون أي حيرة أو ضياع وقت.
                            </p>
                        </div>

                        {/* Guarantee 3 */}
                        <div className="glass-card rounded-3xl p-8 hover:border-sky-400/40 transition-all text-center">
                            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center">
                                <span className="text-3xl">💬</span>
                            </div>
                            <h3 className="text-xl font-extrabold text-white mb-3">دعم فني سريع دايماً</h3>
                            <p className="text-blue-100/70 text-sm leading-relaxed">
                                فريق الدعم متاح على الواتساب لحل أي مشكلة في أسرع وقت ممكن، عشان شغلك ما يوقفش لأي سبب.
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            {/* ══════════════════════════════════════════════════════ */}
            {/*  FAQ                                                   */}
            {/* ══════════════════════════════════════════════════════ */}
            <section id="faq" className="py-24 px-6 max-w-3xl mx-auto">
                <div ref={rFaq} className="reveal-item">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">الأسئلة الشائعة</h2>
                        <p className="text-blue-200/70 text-lg">كل ما تحتاج لمعرفته حول النظام.</p>
                    </div>

                    <div className="space-y-4">
                        <FAQItem
                            question="هل البيانات الخاصة بي وبطلابي آمنة؟"
                            answer="نعم، كافة البيانات محفوظة على خوادم سحابية مؤمنة بالكامل ومخصصة لك فقط. لا يمكن لأي شخص آخر الاطلاع عليها غيرك أنت ومساعديك حسب الصلاحيات."
                        />
                        <FAQItem
                            question="هل يعمل النظام بدون إنترنت؟"
                            answer="نعم، تم تصميم تطبيق تسجيل الحضور والغياب للعمل حتى في حالة انقطاع الإنترنت، وبمجرد عودة الاتصال يقوم النظام بمزامنة البيانات تلقائياً مع الخوادم."
                        />
                        <FAQItem
                            question="هل فيه فترة تجريبية (Demo) قبل ما أدفع؟"
                            answer="أكيد، بنوفر نسخة تجريبية تفاعلية تقدر تجرب فيها كل الميزات وتتأكد إن النظام مناسب لاحتياجاتك بالكامل قبل أخذ قرار الاشتراك."
                        />
                        <FAQItem
                            question="لو عندي داتا طلابي القديمة في ملف Excel، أقدر أنقلها بسهولة؟"
                            answer="نعم، تقدر ترفع ملفات الإكسيل (Excel) الخاصة بطلابك بضغطة زر واحدة داخل النظام، وهتتضاف كل بياناتهم للمجموعات اللي تختارها فوراً."
                        />
                        <FAQItem
                            question="هل أقدر أضيف فريق المساعدين (Assistants) الخاص بي؟"
                            answer="طبعاً، الباقات بتسمحلك تضيف عدد غير محدود من المساعدين. والأهم إنك بتقدر تحدد صلاحيات كل مساعد (مثلاً: صلاحية لأخذ الغياب فقط، أو لإدارة الماليات)."
                        />
                        <FAQItem
                            question="إزاي بتشتغل رسائل الواتساب الأوتوماتيكية في باقة بريميوم؟"
                            answer="بمجرد تفعيل الخاصية، النظام بيبعت رسائل تلقائية للطلاب الغائبين، أو لأولياء الأمور بنتائج الامتحانات، بدون ما تضطر تبعت لكل طالب بنفسك، وكل ده بيتم بشكل آمن تماماً."
                        />
                        <FAQItem
                            question="كيف يتم حساب الزيادة بعد الـ 500 طالب؟"
                            answer="باقة ميني بتشمل 250 طالب، ولو زادوا بيتم إضافة 250 جنيه لكل 100 طالب إضافي. أما باقة الأساسية وبريميوم بيشملوا 500 طالب، وفي حالة الزيادة بيتم إضافة 200 جنيه فقط لكل 100 طالب إضافي شهرياً."
                        />
                        <FAQItem
                            question="لو واجهتني مشكلة في السنتر، الدعم الفني متاح إمتى؟"
                            answer="فريق الدعم الفني متاح من خلال الواتساب. وفي باقة البريميوم بتحصل على دعم فني ذو أولوية لضمان حل أي استفسار في أسرع وقت عشان حصتك ما تقفش."
                        />
                    </div>
                </div>
            </section>


            {/* ══════════════════════════════════════════════════════ */}
            {/*  FINAL CTA — Call to Action                            */}
            {/* ══════════════════════════════════════════════════════ */}
            <section className="py-24 px-6 relative overflow-hidden">
                {/* Gradient background matching user screenshot */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#061d3b] via-[#0f4c81] to-[#1e6bb8]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.12)_0%,transparent_50%)]" />

                <div ref={rCta} className="reveal-item max-w-3xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full mb-8">
                        <Sparkles size={16} className="text-amber-300" />
                        عرض لفترة محدودة
                    </div>

                    <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                        مستعد تنقل شغلك<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-white to-blue-200">للمستوى الجاي؟</span>
                    </h2>
                    <p className="text-blue-100 text-lg sm:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
                        انضم لأكتر من ٢٠ مدرس وسنتر بيستخدموا مُنظِّم في إدارة طلابهم. ابدأ النهاردة وركز على اللي بتحبه — التدريس.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href={`https://wa.me/${WHATSAPP}?text=مرحبا، أريد الاشتراك في نظام مُنظِّم`}
                            target="_blank"
                            rel="noreferrer"
                            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white hover:bg-blue-50 text-[#071d3d] font-black text-lg px-10 py-4 rounded-full transition-all hover:scale-105 shadow-2xl"
                        >
                            <MessageCircle size={22} className="text-[#0f4c81]" />
                            ابدأ الآن
                        </a>
                        <Link
                            href={DEMO_URL}
                            target="_blank"
                            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold text-lg px-10 py-4 rounded-full transition-all border border-white/20"
                        >
                            جرب النسخة التجريبية <ArrowLeft size={20} />
                        </Link>
                    </div>
                </div>
            </section>


            {/* ══════════════════════════════════════════════════════ */}
            {/*  FOOTER                                                */}
            {/* ══════════════════════════════════════════════════════ */}
            <footer className="border-t border-blue-950 bg-[#040e1e] py-12 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <img src="/icons/logo-munazzem-brand.png" alt="مُنظِّم" className="h-14 sm:h-16 w-auto object-contain drop-shadow-md" />
                        <span className="font-extrabold text-3xl text-white">مُنظِّم</span>
                    </div>
                    <div className="flex items-center gap-6 text-blue-200/70 font-semibold text-sm">
                        <Link href={DEMO_URL} target="_blank" className="hover:text-white transition-colors">الديمو المجاني</Link>
                        <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">الدعم الفني</a>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-8 text-center text-blue-300/50 text-sm">
                    © {new Date().getFullYear()} مُنظِّم. جميع الحقوق محفوظة.
                </div>
            </footer>


            {/* ══════════════════════════════════════════════════════ */}
            {/*  FLOATING WHATSAPP BUTTON                              */}
            {/* ══════════════════════════════════════════════════════ */}
            <a
                href={`https://wa.me/${WHATSAPP}?text=مرحبا، عايز أعرف أكتر عن نظام مُنظِّم`}
                target="_blank"
                rel="noreferrer"
                className={cn(
                    "fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-xl transition-all duration-500 hover:scale-110 hover:shadow-[0_0_30px_rgba(37,211,102,0.4)]",
                    waVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
                )}
                style={{ animation: waVisible ? 'wa-pulse 2s ease-out infinite' : 'none' }}
                title="تواصل معنا على الواتساب"
            >
                <MessageCircle size={26} />
            </a>
        </div>
    );
}
