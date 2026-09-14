'use client';

import { useState, useEffect } from 'react';
import { Menu, Bell, Sparkles } from 'lucide-react';
import { useAuthStore } from '@/lib/store/auth.store';
import { useUIStore } from '@/lib/store/ui.store';
import { apiClient } from '@/lib/api/axios';

export function Header() {
    const user  = useAuthStore((state) => state.user);
    const login = useAuthStore((state) => state.login);
    const token = useAuthStore((state) => state.token);
    const toggleSidebar = useUIStore((state) => state.toggleSidebar);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        // في نسخة الديمو، لا حاجة لجلب بيانات المستخدم مجدداً (تُستخدم البيانات المخزنة محلياً)
    }, []);

    if (!isMounted) {
        return (
            <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-gray-100 bg-white/80 backdrop-blur-md px-4 sm:px-6">
                <div className="flex items-center gap-4">
                    <div className="h-8 w-8 bg-gray-200 rounded-lg animate-pulse sm:hidden" />
                    <div className="hidden sm:block h-6 w-48 bg-gray-200 rounded-md animate-pulse" />
                </div>
                <div className="flex items-center gap-4">
                    <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse" />
                    <div className="flex items-center gap-3 border-r border-gray-200 pr-4">
                        <div className="flex flex-col items-end gap-1.5">
                            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                            <div className="h-3 w-16 bg-gray-100 rounded animate-pulse" />
                        </div>
                        <div className="h-9 w-9 rounded-full bg-gray-200 animate-pulse" />
                    </div>
                </div>
            </header>
        );
    }

    return (
        <header 
            className="sticky z-30 flex h-16 w-full items-center justify-between border-b border-gray-100 bg-white/80 backdrop-blur-md px-4 sm:px-6 transition-all duration-300"
            style={{ top: 'var(--banner-height, 0px)' }}
        >
            {/* Desktop Logo (Centered) */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden sm:flex items-center gap-2 pointer-events-none">
                <img src="/icons/icon-512x512.png" alt="Monazem Logo" className="h-9 w-9 rounded-lg border border-gray-100 shadow-sm p-1" />
                <span className="text-lg font-bold text-primary hidden md:block">مُنظِّم</span>
            </div>
            
            <div className="flex items-center gap-2 z-10 w-full justify-between">
                <div className="flex items-center gap-3 sm:gap-4">
                    {/* Mobile Menu Toggle */}
                    <button 
                        onClick={toggleSidebar}
                        className="sm:hidden p-2 -mr-2 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                    
                    {/* Mobile Logo */}
                    <div className="sm:hidden shrink-0">
                        <img src="/icons/icon-512x512.png" alt="Monazem Logo" className="h-8 w-8 rounded-lg border border-gray-100 shadow-sm p-1" />
                    </div>
                    
                    <h2 className="text-lg font-bold text-gray-800 hidden sm:flex items-center gap-2">
                        مرحباً بعودتك، {user?.name?.split(' ')[0] || 'أستاذ'}
                        <Sparkles className="h-5 w-5 text-yellow-500" />
                    </h2>
                </div>

                <div className="flex items-center gap-3 sm:gap-4">
                    {/* User Profile Snippet */}
                    <div className="flex items-center gap-2 sm:gap-3 border-r border-gray-200 pr-2 sm:pr-4">
                        <div className="flex flex-col items-end">
                            <span className="text-xs sm:text-sm font-bold text-gray-900 max-w-[100px] sm:max-w-[160px] truncate">
                                {user?.name || 'مستخدم'}
                            </span>
                            <span className="text-[10px] sm:text-xs text-primary font-medium">
                                {user?.role === 'superAdmin' ? 'مدير النظام' : user?.role === 'teacher' ? 'معلم' : user?.role === 'assistant' ? 'مساعد' : 'مستخدم'}
                            </span>
                        </div>
                        <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
                            <span className="text-primary font-bold text-sm sm:text-base">{user?.name?.charAt(0) || 'م'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
