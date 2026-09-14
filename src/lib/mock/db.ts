/**
 * ───────────────────────────────────────────────────────────────
 * MONAZEM DEMO — In-Memory Mock Database
 * ───────────────────────────────────────────────────────────────
 * هذا الملف يحتوي على البيانات الوهمية لنظام الديمو.
 * البيانات موجودة في الذاكرة المؤقتة فقط (In-Memory State).
 * أي تعديل يتم خلال الجلسة سيُعاد ضبطه عند إعادة تحميل الصفحة.
 */

import type { Group } from '@/types/group.types';
import type { StudentWithGroup } from '@/types/student.types';
import type { ISession, IAttendanceRecord } from '@/types/session.types';
import type { ITransaction } from '@/types/payment.types';
import type { INotebook } from '@/types/notebook.types';
import type { IExam, IExamResult } from '@/lib/api/exams';

// ── Seed IDs ──────────────────────────────────────────────────────
const T_ID = 'demo-teacher-001'; // Teacher ID

const GRP = {
    g1: 'grp-first-prep-a',
    g2: 'grp-second-prep-b',
    g3: 'grp-first-sec-a',
};

// ── Helper ────────────────────────────────────────────────────────
const pad = (n: number) => String(n).padStart(2, '0');
const today = () => new Date().toISOString().split('T')[0];
const daysAgo = (n: number) => {
    const d = new Date();
    d.setDate(d.getDate() - n);
    return d.toISOString().split('T')[0];
};
let idCounter = 1000;
const newId = (prefix = 'id') => `${prefix}-${++idCounter}-${Math.random().toString(36).slice(2, 6)}`;

// ════════════════════════════════════════════════════════════════
// SEED DATA
// ════════════════════════════════════════════════════════════════

const GROUPS_SEED: Group[] = [
    {
        _id: GRP.g1,
        name: 'الصف الأول الإعدادي — أ',
        gradeLevel: 'الصف الأول الإعدادي',
        schedule: [
            { _id: 's1', day: 'السبت', time: '10:00' },
            { _id: 's2', day: 'الثلاثاء', time: '10:00' },
        ],
        capacity: 30,
        teacherId: T_ID,
        isActive: true,
        studentsCount: 12,
        createdAt: daysAgo(60),
    },
    {
        _id: GRP.g2,
        name: 'الصف الثاني الإعدادي — ب',
        gradeLevel: 'الصف الثاني الإعدادي',
        schedule: [
            { _id: 's3', day: 'الأحد', time: '12:00' },
            { _id: 's4', day: 'الأربعاء', time: '12:00' },
        ],
        capacity: 25,
        teacherId: T_ID,
        isActive: true,
        studentsCount: 10,
        createdAt: daysAgo(45),
    },
    {
        _id: GRP.g3,
        name: 'الصف الأول الثانوي — أ',
        gradeLevel: 'الصف الأول الثانوي',
        schedule: [
            { _id: 's5', day: 'الاثنين', time: '14:00' },
            { _id: 's6', day: 'الخميس', time: '14:00' },
        ],
        capacity: 20,
        teacherId: T_ID,
        isActive: true,
        studentsCount: 8,
        createdAt: daysAgo(30),
    },
];

