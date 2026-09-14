import { mockDb, delay } from '@/lib/mock/db';
import type {
    IDailyLedger,
    IMonthlyLedger,
    IPriceSettings,
    IPriceSetting,
    ITransaction,
    GradeLevel,
    TransactionCategory,
} from '@/types/payment.types';

export const getPriceSettings = async (): Promise<IPriceSettings> => {
    await delay(300);
    return mockDb.priceSettings as unknown as IPriceSettings;
};

export const savePriceSettings = async (prices: IPriceSetting[]): Promise<IPriceSettings> => {
    await delay(400);
    mockDb.priceSettings.prices = prices as any;
    return mockDb.priceSettings as unknown as IPriceSettings;
};

export const getDailyLedger = async (date: string): Promise<IDailyLedger> => {
    await delay(300);
    const txns = mockDb.transactions.filter(t => t.date === date);
    const income = txns.filter(t => t.type === 'INCOME').reduce((s, t) => s + (t.paidAmount || 0), 0);
    const expense = txns.filter(t => t.type === 'EXPENSE').reduce((s, t) => s + (t.paidAmount || 0), 0);
    
    const mappedTxns = txns.map(t => ({
        transactionId: t._id,
        type: t.type,
        category: t.category,
        paidAmount: t.paidAmount || 0,
        studentName: t.studentName,
        description: t.description,
        createdBy: t.createdBy,
        time: t.createdAt!
    }));

    return {
        date,
        transactions: mappedTxns as any[],
        totalIncome: income,
        totalExpenses: expense,
        netBalance: income - expense,
        monthlyIncome: income,
        monthlyExpenses: expense
    };
};

export const getMonthlyLedger = async (year: number, month: number): Promise<IMonthlyLedger> => {
    await delay(300);
    const mStr = `${year}-${String(month).padStart(2, '0')}`;
    const txns = mockDb.transactions.filter(t => t.date.startsWith(mStr));
    const income = txns.filter(t => t.type === 'INCOME').reduce((s, t) => s + (t.paidAmount || 0), 0);
    const expense = txns.filter(t => t.type === 'EXPENSE').reduce((s, t) => s + (t.paidAmount || 0), 0);
    
    return {
        year,
        month,
        dailySummaries: [], // Simplified for mock
        totalIncome: income,
        totalExpenses: expense,
        netBalance: income - expense
    };
};

export const recordSubscription = async (data: { studentId: string; discountAmount?: number; description?: string; date?: string; }): Promise<ITransaction> => {
    await delay(400);
    const s = mockDb.students.find(x => x._id === data.studentId);
    const newTx = {
        _id: `tx-${Date.now()}`,
        teacherId: 'demo-teacher-001',
        createdBy: 'demo-teacher-001',
        type: 'INCOME',
        category: 'SUBSCRIPTION',
        studentId: data.studentId,
        studentName: s?.studentName,
        gradeLevel: s?.gradeLevel,
        originalAmount: 300,
        discountAmount: data.discountAmount || 0,
        paidAmount: 300 - (data.discountAmount || 0),
        description: data.description,
        date: data.date || new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString()
    } as unknown as ITransaction;
    mockDb.transactions.push(newTx as any);
    if (s) s.hasActiveSubscription = true;
    return newTx;
};

export const recordNotebookSale = async (data: { studentId: string; notebookId: string; quantity?: number; discountAmount?: number; description?: string; date?: string; }): Promise<ITransaction> => {
    await delay(400);
    const s = mockDb.students.find(x => x._id === data.studentId);
    const newTx = {
        _id: `tx-${Date.now()}`,
        teacherId: 'demo-teacher-001',
        createdBy: 'demo-teacher-001',
        type: 'INCOME',
        category: 'NOTEBOOK_SALE',
        studentId: data.studentId,
        studentName: s?.studentName,
        gradeLevel: s?.gradeLevel,
        originalAmount: 100,
        discountAmount: data.discountAmount || 0,
        paidAmount: 100 - (data.discountAmount || 0),
        description: data.description,
        date: data.date || new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString()
    } as unknown as ITransaction;
    mockDb.transactions.push(newTx as any);
    return newTx;
};

export const reserveNotebook = async (data: any): Promise<any> => { await delay(400); return { message: 'تم' }; };
export const deliverNotebook = async (id: string, data: any): Promise<any> => { await delay(400); return { message: 'تم' }; };

export interface IBatchSubscriptionResult { studentId: string; studentName: string; paidAmount: number; status: 'success' | 'error'; error?: string; }
export interface IBatchSubscriptionResponse { results: IBatchSubscriptionResult[]; successCount: number; failCount: number; totalPaid: number; }

export const recordBatchSubscription = async (data: { studentIds: string[]; discountAmount?: number; description?: string; date?: string; }): Promise<IBatchSubscriptionResponse> => {
    await delay(600);
    const results: IBatchSubscriptionResult[] = data.studentIds.map(id => ({ studentId: id, studentName: 'Mock Student', paidAmount: 300, status: 'success' }));
    return { results, successCount: data.studentIds.length, failCount: 0, totalPaid: data.studentIds.length * 300 };
};

export const recordExpense = async (data: { category: TransactionCategory; amount: number; description?: string; date?: string; }): Promise<ITransaction> => {
    await delay(400);
    const newTx = {
        _id: `tx-${Date.now()}`,
        teacherId: 'demo-teacher-001',
        createdBy: 'demo-teacher-001',
        type: 'EXPENSE',
        category: data.category,
        originalAmount: data.amount,
        discountAmount: 0,
        paidAmount: data.amount,
        description: data.description,
        date: data.date || new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString()
    } as unknown as ITransaction;
    mockDb.transactions.push(newTx as any);
    return newTx;
};

export const updateTransaction = async (id: string, data: any): Promise<ITransaction> => {
    await delay(400);
    const idx = mockDb.transactions.findIndex(t => t._id === id);
    if (idx === -1) throw new Error('Not found');
    mockDb.transactions[idx] = { ...mockDb.transactions[idx], ...data } as any;
    return mockDb.transactions[idx] as unknown as ITransaction;
};
