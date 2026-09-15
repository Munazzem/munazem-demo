import { useState, useRef } from 'react';
import {
    LayoutDashboard, Wallet, Users, GraduationCap,
    QrCode, ClipboardCheck, BookOpen, BarChart3,
    Smartphone, Laptop, CheckCircle2, Sparkles,
    Maximize2, Play, X, Eye, ArrowLeft, ShieldCheck,
    Layers, ChevronRight, ChevronLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SHOWCASE_MODULES, type ShowcaseModule, type ScreenItem } from '@/data/screensData';

const ICONS_MAP: Record<string, React.ReactNode> = {
    LayoutDashboard: <LayoutDashboard className="w-5 h-5" />,
    Wallet: <Wallet className="w-5 h-5" />,
    Users: <Users className="w-5 h-5" />,
    GraduationCap: <GraduationCap className="w-5 h-5" />,
    QrCode: <QrCode className="w-5 h-5" />,
    ClipboardCheck: <ClipboardCheck className="w-5 h-5" />,
    BookOpen: <BookOpen className="w-5 h-5" />,
    BarChart3: <BarChart3 className="w-5 h-5" />,
};

/* ══════════════════════════════════════════════════════════════════ */
/*  LAPTOP DEVICE FRAME COMPONENT                                      */
/* ══════════════════════════════════════════════════════════════════ */

function LaptopFrame({
    screen,
    onExpand,
    className
}: {
    screen: ScreenItem;
    onExpand: (screen: ScreenItem) => void;
    className?: string;
}) {
    return (
        <div className={cn("relative group transition-all duration-500", className)}>
            {/* Screen Bezel / Top Shell */}
            <div className="bg-[#0b172a] p-2.5 sm:p-3 rounded-t-2xl border border-sky-400/30 shadow-2xl shadow-black/80">
                {/* Top Notch / Camera Bar */}
                <div className="flex items-center justify-between px-3 mb-2">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    {/* Webcam Bar */}
                    <div className="flex items-center gap-2 bg-slate-900/90 px-3 py-0.5 rounded-full border border-slate-700/50">
                        <div className="w-2 h-2 rounded-full bg-slate-800 flex items-center justify-center">
                            <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                        </div>
                        <span className="text-[10px] text-blue-200/60 font-mono">munazzem.app</span>
                    </div>
                    {/* Expand Trigger */}
                    <button
                        onClick={() => onExpand(screen)}
                        className="p-1 rounded-md text-sky-300 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1 text-[11px] font-medium"
                        title="تكبير الشاشة"
                    >
                        <Maximize2 size={13} />
                        <span className="hidden sm:inline">تكبير</span>
                    </button>
                </div>

                {/* Screen Content Container */}
                <div
                    onClick={() => onExpand(screen)}
                    className="relative rounded-lg overflow-hidden border border-sky-500/20 bg-slate-950 aspect-[16/10] cursor-pointer group/screen"
                >
                    <img
                        src={screen.mediaUrl}
                        alt={screen.title}
                        loading="lazy"
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/screen:scale-[1.02]"
                    />
                    {/* Glass Reflection */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />

                    {/* Hover Overlay with Inspect Button */}
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/screen:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                        <div className="bg-[#071d3d]/90 backdrop-blur-md border border-sky-400/50 text-white text-xs font-bold px-4 py-2 rounded-full shadow-2xl flex items-center gap-2">
                            <Eye size={14} className="text-sky-400" />
                            <span>انقر لمعاينة الشاشة بدقة كاملة</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Laptop Deck / Bottom Base */}
            <div className="relative bg-gradient-to-b from-[#1c2c44] via-[#101f35] to-[#081324] h-4 sm:h-5 rounded-b-2xl border-t border-sky-400/30 shadow-2xl flex items-start justify-center">
                <div className="w-24 sm:w-32 h-1.5 bg-slate-400/40 rounded-full mt-0.5" />
            </div>

            {/* Caption Pill */}
            {screen.caption && (
                <p className="mt-3 text-xs text-blue-200/70 text-center font-medium leading-relaxed px-2">
                    {screen.caption}
                </p>
            )}
        </div>
    );
}

