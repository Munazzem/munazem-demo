import { delay } from '@/lib/mock/db';
import type { UserResponse, UsersListResponse } from '@/types/user.types';

let MOCK_USERS: any[] = [
    {
        _id: 'ast-001',
        fullName: 'أحمد المساعد',
        role: 'assistant',
        email: 'ahmed@demo.com',
        phone: '01000000001',
        isActive: true,
        salary: 3000,
        createdAt: new Date().toISOString()
    },
    {
        _id: 'ast-002',
        fullName: 'سارة المساعدة',
        role: 'assistant',
        email: 'sara@demo.com',
        phone: '01000000002',
        isActive: true,
        salary: 2500,
        createdAt: new Date().toISOString()
    }
];

export const fetchUsers = async (params?: { search?: string }): Promise<UsersListResponse> => {
    await delay(300);
    let data = [...MOCK_USERS];
    if (params?.search) {
        data = data.filter(u => u.fullName.includes(params.search!) || u.phone.includes(params.search!));
    }
    return { data, total: data.length, page: 1, limit: 100 } as any;
};

export const addUser = async (data: any): Promise<UserResponse> => {
    await delay(400);
    const newUser = {
        ...data,
        _id: `ast-${Date.now()}`,
        isActive: true,
        createdAt: new Date().toISOString()
    };
    MOCK_USERS.push(newUser);
    return { data: newUser } as any;
};

export const updateUser = async (params: { id: string; data: any }): Promise<UserResponse> => {
    await delay(400);
    const idx = MOCK_USERS.findIndex(u => u._id === params.id);
    if (idx === -1) throw new Error('Not found');
    MOCK_USERS[idx] = { ...MOCK_USERS[idx], ...params.data };
    return { data: MOCK_USERS[idx] } as any;
};

export const deleteUser = async (id: string): Promise<UserResponse> => {
    await delay(400);
    MOCK_USERS = MOCK_USERS.filter(u => u._id !== id);
    return { message: 'Deleted' } as any;
};

export const paySalary = async (id: string, data: { amount: number; notes?: string }): Promise<any> => {
    await delay(400);
    return { message: 'Salary paid' };
};
