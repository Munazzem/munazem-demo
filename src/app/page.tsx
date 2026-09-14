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

const WHATSAPP = '201288494803';
const DEMO_URL = '/demo/dashboard';

/* ═══════════════════════════════════════════════════════════════ */
/*  HOOKS                                                         */
/* ═══════════════════════════════════════════════════════════════ */

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

/* ═══════════════════════════════════════════════════════════════ */
/*  SUB-COMPONENTS                                                 */
/* ═══════════════════════════════════════════════════════════════ */

function AnimatedCounter({ target, prefix = '', suffix = '' }: { target: number; prefix?: string; suffix?: string }) {
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
                const inc = target / 50;
                const t = setInterval(() => {
                    v += inc;
                    if (v >= target) { setCount(target); clearInterval(t); }
                    else setCount(Math.floor(v));
                }, 35);
            }
        }, { threshold: 0.3 });
        obs.observe(el);
        return () => obs.disconnect();
    }, [target]);
    return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border border-zinc-800 rounded-2xl bg-zinc-900/30 overflow-hidden transition-all duration-300">
            <button onClick={() => setOpen(!open)} className="w-full px-6 py-4 flex items-center justify-between text-right text-zinc-100 font-bold hover:bg-zinc-800/30 transition-colors">
                {question}
                <ChevronDown className={cn("h-5 w-5 text-zinc-400 transition-transform duration-300 shrink-0 mr-2", open && "rotate-180")} />
            </button>
            <div className={cn("px-6 overflow-hidden transition-all duration-300", open ? "py-4 max-h-96 opacity-100" : "max-h-0 opacity-0")}>
                <p className="text-zinc-400 leading-relaxed text-sm">{answer}</p>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════ */