/* ══════════════════════════════════════════════════════════════════ */
/*  MOBILE DEVICE FRAME COMPONENT (iPhone 16 Pro Style)                */
/* ══════════════════════════════════════════════════════════════════ */

function MobileFrame({
    screen,
    onExpand,
    className
}: {
    screen: ScreenItem;
    onExpand: (screen: ScreenItem) => void;
    className?: string;
}) {
    return (
        <div className={cn("relative group transition-all duration-500 flex flex-col items-center", className)}>
            <div className="relative bg-[#061224] p-2 sm:p-2.5 rounded-[2.5rem] border-2 border-sky-400/50 shadow-2xl shadow-black/90 w-full max-w-[280px] sm:max-w-[300px]">
                {/* Outer metallic rim sheen */}
                <div className="absolute inset-0 rounded-[2.5rem] border border-white/15 pointer-events-none" />


                {/* Phone Screen Container */}
                <div
                    onClick={() => onExpand(screen)}
                    className="relative rounded-[2rem] overflow-hidden border border-blue-900/60 aspect-[9/18.5] bg-slate-950 cursor-pointer group/mbscreen"
                >
                    <img
                        src={screen.mediaUrl}
                        alt={screen.title}
                        loading="lazy"
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/mbscreen:scale-[1.03]"
                    />

                    {/* Subtle Scan Laser Animation */}
                    <div className="absolute left-0 right-0 h-0.5 bg-sky-400/60 shadow-[0_0_10px_#38bdf8] animate-scan-laser pointer-events-none opacity-40 group-hover/mbscreen:opacity-100 transition-opacity" />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/mbscreen:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                        <div className="bg-[#071d3d]/95 backdrop-blur-md border border-sky-400/50 text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-2xl flex items-center gap-1.5">
                            <Eye size={12} className="text-sky-400" />
                            <span>تكبير الشاشة</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Caption */}
            {screen.caption && (
                <p className="mt-3 text-xs text-blue-200/70 text-center font-medium leading-relaxed max-w-[280px] px-2">
                    {screen.caption}
                </p>
            )}
        </div>
    );
}

/* ══════════════════════════════════════════════════════════════════ */
/*  EMBEDDED VIDEO PLAYER COMPONENT                                    */
/* ══════════════════════════════════════════════════════════════════ */

function VideoPlayerFrame({
    screen,
    className
}: {
    screen: ScreenItem;
    className?: string;
}) {
    return (
        <div className={cn("relative rounded-2xl overflow-hidden border border-sky-400/30 bg-[#08172c] p-2.5 sm:p-3 shadow-2xl shadow-black/80", className)}>
            <div className="flex items-center justify-between px-3 mb-2">
                <div className="flex items-center gap-2">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold text-white">{screen.badge || 'فيديو استعراض النظام'}</span>
                </div>
                <div className="text-[11px] text-sky-300 font-semibold flex items-center gap-1">
                    <Play size={12} />
                    <span>فيديو عالي الدقة (HD)</span>
                </div>
            </div>

            <div className="relative rounded-xl overflow-hidden border border-sky-500/20 bg-black aspect-[16/10] sm:aspect-[16/9]">
                <video
                    src={screen.mediaUrl}
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="w-full h-full object-contain bg-black"
                >
                    عذراً، متصفحك لا يدعم تشغيل هذا الفيديو.
                </video>
            </div>

            {screen.caption && (
                <p className="mt-3 text-xs text-blue-200/70 text-center font-medium leading-relaxed px-2">
                    {screen.caption}
                </p>
            )}
        </div>
    );
}

/* ══════════════════════════════════════════════════════════════════ */
/*  FULLSCREEN LIGHTBOX MODAL                                          */
/* ══════════════════════════════════════════════════════════════════ */

