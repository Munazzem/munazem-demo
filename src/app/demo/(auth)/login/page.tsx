'use client';

import { useForm } from 'react-hook-form';
import { useAuthStore } from '@/lib/store/auth.store';
import { login as mockLogin } from '@/lib/api/auth';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from '@/components/ui/form';

export default function LoginPage() {
    const form = useForm({
        defaultValues: {
            phone: '01000000000',
            password: 'demo1234',
        }
    });
    
    const loginStore = useAuthStore((state) => state.login);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: { phone: string; password: string }) => {
        setIsLoading(true);
        try {
            const res = await mockLogin(data);
            loginStore(res.user as any, res.token);
            toast.success('مرحباً بك في النسخة التجريبية! 🎉', {
                description: 'أنت الآن تستخدم ديمو منظِّم — البيانات تُعاد ضبطها مع كل إعادة تحميل.',
                duration: 5000,
            });
            router.push('/demo/dashboard');
        } catch {
            toast.error('حدث خطأ، حاول مرة أخرى');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f9f9fb] px-4">
            <div className="w-full max-w-md p-8 bg-white border border-gray-100 rounded-2xl shadow-sm">
                {/* Demo Notice */}
                <div className="mb-6 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl text-center">
                    <p className="text-amber-700 text-sm font-semibold">🧪 نسخة تجريبية</p>
                    <p className="text-amber-600 text-xs mt-0.5">ادخل بأي بيانات — لا يوجد كلمة مرور محددة</p>
                </div>

                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <img src="/icons/icon-512x512.png" alt="Monazem Logo" className="w-32 h-32 rounded-2xl border border-gray-100 shadow-sm p-2" />
                    </div>
                    <p className="text-gray-500 mt-2 text-sm">نظام الإدارة التعليمي الذكي</p>
                </div>
                
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="phone"
                            rules={{ required: 'رقم الهاتف مطلوب' }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>رقم الهاتف</FormLabel>
                                    <FormControl>
                                        <Input 
                                            placeholder="أدخل رقم الهاتف" 
                                            {...field} 
                                            disabled={isLoading}
                                            className="h-12 bg-gray-50/50"
                                            dir="ltr"
                                            type="tel"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            rules={{ required: 'كلمة المرور مطلوبة' }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>كلمة المرور</FormLabel>
                                    <FormControl>
                                        <Input 
                                            type="password" 
                                            placeholder="••••••••" 
                                            {...field} 
                                            disabled={isLoading}
                                            className="h-12 bg-gray-50/50 text-left"
                                            dir="ltr"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button 
                            type="submit" 
                            className="w-full h-12 text-md font-bold bg-[#0f4c81] hover:bg-[#0a3357] transition-all"
                            disabled={isLoading}
                        >
                            {isLoading ? 'جاري الدخول...' : 'دخول الديمو 🚀'}
                        </Button>
                    </form>
                </Form>
                
                <div className="mt-6 text-center">
                    <Link
                        href="/demo/parent"
                        className="inline-flex items-center gap-1.5 text-sm text-[#0f4c81] hover:underline font-medium"
                    >
                        <span>👨‍👧</span>
                        بوابة ولي الأمر — تابع أداء ابنك
                    </Link>
                </div>

                <div className="mt-4 text-center text-xs text-gray-400">
                    &copy; {new Date().getFullYear()} Monazem Platform. All rights reserved.
                </div>
            </div>
        </div>
    );
}