const STUDENTS_SEED: StudentWithGroup[] = [
    // المجموعة الأولى — 12 طالب
    { _id: 'stu-001', studentName: 'أحمد محمد السيد',    parentName: 'محمد السيد',   studentPhone: '01001234567', parentPhone: '01001234560', gradeLevel: 'الصف الأول الإعدادي', groupId: { _id: GRP.g1, name: 'الصف الأول الإعدادي — أ' }, isActive: true, monthlySessionsQuota: 8, usedSessionsThisMonth: 5, studentCode: 'STU-001', hasActiveSubscription: true, createdAt: daysAgo(55) },
    { _id: 'stu-002', studentName: 'ياسمين خالد إبراهيم', parentName: 'خالد إبراهيم', studentPhone: '01112345678', parentPhone: '01112345670', gradeLevel: 'الصف الأول الإعدادي', groupId: { _id: GRP.g1, name: 'الصف الأول الإعدادي — أ' }, isActive: true, monthlySessionsQuota: 8, usedSessionsThisMonth: 6, studentCode: 'STU-002', hasActiveSubscription: true, createdAt: daysAgo(53) },
    { _id: 'stu-003', studentName: 'عمر عبد الرحمن',      parentName: 'عبد الرحمن',   studentPhone: '01223456789', parentPhone: '01223456780', gradeLevel: 'الصف الأول الإعدادي', groupId: { _id: GRP.g1, name: 'الصف الأول الإعدادي — أ' }, isActive: true, monthlySessionsQuota: 8, usedSessionsThisMonth: 4, studentCode: 'STU-003', hasActiveSubscription: false, createdAt: daysAgo(50) },
    { _id: 'stu-004', studentName: 'فاطمة حسن علي',       parentName: 'حسن علي',      studentPhone: '01334567890', parentPhone: '01334567891', gradeLevel: 'الصف الأول الإعدادي', groupId: { _id: GRP.g1, name: 'الصف الأول الإعدادي — أ' }, isActive: true, monthlySessionsQuota: 8, usedSessionsThisMonth: 7, studentCode: 'STU-004', hasActiveSubscription: true, createdAt: daysAgo(48) },
    { _id: 'stu-005', studentName: 'مريم أحمد شوقي',      parentName: 'أحمد شوقي',    studentPhone: '01445678901', parentPhone: '01445678902', gradeLevel: 'الصف الأول الإعدادي', groupId: { _id: GRP.g1, name: 'الصف الأول الإعدادي — أ' }, isActive: true, monthlySessionsQuota: 8, usedSessionsThisMonth: 3, studentCode: 'STU-005', hasActiveSubscription: true, createdAt: daysAgo(46) },
    { _id: 'stu-006', studentName: 'يوسف طارق النجار',    parentName: 'طارق النجار',  studentPhone: '01556789012', parentPhone: '01556789013', gradeLevel: 'الصف الأول الإعدادي', groupId: { _id: GRP.g1, name: 'الصف الأول الإعدادي — أ' }, isActive: false,monthlySessionsQuota: 8, usedSessionsThisMonth: 0, studentCode: 'STU-006', hasActiveSubscription: false, createdAt: daysAgo(44) },
    // المجموعة الثانية — 10 طالب
    { _id: 'stu-007', studentName: 'سارة محمود فريد',     parentName: 'محمود فريد',   studentPhone: '01667890123', parentPhone: '01667890124', gradeLevel: 'الصف الثاني الإعدادي', groupId: { _id: GRP.g2, name: 'الصف الثاني الإعدادي — ب' }, isActive: true, monthlySessionsQuota: 8, usedSessionsThisMonth: 6, studentCode: 'STU-007', hasActiveSubscription: true, createdAt: daysAgo(42) },
    { _id: 'stu-008', studentName: 'كريم عصام الدين',     parentName: 'عصام الدين',   studentPhone: '01778901234', parentPhone: '01778901235', gradeLevel: 'الصف الثاني الإعدادي', groupId: { _id: GRP.g2, name: 'الصف الثاني الإعدادي — ب' }, isActive: true, monthlySessionsQuota: 8, usedSessionsThisMonth: 5, studentCode: 'STU-008', hasActiveSubscription: true, createdAt: daysAgo(40) },
    { _id: 'stu-009', studentName: 'نور الهدى سامي',      parentName: 'سامي عبدالله', studentPhone: '01889012345', parentPhone: '01889012346', gradeLevel: 'الصف الثاني الإعدادي', groupId: { _id: GRP.g2, name: 'الصف الثاني الإعدادي — ب' }, isActive: true, monthlySessionsQuota: 8, usedSessionsThisMonth: 8, studentCode: 'STU-009', hasActiveSubscription: true, createdAt: daysAgo(38) },
    { _id: 'stu-010', studentName: 'محمد صالح إسماعيل',   parentName: 'صالح إسماعيل', studentPhone: '01990123456', parentPhone: '01990123457', gradeLevel: 'الصف الثاني الإعدادي', groupId: { _id: GRP.g2, name: 'الصف الثاني الإعدادي — ب' }, isActive: true, monthlySessionsQuota: 8, usedSessionsThisMonth: 2, studentCode: 'STU-010', hasActiveSubscription: false, createdAt: daysAgo(36) },
    // المجموعة الثالثة — 8 طالب
    { _id: 'stu-011', studentName: 'لمياء رامي الشرقاوي', parentName: 'رامي الشرقاوي', studentPhone: '01010234567', parentPhone: '01010234560', gradeLevel: 'الصف الأول الثانوي', groupId: { _id: GRP.g3, name: 'الصف الأول الثانوي — أ' }, isActive: true, monthlySessionsQuota: 8, usedSessionsThisMonth: 7, studentCode: 'STU-011', hasActiveSubscription: true, createdAt: daysAgo(28) },
    { _id: 'stu-012', studentName: 'زياد عمرو البسيوني',  parentName: 'عمرو البسيوني', studentPhone: '01121345678', parentPhone: '01121345679', gradeLevel: 'الصف الأول الثانوي', groupId: { _id: GRP.g3, name: 'الصف الأول الثانوي — أ' }, isActive: true, monthlySessionsQuota: 8, usedSessionsThisMonth: 6, studentCode: 'STU-012', hasActiveSubscription: true, createdAt: daysAgo(25) },
];

