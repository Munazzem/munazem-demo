import { mockDb, delay } from '@/lib/mock/db';

export interface IDailySummary {
    date: string;
    sessionsCount: number;
    totalPresent: number;
    subscriptionsCount: number;
    financial: {
        totalIncome: number;
        totalExpenses: number;
        netBalance: number;
    };
}

export const fetchDailySummary = async (date?: string): Promise<IDailySummary> => {
    await delay(300);
    const targetDate = date || new Date().toISOString().split('T')[0];
    
    const todaySessions = mockDb.sessions.filter(s => s.date === targetDate);
    const presentCount = mockDb.attendance.filter(a => a.status === 'PRESENT' && todaySessions.some(s => s._id === a.sessionId)).length;
    
    const todayIncome = mockDb.transactions.filter(t => t.type === 'INCOME' && t.date === targetDate).reduce((s, t) => s + (t.paidAmount || 0), 0);
    const todayExpenses = mockDb.transactions.filter(t => t.type === 'EXPENSE' && t.date === targetDate).reduce((s, t) => s + (t.paidAmount || 0), 0);

    return {
        date: targetDate,
        sessionsCount: todaySessions.length,
        totalPresent: presentCount,
        subscriptionsCount: mockDb.transactions.filter(t => t.type === 'INCOME' && t.category === 'SUBSCRIPTION' && t.date === targetDate).length,
        financial: {
            totalIncome: todayIncome,
            totalExpenses: todayExpenses,
            netBalance: todayIncome - todayExpenses,
        },
    };
};

export const fetchDailySummaryHtml = async (date?: string): Promise<string> => {
    await delay(300);
    return '<html><body><h1>Mock Daily Summary HTML</h1></body></html>';
};

export const fetchStudentReport = async (studentId: string) => {
    await delay(300);
    const student = mockDb.students.find(s => s._id === studentId);
    return {
        student: {
            ...student,
            hasActiveSubscription: student?.hasActiveSubscription ?? false,
        },
        attendance: {
            presentCount: 12,
            absentCount: 2,
            attendanceRate: '85%',
            history: [
                { date: new Date().toISOString(), status: 'PRESENT' },
                { date: new Date(Date.now() - 86400000 * 2).toISOString(), status: 'ABSENT' },
                { date: new Date(Date.now() - 86400000 * 4).toISOString(), status: 'PRESENT' },
                { date: new Date(Date.now() - 86400000 * 6).toISOString(), status: 'PRESENT' },
                { date: new Date(Date.now() - 86400000 * 8).toISOString(), status: 'PRESENT' },
            ]
        },
        subscriptions: [
            { _id: 'sub-1', month: 'مايو 2024', status: 'PAID', date: new Date().toISOString() },
            { _id: 'sub-2', month: 'أبريل 2024', status: 'PAID', date: new Date(Date.now() - 86400000 * 30).toISOString() },
        ],
        payments: [
            { _id: 'pay-1', amount: 300, date: new Date().toISOString(), description: 'اشتراك شهر مايو' },
        ]
    };
};

export const fetchStudentReportHtml = async (studentId: string): Promise<string> => {
    await delay(300);
    return '<html><body><h1>Mock Student Report HTML</h1></body></html>';
};

export const fetchGroupReport = async (groupId: string) => {
    await delay(300);
    const group = mockDb.groups.find(g => g._id === groupId);
    const studentsCount = mockDb.students.filter(s => {
        if (typeof s.groupId === 'string') return s.groupId === groupId;
        return s.groupId?._id === groupId;
    }).length;

    return {
        group: {
            gradeLevel: group?.gradeLevel || '—',
            schedule: group?.schedule || [],
        },
        studentsCount,
        attendance: {
            totalSessions: 8,
            avgAttendanceRate: '92%',
            totalPresences: 65,
            totalAbsences: 5,
        },
        revenue: {
            breakdown: [
                { _id: 'SUBSCRIPTION', count: 15, total: 4500 },
                { _id: 'NOTEBOOK_SALE', count: 10, total: 1000 },
            ]
        }
    };
};

export const fetchGroupReportHtml = async (groupId: string): Promise<string> => {
    await delay(300);
    return '<html><body><h1>Mock Group Report HTML</h1></body></html>';
};

export const fetchGroupAttendanceSheetHtml = async (groupId: string): Promise<string> => {
    await delay(300);
    return '<html><body><h1>Mock Group Attendance Sheet HTML</h1></body></html>';
};

export const fetchFinancialMonthlyReport = async (year: number, month: number) => {
    await delay(300);
    return {
        totalIncome: 15000,
        totalExpenses: 2000,
        netBalance: 13000,
        dailySummaries: [],
    };
};

export const fetchMonthlyReportHtml = async (year: number, month: number): Promise<string> => {
    await delay(300);
    return '<html><body><h1>Mock Monthly Report HTML</h1></body></html>';
};

export interface IUnpaidStudentsReport {
    month:       string;
    totalActive: number;
    unpaidCount: number;
    paidCount:   number;
    students:    Array<{
        _id:         string;
        studentName: string;
        gradeLevel:  string;
        studentCode: string;
        groupId?:    { _id: string; name: string } | string;
    }>;
}

export const fetchUnpaidStudents = async (includeList = false): Promise<IUnpaidStudentsReport> => {
    await delay(300);
    const active = mockDb.students.filter(s => s.isActive);
    const unpaid = active.filter(s => !s.hasActiveSubscription);
    const paid = active.filter(s => s.hasActiveSubscription);

    return {
        month: 'الحالي',
        totalActive: active.length,
        unpaidCount: unpaid.length,
        paidCount: paid.length,
        students: includeList ? unpaid.map(s => ({
            _id: s._id,
            studentName: s.studentName,
            gradeLevel: s.gradeLevel,
            studentCode: s.studentCode || '',
            groupId: s.groupId
        })) : [],
    };
};
