import { mockDb, delay } from '@/lib/mock/db';
import type { CreateSessionDTO, ISession, PaginatedSessionsResponse } from '@/types/session.types';

export const fetchSessions = async (params: {
    page?: number;
    limit?: number;
    groupId?: string;
    status?: string;
    date?: string;
    startDate?: string;
    endDate?: string;
}): Promise<PaginatedSessionsResponse> => {
    await delay(400);
    let data = [...mockDb.sessions];

    if (params.groupId) data = data.filter(s => s.groupId === params.groupId);
    if (params.status)  data = data.filter(s => s.status  === params.status);
    if (params.date)    data = data.filter(s => s.date    === params.date);
    if (params.startDate) data = data.filter(s => s.date >= params.startDate!);
    if (params.endDate)   data = data.filter(s => s.date <= params.endDate!);

    data.sort((a, b) => b.date.localeCompare(a.date));

    const page  = params.page  || 1;
    const limit = params.limit || 20;
    const start = (page - 1) * limit;

    return {
        data: data.slice(start, start + limit),
        pagination: { total: data.length, page, limit, totalPages: Math.ceil(data.length / limit) },
    };
};

export const fetchSessionById = async (sessionId: string): Promise<ISession> => {
    await delay(300);
    const session = mockDb.sessions.find(s => s._id === sessionId);
    if (!session) throw new Error('الحصة غير موجودة');
    return session;
};

export const createSession = async (data: CreateSessionDTO): Promise<ISession> => {
    await delay(600);
    const group = mockDb.groups.find(g => g._id === data.groupId);
    const newSession: ISession = {
        _id:       `ses-${Date.now()}`,
        groupId:   group ? { _id: group._id, name: group.name } as any : data.groupId,
        teacherId: 'demo-teacher-001',
        date:      data.date,
        startTime: data.startTime,
        status:    'SCHEDULED',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    mockDb.sessions.push(newSession);
    return newSession;
};

export const updateSessionStatus = async (sessionId: string, status: string): Promise<ISession> => {
    await delay(400);
    const idx = mockDb.sessions.findIndex(s => s._id === sessionId);
    if (idx === -1) throw new Error('الحصة غير موجودة');
    mockDb.sessions[idx] = {
        ...mockDb.sessions[idx],
        status: status as ISession['status'],
        updatedAt: new Date().toISOString(),
    };
    return mockDb.sessions[idx];
};

export const generateWeekSessions = async (weekStart: string): Promise<{
    weekStart: string; createdCount: number; skippedCount: number; message: string;
}> => {
    await delay(800);
    return { weekStart, createdCount: 6, skippedCount: 2, message: 'تم إنشاء الحصص بنجاح (ديمو)' };
};

export const generateMonthSessions = async (year: number, month: number): Promise<{
    year: number; month: number; createdCount: number; skippedCount: number; message: string;
}> => {
    await delay(1000);
    return { year, month, createdCount: 20, skippedCount: 4, message: 'تم إنشاء حصص الشهر بنجاح (ديمو)' };
};

export const deleteSession = async (sessionId: string): Promise<void> => {
    await delay(400);
    const idx = mockDb.sessions.findIndex(s => s._id === sessionId);
    if (idx === -1) throw new Error('الحصة غير موجودة');
    mockDb.sessions.splice(idx, 1);
};