const SESSIONS_SEED: ISession[] = [
    { _id: 'ses-001', groupId: GRP.g1, teacherId: T_ID, date: today(),       startTime: '10:00', status: 'IN_PROGRESS', createdAt: today(),       updatedAt: today()       },
    { _id: 'ses-002', groupId: GRP.g2, teacherId: T_ID, date: today(),       startTime: '12:00', status: 'SCHEDULED',   createdAt: today(),       updatedAt: today()       },
    { _id: 'ses-003', groupId: GRP.g3, teacherId: T_ID, date: daysAgo(2),   startTime: '14:00', status: 'COMPLETED',   createdAt: daysAgo(2),   updatedAt: daysAgo(2)   },
    { _id: 'ses-004', groupId: GRP.g1, teacherId: T_ID, date: daysAgo(4),   startTime: '10:00', status: 'COMPLETED',   createdAt: daysAgo(4),   updatedAt: daysAgo(4)   },
    { _id: 'ses-005', groupId: GRP.g2, teacherId: T_ID, date: daysAgo(6),   startTime: '12:00', status: 'COMPLETED',   createdAt: daysAgo(6),   updatedAt: daysAgo(6)   },
    { _id: 'ses-006', groupId: GRP.g1, teacherId: T_ID, date: daysAgo(8),   startTime: '10:00', status: 'COMPLETED',   createdAt: daysAgo(8),   updatedAt: daysAgo(8)   },
];

const TRANSACTIONS_SEED: ITransaction[] = [
    { _id: 'txn-001', teacherId: T_ID, createdBy: T_ID, type: 'INCOME',  category: 'SUBSCRIPTION',  studentId: 'stu-001', studentName: 'أحمد محمد السيد',    gradeLevel: 'الصف الأول الإعدادي', originalAmount: 300, discountAmount: 0,  paidAmount: 300, date: daysAgo(1),  createdAt: daysAgo(1)  },
    { _id: 'txn-002', teacherId: T_ID, createdBy: T_ID, type: 'INCOME',  category: 'SUBSCRIPTION',  studentId: 'stu-002', studentName: 'ياسمين خالد إبراهيم', gradeLevel: 'الصف الأول الإعدادي', originalAmount: 300, discountAmount: 50, paidAmount: 250, date: daysAgo(1),  createdAt: daysAgo(1)  },
    { _id: 'txn-003', teacherId: T_ID, createdBy: T_ID, type: 'INCOME',  category: 'SUBSCRIPTION',  studentId: 'stu-007', studentName: 'سارة محمود فريد',     gradeLevel: 'الصف الثاني الإعدادي',originalAmount: 350, discountAmount: 0,  paidAmount: 350, date: daysAgo(2),  createdAt: daysAgo(2)  },
    { _id: 'txn-004', teacherId: T_ID, createdBy: T_ID, type: 'EXPENSE', category: 'SALARY',         studentName: undefined,                                     gradeLevel: undefined,              originalAmount: 500, discountAmount: 0,  paidAmount: 500, date: daysAgo(3),  createdAt: daysAgo(3),  description: 'راتب المساعد' },
    { _id: 'txn-005', teacherId: T_ID, createdBy: T_ID, type: 'INCOME',  category: 'NOTEBOOK_SALE', studentId: 'stu-004', studentName: 'فاطمة حسن علي',       gradeLevel: 'الصف الأول الإعدادي', originalAmount: 80,  discountAmount: 0,  paidAmount: 80,  date: daysAgo(3),  createdAt: daysAgo(3)  },
    { _id: 'txn-006', teacherId: T_ID, createdBy: T_ID, type: 'INCOME',  category: 'SUBSCRIPTION',  studentId: 'stu-011', studentName: 'لمياء رامي الشرقاوي', gradeLevel: 'الصف الأول الثانوي',  originalAmount: 400, discountAmount: 0,  paidAmount: 400, date: daysAgo(5),  createdAt: daysAgo(5)  },
    { _id: 'txn-007', teacherId: T_ID, createdBy: T_ID, type: 'EXPENSE', category: 'RENT',           studentName: undefined,                                     gradeLevel: undefined,              originalAmount: 2000,discountAmount: 0,  paidAmount: 2000,date: daysAgo(10), createdAt: daysAgo(10), description: 'إيجار شهر أبريل' },
    { _id: 'txn-008', teacherId: T_ID, createdBy: T_ID, type: 'INCOME',  category: 'SUBSCRIPTION',  studentId: 'stu-008', studentName: 'كريم عصام الدين',     gradeLevel: 'الصف الثاني الإعدادي',originalAmount: 350, discountAmount: 0,  paidAmount: 350, date: daysAgo(12), createdAt: daysAgo(12) },
    { _id: 'txn-009', teacherId: T_ID, createdBy: T_ID, type: 'EXPENSE', category: 'SUPPLIES',       studentName: undefined,                                     gradeLevel: undefined,              originalAmount: 250, discountAmount: 0,  paidAmount: 250, date: daysAgo(15), createdAt: daysAgo(15), description: 'أوراق وأقلام' },
    { _id: 'txn-010', teacherId: T_ID, createdBy: T_ID, type: 'INCOME',  category: 'SUBSCRIPTION',  studentId: 'stu-009', studentName: 'نور الهدى سامي',      gradeLevel: 'الصف الثاني الإعدادي',originalAmount: 350, discountAmount: 0,  paidAmount: 350, date: daysAgo(18), createdAt: daysAgo(18) },
];

