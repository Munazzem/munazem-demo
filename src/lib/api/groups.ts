import { mockDb, delay } from '@/lib/mock/db';
import type { PaginatedGroupsResponse, CreateGroupDTO, UpdateGroupDTO, Group } from '@/types/group.types';

export const fetchGroups = async (filters: { page?: number; limit?: number; search?: string; gradeLevel?: string } = {}): Promise<PaginatedGroupsResponse> => {
    await delay(300);
    let data = [...mockDb.groups];
    if (filters.search) data = data.filter(g => g.name.includes(filters.search!));
    if (filters.gradeLevel) data = data.filter(g => g.gradeLevel === filters.gradeLevel);
    
    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const start = (page - 1) * limit;
    
    return {
        data: data.slice(start, start + limit),
        pagination: { total: data.length, page, limit, totalPages: Math.ceil(data.length / limit) },
    };
};

export const fetchGroupById = async (id: string): Promise<Group> => {
    await delay(300);
    const g = mockDb.groups.find(x => x._id === id);
    if (!g) throw new Error('Not found');
    return g;
};

export const createGroup = async (data: CreateGroupDTO): Promise<Group> => {
    await delay(400);
    const newGroup = { ...data, _id: `grp-${Date.now()}`, isActive: true, studentsCount: 0, createdAt: new Date().toISOString() } as Group;
    mockDb.groups.push(newGroup);
    return newGroup;
};

export const updateGroup = async (id: string, data: UpdateGroupDTO): Promise<Group> => {
    await delay(400);
    const idx = mockDb.groups.findIndex(x => x._id === id);
    if (idx === -1) throw new Error('Not found');
    mockDb.groups[idx] = { ...mockDb.groups[idx], ...data };
    return mockDb.groups[idx];
};

export const deleteGroup = async (id: string): Promise<void> => {
    await delay(400);
    const idx = mockDb.groups.findIndex(x => x._id === id);
    if (idx > -1) mockDb.groups.splice(idx, 1);
};
