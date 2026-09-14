import { create } from 'zustand';
import Cookies from 'js-cookie';
import type { AuthState } from '@/types/auth.types';

const DEMO_USER = {
    _id: 'demo-teacher-001',
    name: 'المعلم (ديمو)',
    email: 'demo@teacher.com',
    role: 'teacher',
    centerName: 'سنتر التفوق',
};

/**
 * Zustand Store for Global Authentication State.
 * This is the DEMO version. Always boots up as the DEMO_USER (Teacher).
 */
export const useAuthStore = create<AuthState>()(
    (set) => ({
        user: DEMO_USER as any,
        token: 'demo-token',
        isAuthenticated: true,
        
        login: (user, token) => {
            Cookies.set('token', token, {
                expires: 1,
                path: '/',
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
            });
            set({ user, token, isAuthenticated: true });
        },
        
        logout: () => {
            Cookies.remove('token', { path: '/' });
            set({ user: DEMO_USER as any, token: 'demo-token', isAuthenticated: true });
        },
    })
);