function LightboxModal({
    screen,
    onClose
}: {
    screen: ScreenItem | null;
    onClose: () => void;
}) {
    if (!screen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-xl animate-fade-in" onClick={onClose}>
            <div className="relative max-w-5xl w-full max-h-[92vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
                {/* Close Button Bar */}
                <div className="w-full flex items-center justify-between mb-3 text-white">
                    <div className="flex items-center gap-2.5">
                        <span className="text-xs sm:text-sm font-bold bg-sky-500/20 text-sky-200 border border-sky-400/40 px-3 py-1 rounded-full">
                            {screen.badge || 'معاينة بدقة فائقة'}
                        </span>
                        <h3 className="text-sm sm:text-base font-extrabold truncate max-w-md">{screen.title}</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center justify-center shadow-lg"
                        title="إغلاق"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Media Container */}
                <div className="relative rounded-2xl overflow-hidden border border-sky-400/30 bg-[#07172e] p-2 shadow-2xl max-h-[80vh] flex items-center justify-center w-full">
                    {screen.deviceType === 'video' ? (
                        <video
                            src={screen.mediaUrl}
                            controls
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="max-h-[75vh] w-auto max-w-full rounded-xl"
                        />
                    ) : (
                        <img
                            src={screen.mediaUrl}
                            alt={screen.title}
                            className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl"
                        />
                    )}
                </div>

                {/* Caption Bar */}
                {screen.caption && (
                    <div className="mt-3 text-center text-xs sm:text-sm text-blue-100/90 bg-[#081d3a]/80 px-4 py-2 rounded-full border border-sky-400/20 max-w-2xl">
                        {screen.caption}
                    </div>
                )}
            </div>
        </div>
    );
}

/* ══════════════════════════════════════════════════════════════════ */
/*  MAIN SHOWCASE COMPONENT                                            */
/* ══════════════════════════════════════════════════════════════════ */