const NOTEBOOKS_SEED: INotebook[] = [
    { _id: 'nb-001', teacherId: T_ID, name: 'مذكرة الصف الأول الإعدادي',  gradeLevel: 'الصف الأول الإعدادي',  price: 80,  stock: 45, createdAt: daysAgo(50), updatedAt: daysAgo(5) },
    { _id: 'nb-002', teacherId: T_ID, name: 'مذكرة الصف الثاني الإعدادي', gradeLevel: 'الصف الثاني الإعدادي', price: 100, stock: 30, createdAt: daysAgo(45), updatedAt: daysAgo(3) },
    { _id: 'nb-003', teacherId: T_ID, name: 'مذكرة الصف الأول الثانوي',  gradeLevel: 'الصف الأول الثانوي',  price: 120, stock: 20, createdAt: daysAgo(30), updatedAt: daysAgo(7) },
];

const PRICE_SETTINGS_SEED = {
    teacherId: T_ID,
    prices: [
        { gradeLevel: 'الصف الأول الإعدادي'  as any, amount: 300 },
        { gradeLevel: 'الصف الثاني الإعدادي' as any, amount: 350 },
        { gradeLevel: 'الصف الثالث الإعدادي' as any, amount: 350 },
        { gradeLevel: 'الصف الأول الثانوي'   as any, amount: 400 },
        { gradeLevel: 'الصف الثاني الثانوي'  as any, amount: 400 },
        { gradeLevel: 'الصف الثالث الثانوي'  as any, amount: 450 },
    ],
};

const EXAMS_SEED: IExam[] = [
    {
        _id: 'exam-001',
        teacherId: T_ID,
        title: 'اختبار الفصل الأول — الصف الأول الإعدادي',
        date: daysAgo(10),
        totalMarks: 100,
        passingMarks: 50,
        gradeLevel: 'الصف الأول الإعدادي',
        groupIds: [GRP.g1],
        questions: [
            { type: 'MCQ',        text: 'كم عدد أضلاع المربع؟',                marks: 10, options: ['3', '4', '5', '6'], correctAnswer: '4' },
            { type: 'TRUE_FALSE', text: 'المثلث المتساوي الأضلاع له ثلاث زوايا متساوية.', marks: 10 },
            { type: 'ESSAY',      text: 'اشرح قانون المساحة للمربع مع مثال.',  marks: 20 },
        ],
        status: 'PUBLISHED',
        source: 'MANUAL',
        createdAt: daysAgo(15),
    },
    {
        _id: 'exam-002',
        teacherId: T_ID,
        title: 'مراجعة نصف الفصل — الصف الثاني الإعدادي',
        date: daysAgo(5),
        totalMarks: 50,
        passingMarks: 25,
        gradeLevel: 'الصف الثاني الإعدادي',
        groupIds: [GRP.g2],
        questions: [
            { type: 'MCQ',    text: 'ما هو ناتج 12 × 13؟', marks: 10, options: ['144', '156', '168', '180'], correctAnswer: '156' },
            { type: 'ESSAY',  text: 'وضّح كيفية استخراج المساحة الجانبية للأسطوانة.', marks: 25 },
        ],
        status: 'COMPLETED',
        source: 'AI_GENERATED',
        createdAt: daysAgo(8),
    },
];

