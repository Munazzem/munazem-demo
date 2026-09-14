'use client';

/**
 * OnboardingWizard — شاشة ترحيب تظهر لأول مرة يفتح فيها المستخدم الديمو.
 * تشرح مميزات النظام وطبيعة النسخة التجريبية بشكل ممتع وبصري.
 */

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronLeft, ChevronRight, X, FlaskConical, Users, BarChart3, BookOpen, CalendarDays, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const STORAGE_KEY = 'monazem_onboarding_seen_v1';

interface Slide {
    icon: React.ReactNode;
    color: string;
    badge: string;
    title: string;
    description: string;
    bullets: string[];
}

const SLIDES: Slide[] = [
    {
        icon:        <Sparkles size={48} />,
        color:       'from-[#0f4c81] to-[#1a6aba]',
        badge:       '👋 أهلاً بك!',
        title:       'مرحباً في منظِّم',
        description: 'النظام الأذكى لإدارة السناتر والمراكز التعليمية. هذه جولة سريعة تعرّفك على أبرز مميزاته.',
        bullets:     ['إدارة شاملة للطلاب والمجموعات', 'تتبع دقيق للمدفوعات والغياب', 'تقارير ذكية وفورية'],
    },
    {
        icon:        <Users size={48} />,
        color:       'from-emerald-500 to-teal-600',
        badge:       '👨‍👩‍👧 إدارة الطلاب',
        title:       'كل طلابك في مكان واحد',
        description: 'أضِف طلابك، تابع حضورهم وغيابهم، وشاهد كشف الاشتراكات لحظة بلحظة.',
        bullets:     ['إضافة طلاب بسهولة تامة', 'بحث سريع بالاسم أو الكود', 'تاريخ حضور مفصّل لكل طالب'],
    },
    {
        icon:        <BarChart3 size={48} />,
        color:       'from-violet-500 to-purple-600',
        badge:       '💰 المالية',
        title:       'تعرف على أموالك بالضبط',
        description: 'سجِّل الاشتراكات والمصاريف، واطّلع على تقارير يومية وشهرية تفصيلية.',
        bullets:     ['تسجيل الاشتراكات في ثوانٍ', 'كشف اليومية المالي', 'تحليل الدخل والمصاريف شهرياً'],
    },
    {
        icon:        <CalendarDays size={48} />,
        color:       'from-rose-500 to-pink-600',
        badge:       '📅 الحصص والحضور',
        title:       'حضور ذكي في وقت قياسي',
        description: 'أنشئ الحصص، خذ الحضور بالباركود أو يدوياً، وأرسل تقارير لأولياء الأمور على الواتساب.',
        bullets:     ['مسح الباركود للحضور الفوري', 'إرسال تقرير الغياب واتساب', 'جدولة الحصص الأسبوعية تلقائياً'],
    },
    {
        icon:        <BookOpen size={48} />,
        color:       'from-amber-500 to-orange-600',
        badge:       '📝 الامتحانات',
        title:       'إنشاء امتحانات احترافية',
        description: 'أنشئ امتحاناتك بسهولة تامة، سجّل درجات طلابك دفعةً واحدة، وتابع النتائج لحظةً بلحظة.',
        bullets:     ['إنشاء أسئلة متنوعة (MCQ، صح/خطأ، مقالي)', 'تسجيل درجات الطلاب دفعةً واحدة', 'تقارير نتائج مفصّلة لكل طالب'],
    },
    {
        icon:        <FlaskConical size={48} />,
        color:       'from-slate-600 to-slate-800',
        badge:       '🧪 تنبيه مهم — اقرأ بتمعّن',
        title:       'البيانات المعروضة توضيحية فقط',
        description: 'كل البيانات التي تراها (الطلاب، المدفوعات، الحصص...) هي بيانات وهمية تم إدراجها لمساعدتك على فهم كيفية عمل النظام بشكل كامل.',
        bullets:     [
            '✅ تستطيع التفاعل بحرية تامة — أضِف، عدِّل، احذف',
            '⚠️ أي تغييرات تجريها ستعود للبداية عند تحديث الصفحة',
            '📞 سعداء بتواصلك للحصول على النسخة الكاملة بياناتك الحقيقية',
        ],
    },
];

