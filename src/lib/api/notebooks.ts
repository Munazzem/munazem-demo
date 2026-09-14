import { mockDb, delay } from '@/lib/mock/db';
import type { INotebook, PaginatedNotebooksResponse, CreateNotebookDTO, UpdateNotebookDTO } from '@/types/notebook.types';

export const fetchNotebooks = async (params?: { page?: number; limit?: number; search?: string; gradeLevel?: string; }): Promise<PaginatedNotebooksResponse> => {
    await delay(300);
    let data = [...mockDb.notebooks];
    if (params?.search) data = data.filter(n => n.name.includes(params.search!));
    if (params?.gradeLevel) data = data.filter(n => n.gradeLevel === params.gradeLevel);
    
    const page = params?.page || 1;
    const limit = params?.limit || 20;
    const start = (page - 1) * limit;
    
    return { data: data.slice(start, start + limit), pagination: { total: data.length, page, limit, totalPages: Math.ceil(data.length / limit) } };
};

export const createNotebook = async (data: CreateNotebookDTO): Promise<INotebook> => {
    await delay(400);
    const newNotebook = { ...data, _id: `nb-${Date.now()}`, reservedCount: 0, createdAt: new Date().toISOString() } as unknown as INotebook;
    mockDb.notebooks.push(newNotebook);
    return newNotebook;
};

export const updateNotebook = async (id: string, data: UpdateNotebookDTO): Promise<INotebook> => {
    await delay(400);
    const idx = mockDb.notebooks.findIndex(n => n._id === id);
    if (idx === -1) throw new Error('Not found');
    mockDb.notebooks[idx] = { ...mockDb.notebooks[idx], ...data } as unknown as INotebook;
    return mockDb.notebooks[idx];
};

export const restockNotebook = async (id: string, quantity: number): Promise<INotebook> => {
    await delay(400);
    const idx = mockDb.notebooks.findIndex(n => n._id === id);
    if (idx === -1) throw new Error('Not found');
    mockDb.notebooks[idx].stock += quantity;
    return mockDb.notebooks[idx];
};

export const deleteNotebook = async (id: string): Promise<void> => {
    await delay(400);
    const idx = mockDb.notebooks.findIndex(n => n._id === id);
    if (idx > -1) mockDb.notebooks.splice(idx, 1);
};

export const fetchReservations = async (params?: { page?: number; limit?: number; status?: string; studentId?: string; notebookId?: string; }): Promise<{ data: any[]; pagination: any }> => {
    await delay(300);
    return { data: [], pagination: { total: 0, page: 1, limit: 20, totalPages: 1 } };
};
