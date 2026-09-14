import { delay } from '@/lib/mock/db';

const DEMO_USER = {
    _id: 'demo-teacher-001',
    name: 'أستاذ محمد الديمو',
    email: 'teacher@demo.com',
    phone: '01000000000',
    role: 'teacher',
    centerName: 'سنتر التفوق التعليمي',
    logoUrl: null
};

export const fetchMe = async () => {
    await delay(300);
    return DEMO_USER;
};

export const login = async (data: { phone: string; password: string }) => {
    await delay(500);
    return { user: DEMO_USER, token: 'demo-token-123' };
};

export const updateMe = async (data: { name?: string; email?: string; phone?: string }) => {
    await delay(400);
    Object.assign(DEMO_USER, data);
    return DEMO_USER;
};

export const changePassword = async (data: { currentPassword: string; newPassword: string }) => {
    await delay(400);
    return { message: 'Password changed successfully' };
};

export const updateSettings = async (data: { centerName?: string; logoUrl?: string }) => {
    await delay(400);
    Object.assign(DEMO_USER, data);
    return DEMO_USER;
};