export function OnboardingWizard() {
    const [open, setOpen]       = useState(false);
    const [slide, setSlide]     = useState(0);
    const [mounted, setMounted] = useState(false);
    const pathname              = usePathname();

    useEffect(() => {
        setMounted(true);
        const seen = localStorage.getItem(STORAGE_KEY);
        if (!seen) setOpen(true);
    }, []);

    const close = () => {
        localStorage.setItem(STORAGE_KEY, '1');
        setOpen(false);
    };

    const next = () => {
        if (slide < SLIDES.length - 1) setSlide(s => s + 1);
        else close();
    };

    const prev = () => setSlide(s => Math.max(0, s - 1));

    // لا تظهر على الصفحة الرئيسية
    if (!mounted || !open || pathname === '/') return null;

    const current = SLIDES[slide];
    const isLast  = slide === SLIDES.length - 1;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99998] animate-in fade-in duration-300"
                onClick={close}
            />

            {/* Modal */}
            <div
                className="fixed inset-0 flex items-center justify-center z-[99999] p-4 animate-in zoom-in-95 fade-in duration-300"
                role="dialog"
                aria-modal="true"
                aria-label="جولة تعريفية بمنظِّم"
            >
                <div
                    className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
                    style={{ direction: 'rtl' }}
                    onClick={e => e.stopPropagation()}
                >
                    {/* Header — Gradient */}
                    <div className={`bg-gradient-to-br ${current.color} p-8 text-white text-center relative overflow-hidden`}>
                        {/* Decorative circles */}
                        <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full" />

                        {/* Close */}
                        <button
                            onClick={close}
                            className="absolute top-4 left-4 p-1.5 rounded-full hover:bg-white/20 transition-colors"
                            aria-label="تخطي الجولة"
                        >
                            <X size={18} />
                        </button>

                        {/* Icon */}
                        <div className="relative flex justify-center mb-4 opacity-90">
                            {current.icon}
                        </div>

                        {/* Badge */}
                        <span className="relative inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                            {current.badge}
                        </span>

                        {/* Title */}
                        <h2 className="relative text-2xl font-bold leading-tight">
                            {current.title}
                        </h2>
                    </div>

                    {/* Body */}
                    <div className="p-6">
                        <p className="text-gray-600 text-sm leading-relaxed mb-5">
                            {current.description}
                        </p>

                        <ul className="space-y-2.5 mb-6">
                            {current.bullets.map((b, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                                    <span className="mt-0.5 shrink-0 w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-500">
                                        {i + 1}
                                    </span>
                                    <span>{b}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Progress dots */}
                        <div className="flex justify-center gap-2 mb-6">
                            {SLIDES.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSlide(i)}
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                        i === slide ? 'w-6 bg-[#0f4c81]' : 'w-2 bg-gray-200'
                                    }`}
                                    aria-label={`الانتقال للشريحة ${i + 1}`}
                                />
                            ))}
                        </div>

                        {/* Navigation */}
                        <div className="flex items-center gap-3">
                            {slide > 0 && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={prev}
                                    className="flex items-center gap-1"
                                >
                                    <ChevronRight size={16} />
                                    السابق
                                </Button>
                            )}

                            <Button
                                onClick={next}
                                className="flex-1 bg-[#0f4c81] hover:bg-[#0a3357] text-white flex items-center justify-center gap-2"
                            >
                                {isLast ? (
                                    <>ابدأ التجربة 🚀</>
                                ) : (
                                    <>
                                        التالي
                                        <ChevronLeft size={16} />
                                    </>
                                )}
                            </Button>
                        </div>

                        {/* Skip */}
                        <button
                            onClick={close}
                            className="w-full mt-3 text-xs text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            تخطي الجولة
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
