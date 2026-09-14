'use client';

/**
 * DemoBanner — شريط تنبيه ثابت يظهر في أعلى شاشة الديمو فقط.
 * يذكّر المستخدم بأنه في النسخة التجريبية ويوفر زر للرجوع للموقع.
 */

import { useState, useEffect } from 'react';
import { X, FlaskConical, ArrowRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function DemoBanner() {
    const [dismissed, setDismissed] = useState(false);
    const pathname = usePathname();

    // لا تظهر الـ Banner على الصفحة الرئيسية (Landing Page)
    const isLandingPage = pathname === '/';

    useEffect(() => {
        if (!dismissed && !isLandingPage) {
            document.documentElement.style.setProperty('--banner-height', '44px');
            document.body.style.paddingTop = '44px';
        } else {
            document.documentElement.style.setProperty('--banner-height', '0px');
            document.body.style.paddingTop = '0px';
        }
        return () => {
            document.documentElement.style.setProperty('--banner-height', '0px');
            document.body.style.paddingTop = '0px';
        };
    }, [dismissed, isLandingPage]);

    if (dismissed || isLandingPage) return null;

    return (
        <div
            role="alert"
            className="fixed top-0 left-0 right-0 h-[44px] bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-white px-4 flex items-center justify-between gap-3 shadow-sm z-[99999] animate-in slide-in-from-top duration-300"
            style={{ direction: 'rtl' }}
        >
            {/* Icon + Text */}
            <div className="flex items-center gap-2.5 flex-1 min-w-0">
                <FlaskConical size={17} className="shrink-0 opacity-90" />
                <p className="text-sm font-medium leading-tight">
                    <span className="font-bold">نسخة تجريبية</span>
                    <span className="mx-1.5 opacity-60">·</span>
                    <span className="hidden sm:inline opacity-90">البيانات المعروضة وهمية لمساعدتك على فهم النظام</span>
                    <span className="sm:hidden opacity-90">بيانات توضيحية</span>
                </p>
            </div>

            {/* Back to Landing */}
            <Link
                href="/"
                className="shrink-0 hidden sm:flex items-center gap-1.5 text-xs font-semibold bg-white/20 hover:bg-white/30 transition-colors px-3 py-1 rounded-full"
            >
                <ArrowRight size={13} />
                الموقع الرئيسي
            </Link>

            {/* Dismiss Button */}
            <button
                onClick={() => setDismissed(true)}
                aria-label="إغلاق"
                className="shrink-0 p-1.5 rounded hover:bg-white/20 transition-colors"
            >
                <X size={15} />
            </button>
        </div>
    );
}