export function ScreensShowcase() {
    const tabsRef = useRef<HTMLDivElement>(null);
    const [activeTabId, setActiveTabId] = useState<string>(SHOWCASE_MODULES[0].id);
    const [viewModeMap, setViewModeMap] = useState<Record<string, 'both' | 'laptop' | 'mobile'>>({
        dashboard: 'both',
        finances: 'both',
        groups: 'both'
    });
    const [subScreenMap, setSubScreenMap] = useState<Record<string, number>>({});
    const [expandedScreen, setExpandedScreen] = useState<ScreenItem | null>(null);

    const activeModule = SHOWCASE_MODULES.find((m) => m.id === activeTabId) || SHOWCASE_MODULES[0];

    const currentViewMode = viewModeMap[activeModule.id] || 'both';

    const setViewMode = (moduleId: string, mode: 'both' | 'laptop' | 'mobile') => {
        setViewModeMap((prev) => ({ ...prev, [moduleId]: mode }));
    };

    const currentSubIndex = subScreenMap[activeModule.id] || 0;
    const setSubIndex = (moduleId: string, idx: number) => {
        setSubScreenMap((prev) => ({ ...prev, [moduleId]: idx }));
    };

    const currentIndex = SHOWCASE_MODULES.findIndex((m) => m.id === activeTabId);
    const tabButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);

    const goToNextModule = () => {
        const nextIdx = (currentIndex + 1) % SHOWCASE_MODULES.length;
        const nextModule = SHOWCASE_MODULES[nextIdx];
        setActiveTabId(nextModule.id);
        tabButtonRefs.current[nextIdx]?.scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
            block: 'nearest'
        });
    };

    const goToPrevModule = () => {
        const prevIdx = (currentIndex - 1 + SHOWCASE_MODULES.length) % SHOWCASE_MODULES.length;
        const prevModule = SHOWCASE_MODULES[prevIdx];
        setActiveTabId(prevModule.id);
        tabButtonRefs.current[prevIdx]?.scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
            block: 'nearest'
        });
    };

    const handleSelectTab = (moduleId: string, idx: number) => {
        setActiveTabId(moduleId);
        tabButtonRefs.current[idx]?.scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
            block: 'nearest'
        });
    };

    // Gather available mobile screens for this module
    const mobileScreensList: ScreenItem[] = [];
    if (activeModule.screens.mobile) mobileScreensList.push(activeModule.screens.mobile);
    if (activeModule.screens.additionalMobiles) {
        mobileScreensList.push(...activeModule.screens.additionalMobiles);
    }

    return (
        <section id="screens-showcase" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[#06152a]/95 border-y border-blue-500/20">
            {/* Ambient Background Lights */}
            <div className="absolute top-10 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">

                {/* ─── SECTION HEADER ─── */}
                <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-sky-500/15 text-sky-200 border border-sky-400/30 mb-5 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
                        <Sparkles size={15} className="text-sky-400 animate-pulse" />
                        <span>معرض شاشات وتجربة النظام الحية</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
                        استكشف <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-blue-100 to-white">مُنظِّم</span> بكامل واجهاته.. للابتوب والموبايل
                    </h2>
                    <p className="text-blue-100/80 text-base sm:text-lg leading-relaxed font-normal">
                        صُمم النظام ليعمل بتناسق تام بين شاشة كمبيوتر السنتر وتطبيق الهاتف السريع، ليوفر لك تجربة إدارة فائقة السلاسة سواء كنت جالساً في مكتبك أو تتحرك بين القاعات.
                    </p>
                </div>

                {/* ─── CATEGORY NAVIGATION TABS WITH SMOOTH ARROWS & NO SCROLLBAR ─── */}
                <div className="mb-12 sm:mb-16 relative max-w-6xl mx-auto">
                    {/* Embedded Style to ensure NO browser scrollbar appears under any circumstances */}
                    <style>{`
                        .no-scrollbar-track::-webkit-scrollbar {
                            display: none !important;
                            width: 0 !important;
                            height: 0 !important;
                        }
                    `}</style>

                    <div className="flex items-center gap-2 sm:gap-3">
                        {/* Right Navigation Arrow Button (Go to Previous Module) */}
                        <button
                            type="button"
                            onClick={goToPrevModule}
                            className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#0a2244]/90 hover:bg-[#113567] text-sky-300 hover:text-white border border-sky-400/40 shadow-xl shadow-black/60 flex items-center justify-center transition-all shrink-0 hover:scale-105 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-sky-400/50"
                            title="الميزة السابقة"
                            aria-label="الميزة السابقة"
                        >
                            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-0.5" />
                        </button>

                        {/* Scrollable Tabs Wrapper (Strictly scrollbar-free) */}
                        <div
                            ref={tabsRef}
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            className="flex-1 overflow-x-auto no-scrollbar-track [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-2 px-1"
                        >
                            <div className="flex items-center justify-start lg:justify-center gap-2 sm:gap-3 min-w-max">
                                {SHOWCASE_MODULES.map((mod, idx) => {
                                    const isActive = mod.id === activeTabId;
                                    return (
                                        <button
                                            key={mod.id}
                                            ref={(el) => { tabButtonRefs.current[idx] = el; }}
                                            type="button"
                                            onClick={() => handleSelectTab(mod.id, idx)}
                                            className={cn(
                                                "flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 whitespace-nowrap border shadow-sm select-none",
                                                isActive
                                                    ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white border-sky-300/60 shadow-lg shadow-sky-500/25 scale-[1.02]"
                                                    : "bg-[#091f3d]/80 hover:bg-[#0d2a52] text-blue-200/80 border-blue-500/20 hover:border-sky-400/40"
                                            )}
                                        >
                                            <span className={cn(isActive ? "text-white" : "text-sky-400")}>
                                                {ICONS_MAP[mod.iconName] || <LayoutDashboard size={18} />}
                                            </span>
                                            <span>{mod.title.split('(')[0].trim()}</span>
                                            {mod.hasBothDevices && (
                                                <span className={cn(
                                                    "text-[10px] px-1.5 py-0.5 rounded-full font-extrabold",
                                                    isActive ? "bg-white/20 text-white" : "bg-sky-500/15 text-sky-300"
                                                )}>
                                                    لابتوب + موبايل
                                                </span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Left Navigation Arrow Button (Go to Next Module) */}
                        <button
                            type="button"
                            onClick={goToNextModule}
                            className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#0a2244]/90 hover:bg-[#113567] text-sky-300 hover:text-white border border-sky-400/40 shadow-xl shadow-black/60 flex items-center justify-center transition-all shrink-0 hover:scale-105 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-sky-400/50"
                            title="الميزة التالية"
                            aria-label="الميزة التالية"
                        >
                            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:-translate-x-0.5" />
                        </button>
                    </div>
                </div>

                {/* ─── ACTIVE MODULE CONTENT SHOWCASE ─── */}
                <div className="bg-gradient-to-b from-[#0c2447]/90 via-[#091b35]/90 to-[#061429]/95 rounded-3xl sm:rounded-[2.5rem] border border-sky-400/25 p-5 sm:p-8 lg:p-12 shadow-2xl shadow-black/60 relative">

                    {/* Module Top Bar */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-blue-500/20 pb-6 mb-8">
                        <div>
                            <div className="inline-flex items-center gap-2 text-xs font-bold text-sky-300 bg-sky-500/15 px-3 py-1 rounded-full border border-sky-400/30 mb-2">
                                <ShieldCheck size={14} className="text-sky-400" />
                                <span>{activeModule.badge}</span>
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                                {activeModule.title}
                            </h3>
                            <p className="text-sky-200/90 text-sm sm:text-base font-medium mt-1">
                                {activeModule.tagline}
                            </p>
                        </div>

                        {/* View Switcher for modules with both Laptop and Mobile */}
                        {activeModule.hasBothDevices && (
                            <div className="flex items-center bg-[#071830] p-1.5 rounded-2xl border border-sky-400/30 shadow-inner shrink-0 self-start md:self-auto">
                                <button
                                    onClick={() => setViewMode(activeModule.id, 'both')}
                                    className={cn(
                                        "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all",
                                        currentViewMode === 'both'
                                            ? "bg-sky-500 text-white shadow-md"
                                            : "text-blue-200/70 hover:text-white"
                                    )}
                                >
                                    <Layers size={14} />
                                    <span>المزدوج (لابتوب + موبايل)</span>
                                </button>
                                <button
                                    onClick={() => setViewMode(activeModule.id, 'laptop')}
                                    className={cn(
                                        "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all",
                                        currentViewMode === 'laptop'
                                            ? "bg-sky-500 text-white shadow-md"
                                            : "text-blue-200/70 hover:text-white"
                                    )}
                                >
                                    <Laptop size={14} />
                                    <span>لابتوب</span>
                                </button>
                                <button
                                    onClick={() => setViewMode(activeModule.id, 'mobile')}
                                    className={cn(
                                        "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all",
                                        currentViewMode === 'mobile'
                                            ? "bg-sky-500 text-white shadow-md"
                                            : "text-blue-200/70 hover:text-white"
                                    )}
                                >
                                    <Smartphone size={14} />
                                    <span>موبايل</span>
                                </button>
                            </div>
                        )}

                        {/* Screen Switcher for modules with multiple mobile screens */}
                        {!activeModule.hasBothDevices && mobileScreensList.length > 1 && (
                            <div className="flex items-center bg-[#071830] p-1.5 rounded-2xl border border-sky-400/30 shadow-inner shrink-0 self-start md:self-auto">
                                {mobileScreensList.map((sc, idx) => (
                                    <button
                                        key={sc.id}
                                        onClick={() => setSubIndex(activeModule.id, idx)}
                                        className={cn(
                                            "flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all",
                                            currentSubIndex === idx
                                                ? "bg-sky-500 text-white shadow-md"
                                                : "text-blue-200/70 hover:text-white"
                                        )}
                                    >
                                        <Smartphone size={13} />
                                        <span>{sc.badge || `شاشة ${idx + 1}`}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* ─── 2-COLUMN MAIN CONTENT ─── */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

                        {/* ─── LEFT / MEDIA COLUMN: Visual Devices Showcase ─── */}
                        <div className="lg:col-span-7 order-2 lg:order-1">

                            {/* CASE 1: BOTH LAPTOP & MOBILE AVAILABLE */}
                            {activeModule.hasBothDevices && activeModule.screens.laptop && (
                                <div className="relative">
                                    {/* Both view: Overlapping composition */}
                                    {currentViewMode === 'both' && (
                                        <div className="relative pt-4 pb-12">
                                            {/* LAPTOP IN BACKGROUND */}
                                            <div className="w-full sm:w-[92%] transition-transform duration-500">
                                                <LaptopFrame
                                                    screen={activeModule.screens.laptop}
                                                    onExpand={setExpandedScreen}
                                                />
                                            </div>

                                            {/* PHONE OVERLAPPING IN FOREGROUND (Bottom-Left in RTL) */}
                                            {activeModule.screens.mobile && (
                                                <div className="absolute -bottom-6 left-0 sm:left-4 z-20 w-44 sm:w-56 md:w-60 transition-transform duration-500 hover:scale-105 hover:z-30">
                                                    <div className="rotate-[3deg] hover:rotate-0 transition-transform duration-500 drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]">
                                                        <MobileFrame
                                                            screen={activeModule.screens.mobile}
                                                            onExpand={setExpandedScreen}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Laptop Only Mode */}
                                    {currentViewMode === 'laptop' && (
                                        <div className="w-full">
                                            <LaptopFrame
                                                screen={activeModule.screens.laptop}
                                                onExpand={setExpandedScreen}
                                            />
                                        </div>
                                    )}

                                    {/* Mobile Only Mode */}
                                    {currentViewMode === 'mobile' && activeModule.screens.mobile && (
                                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-4">
                                            <MobileFrame
                                                screen={activeModule.screens.mobile}
                                                onExpand={setExpandedScreen}
                                            />
                                            {activeModule.screens.additionalMobiles && activeModule.screens.additionalMobiles[0] && (
                                                <MobileFrame
                                                    screen={activeModule.screens.additionalMobiles[0]}
                                                    onExpand={setExpandedScreen}
                                                />
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* CASE 2: VIDEO SHOWCASE AVAILABLE */}
                            {!activeModule.hasBothDevices && activeModule.screens.video && (
                                <div className="space-y-6">
                                    <VideoPlayerFrame screen={activeModule.screens.video} />

                                    {/* If also has mobile screens alongside video (e.g. Student Profile & Smart ID) */}
                                    {mobileScreensList.length > 0 && (
                                        <div className="pt-4 border-t border-blue-500/20">
                                            <div className="text-xs font-bold text-sky-300 mb-3 flex items-center gap-1.5">
                                                <Smartphone size={14} />
                                                <span>الشاشات المرافقة للبروفايل والكارت الذكي:</span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                {mobileScreensList.map((sc) => (
                                                    <div
                                                        key={sc.id}
                                                        onClick={() => setExpandedScreen(sc)}
                                                        className="group/thumb relative rounded-xl overflow-hidden border border-sky-400/30 bg-[#091c38] p-1.5 cursor-pointer hover:border-sky-400 transition-all shadow-md"
                                                    >
                                                        <div className="aspect-[9/16] overflow-hidden rounded-lg bg-black">
                                                            <img
                                                                src={sc.mediaUrl}
                                                                alt={sc.title}
                                                                className="w-full h-full object-cover object-top group-hover/thumb:scale-105 transition-transform duration-300"
                                                            />
                                                        </div>
                                                        <div className="p-1.5 text-right">
                                                            <div className="text-[11px] font-bold text-white truncate">{sc.title}</div>
                                                            <div className="text-[9px] text-sky-300">{sc.badge}</div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* CASE 3: ONLY MOBILE SCREENS (No Laptop & No Video) */}
                            {!activeModule.hasBothDevices && !activeModule.screens.video && mobileScreensList.length > 0 && (
                                <div className="space-y-6">
                                    {/* Side by side dual phones if 2 screens available */}
                                    {mobileScreensList.length >= 2 ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center">
                                            {mobileScreensList.slice(0, 2).map((sc, i) => (
                                                <div key={sc.id} className="w-full flex justify-center">
                                                    <MobileFrame
                                                        screen={sc}
                                                        onExpand={setExpandedScreen}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex justify-center">
                                            <MobileFrame
                                                screen={mobileScreensList[0]}
                                                onExpand={setExpandedScreen}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}

                        </div>

                        {/* ─── RIGHT / CONTENT COLUMN: Detailed Explanations & Value Props ─── */}
                        <div className="lg:col-span-5 order-1 lg:order-2 text-right space-y-6">

                            {/* Description Paragraph */}
                            <p className="text-blue-100/90 text-base sm:text-lg leading-relaxed font-normal">
                                {activeModule.description}
                            </p>

                            {/* Highlights List */}
                            <div className="space-y-3.5 pt-2">
                                <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                                    <Sparkles size={16} className="text-sky-400" />
                                    <span>أبرز المميزات التكنولوجية في هذه الصفحة:</span>
                                </h4>
                                <ul className="space-y-3">
                                    {activeModule.highlights.map((h, i) => (
                                        <li key={i} className="flex items-start gap-3 bg-[#081f3f]/60 p-3 rounded-2xl border border-blue-500/15 hover:border-sky-400/30 transition-colors">
                                            <div className="w-6 h-6 rounded-full bg-sky-500/20 border border-sky-400/40 flex items-center justify-center shrink-0 mt-0.5 text-sky-300">
                                                <CheckCircle2 size={14} />
                                            </div>
                                            <div>
                                                <div className="text-xs sm:text-sm font-bold text-white mb-0.5">{h.title}</div>
                                                <div className="text-[11px] sm:text-xs text-blue-200/75 leading-relaxed">{h.description}</div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Practical Value Callout */}
                            <div className="bg-gradient-to-r from-sky-500/15 via-blue-600/10 to-transparent p-4 sm:p-5 rounded-2xl border-r-4 border-r-sky-400 border border-sky-500/20 shadow-md">
                                <div className="text-xs font-black text-sky-300 mb-1 flex items-center gap-1.5">
                                    <Sparkles size={13} className="text-sky-400" />
                                    <span>الفارق الحقيقي للمدرس والسنتر:</span>
                                </div>
                                <p className="text-xs sm:text-sm text-blue-100 leading-relaxed font-medium">
                                    {activeModule.practicalValue}
                                </p>
                            </div>

                            {/* Stats Badge Strip */}
                            {activeModule.stats && (
                                <div className="grid grid-cols-3 gap-2 pt-2">
                                    {activeModule.stats.map((st, i) => (
                                        <div key={i} className="bg-[#071830] p-2.5 rounded-xl border border-blue-500/20 text-center">
                                            <div className="text-[10px] text-blue-300/70 font-semibold mb-0.5">{st.label}</div>
                                            <div className="text-xs sm:text-sm font-black text-white">{st.value}</div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Quick Action Link */}
                            <div className="pt-2 flex items-center gap-3">
                                <button
                                    onClick={() => {
                                        if (activeModule.screens.laptop) setExpandedScreen(activeModule.screens.laptop);
                                        else if (activeModule.screens.mobile) setExpandedScreen(activeModule.screens.mobile);
                                        else if (activeModule.screens.video) setExpandedScreen(activeModule.screens.video);
                                    }}
                                    className="flex items-center gap-2 text-xs font-bold text-sky-300 hover:text-white bg-sky-500/20 hover:bg-sky-500/30 px-4 py-2.5 rounded-xl border border-sky-400/40 transition-all shadow-sm"
                                >
                                    <Maximize2 size={14} />
                                    <span>معاينة تفاصيل الشاشة بحجم كامل</span>
                                </button>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* Lightbox Modal */}
            <LightboxModal
                screen={expandedScreen}
                onClose={() => setExpandedScreen(null)}
            />
        </section>
    );
}
