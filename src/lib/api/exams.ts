import { mockDb, delay } from '@/lib/mock/db';

// ── Types ──────────────────────────────────────────────────────────

export type QuestionType = 'MCQ' | 'TRUE_FALSE' | 'ESSAY';
export type ExamStatus   = 'DRAFT' | 'PUBLISHED' | 'COMPLETED';
export type ExamSource   = 'MANUAL' | 'AI_GENERATED';
export type Difficulty   = 'easy' | 'medium' | 'hard' | 'mixed';

export interface IQuestion {
    type:           QuestionType;
    text:           string;
    marks:          number;
    options?:       string[];
    correctAnswer?: string;
}

export interface IExam {
    _id:          string;
    teacherId:    string;
    title:        string;
    date:         string;
    totalMarks:   number;
    passingMarks: number;
    gradeLevel?:  string;
    groupIds?:    string[];
    questions:    IQuestion[];
    status:       ExamStatus;
    source:       ExamSource;
    createdAt:    string;
}

export interface IExamResult {
    _id:        string;
    examId:     string;
    studentId:  string | { _id: string; fullName: string };
    score:      number;
    percentage: number;
    grade:      string;
    passed:     boolean;
    createdAt:  string;
}

export interface ExamResultsSummary {
    exam:          Pick<IExam, '_id' | 'title' | 'date' | 'totalMarks'>;
    totalStudents: number;
    passingCount:  number;
    failingCount:  number;
    passRate:      string;
    results:       IExamResult[];
}

export interface PaginatedExamsResponse {
    data:       IExam[];
    pagination: { total: number; page: number; limit: number; totalPages: number };
}

export interface CreateExamInput {
    title:        string;
    date:         string;
    totalMarks:   number;
    passingMarks: number;
    gradeLevel?:  string;
    groupIds?:    string[];
    questions?:   IQuestion[];
    source?:      ExamSource;
}

export interface UpdateExamInput extends Partial<CreateExamInput> {}

export interface BatchResultInput {
    studentId: string;
    score:     number;
}

// ── API Functions ──────────────────────────────────────────────────

export const fetchExams = async (params?: {
    status?:     ExamStatus;
    gradeLevel?: string;
    page?:       number;
    limit?:      number;
}): Promise<PaginatedExamsResponse> => {
    await delay(300);
    let data = [...mockDb.exams];
    if (params?.status) data = data.filter(e => e.status === params.status);
    if (params?.gradeLevel) data = data.filter(e => e.gradeLevel === params.gradeLevel);
    
    const limit = params?.limit || 20;
    const page = params?.page || 1;
    const start = (page - 1) * limit;
    
    return {
        data: data.slice(start, start + limit) as unknown as IExam[],
        pagination: { total: data.length, page, limit, totalPages: Math.ceil(data.length / limit) }
    };
};

export const fetchExamById = async (id: string): Promise<IExam> => {
    await delay(300);
    const exam = mockDb.exams.find(e => e._id === id);
    if (!exam) throw new Error('Not found');
    return exam as unknown as IExam;
};

export const createExam = async (data: CreateExamInput): Promise<IExam> => {
    await delay(400);
    const newExam = {
        ...data,
        _id: `exam-${Date.now()}`,
        teacherId: 'demo-teacher-001',
        status: 'DRAFT',
        source: data.source || 'MANUAL',
        questions: data.questions || [],
        createdAt: new Date().toISOString()
    };
    mockDb.exams.push(newExam as any);
    return newExam as unknown as IExam;
};

export const updateExam = async (id: string, data: UpdateExamInput): Promise<IExam> => {
    await delay(400);
    const idx = mockDb.exams.findIndex(e => e._id === id);
    if (idx === -1) throw new Error('Not found');
    mockDb.exams[idx] = { ...mockDb.exams[idx], ...data } as any;
    return mockDb.exams[idx] as unknown as IExam;
};

export const publishExam = async (id: string): Promise<IExam> => {
    await delay(400);
    const idx = mockDb.exams.findIndex(e => e._id === id);
    if (idx === -1) throw new Error('Not found');
    mockDb.exams[idx].status = 'PUBLISHED';
    return mockDb.exams[idx] as unknown as IExam;
};

export const deleteExam = async (id: string): Promise<void> => {
    await delay(400);
    const idx = mockDb.exams.findIndex(e => e._id === id);
    if (idx > -1) mockDb.exams.splice(idx, 1);
};

export const getExamResults = async (id: string): Promise<ExamResultsSummary> => {
    await delay(300);
    const exam = mockDb.exams.find(e => e._id === id);
    if (!exam) throw new Error('Not found');
    
    const results = mockDb.examResults.filter(r => r.examId === id);
    const passingCount = results.filter(r => r.passed).length;
    
    return {
        exam: exam as any,
        totalStudents: results.length,
        passingCount,
        failingCount: results.length - passingCount,
        passRate: results.length > 0 ? `${Math.round((passingCount / results.length) * 100)}%` : '0%',
        results: results as unknown as IExamResult[]
    };
};

export const recordResult = async (examId: string, data: BatchResultInput): Promise<IExamResult> => {
    await delay(400);
    const newRes = {
        _id: `res-${Date.now()}`,
        examId,
        studentId: data.studentId,
        score: data.score,
        percentage: 0,
        grade: 'A',
        passed: true,
        createdAt: new Date().toISOString()
    };
    mockDb.examResults.push(newRes as any);
    return newRes as unknown as IExamResult;
};

export const batchRecordResults = async (
    examId: string,
    results: BatchResultInput[]
): Promise<{ total: number; inserted: number }> => {
    await delay(600);
    return { total: results.length, inserted: results.length };
};

export const generateExamFromPdf = async (formData: FormData): Promise<{ exam: IExam; message: string }> => {
    await delay(1500);
    throw new Error('AI Generation not available in demo mode');
};
