'use client';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { BookMarked } from 'lucide-react';

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function PendingReservationsModal({ open, onOpenChange }: Props) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] bg-white rounded-2xl" dir="rtl">
                <DialogHeader>
                    <DialogTitle className="text-lg font-bold border-b pb-3 flex items-center gap-2">
                        <BookMarked className="h-5 w-5 text-purple-600" />
                        الحجوزات المعلقة
                    </DialogTitle>
                </DialogHeader>
                <div className="py-8 flex flex-col items-center justify-center text-gray-400">
                    <BookMarked className="h-12 w-12 text-gray-200 mb-3" />
                    <p>لا توجد حجوزات معلقة حالياً</p>
                </div>
            </DialogContent>
        </Dialog>
    );
}