/*  MAIN PAGE                                                      */
/* ═══════════════════════════════════════════════════════════════ */

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
    const rFeat0 = useReveal();
    const rFeat1 = useReveal();
    const rFeat2 = useReveal();
    const rFeat3 = useReveal();
    const rFeat4 = useReveal();
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
        <div className="min-h-screen bg-[#09090b] text-zinc-50 overflow-x-hidden selection:bg-indigo-500/30" dir="rtl" style={{ fontFamily: 'var(--font-cairo), sans-serif' }}>

            {/* ─── Global Styles ─── */}
            <style>{`
                .text-gradient { background: linear-gradient(135deg, #a5b4fc 0%, #818cf8 50%, #c084fc 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text }
                .glow-bg { background: radial-gradient(circle at 50% 0%, rgba(79, 70, 229, 0.15) 0%, transparent 60%); }
                .glass-card { background: rgba(24, 24, 27, 0.4); backdrop-filter: blur(12px); border: 1px solid rgba(63, 63, 70, 0.4); }
                .glass-nav { background: rgba(9, 9, 11, 0.7); backdrop-filter: blur(16px); border-bottom: 1px solid rgba(63, 63, 70, 0.3); }

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
                    background: linear-gradient(180deg, rgba(99,102,241,0.4), rgba(168,85,247,0.4), rgba(99,102,241,0.4));
                    animation: stat-shimmer 3s ease-in-out infinite;
                }
            `}</style>


            {/* ══════════════════════════════════════════════════════ */}
            {/*  NAVBAR                                                */}
            {/* ══════════════════════════════════════════════════════ */}
            <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
                <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src="/icons/logo-munazzem.png" alt="لوجو مُنظِّم" className="h-16 sm:h-20 w-auto object-contain drop-shadow-md" />
                        <span className="text-3xl font-extrabold text-white tracking-tight">مُنظِّم</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" className="hidden sm:flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                            <MessageCircle size={18} /> تواصل معنا
                        </a>
                        <Link href={DEMO_URL} target="_blank" className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold px-5 py-2.5 rounded-full transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)]">
                            جرب النظام <ArrowLeft size={16} />
                        </Link>
                    </div>
                </div>
            </nav>


            {/* ══════════════════════════════════════════════════════ */}
            {/*  HERO SECTION                                          */}
            {/* ══════════════════════════════════════════════════════ */}
            <section className="relative pt-36 pb-20 px-6 glow-bg">
                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-3 border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-md text-indigo-200 text-xs sm:text-sm font-semibold px-4 py-2 rounded-full mb-8 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/20">
                            <Zap size={14} className="text-indigo-400" />
                        </span>
                        الإصدار الجديد متاح الآن لفترة تجريبية
                    </div>
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black tracking-tight leading-[1.3] md:leading-[1.1] pb-6">
                        <span className="block text-white drop-shadow-xl mb-3 sm:mb-5 pb-3">إدارة طلابك</span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 drop-shadow-sm leading-normal pb-4">
                            بلمسة زر.. وشغلك كله في جيبك
                        </span>
                    </h1>
                    <p className="text-zinc-400 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
                        منصة سحابية مصممة خصيصاً للمدرسين لإدارة شؤون الطلاب، تسجيل الحضور بالباركود، السيطرة على الماليات، وإرسال إشعارات الواتساب بضغطة زر.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                        <Link href={DEMO_URL} target="_blank" className="w-full sm:w-auto flex items-center justify-center gap-3 bg-zinc-100 hover:bg-white text-zinc-900 font-bold text-lg px-8 py-4 rounded-full transition-transform hover:scale-105">
                            تصفح النسخة التجريبية <ArrowLeft size={20} />
                        </Link>
                        <a href={`https://wa.me/${WHATSAPP}?text=مرحبا، أريد الاشتراك في نظام مُنظِّم`} target="_blank" rel="noreferrer" className="w-full sm:w-auto flex items-center justify-center gap-3 glass-card hover:bg-zinc-800/50 text-white font-bold text-lg px-8 py-4 rounded-full transition-colors">
                            <MessageCircle size={20} /> تواصل معنا للاشتراك
                        </a>
                    </div>

                    {/* Dashboard Mockup */}
                    <div className="relative mx-auto max-w-4xl mt-12">
                        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/20 to-transparent blur-3xl -z-10 rounded-full" />
                        <div className="glass-card p-2 sm:p-4 rounded-2xl sm:rounded-[2rem] shadow-2xl shadow-black/50">
                            <img src="/screens/داشبورد.png" alt="لوحة تحكم مُنظِّم" className="w-full h-auto rounded-xl sm:rounded-2xl border border-zinc-800 shadow-2xl object-cover" />
                        </div>
                        <p className="text-center text-zinc-400 font-medium mt-6 text-sm sm:text-base px-4 max-w-2xl mx-auto">
                            لوحة تحكم تفاعلية توفر لك نظرة شاملة ولحظية على إحصائيات طلابك، الإيرادات، ومعدلات الحضور والغياب.
                        </p>
                    </div>
                </div>
            </section>


            {/* ══════════════════════════════════════════════════════ */}
            {/*  TRUST BAR — Scrolling Tech Badges                     */}
            {/* ══════════════════════════════════════════════════════ */}
            <section className="py-6 border-y border-zinc-800/30 bg-zinc-950/60 overflow-hidden">
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
                                    <div key={i} className="flex items-center gap-2 text-zinc-500 text-xs sm:text-sm font-medium whitespace-nowrap px-4 sm:px-6">
                                        <span className="text-zinc-600">{item.icon}</span>
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
            <section className="py-20 sm:py-24 px-6 relative">
                {/* Background glow */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.06)_0%,transparent_70%)]" />

                <div ref={rStats} className="reveal-item max-w-5xl mx-auto">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">أرقام بنفتخر بيها</h2>
                        <p className="text-zinc-400 text-lg">نتائج حقيقية من مدرسين حقيقيين</p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {[
                            { ref: rStat1, icon: <GraduationCap size={28} />, value: 5000, prefix: '+', suffix: '', label: 'طالب مسجل', color: 'indigo', glow: 'rgba(99,102,241,0.15)' },
                            { ref: rStat2, icon: <CalendarCheck size={28} />, value: 500, prefix: '+', suffix: '', label: 'حصة مكتملة', color: 'purple', glow: 'rgba(168,85,247,0.15)' },
                            { ref: rStat3, icon: <Users size={28} />, value: 10, prefix: '+', suffix: '', label: 'مدرس يثق بنا', color: 'blue', glow: 'rgba(59,130,246,0.15)' },
                            { ref: rStat4, icon: <Star size={28} />, value: 99, prefix: '', suffix: '%', label: 'رضا العملاء', color: 'amber', glow: 'rgba(245,158,11,0.15)' },
                        ].map((stat, i) => (
                            <div
                                key={i}
                                ref={stat.ref}
                                className="reveal-item group relative glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center hover:scale-[1.03] transition-transform duration-300 cursor-default overflow-hidden"
                            >
                                {/* Top glow accent */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 rounded-b-full" style={{ background: `linear-gradient(90deg, transparent, ${stat.glow.replace('0.15', '0.6')}, transparent)` }} />
                                {/* Background glow */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle at 50% 50%, ${stat.glow}, transparent 70%)` }} />

                                <div className={`relative z-10 text-${stat.color}-400 mb-4 flex justify-center`}>
                                    {stat.icon}
                                </div>
                                <div className="relative z-10 text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-2 tracking-tight">
                                    <AnimatedCounter target={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                                </div>
                                <p className="relative z-10 text-zinc-400 text-sm sm:text-base font-semibold">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* ══════════════════════════════════════════════════════ */}
            {/*  FEATURES — Deep Dive with Gradient Connectors         */}
            {/* ══════════════════════════════════════════════════════ */}
            <section className="py-24 px-6 relative">
                {/* Vertical gradient connector line */}
                <div className="hidden lg:block absolute left-1/2 top-24 bottom-24 w-[2px] -translate-x-1/2 gradient-connector rounded-full" />

                <div className="max-w-6xl mx-auto space-y-28 sm:space-y-32 relative z-10">

                    {/* Feature 0: Students Management */}
                    <div ref={rFeat0} className="reveal-item flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
                        <div className="lg:w-1/2 space-y-6">
                            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                                <Users size={24} />
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">إدارة متكاملة للطلاب والمجموعات</h2>
                            <p className="text-zinc-400 text-lg leading-relaxed">
                                أضف طلابك بسهولة، قم بإنشاء مجموعاتك الدراسية، ونظم أوقات الحصص بمرونة تامة. كل ما تحتاجه للسيطرة على أعداد الطلاب وتوزيعهم متوفر في مكان واحد.
                            </p>
                            <ul className="space-y-4 pt-2">
                                {['إضافة الطلاب وتوزيعهم على المجموعات بسهولة.', 'طباعة وتصدير كشوف المجموعات وكروت الباركود.', 'بحث سريع ومرن عن أي طالب بالاسم أو الرقم.'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-zinc-300 font-medium">
                                        <CheckCircle2 size={20} className="text-blue-500 shrink-0" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="lg:w-1/2 w-full">
                            <div className="glass-card rounded-3xl p-4 sm:p-6 flex items-center justify-center relative overflow-hidden">
                                <img src="/screens/اداره الطالب.png" alt="إدارة الطلاب" className="w-full h-auto rounded-xl border border-zinc-800 shadow-md object-contain hover:scale-105 transition-transform duration-300" />
                            </div>
                        </div>
                    </div>

                    {/* Feature 1: Student Profile */}
                    <div ref={rFeat1} className="reveal-item flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        <div className="lg:w-1/2 space-y-6">
                            <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                                <Users size={24} />
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">بروفايل الطالب</h2>
                            <p className="text-zinc-400 text-lg leading-relaxed">
                                تتبع أداء كل طالب من خلال ملف إلكتروني شامل يحتوي على بياناته الأساسية، تاريخ الحضور والغياب، وسجل المدفوعات بالتفصيل لتكون ملماً بكل شيء.
                            </p>
                            <ul className="space-y-4 pt-2">
                                {['متابعة دقيقة للحالة الأكاديمية والمالية للطالب.', 'سجل كامل لكل الحصص التي حضرها أو غاب عنها.', 'تقارير تفصيلية يمكن طباعتها أو مشاركتها مع ولي الأمر.'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-zinc-300 font-medium">
                                        <CheckCircle2 size={20} className="text-violet-500 shrink-0" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="lg:w-1/2 w-full">
                            <div className="glass-card rounded-3xl p-4 sm:p-6 flex items-center justify-center relative overflow-hidden">
                                <img src="/screens/بروفايل الطالب.png" alt="ملف الطالب" className="max-h-[400px] w-auto rounded-xl border border-zinc-800 shadow-md object-contain" />
                            </div>
                        </div>
                    </div>

                    {/* Feature 2: Attendance */}
                    <div ref={rFeat2} className="reveal-item flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        <div className="lg:w-1/2 space-y-6">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                                <QrCode size={24} />
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">حضور ذكي وسريع بالباركود</h2>
                            <p className="text-zinc-400 text-lg leading-relaxed">
                                وداعاً لضياع الوقت في تسجيل الغياب الورقي. مع مُنظِّم، كل طالب يمتلك كارت باركود (أو QR Code) خاص به. قم بمسح الكارت بكاميرا الموبايل لتسجيل الحضور في جزء من الثانية.
                            </p>
                            <ul className="space-y-4 pt-2">
                                {['تسجيل الحضور والانصراف بدقة متناهية.', 'اكتشاف الطلاب غير المشتركين تلقائياً.', 'دعم العمل بدون إنترنت (Offline Mode).'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-zinc-300 font-medium">
                                        <CheckCircle2 size={20} className="text-indigo-500 shrink-0" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="lg:w-1/2 w-full">
                            <div className="glass-card rounded-3xl p-4 sm:p-6 flex items-center justify-center relative overflow-hidden">
                                <img src="/screens/الحصص والغياب.png" alt="تسجيل الحضور" className="max-h-[400px] w-auto rounded-xl border border-zinc-800 shadow-md object-contain" />
                            </div>
                        </div>
                    </div>

                    {/* Feature 3: Finance */}
                    <div ref={rFeat3} className="reveal-item flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
                        <div className="lg:w-1/2 space-y-6">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                                <Wallet size={24} />
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">سيطرة تامة على الماليات</h2>
                            <p className="text-zinc-400 text-lg leading-relaxed">
                                تتبع كل قرش يدخل أو يخرج. يوفر لك النظام واجهة بسيطة لتسجيل الاشتراكات، مبيعات الملازم، ورواتب المساعدين، لتعرف أرباحك الصافية بضغطة زر.
                            </p>
                            <ul className="space-y-4 pt-2">
                                {['تقارير يومية وشهرية للإيرادات والمصروفات.', 'متابعة الطلاب المتأخرين عن الدفع بوضوح.', 'حساب الأرباح الصافية (Net Profit) تلقائياً.'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-zinc-300 font-medium">
                                        <CheckCircle2 size={20} className="text-emerald-500 shrink-0" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="lg:w-1/2 w-full">
                            <img src="/screens/الماليات.png" alt="إدارة الماليات" className="max-h-[450px] sm:max-h-[500px] w-auto mx-auto block drop-shadow-2xl object-contain hover:-translate-y-2 transition-transform duration-300" />
                        </div>
                    </div>

                    {/* Feature 4: Parent Portal */}
                    <div ref={rFeat4} className="reveal-item flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        <div className="lg:w-1/2 space-y-6">
                            <div className="w-12 h-12 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400">
                                <Smartphone size={24} />
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">بوابة لولي الأمر وتواصل مباشر</h2>
                            <p className="text-zinc-400 text-lg leading-relaxed">
                                عزز ثقة أولياء الأمور عبر تزويدهم ببوابة مخصصة تتيح لهم متابعة أداء أبنائهم، بالإضافة إلى إرسال تحديثات دورية بحالة الحضور والامتحانات مباشرة إلى الواتساب دون عناء.
                            </p>
                            <ul className="space-y-4 pt-2">
                                {['بوابة مخصصة تتيح لولي الأمر متابعة الطالب بالكامل.', 'إرسال إشعارات الواتساب الجماعية للطلاب الغائبين.', 'خصوصية تامة واستخدام رقمك الشخصي للإرسال عبر الواتساب.'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-zinc-300 font-medium">
                                        <CheckCircle2 size={20} className="text-green-500 shrink-0" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="lg:w-1/2 w-full">
                            <img src="/screens/بوابه ولي لامر_موبايل.png" alt="بوابة ولي الأمر موبايل" className="max-h-[450px] w-auto mx-auto block drop-shadow-2xl object-contain hover:-translate-y-2 transition-transform duration-300" />
                        </div>
                    </div>
                </div>
            </section>


            {/* ══════════════════════════════════════════════════════ */}
            {/*  BEFORE & AFTER — Comparison Cards                     */}
            {/* ══════════════════════════════════════════════════════ */}
            <section className="py-24 px-6 bg-zinc-900/20 border-y border-zinc-800/30 relative overflow-hidden">
                {/* Background accent */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 blur-[120px] rounded-full" />

                <div className="max-w-5xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">الفرق اللي هتحس بيه</h2>
                        <p className="text-zinc-400 text-lg">قارن بين الطريقة القديمة وبين مُنظِّم</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 relative">
                        {/* Arrow connector (desktop only) */}
                        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-16 h-16 rounded-full bg-zinc-900 border-2 border-indigo-500/40 items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.3)]">
                            <Sparkles size={24} className="text-indigo-400" />
                        </div>

                        {/* BEFORE Card */}
                        <div ref={rBefore} className="reveal-item glass-card rounded-3xl p-6 sm:p-8 border-red-500/10 relative overflow-hidden">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-l from-red-500/60 via-red-400/40 to-transparent" />
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
                                    <li key={i} className="flex items-start gap-3 text-zinc-400 font-medium">
                                        <div className="w-6 h-6 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                            <X size={12} className="text-red-400" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* AFTER Card */}
                        <div ref={rAfter} className="reveal-item glass-card rounded-3xl p-6 sm:p-8 border-indigo-500/10 relative overflow-hidden">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-l from-indigo-500/60 via-purple-400/40 to-transparent" />
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                                    <Check size={20} className="text-indigo-400" />
                                </div>
                                <h3 className="text-xl font-bold text-indigo-300">مع مُنظِّم</h3>
                            </div>
                            <ul className="space-y-5">
                                {[
                                    'حضور ذكي بالباركود في ثانية واحدة',
                                    'نظام مالي أوتوماتيك ودقيق ١٠٠٪',
                                    'ملفات إلكترونية آمنة ومنظمة',
                                    'إشعارات واتساب فورية وتلقائية',
                                    'إدارة كاملة بلمسة زر من موبايلك',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-zinc-200 font-medium">
                                        <div className="w-6 h-6 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center shrink-0 mt-0.5">
                                            <Check size={12} className="text-indigo-400" />
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
            <section className="py-24 px-6 relative bg-zinc-950/80 border-y border-zinc-800/30">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.03)_0%,transparent_60%)]" />
                <div ref={rSecurity} className="reveal-item max-w-5xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <div className="w-16 h-16 mx-auto bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
                            <Shield size={32} className="text-emerald-400" />
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">بيانات طلابك في أمان تام</h2>
                        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                            عارفين إن بيانات طلابك وحساباتك هي رأس مالك. عشان كده بنينا "مُنظِّم" بأعلى معايير الأمان والسرية، ومستحيل أي حد يطلع عليها غيرك.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: <Lock size={24} className="text-emerald-400" />,
                                title: 'تشفير كامل للبيانات',
                                desc: 'كل البيانات الخاصة بالطلاب والماليات مشفرة بالكامل على خوادمنا السحابية لحمايتها من أي اختراق.'
                            },
                            {
                                icon: <RefreshCw size={24} className="text-blue-400" />,
                                title: 'نسخ احتياطي يومي',
                                desc: 'بنعمل نسخة احتياطية (Backup) تلقائية لبياناتك كل يوم. حتى لو حصل أي طارئ، بياناتك مستحيل تضيع وتقدر تسترجعها.'
                            },
                            {
                                icon: <Shield size={24} className="text-violet-400" />,
                                title: 'خصوصية ملكك لوحدك',
                                desc: 'لا توجد أي جهة أخرى تقدر تشوف داتا طلابك، ولا حتى فريق الدعم الفني إلا بإذن صريح منك. أنت المالك الوحيد.'
                            }
                        ].map((item, i) => (
                            <div key={i} className="glass-card rounded-3xl p-8 hover:-translate-y-2 transition-transform duration-300">
                                <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-zinc-400 leading-relaxed text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════ */}
            {/*  HOW IT WORKS — 3 Steps                                */}
            {/* ══════════════════════════════════════════════════════ */}
            <section className="py-24 px-6 relative">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(99,102,241,0.05)_0%,transparent_60%)]" />
                <div className="max-w-4xl mx-auto relative z-10">
                    <div ref={rHow} className="reveal-item text-center mb-16">
                        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">ابدأ في ٣ خطوات بس</h2>
                        <p className="text-zinc-400 text-lg">من أول ما تتواصل معنا لحد ما تبدأ تشتغل</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        {/* Connecting line (desktop) */}
                        <div className="hidden md:block absolute top-14 left-[16%] right-[16%] h-[2px] bg-gradient-to-l from-indigo-500/30 via-purple-500/30 to-indigo-500/30 z-0" />

                        {[
                            { ref: rStep1, num: '١', icon: <Send size={28} />, title: 'تواصل معنا', desc: 'ابعتلنا رسالة على الواتساب وقولنا محتاج إيه وعدد طلابك.', color: 'indigo' },
                            { ref: rStep2, num: '٢', icon: <Zap size={28} />, title: 'نفعّلك حسابك', desc: 'في أقل من ٢٤ ساعة هيبقى حسابك جاهز ومفعّل بالكامل.', color: 'purple' },
                            { ref: rStep3, num: '٣', icon: <Sparkles size={28} />, title: 'ابدأ شغلك', desc: 'ابدأ أضف طلابك وسجّل الحضور والاشتراكات من موبايلك.', color: 'blue' },
                        ].map((step, i) => (
                            <div key={i} ref={step.ref} className="reveal-item relative z-10 text-center">
                                <div className={`w-16 h-16 rounded-2xl bg-${step.color}-500/10 border border-${step.color}-500/20 flex items-center justify-center text-${step.color}-400 mx-auto mb-6 shadow-[0_0_30px_rgba(99,102,241,0.1)]`}>
                                    {step.icon}
                                </div>
                                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300 text-sm font-bold mb-4">
                                    {step.num}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                                <p className="text-zinc-400 leading-relaxed text-sm sm:text-base max-w-xs mx-auto">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* ══════════════════════════════════════════════════════ */}
            {/*  PRICING                                               */}
            {/* ══════════════════════════════════════════════════════ */}
            <section className="py-24 px-6 bg-zinc-900/20 border-y border-zinc-800/50">
                <div ref={rPricing} className="reveal-item max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">استثمار بسيط لنمو مستمر</h2>
                    <p className="text-zinc-400 text-lg mb-16">سعر شفاف وعادل ينمو مع نجاح شغلك.</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        
                        {/* Mini Package */}
                        <div className="relative p-[1px] rounded-[2rem] bg-gradient-to-b from-teal-600/60 to-zinc-900/20 shadow-xl">
                            <div className="bg-zinc-950 h-full flex flex-col rounded-[2rem] p-8 sm:p-10 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/5 blur-2xl rounded-full" />
                                
                                <div className="inline-block bg-teal-500/10 text-teal-300 text-sm font-bold px-4 py-1.5 rounded-full mb-6 border border-teal-500/20 w-max mx-auto">
                                    باقة ميني (Mini)
                                </div>

                                <div className="mb-4">
                                    <span className="text-5xl font-extrabold text-white">499</span>
                                    <span className="text-xl text-zinc-400"> جنيه / شهرياً</span>
                                </div>
                                <div className="text-zinc-500 line-through text-lg font-medium mb-8">بدلاً من 699 جنيه</div>

                                <p className="text-zinc-300 font-medium mb-2 border-b border-zinc-800 pb-4">
                                    إدارة حتى <span className="text-white font-bold">250 طالب</span>
                                </p>
                                <p className="text-sm text-zinc-500 mb-8 font-medium min-h-[40px]">
                                    + 250 جنيه لكل 100 طالب إضافي فوق العدد الأساسي.
                                </p>

                                <ul className="space-y-4 mb-10 text-right flex-1">
                                    {[
                                        'إدارة متكاملة للماليات والحضور',
                                        'عدد مجموعات غير محدود',
                                        'حتى 3 حسابات للمساعدين',
                                        'تطبيق حضور يعمل بدون إنترنت (PWA)',
                                        'دعم فني وتحديثات مستمرة'
                                    ].map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3 text-zinc-300 font-medium">
                                            <CheckCircle2 size={20} className="text-teal-400 shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                    <li className="flex items-center gap-3 text-zinc-600 font-medium opacity-50">
                                        <X size={20} className="text-zinc-600 shrink-0" />
                                        رسائل واتساب أوتوماتيكية
                                    </li>
                                    <li className="flex items-center gap-3 text-zinc-600 font-medium opacity-50">
                                        <X size={20} className="text-zinc-600 shrink-0" />
                                        امتحانات وتصحيح بالذكاء الاصطناعي (AI)
                                    </li>
                                </ul>

                                <a href={`https://wa.me/${WHATSAPP}?text=مرحبا، أريد الاشتراك في باقة ميني لنظام مُنظِّم`} target="_blank" rel="noreferrer" className="block w-full bg-teal-600/20 hover:bg-teal-600/30 border border-teal-500/30 text-teal-200 font-bold text-lg px-8 py-4 rounded-xl transition-colors text-center mt-auto">
                                    اشترك في ميني
                                </a>
                            </div>
                        </div>

                        {/* Basic Package */}
                        <div className="relative p-[1px] rounded-[2rem] bg-gradient-to-b from-zinc-700 to-zinc-900/20 shadow-xl">
                            <div className="bg-zinc-950 h-full flex flex-col rounded-[2rem] p-8 sm:p-10 relative overflow-hidden">
                                <div className="inline-block bg-zinc-800 text-zinc-300 text-sm font-bold px-4 py-1.5 rounded-full mb-6 border border-zinc-700 w-max mx-auto">
                                    الباقة الأساسية
                                </div>

                                <div className="mb-4">
                                    <span className="text-5xl font-extrabold text-white">899</span>
                                    <span className="text-xl text-zinc-400"> جنيه / شهرياً</span>
                                </div>
                                <div className="text-zinc-500 line-through text-lg font-medium mb-8">بدلاً من 1199 جنيه</div>

                                <p className="text-zinc-300 font-medium mb-2 border-b border-zinc-800 pb-4">
                                    إدارة حتى <span className="text-white font-bold">500 طالب</span>
                                </p>
                                <p className="text-sm text-zinc-500 mb-8 font-medium min-h-[40px]">
                                    + 200 جنيه لكل 100 طالب إضافي فوق العدد الأساسي.
                                </p>

                                <ul className="space-y-4 mb-10 text-right flex-1">
                                    {[
                                        'إدارة متكاملة للماليات والحضور',
                                        'عدد مجموعات غير محدود',
                                        'حسابات غير محدودة للمساعدين',
                                        'تطبيق حضور يعمل بدون إنترنت (PWA)',
                                        'دعم فني وتحديثات مستمرة'
                                    ].map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3 text-zinc-300 font-medium">
                                            <CheckCircle2 size={20} className="text-zinc-400 shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                    <li className="flex items-center gap-3 text-zinc-600 font-medium opacity-50">
                                        <X size={20} className="text-zinc-600 shrink-0" />
                                        رسائل واتساب أوتوماتيكية
                                    </li>
                                    <li className="flex items-center gap-3 text-zinc-600 font-medium opacity-50">
                                        <X size={20} className="text-zinc-600 shrink-0" />
                                        امتحانات وتصحيح بالذكاء الاصطناعي (AI)
                                    </li>
                                </ul>

                                <a href={`https://wa.me/${WHATSAPP}?text=مرحبا، أريد الاشتراك في الباقة الأساسية لنظام مُنظِّم`} target="_blank" rel="noreferrer" className="block w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-lg px-8 py-4 rounded-xl transition-colors text-center mt-auto">
                                    اشترك في الأساسية
                                </a>
                            </div>
                        </div>

                        {/* Premium Package */}
                        <div className="relative p-[1px] rounded-[2rem] bg-gradient-to-b from-indigo-500 to-indigo-900/20 shadow-2xl shadow-indigo-500/20">
                            <div className="bg-zinc-950 h-full flex flex-col rounded-[2rem] p-8 sm:p-10 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-2xl rounded-full" />
                                
                                <div className="absolute top-5 left-5">
                                    <span className="flex h-3 w-3 relative">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                      <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                                    </span>
                                </div>

                                <div className="inline-block bg-indigo-500/20 text-indigo-300 text-sm font-bold px-4 py-1.5 rounded-full mb-6 border border-indigo-500/30 w-max mx-auto">
                                    باقة بريميوم (Premium)
                                </div>

                                <div className="mb-4">
                                    <span className="text-5xl font-extrabold text-white">1199</span>
                                    <span className="text-xl text-zinc-400"> جنيه / شهرياً</span>
                                </div>
                                <div className="text-zinc-500 line-through text-lg font-medium mb-8">بدلاً من 1499 جنيه</div>

                                <p className="text-zinc-300 font-medium mb-2 border-b border-zinc-800 pb-4">
                                    إدارة حتى <span className="text-white font-bold">500 طالب</span>
                                </p>
                                <p className="text-sm text-zinc-500 mb-8 font-medium min-h-[40px]">
                                    + 200 جنيه لكل 100 طالب إضافي فوق العدد الأساسي.
                                </p>

                                <ul className="space-y-4 mb-10 text-right flex-1">
                                    {[
                                        'إدارة متكاملة للماليات والحضور',
                                        'عدد مجموعات غير محدود',
                                        'حسابات غير محدودة للمساعدين',
                                        'تطبيق حضور يعمل بدون إنترنت (PWA)',
                                        'دعم فني ذو أولوية',
                                    ].map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3 text-zinc-300 font-medium">
                                            <CheckCircle2 size={20} className="text-indigo-400 shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                    <li className="flex items-center gap-3 text-white font-bold">
                                        <Sparkles size={20} className="text-amber-400 shrink-0" />
                                        رسائل واتساب أوتوماتيكية
                                    </li>
                                    <li className="flex items-center gap-3 text-white font-bold">
                                        <Sparkles size={20} className="text-amber-400 shrink-0" />
                                        امتحانات وتصحيح بالذكاء الاصطناعي (AI)
                                    </li>
                                </ul>

                                <a href={`https://wa.me/${WHATSAPP}?text=مرحبا، أريد الاشتراك في باقة بريميوم لنظام مُنظِّم`} target="_blank" rel="noreferrer" className="block w-full bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-lg px-8 py-4 rounded-xl transition-colors text-center mt-auto">
                                    اشترك في بريميوم
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </section>


            {/* ══════════════════════════════════════════════════════ */}
            {/*  GUARANTEE — Trust Badges                              */}
            {/* ══════════════════════════════════════════════════════ */}
            <section className="py-24 px-6 relative">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.05)_0%,transparent_60%)]" />
                <div ref={rTestimonial} className="reveal-item max-w-5xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm font-semibold px-4 py-2 rounded-full mb-6">
                            <Star size={14} className="fill-amber-400 text-amber-400" />
                            ضمان الرضا التام
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">نضمنلك إنك هتحب النظام</h2>
                        <p className="text-zinc-400 text-lg max-w-xl mx-auto">
                            بنؤمن بجودة منتجنا. عشان كده بنوفرلك كل الضمانات اللي تحتاجها عشان تبدأ بثقة تامة.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Guarantee 1 */}
                        <div className="relative glass-card rounded-3xl p-8 overflow-hidden group hover:-translate-y-2 transition-transform duration-300 text-center">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
                            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                                <span className="text-3xl">🛡️</span>
                            </div>
                            <h3 className="text-xl font-extrabold text-white mb-3">جرّب 7 يوم مجاناً</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                استخدم النظام كامل لمدة 7 أيام. لو مش عاجبك لأي سبب، نوقف الاشتراك فوراً بدون أي التزامات أو أسئلة.
                            </p>
                        </div>

                        {/* Guarantee 2 */}
                        <div className="relative glass-card rounded-3xl p-8 overflow-hidden group hover:-translate-y-2 transition-transform duration-300 text-center border-indigo-500/20">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent" />
                            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                                <span className="text-3xl">🚀</span>
                            </div>
                            <h3 className="text-xl font-extrabold text-white mb-3">إعداد وتدريب مجاني</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                فريقنا هيساعدك تضيف طلابك، تحدد مجموعاتك، وتبدأ تشتغل من أول يوم بدون أي حيرة أو ضياع وقت.
                            </p>
                        </div>

                        {/* Guarantee 3 */}
                        <div className="relative glass-card rounded-3xl p-8 overflow-hidden group hover:-translate-y-2 transition-transform duration-300 text-center">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />
                            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                                <span className="text-3xl">💬</span>
                            </div>
                            <h3 className="text-xl font-extrabold text-white mb-3">دعم فني سريع دايماً</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                فريق الدعم متاح على الواتساب لحل أي مشكلة في أسرع وقت ممكن، عشان شغلك ما يوقفش لأي سبب.
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            {/* ══════════════════════════════════════════════════════ */}
            {/*  FAQ                                                   */}
            {/* ══════════════════════════════════════════════════════ */}
            <section className="py-24 px-6 max-w-3xl mx-auto">
                <div ref={rFaq} className="reveal-item">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">الأسئلة الشائعة</h2>
                        <p className="text-zinc-400 text-lg">كل ما تحتاج لمعرفته حول النظام.</p>
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
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-purple-900/30 to-blue-900/40" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(99,102,241,0.2)_0%,transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(168,85,247,0.15)_0%,transparent_50%)]" />

                <div ref={rCta} className="reveal-item max-w-3xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 text-indigo-200 text-sm font-semibold px-4 py-2 rounded-full mb-8">
                        <Sparkles size={16} className="text-indigo-400" />
                        عرض لفترة محدودة
                    </div>

                    <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                        مستعد تنقل شغلك<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400">للمستوى الجاي؟</span>
                    </h2>
                    <p className="text-zinc-300 text-lg sm:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
                        انضم لأكتر من ١٠ مدرسين بيستخدموا مُنظِّم في إدارة طلابهم. ابدأ النهاردة وركز على اللي بتحبه — التدريس.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href={`https://wa.me/${WHATSAPP}?text=مرحبا، أريد الاشتراك في نظام مُنظِّم`}
                            target="_blank"
                            rel="noreferrer"
                            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white hover:bg-zinc-100 text-zinc-900 font-bold text-lg px-10 py-4 rounded-full transition-all hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.15)]"
                        >
                            <MessageCircle size={22} />
                            ابدأ الآن
                        </a>
                        <Link
                            href={DEMO_URL}
                            target="_blank"
                            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white/10 hover:bg-white/15 backdrop-blur-sm text-white font-bold text-lg px-10 py-4 rounded-full transition-all border border-white/10"
                        >
                            جرب النسخة التجريبية <ArrowLeft size={20} />
                        </Link>
                    </div>
                </div>
            </section>


            {/* ══════════════════════════════════════════════════════ */}
            {/*  FOOTER                                                */}
            {/* ══════════════════════════════════════════════════════ */}
            <footer className="border-t border-zinc-800/50 bg-zinc-950 py-12 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <img src="/icons/logo-munazzem.png" alt="مُنظِّم" className="h-16 sm:h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100" />
                        <span className="font-extrabold text-3xl text-zinc-300">مُنظِّم</span>
                    </div>
                    <div className="flex items-center gap-6 text-zinc-500 font-medium text-sm">
                        <Link href={DEMO_URL} target="_blank" className="hover:text-white transition-colors">الديمو المجاني</Link>
                        <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">الدعم الفني</a>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-8 text-center text-zinc-600 text-sm">
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