const EXAM_RESULTS_SEED: IExamResult[] = [
    { _id: 'res-001', examId: 'exam-001', studentId: { _id: 'stu-001', fullName: 'أحمد محمد السيد' },    score: 85, percentage: 85, grade: 'ممتاز',   passed: true,  createdAt: daysAgo(9) },
    { _id: 'res-002', examId: 'exam-001', studentId: { _id: 'stu-002', fullName: 'ياسمين خالد إبراهيم' }, score: 72, percentage: 72, grade: 'جيد جداً', passed: true,  createdAt: daysAgo(9) },
    { _id: 'res-003', examId: 'exam-001', studentId: { _id: 'stu-003', fullName: 'عمر عبد الرحمن' },      score: 45, percentage: 45, grade: 'ضعيف',    passed: false, createdAt: daysAgo(9) },
    { _id: 'res-004', examId: 'exam-001', studentId: { _id: 'stu-004', fullName: 'فاطمة حسن علي' },       score: 90, percentage: 90, grade: 'ممتاز',   passed: true,  createdAt: daysAgo(9) },
];

const ATTENDANCE_SEED: IAttendanceRecord[] = [
    { _id: 'att-001', studentId: { _id: 'stu-001', studentName: 'أحمد محمد السيد',    studentPhone: '01001234567', studentCode: 'STU-001' }, sessionId: 'ses-001', status: 'PRESENT', isGuest: false, scannedAt: new Date().toISOString(), scannedBy: T_ID },
    { _id: 'att-002', studentId: { _id: 'stu-002', studentName: 'ياسمين خالد إبراهيم', studentPhone: '01112345678', studentCode: 'STU-002' }, sessionId: 'ses-001', status: 'PRESENT', isGuest: false, scannedAt: new Date().toISOString(), scannedBy: T_ID },
    { _id: 'att-003', studentId: { _id: 'stu-003', studentName: 'عمر عبد الرحمن',      studentPhone: '01223456789', studentCode: 'STU-003' }, sessionId: 'ses-001', status: 'ABSENT',  isGuest: false, scannedAt: new Date().toISOString(), scannedBy: T_ID },
    { _id: 'att-004', studentId: { _id: 'stu-004', studentName: 'فاطمة حسن علي',       studentPhone: '01334567890', studentCode: 'STU-004' }, sessionId: 'ses-001', status: 'PRESENT', isGuest: false, scannedAt: new Date().toISOString(), scannedBy: T_ID },
    { _id: 'att-005', studentId: { _id: 'stu-005', studentName: 'مريم أحمد شوقي',      studentPhone: '01445678901', studentCode: 'STU-005' }, sessionId: 'ses-001', status: 'LATE',    isGuest: false, scannedAt: new Date().toISOString(), scannedBy: T_ID },
];

// ════════════════════════════════════════════════════════════════
// LIVE STATE (In-Memory — Resets on Refresh)
// ════════════════════════════════════════════════════════════════

export const mockDb = {
    groups:       [...GROUPS_SEED],
    students:     [...STUDENTS_SEED],
    sessions:     [...SESSIONS_SEED],
    transactions: [...TRANSACTIONS_SEED],
    notebooks:    [...NOTEBOOKS_SEED],
    exams:        [...EXAMS_SEED],
    examResults:  [...EXAM_RESULTS_SEED],
    attendance:   [...ATTENDANCE_SEED],
    priceSettings: { ...PRICE_SETTINGS_SEED },
};

// ── Delay helper to simulate realistic API latency ────────────────
export const delay = (ms = 500) => new Promise<void>((res) => setTimeout(res, ms));
