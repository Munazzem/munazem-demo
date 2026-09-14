import { mockDb, delay } from '@/lib/mock/db';
import type { DashboardData } from '@/types/dashboard.types';

export const fetchDashboardStats = async (): Promise<DashboardData> => {
    await delay(500);

    const activeStudents = mockDb.students.filter(s => s.isActive);
    const activeGroups = mockDb.groups.filter(g => g.isActive);
    const currentMonth = new Date().toISOString().slice(0, 7);
    const sessionsThisMonth = mockDb.sessions.filter(s => s.date.startsWith(currentMonth)).length;

    const totalIncome = mockDb.transactions
        .filter(t => t.type === 'INCOME' && t.date.startsWith(currentMonth))
        .reduce((sum, t) => sum + (t.paidAmount || 0), 0);

    const totalExpenses = mockDb.transactions
        .filter(t => t.type === 'EXPENSE' && t.date.startsWith(currentMonth))
        .reduce((sum, t) => sum + (t.paidAmount || 0), 0);

    const recentActivities = [...mockDb.transactions]
        .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime())
        .slice(0, 5)
        .map(t => ({
            type: t.type,
            category: t.category,
            paidAmount: t.paidAmount || 0,
            studentName: t.studentName,
            description: t.description,
            time: t.createdAt!
        }));

    return {
        totalStudents: activeStudents.length,
        totalGroups: activeGroups.length,
        sessionsThisMonth,
        financial: {
            totalIncome,
            totalExpenses,
            netBalance: totalIncome - totalExpenses,
        },
        charts: {
            incomeTrend: [
                { month: 'يناير', income: 12000 },
                { month: 'فبراير', income: 15000 },
                { month: 'مارس', income: 14500 },
                { month: 'أبريل', income: 18000 },
                { month: 'مايو', income: 21000 },
                { month: 'يونيو', income: 25000 }
            ],
            attendanceTrend: [
                { date: 'حصة 1', rate: 95 },
                { date: 'حصة 2', rate: 90 },
                { date: 'حصة 3', rate: 92 },
                { date: 'حصة 4', rate: 88 },
                { date: 'حصة 5', rate: 94 },
                { date: 'حصة 6', rate: 98 }
            ],
            studentsPerGroup: mockDb.groups.map(g => ({
                groupName: g.name,
                studentCount: g.studentsCount || 0
            })),
            expensesBreakdown: [
                { name: 'RENT', value: 2000 },
                { name: 'SALARY', value: 1500 },
                { name: 'SUPPLIES', value: 800 }
            ]
        },
        recentActivities,
        message: 'مرحباً بعودتك، المعلم',
    };
};
