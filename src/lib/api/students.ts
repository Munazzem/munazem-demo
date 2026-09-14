import { mockDb, delay } from '@/lib/mock/db';
import type { PaginatedStudentsResponse, StudentWithGroup, CreateStudentDTO, UpdateStudentDTO } from '@/types/student.types';

export const fetchStudents = async (params: { page?: number; limit?: number; groupId?: string; isActive?: boolean | string; search?: string; }): Promise<PaginatedStudentsResponse> => {
    await delay(300);
    let data = [...mockDb.students];
    if (params.groupId) data = data.filter(s => {
        if (typeof s.groupId === 'object' && s.groupId !== null) return s.groupId._id === params.groupId;
        return s.groupId === params.groupId;
    });
    if (params.search) data = data.filter(s => s.studentName.includes(params.search!) || s.studentPhone.includes(params.search!));
    if (params.isActive !== undefined && params.isActive !== '') {
        const active = String(params.isActive) === 'true';
        data = data.filter(s => s.isActive === active);
    }
    const page = params.page || 1;
    const limit = params.limit || 20;
    const start = (page - 1) * limit;
    return { data: data.slice(start, start + limit), pagination: { total: data.length, page, limit, totalPages: Math.ceil(data.length / limit) } };
};

export const fetchStudentById = async (id: string): Promise<StudentWithGroup> => {
    await delay(300);
    const s = mockDb.students.find(x => x._id === id);
    if (!s) throw new Error('Not found');
    return s;
};

export const createStudent = async (data: CreateStudentDTO): Promise<StudentWithGroup> => {
    await delay(400);
    const newStudent = { ...data, _id: `stu-${Date.now()}`, isActive: true, usedSessionsThisMonth: 0, studentCode: `STU-${Date.now().toString().slice(-4)}`, hasActiveSubscription: false, createdAt: new Date().toISOString() } as unknown as StudentWithGroup;
    mockDb.students.push(newStudent);
    return newStudent;
};

export const updateStudent = async (id: string, data: UpdateStudentDTO): Promise<StudentWithGroup> => {
    await delay(400);
    const idx = mockDb.students.findIndex(x => x._id === id);
    if (idx === -1) throw new Error('Not found');
    mockDb.students[idx] = { ...mockDb.students[idx], ...data } as unknown as StudentWithGroup;
    return mockDb.students[idx];
};

export const deleteStudent = async (id: string): Promise<void> => {
    await delay(400);
    const idx = mockDb.students.findIndex(x => x._id === id);
    if (idx > -1) mockDb.students.splice(idx, 1);
};

export interface BulkStudentInput { fullName: string; studentPhone: string; parentPhone: string; gradeLevel: string; groupId: string; barcode?: string; }
export interface BulkStudentResult { index: number; success: boolean; studentName?: string; studentCode?: string; error?: string; }
export interface BulkCreateResponse { results: BulkStudentResult[]; successCount: number; failCount: number; total: number; }

export const bulkCreateStudents = async (students: BulkStudentInput[]): Promise<BulkCreateResponse> => {
    await delay(600);
    const results: BulkStudentResult[] = students.map((s, i) => ({ index: i, success: true, studentName: s.fullName, studentCode: `STU-${Date.now().toString().slice(-4)}-${i}` }));
    return { results, successCount: students.length, failCount: 0, total: students.length };
};
